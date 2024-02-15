const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const carRoutes = require('./routes/carsRoutes');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', carRoutes);

app.use((_, res) => res.status(400).send({ message: 'Not Found!' }));

app.listen(config.port, () => {
  console.log('listening on port ' + config.port);
});
