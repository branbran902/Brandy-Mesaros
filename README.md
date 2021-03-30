# Crewmates-Website

Offical website for Crewmates. 


Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/crewmates-app/Crewmates-Website.git crewmates

# Change directory
cd crewmates

# Install NPM dependencies
npm install

# Set up postgress to run locally if you have not already.
See Running Postgree instructions below

# Configure environment variables appopriately and source the .env file
source .env

# Then simply start your app
node app.js
```

Running Postgres
----------------
Ensure that the `run-docker.sh` file is executable.

On Linux/UNIX, simply run `chmod +x run-docker.sh`
Then run `./run-docker.sh`

Follow the instructions from the output of the script for any errors that occur. 

You must have `docker` installed and in your PATH for this to work. To verify this,
run `docker version`. If there is an error, find instructions for installing docker and putting it into your PATH

Specs
---------------
Node: v14.16.0
npm: v6.14.11

 


Integrations
---------------
- Google Login
- Google Search
- Google Maps
- Google Analytics
- Facebook Login
- Twitter Login
- Strip Payment

Openn Sourced Projects
-----------------------
Used a boilerplate Node.js made by Sahat's open source project (https://github.com/sahat/hackathon-starter)
Used Dropzone to easily drag and drop images (https://github.com/dropzone/dropzone)

Common issues
---------------
"Node Sass does not yet support your current environment"
Switch node version to 14.16.0
nvm use 14.16.0