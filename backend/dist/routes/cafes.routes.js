"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cafes_controllers_1 = __importDefault(require("../controllers/cafes.controllers"));
const router = (0, express_1.Router)();
router.get("/", cafes_controllers_1.default.getAllCafes);
router.get("/:id", cafes_controllers_1.default.getCafeById);
router.post("/", cafes_controllers_1.default.createCafe);
router.put("/:id", cafes_controllers_1.default.updateCafeById);
router.delete("/:id", cafes_controllers_1.default.deleteCafeById);
exports.default = router;
