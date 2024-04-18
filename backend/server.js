const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true 
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body; 
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)"; 
    const values = [name, email, password]; 
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error occurred during signup:", err);
            return res.status(500).json({ error: "An error occurred during signup." });
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, data) => {
        if (err) {
            console.error("Error occurred during login:", err);
            return res.status(500).json({ error: "An error occurred during login." });
        }
        if (data.length > 0) {
            return res.json({ Login:true,user:data[0]});
        }
         else {
            return res.status(401).json({ Login:false });
        }
    });
});


app.listen(8081, () => {
    console.log("listening");
});
