"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cafes_model_1 = __importDefault(require("../models/cafes.model"));
class CafeController {
    createCafe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cafeName, cafeLocation } = req.body;
                const cafe = yield cafes_model_1.default.createCafe(cafeName, cafeLocation);
                if (!cafeName || !cafeLocation) {
                    res.status(404).json({ error: "Name and location required" });
                }
                else {
                    res.json(cafe);
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getAllCafes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cafes = yield cafes_model_1.default.getAllCafes();
                res.json(cafes);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getCafeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const cafe = yield cafes_model_1.default.getCafeById(id);
                if (cafe) {
                    res.json(cafe);
                }
                else {
                    res.status(404).json({ error: "Cafe not found" });
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    updateCafeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { cafeName, cafeLocation } = req.body;
                const cafe = yield cafes_model_1.default.updateCafeById(id, cafeName, cafeLocation);
                if (cafe) {
                    res.json(cafe);
                }
                else {
                    res.status(404).json({ error: "Cafe not found" });
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    deleteCafeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const cafe = yield cafes_model_1.default.deleteCafeById(id);
                if (cafe) {
                    res.json(cafe);
                }
                else {
                    res.status(404).json({ error: "Cafe not found" });
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new CafeController();
