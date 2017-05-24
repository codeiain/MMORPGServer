# MMORPGServer

## Prerequisite

This application requires [Mongo DB](https://www.mongodb.com/download-center?jmp=nav)
And [NodeJS](https://nodejs.org/en/download/).

## Setup

Once both the above prerequisites are install, all required node packages can be installed by navigating to the project root directory and running ```npm install```

## Running the server

within a new terminal running the command ```mongod``` will launch the mongodb if it's not running as a service.

Once mongodb is running.

Within a new terminal running ```npm start``` will launch the application.

This will start the code in the server.js file which will start a new webserver and a socket server, with the details in the config/config.development.json file.

### Details

The main entry point for the application is server.js which will create an express rest api server and a websocket server, and set up the server ui.

#### Server.js
This is bootstraps the application and calles the configProvider to get the configuration details from the config folder.

Once it has the config details it will create a new instance of the UI and get the UI logging system.

Once this is done it will seed the database with default data.

and then start the rest server and socket server.

#### configProvider.js
Based on the env setup in the env.json a config file will be loaded e.g. if env is set to development the the settings from config.development.json will be loaded.

#### api directory 
This directory contails all the rest api routes and the mongoose models.

#### gameManagment
This contails global classes to manage the game data.

#### seed
This contains all the seed data for the database, a file should exist for each table in the DB and contain a json array.

#### servers
This is the main access point for each of the sub servers (api, socket).

#### spec 
This stores all the unit tests for the server currently they are all bracking.

#### UI
This creates the UI for the server appliction
