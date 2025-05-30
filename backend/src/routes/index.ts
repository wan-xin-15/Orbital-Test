import { Router } from "express";
import cafeRoutes from "./cafes.routes";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

router.use("/cafes", cafeRoutes);

export default router;
