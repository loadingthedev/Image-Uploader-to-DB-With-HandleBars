const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('express-handlebars');
const routes = require('./server/router/router');

app.use(express.json());

//use statc folder
app.use(express.static(path.join(__dirname, 'public')));

//setting view engine
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: path.join(__dirname + '/views'),
    partialsDir: path.join(__dirname + '/views/partials'),
  })
);

//db connection
require('./server/database/db')();

//routes
app.use('/', routes);

app.listen(port, () => console.log(`server is listing on ${port}`));
