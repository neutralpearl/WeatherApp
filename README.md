# Weather-Journal App Project

## Overview
An asynchronous web app that uses Web API and user data to dynamically update the UI.

More specifically, this app:
- Prompts users to input their current U.S. zip code & their feelings
- Retrieves their city name and its current temperature in Fahrenheit from the [OpenWeatherMap API](https://openweathermap.org/api)
- Stores this retrieved data (alongside the current date & feelings input) in a local server
- Displays a "journal entry" containing a blend of user-submitted and API-retrieved data

## Criteria

Project requirements can be found in this [rubric](https://review.udacity.com/#!/rubrics/4671/view).

## Dependencies

To run this app, please install the following:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

## Instructions

First, from the Command Line, run:

```node server.js```

If successful, your terminal should return "running on localhost: 8000".

Then go to [http://localhost:8000/](http://localhost:8000/) in your browser to use the app.