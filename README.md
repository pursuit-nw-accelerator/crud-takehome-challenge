# CRUD back end takehome challenge
# Mark Robertson

![Backend image](/assets/backend.png)

# **Installation**

1.  Clone the repository:   git clone [<repository URL>](https://github.com/pursuit-nw-accelerator/crud-takehome-challenge.git)
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
<br>
<br>

![Backend image](/assets/backend.png)
