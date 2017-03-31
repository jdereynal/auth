### User authentification

Edit the *database* file with your mongo server's address and credentials

`npm install && npm start` 

Routes:

`POST /api/createuser` 

Takes a JSON object  with a username and password, creates an entry storing the username, hash and salt in the db.

`POST /api/login`

Takes a JSON object with a username and password. Returns an object containing a [jwt](https://jwt.io/) to be stored into the cookies

`GET /profile` 

Prints out the current logged in user's name.
