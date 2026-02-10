import { Router, Request, Response, NextFunction } from "express";
import { UsersController } from "../controllers/users.controller";

const router = Router();
const controller = new UsersController();


router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);


router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: err.message || "Internal server error",
    success: false,
  });
});

export default router;
