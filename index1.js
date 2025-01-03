// Kreirati vlastite GET, POST, PUT, DELETE API-je za rad s objektom 
//unutar vlastitog projekta

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getKnjige', (request, response) => {
    return response.send('Popis knjiga');
});
app.post('/addKnjiga', (request, response) => {
    //naslov, autor, god_izdanja, izdavac
    const data = request.body;
    const naslov = data.naslov;
    const autor = data.autor;
    const god_izdanja = data.god_izdanja;
    const izdavac = data.izdavac;
    
    return response.send("Dodavanje knjige: "+naslov+" "+autor+
        " "+god_izdanja+" "+izdavac);
});
app.put('/updateKnjiga', (request, response) => {
    return response.send('Ažuriranje knjige');
});
app.delete('/deleteKnjiga', (request, response) => {
    return response.send('Brisanje knjige');
});
app.listen(3001, () => {
    console.log("Server running on port 3001");
});