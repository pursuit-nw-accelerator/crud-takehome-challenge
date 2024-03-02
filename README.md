# CRUD back end takehome challenge

### Developer: [Rizwan Kawsar](https://github.com/RK-404/)

## Getting Started
- Clone this Repository to your machine.
- On the terminal run `npm install` to install the dependencies then `npm start` to run it on your machine.
- Go to [http://localhost:9000](http://localhost:9000) from your browser.
- It is recomended to use [Postman](https://www.postman.com/) to test this API (to Add, Update and Delete).

## Endpoints
- Health check: `http://localhost:9000`
- All applications: `http://localhost:9000/applications`
- Application by id: `http://localhost:9000/applications/(id)`
- Create new: `http://localhost:9000/applications`
- Update: `http://localhost:9000/applications/(id)`

- Delete: `http://localhost:9000/applications/(id)`

**Note:** `(id)` must be an integer. 

## Validations
- Data must be on `json` format.
- Must have `company` and `status` fields.
- The value of `status` must contain one of those following: `'CREATED'`, `'APPLIED'`, `'REJECTED'`, `'PHONE_SCREEN'`, `'ON_SITE'`, `'RECEIVED_OFFER'`, `'OFFER_ACCEPTED'`, `'OFFER_DECLINED'`
- The `url` field is optional.

## Bug Fix
| Comment | How i fixed it | How i tested it |
|---------|----------------|-----------------|
| "It is not enough just to read `process.env.PORT`. You need to use the `dotenv` library to read from the `.env` file." | I added `require("dotenv").config()` to the `server.js` file. |  I set different values of `SERVER` in `.env` file 2. Checked the console if the value is changing in `Listening on port 9***...` 3. And tried going to the localhost with that server value.
| "When the client sends a field that is not allowed (ex: `admin`) I would prefer to send a more informative error message than `invalid data`. I can see why this might be done for security reasons, though." | In the `validations` instead of returning `true`/`false` for the invalid fields I stored them in an array and return them with the status code in the `json` with `Array join()` methode. | I tried sending data with invalid fields from Postman for POST and PUT.
| "I like that you check if the application exists before trying to delete or update it. However, when you call `response.status(404)`, you need to make sure that Express stops executing your code. `response.status()` does not cause the function to return. It will keep going, and the next call to `response.status()` will cause a crash with the error `Cannot set headers after they are sent to the client`." | After searching I made an `if else` statement. If I find nothing I call `response.status(404)` else I Update or Delete | I tried `PUT` and `DELETE` with Postman with an `id` that can not be found as wll as an valid `id`.
| "The `DELETE` route handler does not validate that the id is a positive integer." | Previously the condition for checking the `id` was `if (!Number.isInteger(Number(id)))`, now I added `Number(id) < 1` with an `OR` on it. | I tried deleting an application with a negative integer id with Postman
|
