import { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";
import { createUserSchema, updateUserSchema } from "../requests/user.requests";
import { User } from "../types/users.types";
import { UserMemoryRepository } from "../repositories/user.repository";

export class UsersController {
  private repo = new UserMemoryRepository();

  // GET /api/users
  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.repo.findAll();
      res.json({ data, success: true });
    } catch (err) {
      next(err);
    }
  };

  // GET /api/users/:id
  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = this.repo.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found", success: false });
      }
      res.json({ data: user, success: true });
    } catch (err) {
      next(err);
    }
  };

  // POST /api/users
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value: input } = createUserSchema.validate(
        req.body,
        { abortEarly: false }
      );
      if (error) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.details.map(d => d.message),
          success: false,
        });
      }

      
      if (this.repo.findByEmail(input.email)) {
        return res.status(400).json({
          error: "Email already exists",
          success: false,
        });
      }

      const newUser: User = {
        id: randomUUID(),
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.repo.create(newUser);

      res.status(201).json({ data: newUser, success: true });
    } catch (err) {
      next(err);
    }
  };

  // PUT /api/users/:id
  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      
      const { error, value: updates } = updateUserSchema.validate(
        req.body,
        { abortEarly: false }
      );
      if (error) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.details.map(d => d.message),
          success: false,
        });
      }

      const user = this.repo.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found", success: false });
      }

      
      if (updates.email && updates.email !== user.email) {
        if (this.repo.findByEmail(updates.email)) {
          return res.status(400).json({
            error: "Email already exists",
            success: false,
          });
        }
      }

      const updated = this.repo.update(id, updates);
      res.json({ data: updated, success: true });
    } catch (err) {
      next(err);
    }
  };

  // DELETE /api/users/:id
  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleted = this.repo.deleteById(id);

      if (!deleted) {
        return res.status(404).json({ error: "User not found", success: false });
      }

      res.status(204).send(); // 204 No Content
    } catch (err) {
      next(err);
    }
  };
}

