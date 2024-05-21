# Self Job Application Tracking Backend

## How to start
1. run 'npm -i' to install all required dependencies first.
1. run 'npm run start' to run the server. (p.s for monitoring purpose, i recommand to use this script)
1. you can type 'localhost:9000' in your browser to access the server locally.

## Routes
1. home ('/') will check current status of the server.
1. /applications will show all the apllication in the db.
1. GET /applications/{id} will show specific application with {id}. {id} must be proper numeric value.
1. POST /applications will post a new application to the database. The body in the request must have 'status' and 'company'.('url' is optional).

## Dependencies
"cors": "^2.8.5",
"dotenv": "^16.3.1",
"express": "^4.18.2",
"nodemon": "^3.1.0"

## ETC
[Chk google doc](https://docs.google.com/document/d/1nrH0CSDP0nr0JNV0bC1OQcM_L38Y_rWmJ-7LFBkaBPY/edit?usp=sharing)
