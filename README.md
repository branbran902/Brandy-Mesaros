# Crewmates-Website

Offical website for Crewmates. 
Used a boilerplate Node.js made by Sahat's open source project (https://github.com/sahat/hackathon-starter)

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/crewmates-app/Crewmates-Website.git crewmates

# Change directory
cd crewmates

# Set up postgress to run locally if you have not already. Configure environment variables appopriately

# Install NPM dependencies
npm install

# Then simply start your app
node app.js
```

Running Postgres
----------------
Ensure that the `docker-run.sh` file is executable.

On Linux/UNIX, simply run `chmod +x docker-run.sh`
Then run `./docker-run.sh`

Follow the instructions from the output of the script for any errors that occur. 

You must have `docker` installed and in your PATH for this to work. To verify this,
run `docker version`. If there is an error, find instructions for installing docker and putting it into your PATH


Specs
---------------
Node: 14.16.0


Integrations
---------------
- Google Login
- Google Search
- Google Maps
- Google Analytics
- Facebook Login
- Strip Payment

