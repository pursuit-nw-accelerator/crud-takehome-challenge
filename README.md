## Job Search API

This is a small Express API that allows users to search for jobs and update their job search status.

## Installation

### Clone the Repository

```bash
git clone https://github.com/DaveP80/takehome-challenge.git
```

### Install Dependencies

```bash
cd takehome-challenge
npm install
```

## Usage

### Start the Server

```bash
npm run start
```

By default, the server will run on port 9000. You can specify a different port by setting the `PORT` environment variable.

## Endpoints

### Get All Applications

Endpoint: `GET /applications/`

Description: Retrieve all job applications.

### Get Application by ID

Endpoint: `GET /applications/:id`

Description: Retrieve a job application by its ID.

### Create Application

Endpoint: `POST /applications/`

Description: Create a new job application. required fields are status and company.
url should be a good string.

### Update Application

Endpoint: `PUT /applications/:id`

Description: Update a job application by its ID.

### Delete Application

Endpoint: `DELETE /applications/:id`

Description: Delete a job application by its ID.

Submission for David Paquette
