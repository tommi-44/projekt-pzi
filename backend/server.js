const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

// Middleware za JSON podatke i CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Povezivanje s MySQL bazom podataka
const connection = mysql.createConnection({
    host: 'student.veleri.hr',
    user: 'tmihelic',
    password: '11',
    database: 'tmihelic'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
});

// --- API za tablicu PROIZVOD ---

// Dohvat svih proizvoda
app.get("/api/proizvodi", (req, res) => {
    connection.query("SELECT * FROM PROIZVOD", (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Dohvat proizvoda prema ID-u
app.get("/api/proizvodi/:id", (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM PROIZVOD WHERE id = ?", [id], (err, results) => {
        if (err) throw err;
        res.send(results[0] || {});
    });
});

// Unos novog proizvoda
app.post("/api/unos_proizvoda", (req, res) => {
    const { proizvod, materijal, dimenzije, kolicina_na_skladistu, cijena, prodavac } = req.body;

    const query = "INSERT INTO PROIZVOD (proizvod, materijal, dimenzije, kolicina_na_skladistu, cijena, prodavac) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(query, [proizvod, materijal, dimenzije, kolicina_na_skladistu, cijena, prodavac], (err, results) => {
        if (err) throw err;
        res.send({ message: "Proizvod uspješno dodan!", id: results.insertId });
    });
});

// --- API za tablicu KUPOVINE ---

// Dohvat svih kupovina
app.get("/api/kupovine", (req, res) => {
    connection.query("SELECT * FROM KUPOVINE", (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Dohvat kupovine prema ID-u
app.get("/api/kupovine/:id", (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM KUPOVINE WHERE id = ?", [id], (err, results) => {
        if (err) throw err;
        res.send(results[0] || {});
    });
});

// Unos nove kupovine (s automatskim izračunom ukupne cijene) - zato imamo select
app.post("/api/unos_kupovine", (req, res) => {
    const { kupac_i_p, datum, kolicina_kupovine, proizvod_id } = req.body;

    // Dohvati cijenu proizvoda
    connection.query("SELECT cijena FROM PROIZVOD WHERE id = ?", [proizvod_id], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(404).send({ message: "Proizvod s navedenim ID-em ne postoji!" });
        }

        const cijena_proizvoda = results[0].cijena;
        const ukupna_cijena = cijena_proizvoda * kolicina_kupovine;

        // Unos kupovine u bazu
        const query = "INSERT INTO KUPOVINE (kupac_i_p, datum, kolicina_kupovine, ukupna_cijena, proizvod_id) VALUES (?, ?, ?, ?, ?)";
        connection.query(query, [kupac_i_p, datum, kolicina_kupovine, ukupna_cijena, proizvod_id], (err, results) => {
            if (err) throw err;
            res.send({ message: "Kupovina uspješno dodana!", id: results.insertId });
        });
    });
});
app.listen(3000, () => {
console.log("Server running on port 3000");
});