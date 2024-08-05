
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    const now = new Date();
    const day = now.getDay(); 
    const hour = now.getHours(); 

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); 
    } else {
        res.status(403).send('Service is available only during working hours (Monday to Friday, 9 AM to 5 PM).');
    }
});


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
