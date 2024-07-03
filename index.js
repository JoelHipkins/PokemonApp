const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const viewRouter = require('./routes/client/viewRouter')
const pokemonRouter = require('./routes/api/pokemonRouter')
const trainerRouter = require('./routes/api/trainerRouter')
const connectToDatabase = require('./database/mongodb')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// set CSS/images/any static asset folder
app.use(express.static(path.join(__dirname, 'public')))
// set what engine to use for res.render
app.set('view engine', 'ejs')
// set where those res.rendered files live
app.set('views', path.join(__dirname, 'views'))
// add non-GET/POST HTTP methods to HTML forms
app.use(methodOverride('_method'))

app.use('/', viewRouter);
app.use('/api/pokemon', pokemonRouter);
app.use('/api/trainers', trainerRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
    connectToDatabase();
});