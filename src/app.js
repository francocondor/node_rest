const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');



// settings
app.set('port', process.env.PORT || 3000);

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes (Rutas del servidor)
require('./routes/userRoutes')(app);

// static files (pendiente)

app.listen(app.get('port'), () => {
    console.log('server on port',app.get('port'));
});