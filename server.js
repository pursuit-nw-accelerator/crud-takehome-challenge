require("dotenv").config();

const app = require("./app");

// TODO: Read the port from environment variables, or use 9000 as a default
// const PORT = 9000;
// Other requirements 7
const PORT = process.env.PORT || 9000;

//  'console.log' is executed as soon as this line is read, not after the server successfully starts
// app.listen(PORT, console.log(`Listening on port ${PORT}...`));

// uses an arrow function as a callback that executes after the server successfully starts listening on the specified port.
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
