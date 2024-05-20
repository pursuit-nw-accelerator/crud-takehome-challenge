# Alexander Tsiklidis' CRUD Takehome Challenge

## Author
Alexander Tsiklidis

## Instructions to Run the Server Locally
## Getting started
1. Fork this repo.
1. Clone your fork to your machine.
1. run `npm install` to install dependencies, and `npm start` to start the server.
1. Create a .env File: PORT=your_port_number In the root directory, create a .env file and add the previous line (if you want to specify a different port):
1. Verify the Server is Running: Open your browser or Postman and navigate to http://localhost:9000/. You should see:{ "data": "Service is running" }


## Planning

https://docs.google.com/document/d/14w_9r6Y_BLqK757berTYc_Jd0a_VrWwrP-_Eiyn-deI/edit#heading=h.2s3wo0ecfkb7 --> Link to Planning doc

## User Stories

As a client, I am able to:
1. Know if the API is up and running by visiting a health check route.
1. See all the job applications I have created.
1. See a specific job application, requested by its id.
1. Create a new job application.
1. Update / change an existing job application.
1. Delete an existing job application.

## Other requirements Completed
1. My API does not cause CORS errors in the Google Chrome web browser.
1. All routes return JSON with the correct status code.
1. Route names and methods follow proper REST conventions (`POST /applications`, not `POST /make_new_application`)
1. For a successful response, JSON's returned in this format: `{ "data": <data to be returned> }`
1. When there is an error, JSON's returned in this format : `{ "error": <the actual error message> }`
1. My application is organized into a controller layer, a query layer, and middleware.
1. When my server starts, it listens on a port specified by the `PORT` environment variable. If there is no environment variable, it should listen on port 9000 as a default.
1. My backend Catches all server errors and returns the appropriate status code. It Does not swallow any errors or error messages.
1. It Returns the correct error and status code when the application the client wants to read, update, or delete is not found.
1. When a route includes an `id` param, the backend validates that the id can be parsed as a positive integer. it Returns the correct status code and message if the id is not valid.
JSON's returned in this format

## API Routes
Health Check
GET /
Response: { "data": "Service is running" }
Status: 200

Job Applications
GET /applications
Response: { "data": <all applications> }
Status: 200

GET /applications/:id
Response: { "data": <application with specified id> } or { "error": "Application not found" }
Status: 200 or 404
POST /applications

Body: { "company": "company name", "status": "status", "url": "url (optional)" }
Response: { "data": <created application> }
Status: 201
PUT /applications/:id

Body: { "company": "company name", "status": "status", "url": "url (optional)" }
Response: { "data": <updated application> } or { "error": "Application not found" }
Status: 200 or 404
DELETE /applications/:id

Response: { "data": <deleted application> } or { "error": "Application not found" }
Status: 200 or 404