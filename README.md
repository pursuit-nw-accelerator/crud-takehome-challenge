# First Takehome Challenge

## Developed by Sabri Mohiuddin

### How to Run the Server Locally

1. **Clone the Repository**:
   `git clone https://github.com/sabrimohiuddin/crud-takehome-challenge`
2. **Navigate to the Project Directory**:
   `cd crud-takehome-challenge`
3. **Install Dependencies**:
   `npm install`
4. **Start the Server**:
   `npm start`

The server will start on `localhost:9000` by default, or on another port if you have specified it in your environment variables.

### API Routes and Methods

#### Job Applications

- **GET `/applications`**: Retrieve all job applications.
- **GET `/applications/:id`**: Retrieve a specific job application by its ID. Requires a valid integer ID.
- **POST `/applications`**: Create a new job application. Requires a JSON body with `company`, `status`, and `createdAt` fields. The `url` field is optional.
- **PUT `/applications/:id`**: Update an existing job application by its ID. Requires a valid integer ID and a JSON body with the fields you wish to update. The `url` field can be updated or omitted.
- **DELETE `/applications/:id`**: Delete a job application by its ID. Requires a valid integer ID. Returns the deleted job application record.

#### Health Check

- **GET `/health`**: Check the health of the API. Returns a message indicating that the API is up and running.

### Validation and Error Handling

- **Error Handling**: All API routes are equipped to handle server errors and invalid inputs, ensuring users are informed of issues with clear HTTP status codes and error messages.
- **Field Validation**: The `POST` and `PUT` routes verify that all necessary fields are included in the request body. Missing fields trigger a `400 Bad Request` response, detailing what is missing.
- **ID Validation**: Routes that operate on specific job applications ensure the ID is a positive integer. Incorrect IDs result in a `400 Bad Request` response.
- **Existence Check**: Before any update or deletion, the system verifies the existence of the targeted job application, returning a `404 Not Found` response if the application cannot be found.

### Technologies Used

- Node.js
- Express.js
- Middleware for validation and error handling
