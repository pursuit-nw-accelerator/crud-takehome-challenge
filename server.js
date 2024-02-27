const app = require('./app');

//dotenv config()
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

// TODO: Read the port from environment variables,
// or use 9000 as a default
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
