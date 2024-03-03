# CRUD Back End Server

## Cristian Valle


### Getting started

1. **Clone the Repository**: Use the following command to clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. **Install Dependencies**: Run this command to install dependencies:
    ```bash
    npm install
   ```

3. **Start**: Start the server using:
    ```bash
    npm start
   ```

Visit [http://localhost:9000](http://localhost:9000) to access the server.

**Note:** The default port is set to `9000`.


### Routes / Methods

- **GET** - `/`: Health check - ensures the server is running.
    - **Response:** Returns a status of 200 OK if the server is running.
- **GET** - `/jobs`: Retrieves all job applications in the database.
    - **Response:** Returns a JSON array containing details of all job applications.
- **GET** - `/jobs/:id`: Retrieves a job application by its ID.
    - **Response:** Returns the details of the requested job application if found.
- **POST** - `/jobs`: Creates a new job application.
    - **Request Body:** Expects a JSON payload with details of the new job application.
    - **Response:** Returns the created job application.
- **DELETE** - `/jobs/:id`: Deletes a job application by its ID.
    - **Response:** Returns a status of 200 OK if the deletion is successful.
- **PUT** - `/jobs/:id`: Updates a job application by its ID.
    - **Response:** Returns the updated job application.
