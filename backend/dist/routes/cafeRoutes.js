"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "backend/.env" });
const app = (0, express_1.Router)();
var pool = mysql_1.default.createPool({
    host: "localhost",
    user: "root",
    password: "M07030128j@@",
    database: "CafeChronicles",
    connectionLimit: 10,
    multipleStatements: true,
});
// READ ONE
app.get("/:id", (req, res) => {
    pool.getConnection(function (err, conn) {
        console.log("The id: " + req.params.id);
        try {
            // if there is a connection
            const cafe = conn.query("SELECT * FROM cafes WHERE id = ?", [
                req.params.id,
            ]);
            console.log(cafe);
            // CLOSE THE CONNECTION
            conn.release();
        }
        catch (err) {
            console.log(err);
        }
    });
    res.send({
        message: "Café found",
        id: req.params.id,
        name: req.params.name,
    });
});
// READ ALL
app.get("/:id", (req, res) => {
    pool.getConnection(function (err, conn) {
        console.log("The id: " + req.params.id);
        try {
            // if there is a connection
            conn.query("SELECT * FROM cafes");
            // CLOSE THE CONNECTION
            conn.release();
        }
        catch (err) {
            console.log(err);
        }
    });
    res.send({
        message: "Café found",
        id: req.params.id,
        name: req.params.name,
    });
});
// CREATE
// data is what i update with, params is what i take in to know what to update
// req.body can be read from POSTMAN BODY instead of raw
app.post("/:id", (req, res) => {
    var pool = mysql_1.default.createPool({
        host: "localhost",
        user: "root",
        password: "M07030128j@@",
        database: "CafeChronicles",
        connectionLimit: 10,
        multipleStatements: true,
    });
    pool.getConnection(function (err, conn) {
        console.log("The id: " + req.params.id);
        try {
            // if there is a connection
            const { name, location } = req.body;
            conn.query("INSERT INTO cafes (name, location) VALUES (?,?) WHERE id = ?", [name, location, req.params.id]);
            conn.release();
        }
        catch (err) {
            console.log(err);
        }
    });
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name,
        },
    });
});
