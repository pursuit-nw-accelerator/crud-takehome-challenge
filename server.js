const app = require('./app');

// TODO: Read the port from environment variables,
// or use 9000 as a default
// https://medium.com/@akhilanand.ak01/simplify-your-node-js-configuration-with-dotenv-env-ee371ad6bf9a
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
