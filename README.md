# Job Applications API

## Author
Shanice Griffin

## Application Server Planner
[Build Planner](https://docs.google.com/document/d/1RSi6CsP2KtM92TpO-kkbwVgXWlqXF-riq329UCuxgJU/edit?usp=sharing)

## Overview
This project provides an API for managing job applications. It allows users to create, read, update, and delete job applications.

## Installation and Setup
Follow these steps to run the server locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-applications-api.git
   cd job-applications-api
2. **Install dependencies**
    ```bash
    npm install
3. **Start the server**
    ```bash
    npm start
## API Methods and Routes

### Health Check
- GET /
    - Description: Check if the service is running.
    - Response: `{ "data": "Service is running" }`
    
### Applications
- GET /applications
    - Description: Retrieve all job applications.
    - Response: A list of all job applications.
- GET /applications/:id
    - Description: Retrieve a job application by its ID.
    - Parameters:
        - `id` (Number) - ID of the job application.
    - Response: The job application with the specified ID.
- POST /applications
    - Description: Create a new job application.
    - Request Body:
         ```json
        {
        "company": "Company Name",
        "status": "Application Status"
        }
        ```
    - Response: The newly created job application.
- PUT /applications/:id
    - Description: Update an existing job application.
    - Parameters:
        - `id` (Number) - ID of the job application.
    - Request Body:
         ```json
        {
        "company": "Updated Company Name",
        "status": "Updated Application Status"
        }
        ```
    - Response: The updated job application.
- DELETE /applications/:id
    - Description: Delete a job application by its ID.
    - Parameters:
        - `id` (Number) - ID of the job application.
    - Response: The deleted job application.

## Example Usage with Postman
1. Retrieve all applications:
    - Method: `GET`
    - URL: `http://localhost:8080/applications`

2. Retrieve an application by ID:
    - Method: `GET`
    - URL: `http://localhost:8080/applications/1`

3. Create a new application:
    - Method: `POST`
    - URL: `http://localhost:8080/applications`
    - Body:
        ```json
        {
        "company": "CodeTrack",
        "status": "CREATED"
        }
        ```

4. Update an existing application by ID
    - Method: `PUT`
    - URL: `http://localhost:8080/applications/1`
    - Body:
     ```json
     {
       "company": "Updated Company Name",
       "status": "UPDATED"
     }
     ```

5. Delete an exitsing application by ID
    - Method: `DELETE`
    - URL: `http://localhost:8080/applications/1`