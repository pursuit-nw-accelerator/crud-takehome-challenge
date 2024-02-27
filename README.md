# CRUD back end takehome challenge

## Hector/ Qi Zhong

## instructions

- clone the repo to local
- npm i
- node server.js

# Job Application API Routes

## Base URL

All URLs referenced in the documentation have the base path `/v1/jobApplications`.

## Endpoints

### 1. Get All Job Applications

- **Method:** GET
- **Path:** `/v1/jobApplications`
- **Description:** Retrieves all job applications.

### 2. Get Job Application by ID

- **Method:** GET
- **Path:** `/v1/jobApplications/:id`
- **Description:** Retrieves a single job application by its unique ID.
- **Parameters:**
  - `id` (path) - The unique identifier of the job application.

### 3. Create Job Application

- **Method:** POST
- **Path:** `/v1/jobApplications`
- **Description:** Creates a new job application with the data provided in the request body.
- **Request Body:** JSON object containing the data for the new job application.

### 4. Update Job Application

- **Method:** PATCH
- **Path:** `/v1/jobApplications/:id`
- **Description:** Updates an existing job application identified by its ID with the data provided in the request body.
- **Parameters:**
  - `id` (path) - The unique identifier of the job application to update.
- **Request Body:** JSON object containing the updated data for the job application.

### 5. Delete Job Application

- **Method:** DELETE
- **Path:** `/v1/jobApplications/:id`
- **Description:** Deletes a job application by its ID.
- **Parameters:**
  - `id` (path) - The unique identifier of the job application to delete.

### 6. Delete Job Application

- **Method:** GET
- **Path:** `/`
- **Description:** Health check endpoint.
