import { Request, Response, NextFunction } from "express";

export function validateTicket(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { title, description, priority } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (!description || description.trim() === "") {
    return res.status(400).json({
      message: "Description is required",
    });
  }

  const priorities = ["Low", "Medium", "High"];
  if (!priorities.includes(priority)) {
    return res.status(400).json({
      message: "Invalid priority",
    });
  }
  next();
}
