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

pool.query(`
    CREATE TABLE IF NOT EXISTS surveys (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        age INTEGER,
        occupation VARCHAR(50),
        school_computers VARCHAR(50),
        internet_access VARCHAR(50),
        home_device VARCHAR(50),
        e_learning VARCHAR(50),
        diksha_swayam VARCHAR(50),
        content_preference VARCHAR(100),
        e_learning_challenge VARCHAR(100),
        teacher_technology VARCHAR(100),
        digital_material VARCHAR(50),
        subject_need VARCHAR(50),
        language_preference VARCHAR(50),
        video_duration VARCHAR(50),
        overall_usefulness VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`).then(() => {
    console.log("Survey table is ready");
}).catch((error) => {
    console.error("Database error:", error);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/submit-survey", async (req, res) => {
    try {
        const {
            name,
            age,
            occupation,
            school_computers,
            internet_access,
            home_device,
            e_learning,
            diksha_swayam,
            content_preference,
            e_learning_challenge,
            teacher_technology,
            digital_material,
            subject_need,
            language_preference,
            video_duration,
            overall_usefulness
        } = req.body;

        await pool.query(
            `INSERT INTO surveys (
                name, age, occupation, school_computers,
                internet_access, home_device, e_learning,
                diksha_swayam, content_preference,
                e_learning_challenge, teacher_technology,
                digital_material, subject_need,
                language_preference, video_duration,
                overall_usefulness
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8,
                    $9, $10, $11, $12, $13, $14, $15, $16)`,
            [
                name,
                age,
                occupation,
                school_computers,
                internet_access,
                home_device,
                e_learning,
                diksha_swayam,
                content_preference,
                e_learning_challenge,
                teacher_technology,
                digital_material,
                subject_need,
                language_preference,
                video_duration,
                overall_usefulness
            ]
        );

        res.send("Survey submitted successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to save survey.");
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});

