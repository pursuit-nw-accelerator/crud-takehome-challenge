# CRUD back end takehome challenge
# Mark Robertson

![Backend image](/assets/backend.png)

# **Installation**

1.  Clone the repository:   git clone <repository URL>
2.  Navigate to the crud-takehome-challenge: type 'cd crud-takehome-challenge' in the terminal
3.  Install the back-end dependencies:  type 'npm install' in the terminal
4.  Open the code editor by typing in the terminal 'code .'
5.  Create a .env file in the root directory and configure the following environment variables: <br>PORT=7777<br>
6.  Make sure to include in your .gitignore file:   
node_modules
.env
.DS_Store
7.  Start the back-end server:  type npm start in the terminal.
8.  Open localhost:7777 in web browser. 


# API Routes:

- **Get All Job Applications**
  - **Endpoint:** `/jobapplications`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all job applications.

- **Get a Specific Job Application**
  - **Endpoint:** `/jobapplications/:id`
  - **Method:** `GET`
  - **Description:** Retrieve details of a specific job application by providing its ID.

- **Create a New Job Application**
  - **Endpoint:** `/jobapplications`
  - **Method:** `POST`
  - **Description:** Submit a new job application.

- **Update an Existing Job Application**
  - **Endpoint:** `/jobapplications/:id`
  - **Method:** `PUT`
  - **Description:** Update or modify an existing job application identified by its ID.

- **Delete an Existing Job Application**
  - **Endpoint:** `/jobapplications/:id`
  - **Method:** `DELETE`
  - **Description:** Remove an existing job application based on its ID.
/n
/n

![Backend image](/assets/backend.png)
/n
/n































# CRUD back end takehome challenge

Imagine you are a software engineer applying for your first job. You are going to create a back end application so you can keep track of the jobs you apply for and their current status.

You should use only your own code. Do not use ChatGPT or generative AI, and do not copy code from anyone else. If you look up how to do something, cite the URL in a comment next to the code you use.

**I expect you to be able to explain clearly and correctly what every single line of code does in your submission.**

## Getting started
1. Fork this repo.
1. Clone your fork to your machine.
1. run `npm install` to install dependencies, and `npm start` to start the server.
1. Write code to implement the [user stories](#user-stories) and [other requirements](#other-requirements) below.
1. Commit and push your code as you go, ideally one commit per user story or requirement.

## Submitting
When you have completed ALL the [user stories](#user-stories) and [other requirements](#other-requirements) EXACTLY, push all your code to GitHub and open a PR against the upstream repo. (This should be a PR against the repo owned by the `pursuit-nw-accelerator` org, not a PR against your own repo.)

Do not submit until you are confident you have completed ALL the requirements EXACTLY.

Submissions must be posted as a PR by the deadline. Extensions will not be accepted.

## <a id="user-stories"></a> User stories
As a client, I should be able to:
1. Know if the API is up and running by visiting a health check route.
1. See all the job applications I have created.
1. See a specific job application, requested by its id.
1. Create a new job application.
1. Update / change an existing job application.
1. Delete an existing job application.

## <a id="other-requirements"></a> Other requirements
1. Your API should not cause CORS errors in the Google Chrome web browser.
1. All routes should return JSON with the correct status code.
1. Route names and methods follow proper REST conventions (`POST /applications`, not `POST /make_new_application`)
1. For a successful response, return JSON in this format: `{ "data": <data to be returned> }`
1. When there is an error, return JSON in this format: `{ "error": <the actual error message> }`
1. Your application should be organized into a controller layer, a query layer, and middleware.
1. When your server starts, it should listen on a port specified by the `PORT` environment variable. If there is no environment variable, it should listen on port 9000 as a default.
1. Catch all server errors and return the appropriate status code. Do not swallow any errors or error messages.
1. Return the correct error and status code if the application the client wants to read, update, or delete is not found.
1. When a route includes an `id` param, validate that the id can be parsed as a positive integer. Return the correct status code and message if the id is not valid.
1. When creating or updating an application, validate the client's input. Return the correct status code if it's not valid.
    - There must be a company and status
    - The status must be one of the statuses listed in `constants.js`
    - The url field is optional, but should have a `null` value if it isn't present.
    - No other fields should be present (including `id`, `createdAt`, `updatedAt`, `admin`, etc.)
1. Replace this README with a new README file. It must contain the following:
    - A title
    - Your name
    - Detailed, working step by step instructions on how to run the server locally
    - A complete list of methods + routes that your API supports (ex: `GET /students/:id, PUT /students/:id`) 

## How you'll be evaluated
In order to pass the interview, you must implement ALL of the user stories and other requirements EXACTLY, with no bugs or other problems.

Make sure you read this README and the [starter code](#starter-code) carefully. 

You will receive feedback and have one opportunity to correct any issues.

## <a id="starter-code"></a> Working with the starter code and data

Instead of using a real database, your API will read from a JSON object (see `/data/db/jobApplicationsData.json`). When your server starts, this data will be read into memory. Whenever you restart the server, any changes you made to the data will be lost.

You can see in this file that a job application has several properties: `id` (set automatically by the database), `company`, `url` (optional), and `status`. `createdAt` and `updatedAt` are automatically added when a job application is created or updated.

In the file `/queries/jobApplicationsQueries.js` there are already some methods that can create, read, update, or delete the applications in the JSON file. You should understand how these methods work, what they return, and how you'll use them in your code. You should not need to modify them at all.

Notice that the query methods are `async` functions, just like they would have to be if they queried an actual database. **Do not** change them to non-async functions.



