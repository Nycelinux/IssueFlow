import type { Request, Response } from "express";
import * as authService from "../services/authServices.js";

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }
    const result = await authService.login(username, password);
    if (!result) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed",
    });
  }
}
