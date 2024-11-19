//Kreirati vlastitte GET, POST, UPDATE, DELETE API-je za rad s objektom unutar vlastitog projekta

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Privremene baze podataka
let casopisi = []; // Skladišti časopise
let primjerci = []; // Skladišti primjerke

app.get('/getknjiga', (request, response) => {
    return response.send('Popis knjiga');
});

app.post('/addknjiga', (request, response) => {
//naslov, autor, g_izdanja, izdaavc
const data = request.body;
const naslov = data.naslov;
const autor = data.autor;
const g_izdanja = data.g_izdanja;
const izdavac = data.izdavac;
    return response.send("Dodavanje knjige: "+naslov+ " "+autor+" "+g_izdanja+" "+izdavac);
});

app.put('/updateknjige', (request, response) => {
    return response.send('Ažuriranje knjiga');
});

app.delete('/deleteknjige', (request, response) => {
    return response.send('Brisanje knjiga');
});

// CRUD za časopise
// 1. GET - Dohvat svih časopisa
app.get('/casopisi', (req, res) => {
    res.json(casopisi);
});

// 2. POST - Dodavanje novog časopisa
app.post('/casopisi', (req, res) => {
    const { id, naziv, opis } = req.body;
    if (!id || !naziv || !opis) {
        return res.status(400).send("Svi podaci (id, naziv, opis) su obavezni.");
    }
    casopisi.push({ id, naziv, opis });
    res.send(`Časopis "${naziv}" je uspješno dodan.`);
});

// 3. PUT - Ažuriranje časopisa prema ID-u
app.put('/casopisi/:id', (req, res) => {
    const { id } = req.params;
    const { naziv, opis } = req.body;
    const casopis = casopisi.find(c => c.id == id);

    if (!casopis) {
        return res.status(404).send("Časopis nije pronađen.");
    }
    if (naziv) casopis.naziv = naziv;
    if (opis) casopis.opis = opis;

    res.send(`Časopis s ID-jem ${id} je ažuriran.`);
});

// 4. DELETE - Brisanje časopisa prema ID-u
app.delete('/casopisi/:id', (req, res) => {
    const { id } = req.params;
    casopisi = casopisi.filter(c => c.id != id);
    res.send(`Časopis s ID-jem ${id} je izbrisan.`);
});

// CRUD za primjerke
// 1. GET - Dohvat svih primjeraka
app.get('/primjerci', (req, res) => {
    res.json(primjerci);
});

// 2. POST - Dodavanje novog primjerka
app.post('/primjerci', (req, res) => {
    const { godina, broj, sadrzaj } = req.body;
    if (!godina || !broj || !sadrzaj) {
        return res.status(400).send("Svi podaci (godina, broj, sadržaj) su obavezni.");
    }
    primjerci.push({ godina, broj, sadrzaj });
    res.send(`Primjerak za godinu ${godina} i broj ${broj} je uspješno dodan.`);
});

// 3. PUT - Ažuriranje primjerka prema godini i broju
app.put('/primjerci', (req, res) => {
    const { godina, broj, sadrzaj } = req.body;
    const primjerak = primjerci.find(p => p.godina == godina && p.broj == broj);

    if (!primjerak) {
        return res.status(404).send("Primjerak nije pronađen.");
    }
    if (sadrzaj) primjerak.sadrzaj = sadrzaj;

    res.send(`Primjerak za godinu ${godina} i broj ${broj} je ažuriran.`);
});

// 4. DELETE - Brisanje primjerka prema godini i broju
app.delete('/primjerci', (req, res) => {
    const { godina, broj } = req.body;
    primjerci = primjerci.filter(p => !(p.godina == godina && p.broj == broj));
    res.send(`Primjerak za godinu ${godina} i broj ${broj} je izbrisan.`);
});

// Pokretanje serveraa
app.listen(3001, () => {
    console.log("Server running on port 3001");
});