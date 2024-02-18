# JOB APPLICATIONS ( CRUD back end takehome challenge )


## TSHERING GURUNG


### Instructions to Run the Server Locally

1. Clone the repository.
2. Install dependencies using npm.
3. Start the server.
4. The server should now be running locally. You can access it at `http://localhost:9000` and check the health status.

### API Routes

- **GET /applications**
- Description: Get all job applications.
- **GET /applications/:id**
- Description: Get a specific job application by its ID.
- **POST /applications**
- Description: Create a new job application.
- **PUT /applications/:id**
- Description: Update an existing job application.
- **DELETE /applications/:id**
- Description: Delete an existing job application.

### API Methodo

1. **GET /applications**
- Retrieves all job applications stored in the database.
- Returns a JSON response with a status code of 200 if successful.
- Returns a JSON response with an error message and a status code of 500 if an error occurs.

2. **GET /applications/:id**
- Retrieves a specific job application by its ID.
- Validates the ID parameter to ensure it is a positive integer.
- Checks if the application with the specified ID exists.
- Returns a JSON response with the application data and a status code of 200 if successful.
- Returns a JSON response with an error message and a status code of 500 if an error occurs.

3. **POST /applications**
- Creates a new job application based on the provided data in the request body.
- Validates the input fields to ensure correct data type is filled, missing or empty.
- Returns a JSON response with the newly created application data and a status code of 201   if successful.
- Returns a JSON response with an error message and a status code of 500 if an error occurs.

4. **PUT /applications/:id**
- Updates an existing job application with the provided data in the request body.
- Validates the ID parameter and input fields with right data type, if it is empty or missing.
- Returns a JSON response with the updated application data and a status code of 200 if successful.
- Returns a JSON response with an error message and a status code of 500 if an error occurs.

5. **DELETE /applications/:id**
- Deletes an existing job application by its ID.
- Validates the ID parameter to ensure it is a positive integer.
- Checks if the application with the specified ID exists.
- Returns a JSON response with the deleted application data and a status code of 200 if successful.
- Returns a JSON response with an error message and a status code of 500 if an error occurs.

### Notes

- The server listens on the port specified by the `PORT` environment variable. If not specified, it defaults to port 9000.
- CORS errors in the Google Chrome web browser are prevented.
- The application is organized into controller, query, and middleware layers.
- Error handling is implemented for various scenarios, including invalid data tupe input, missing data, extra field other than what is required and server errors.
