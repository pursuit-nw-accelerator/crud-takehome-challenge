# SARAI'S JOB APPLICATION THEMED CRUD TAKEHOME CHALLENGE

### Completed By Sarai Thomas

Imagine you are a software engineer applying for your first job. Here is a backend database so you can keep track of the jobs you apply for and their current status.

## <a id="instructions-to-run-server-locally"></a>Instructions to Run the Server Locally
1. Clone the repository.
1. Install dependencies with `npm install`.
1. Start the server by running `nodemon server.js` or `npm start` in your terminal.
1. Commit and push your code as you go, ideally one commit per user story or requirement.
1. Check for the `{"data":"Hello World"}` success message at `http://localhost:9000` or your desired env port value.


## <a id="methods-routes"></a>Methods & Routes
1. **GET (ALL) /applications**
    - Gets all applications stored in the json database
2. **GET (ONE) /applications/:id**
    - Gets one application from the database based on the specified Id in the req.paramater
3. **POST applications**
    - Creates a new application and adds it to the json body of applications
4. **PUT /applications/:id**
    - Updates an existing application
5. **DELETE /applications/:id**
    - Deletes an existing application
