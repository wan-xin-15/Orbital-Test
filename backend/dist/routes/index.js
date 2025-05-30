"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cafes_routes_1 = __importDefault(require("./cafes.routes"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Welcome to the homepage!");
});
router.use("/cafes", cafes_routes_1.default);
exports.default = router;
