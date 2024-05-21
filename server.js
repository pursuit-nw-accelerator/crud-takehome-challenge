const app = require('./app');
require('dotenv').config();

//default PORT is 9000
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
