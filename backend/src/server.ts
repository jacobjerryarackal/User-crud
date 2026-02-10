import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "User CRUD backend 🚀" });
});

app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 User CRUD backend listening at http://localhost:${PORT}`);
});
