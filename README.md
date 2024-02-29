# JOB APPLICATIONS ( CRUD back end takehome challenge )


## TSHERING GURUNG


### Instructions to Run the Server Locally

1. Clone the repository.
2. Install dependencies by running -- npm install
3. Start the server by running -- npm start
4. The server should now be running locally. You can access it at `http://localhost:3003` and check the health status.

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


## Markdown Table

| Comment                      | How i fixed it               | How i tested it                                     |
|------------------------------|------------------------------|-----------------------------------------------------|
|"if the application doesnt    | -changed middleware          | 1. request GET/applications/300
|  exist, return a 404, not    |   idExist status from 400 to | 2. expect to recive 404 with the 
|  a 400."                     |   404.                       |    error message "id param 300 does not exist"      |
|                              |                              | 3.request PUT/applications/300
|                              |                              | 4.expect same result.
|                              |                              | 5.request DELETE/applications/300
|                              |                              | 6.expect same result.
|                              |                              |  
|                              |                              | 
| "The dotenv package config() | -dotenv package installed and| 1.run npm start.
|   method should be used to   |  required dotenv config in   | 2.reads from config.env file and runs on port 3003
|   read any enviroment        |  server.js                   | 3.if port not avialabe then runs on default 9000
|   variables fromt the .env   |                              |
|   file."                     |                              |
|                              |                              |
|"The put route should check   | -added validation idExist on | 1.request PUT/applications/300
|  that the application exist  | POST controller.             | 2.expect to recive 404 with the 
|  before trying to update it."|                              |   error message "id param 300 does not exist"
|                              |                              |
|                              |                              |
|"The update route doesnt have | -added validation validId on | 1.request PUT/applications/abc
|   validate id param."        | POST controller.             | 2.expect to recive 400 with the 
|                              |                              |   "id param abc must be positive integer"
|                              |                              |
|                              |                              |
|"The url field is not required| -took out the url field from | 1.request POST/application
|   but if not present, url:   |  applications_field array.   | 2.when url is not prestent
|   null should be added to the|  In POST controller added    | 3.expect url with null value
|   application.The current    |  if url is not present it    | 4.when status is "letsgo"
|   code returns 400 if url    |  should be null.             | 5.expect to recive 400 with the error
|   is not present and that    |  Imported applicationstatus  |  message "Invalid status: letsgo.
|   doesnt match the requirment|  from constants.js and added |  Status must be one of the
|   Also,the application should|  validStatus middleware to   |  following: CREATED, APPLIED,
|   validate that status field |  allow status field to only  |  REJECTED, PHONE_SCREEN, ON_SITE,
|   is one of allowed strings  |  have string from application| RECEIVED_OFFER, OFFER_ACCEPTED,
|   in constants.js."          |  status which is added in    | OFFER_DECLINED"
|                              |  POST controller.            |
|                              |                              |  
|                              |                              |
|"Install dependencies using   | -changed readme instruction  | 1.npm install
|   npm and Start the server   |  with specific command.      | 2.npm start
|   should give the specific   |   "npm install" and          |
|   command to run."           |   "npm start"                |                                     |


