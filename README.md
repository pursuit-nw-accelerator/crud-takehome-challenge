# First Takehome Challenge

## Developed by Sabri Mohiuddin

### How to Run the Server Locally

1. **Clone the Repository**:
   git clone <https://github.com/sabrimohiuddin/crud-takehome-challenge>
2. **Navigate to the Project Directory**:
   cd <crud-takehome-challenge>
3. **Install Dependencies**:
   npm install
4. **Start the Server**:
   npm start

The server will start on `localhost:9000` by default, or on another port if you have specified it in your environment variables.

### API Routes and Methods

- **GET `/applications`**: Retrieve all job applications.
- **GET `/applications/:id`**: Retrieve a specific job application by its ID.
- **POST `/applications`**: Create a new job application.
- Requires a JSON body with `company`, `status`, and optionally, `url`.
- **PUT `/applications/:id`**: Update an existing job application by its ID.
- Requires a JSON body with the fields you wish to update.
- **DELETE `/applications/:id`**: Delete a job application by its ID.
- **GET `/health`**: Check the health of the API.
