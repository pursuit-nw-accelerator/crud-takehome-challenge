# CRUD Routes For Job Listings

## <i>FSW Wisdom Wright</i>

### <u>To Run This Locally:</u>
1. Fork this repo.
1. Clone your fork to your machine.
a. Click on button that says <b>CODE</b>.<br/>
b. Copy https url.<br/>
c. Create a directory for the project.<br/>
d. Run `git clone 'https url' && cd $_ `.
1. Run `npm install` to install dependencies.
1. Start the server.<br/>
a. Run `code .` to open project in code editor.<br/>
b. Run `npm start` to start the server.

Your server is now running!
Visit `http://localhost:9000` to view the API. 

### <u>METHODS And ROUTES:</u>
<b>GET</b>- `/` : Health check route to ensure your server is up and running.

<b>GET</b>- `/jobs` : Get all jobs that have been created.

<b>GET</b>- `/jobs/:id` : Get job listing for specified id.

<b>POST</b>- `/jobs` : Create a new job listing.

<b>PUT</b>- `/jobs/:id` : Update job listing for specified id.

<b>DELETE</b>- `/jobs/:id` : Delete job listing for specified id.