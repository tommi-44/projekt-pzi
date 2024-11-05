//Kreirati vlastitte GET, POST, UPDATE, DELETE API-je za rad s objektom unutar vlastitog projekta

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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
console.log(data.naslov);
console.log(data.autor);
console.log(data.g_izdanja);
console.log(data.izdavac);
    return response.send("Dodavanje knjige: "+naslov+ " "+autor+" "+g_izdanja+" "+izdavac);
});

app.put('/updateknjige', (request, response) => {
    return response.send('Ažuriranje knjiga');
});

app.delete('/deleteknjige', (request, response) => {
    return response.send('Brisanje knjiga');
});


app.listen(3001, () => {
    console.log("Server running on port 3001");
});