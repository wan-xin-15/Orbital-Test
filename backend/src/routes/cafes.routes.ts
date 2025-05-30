import { Router } from "express";
import cafeController from "../controllers/cafes.controllers";

const router = Router();

router.get("/", cafeController.getAllCafes);
router.get("/:id", cafeController.getCafeById);
router.post("/", cafeController.createCafe);
router.put("/:id", cafeController.updateCafeById);
router.delete("/:id", cafeController.deleteCafeById);

export default router;
