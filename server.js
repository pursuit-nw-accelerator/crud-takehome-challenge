const app = require('./app');

// TODO: Read the port from environment variables,
// or use 9000 as a default
require("dotenv").config()
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
