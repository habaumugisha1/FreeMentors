# FreeMentors
[![Build Status](https://travis-ci.org/EugeneMunya/FreeMentors.svg?branch=develop)](https://travis-ci.org/EugeneMunya/FreeMentors)
[![Maintainability](https://api.codeclimate.com/v1/badges/4462cdaf2a74f1d96b40/maintainability)](https://codeclimate.com/github/EugeneMunya/FreeMentors/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4462cdaf2a74f1d96b40/test_coverage)](https://codeclimate.com/github/EugeneMunya/FreeMentors/test_coverage)
[![Coverage Status](https://coveralls.io/repos/github/EugeneMunya/FreeMentors/badge.svg?branch=develop)](https://coveralls.io/github/EugeneMunya/FreeMentors?branch=develop)

# FreeMentors
Free Mentors is a social initiative where accomplished professionals become role models to
young people to provide free mentorship sessions.

# Installing / Getting started
Make sure you have node.js installed if not download it here [node.js](https://nodejs.org/en/) 

# Developing
Download the prpoject and make it run into you local machine by simply following each step listed down bellow.
```bash
 git clone https://github.com/EugeneMunya/FreeMentors.git
 cd FreeMentors
 npm install   #'Install all dependenciies'
 #'create .env file in project root directory'
 #'in .env make PORT=portnumber and SECRET_KEY=any string
 npm run local  #'past http://localhost:portnumber/ in your browser'
```
# Running the tests
To run the test simply paste this commande in your terminal
```bash
npm run test
```
# Project forlder structure
How the project forlder are structured

```bash
Server/
   controllers/
   helpers/
   middleware/
   models/
   routes/
   test/
   server.js
 UI/
    images/
    pages/
    script/
    styles/
    index.html 
```
# EndPoints
You should be able to test functionality of the app by using the defined endpoints listed bellow
```bash
POST /api/v1/auth/signup #'user signup'
POST /api/v1/auth/signin #'user sign in'
PATCH /api/v1/user/:userId #'change user to mentor'
GET /api/v1/mentors #'get all mentors'
GET /api/v1/user/ #'get all user'
GET /api/v1/mentors/:mentorId #'get specific mentor'
****************************************************
POST /api/v1/sessions #'get all sessions'
GET /api/v1/user/sessions #'get all user specific sessions'
POST /api/v1/sessions/:sessionId/review #'reviewing a session'
GET /api/v1/mentor/sessions #'get all sessions for a specific mentor'
GET /api/v1/sessions/reviews #'get all reviews for a particular session'
PATCH /api/v1/sessions/:sessionId/accept #'accepting session request'
PATCH /api/v1/sessions/:sessionId/reject #'reject a session request'
PATCH /api/v1/review/:eviewId #'edit the review'
DELETE /api/v1/sessions/:sessionId/review #'deleting a review
```
# Examples

**signup**
![Screenshot from 2019-08-30 17-02-07](https://user-images.githubusercontent.com/36619897/64030995-ed8bf600-cb47-11e9-9f5a-42d8c7cecf6c.png)
**signin**
![Screenshot from 2019-08-30 17-06-26](https://user-images.githubusercontent.com/36619897/64031373-8de21a80-cb48-11e9-9d66-39dc7d6643f6.png)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)