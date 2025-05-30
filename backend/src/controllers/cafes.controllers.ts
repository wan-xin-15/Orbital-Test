import { Request, Response } from "express";
import cafeModel from "../models/cafes.model";

class CafeController {
  async createCafe(req: Request, res: Response) {
    try {
      const { cafeName, cafeLocation } = req.body;
      const cafe = await cafeModel.createCafe(cafeName, cafeLocation);
      if (!cafeName || !cafeLocation) {
        res.status(404).json({ error: "Name and location required" });
      } else {
        res.json(cafe);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllCafes(req: Request, res: Response) {
    try {
      const cafes = await cafeModel.getAllCafes();
      res.json(cafes);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getCafeById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const cafe = await cafeModel.getCafeById(id);

      if (cafe) {
        res.json(cafe);
      } else {
        res.status(404).json({ error: "Cafe not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateCafeById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { cafeName, cafeLocation } = req.body;
      const cafe = await cafeModel.updateCafeById(id, cafeName, cafeLocation);

      if (cafe) {
        res.json(cafe);
      } else {
        res.status(404).json({ error: "Cafe not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteCafeById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const cafe = await cafeModel.deleteCafeById(id);

      if (cafe) {
        res.json(cafe);
      } else {
        res.status(404).json({ error: "Cafe not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // TODO UPDATE U,D
}

export default new CafeController();
