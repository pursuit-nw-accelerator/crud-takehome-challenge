# Job Applications API

<b>Developer:</b> <a href="https://siliskleemoff.com">Silis Kleemoff</a>

<b>Backend Tech Stack:</b> Express.js, Node.js, npm, JSON, Postman

<b>Note:</b> It is recommended to use <a href="https://www.postman.com/">Postman</a> for testing this API to be able to utilize all of the routes (ex. PUT and POST).

## Getting started

1. Clone this repository to your machine by copying the repository url and running the `git clone` command in your terminal. <img src="./images/Screenshot 2024-02-18 at 5.27.57 AM.png">
1. run `npm install` to install dependencies, and `npm start` to start the server.

## Endpoints

<p><b>Note:</b> The default port is 9000, but this can be changed your <code>.env</code> file (ex. <code>PORT=3000</code>).</p>

<li><b>Health check route:</b> <code>http://localhost:9000</code></li>
<li><b>All applications:</b> <code>GET /applications</code></li>
<li><b>Application by id:</b> <code>GET /applications/:id</code></li>
<li><b>Create an application:</b> <code>POST /applications</code></li>
<li><b>Update an application:</b> <code>PUT /applications/:id</code></li>
<li><b>Delete an application:</b> <code>DELETE /applications/:id</code></li>

## Valid Headers

`{ id }` must be an integer type for these endpoints:
`GET || POST || PUT /applications/:id`.

## Valid Body

<b>Endpoints:</b>
`POST /applications`,
`PUT /applications/:id`

```json
{
  "company": "",
  "status": "",
  "url": "" // Optional
}
```
