import { Response } from "express";
import pool from "@utils/database";
import { AuthRequest } from "@/middlewares/authMiddleware";
import { Task, TaskStatus } from "@/model/task";

export const createTask = async (req: AuthRequest, res: Response) => {
  const {
    title,
    description = null,
    status = TaskStatus.ToDo,
  }: { title: string; description: string; status: TaskStatus } = req.body;
  const userId = req.user.id; // Extracted from the authenticated user

  try {
    const result = await pool.query<Task>(
      "INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, status, userId],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error });
  }
};

interface Meta {
  total: number;
  size: number;
  count: number;
  page: number;
  lastPage: number;
  from: number;
  to: number;
  query: string;
  sortBy: string;
  sortDirection: "ASC" | "DESC";
}
interface PaginatedTasks {
  items: Task[];
  meta: Meta;
}
export const getTasks = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page as string) || 1;
  const size = parseInt(req.query.size as string) || 20;
  const query = (req.query.query as string) || "";
  const sortBy = (req.query.sortBy as string) || "id";
  const status = req.query.status as TaskStatus | undefined;
  const sortDirection = (req.query.sortDirection as "ASC" | "DESC") || "ASC";

  const validSortBy = ["id", "title", "status"].includes(sortBy)
    ? sortBy
    : "id";
  const validSortDirection = ["ASC", "DESC"].includes(sortDirection)
    ? sortDirection
    : "ASC";

  const offset = (page - 1) * size;

  try {
    const countQuery = `
            SELECT COUNT(*) as count
            FROM tasks
            WHERE user_id = $1
              AND (title ILIKE $2 OR description ILIKE $2)
              AND ($3::task_status IS NULL OR status = $3)
        `;
    const countParams = [userId, `%${query}%`, status || null];
    const totalResult = await pool.query<{ count: number }>(
      countQuery,
      countParams,
    );
    const total = totalResult.rows[0].count || 10;

    const tasksQuery = `
            SELECT * FROM tasks
            WHERE user_id = $1
              AND (title ILIKE $2 OR description ILIKE $2)
              AND ($3::task_status IS NULL OR status = $3)
            ORDER BY ${validSortBy} ${validSortDirection}
            LIMIT $4 OFFSET $5
        `;
    const tasksParams = [userId, `%${query}%`, status || null, size, offset];
    const tasksResult = await pool.query<Task>(tasksQuery, tasksParams);
    const tasks = tasksResult.rows;

    const count = tasks.length;
    const lastPage = Math.ceil(total / size);
    const from = offset + 1;
    const to = offset + count;

    const meta: Meta = {
      total,
      size,
      count,
      page,
      lastPage,
      from,
      to,
      query,
      sortBy: validSortBy,
      sortDirection: validSortDirection,
    };

    const response: PaginatedTasks = {
      items: tasks,
      meta,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tasks", error });
  }
};

// Read a specific task by ID
export const getTaskById = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const taskId = parseInt(req.params.id);

  try {
    const result = await pool.query<Task>(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [taskId, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve task", error });
  }
};

// Update a specific task by ID
export const updateTask = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const taskId = parseInt(req.params.id);

  try {
    const taskFound = await pool.query<Task>(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2 LIMIT 1",
      [taskId, userId],
    );
    if (taskFound.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    const args = {
      ...{ ...taskFound.rows[0] },
      ...req.body,
    };

    const result = await pool.query<Task>(
      "UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [args.title, args.description, args.status, taskId, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const taskId = parseInt(req.params.id);

  try {
    const result = await pool.query<Task>(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [taskId, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};
