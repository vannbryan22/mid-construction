import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "@utils/database";
import { generateAccessToken, generateRefreshToken } from "@utils/token";
import jwt from "jsonwebtoken";
import { AuthRequest } from "@/middlewares/authMiddleware";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";

export const getCurrentUserFromToken = async (
  req: AuthRequest,
  res: Response,
) => {
  const userId = req.user?.id;

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1",
      [userId],
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { name, email, password } = req.body;

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // Prepare the update query
    const updates: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (name) {
      updates.push(`name = $${index++}`);
      values.push(name);
    }

    if (email) {
      updates.push(`email = $${index++}`);
      values.push(email);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push(`password = $${index++}`);
      values.push(hashedPassword);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No updates provided" });
    }

    values.push(userId);

    const query = `UPDATE users SET ${updates.join(", ")} WHERE id = $${index} RETURNING id, name, email`;
    const result = await pool.query(query, values);
    const updatedUser = result.rows[0];

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a user
export const deleteUser = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [userId],
    );
    const deletedUser = result.rows[0];

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(204).send(); // No content to send in the response
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  try {
    // Check if the email is already taken
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "Email is already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword],
    );

    const newUser = result.rows[0];
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);

    // Store refreshToken in the database (or use another strategy)
    await pool.query("UPDATE users SET refreshToken = $1 WHERE id = $2", [
      refreshToken,
      user.id,
    ]);

    const { password: _, ...userWithoutPassword } = user;
    res
      .status(200)
      .json({ accessToken, refreshToken, user: userWithoutPassword });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      async (err: any, user: any) => {
        if (err) {
          return res.status(403).json({ error: "Invalid refresh token" });
        }

        // Find the user by ID and check if the refresh token matches
        const userResult = await pool.query(
          "SELECT * FROM users WHERE id = $1 AND refreshToken = $2",
          [user.id, refreshToken],
        );
        const foundUser = userResult.rows[0];

        if (!foundUser) {
          return res.status(403).json({ error: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken(
          foundUser.id,
          foundUser.email,
        );
        const newRefreshToken = generateRefreshToken(foundUser.id);

        // Update the refresh token in the database
        await pool.query("UPDATE users SET refreshToken = $1 WHERE id = $2", [
          newRefreshToken,
          foundUser.id,
        ]);

        res
          .status(200)
          .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
      },
    );
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
