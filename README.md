Calendar Application

# Techs 
- Node.JS @ 8.5.0
- NPM @ 5.2.0
- Express @ 4.16.3
- MySQL @ 8.0.11
- Sequelize @ 4.37.8
- Bcrypt @ 2.0.1
- JsonWebToken @ 8.2.1
- Nodemon @ 1.17.4
- Express-boom @ 2.0.0

# Features
- Register user
- Edit user
- Remove user
- Add event
- Edit event
- Delete event
- Check conflicts between events
- Invite user - **Not implemented**

# How to use
- Clone this repo
- Install MySQL (supported version: 8.0.11)
- Install NodeJS (supported version: 8.5.0)
- Run the command `npm install` on folders api and client
- Create a database 
- Create a .env file with your settings inside api folder. Look the example `.env-example`

# Running API
- Run the command `npm run dev` for execute the project in development mode
- Run the command `npm start` for execute the project in production mode

# Running Client
- On file `client/app/app.js` change the variables `_apiUrl` and `_baseUrl` to your respective API url and server url
- Run `npm install -g http-server`
- Go to client folder and run `http-server` 