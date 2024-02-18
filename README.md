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
