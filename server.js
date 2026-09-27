const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("."));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/submit-survey", (req, res) => {
    console.log(req.body);
    res.send("Survey submitted successfully!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});