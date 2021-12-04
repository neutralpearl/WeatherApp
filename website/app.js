/* Global Variables */

// OpenWeatherMap API variables
const apiKey = '<API_KEY>&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '/'+ d.getDate()+'/'+ d.getFullYear();

/* Functions */

// ensures neither zip nor feelings inputs are blank
const validateSubmission = (zipValue, feelingsValue) => {
    const emptyValueMessage = document.getElementById('emptyValueMessage');
    try {
        if (zipValue === '' || feelingsValue === '') {
            emptyValueMessage.innerHTML = 'Please enter both a zip code and a description of your current feelings';
            emptyValueMessage.style.display = 'block';
            return false;
        } else {
            emptyValueMessage.style.display = 'none';
            return true;
        }
    } catch (error) {
        console.log('Error: Could not run validation on input fields');
    }
}

// GET data from Weather Map API
const retrieveWeather = async (baseURL,zipValue,apiKey) => {
    const request = await fetch(`${baseURL}zip=${zipValue},us&appid=${apiKey}`);
    try {
        // Transform into JSON
        const response = await request.json();

        if (response.message === 'city not found') {
            document.getElementById('invalidZipMessage').innerHTML = 'Please enter a valid U.S. zip code';
            document.getElementById('invalidZipMessage').style.display = 'block';
            throw new Error ('Invalid zip code');
        } else {
            document.getElementById('invalidZipMessage').style.display = 'none';
            return response;
        }
    } catch(error) {
        console.log(error);
        return false;
    }
}

// POST data to local server
const postData = async (url,data) => {

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    const response = await fetch(url, requestOptions)
    return await response.json();
}


// GET from local server
const retrieveData = async () => {
    const response = await fetch('/retrieve-entry');
    const entry = await response.json();
    // Write updated data to DOM elements
    document.getElementById('date').innerHTML = `<span>Date of entry:</span> ${entry.date}`;
    document.getElementById('temp').innerHTML = `<span>Current temperature in ${entry.city}</span>: ${Math.round(entry.temp)} degrees Fahrenheit`;
    document.getElementById('content').innerHTML = `<span>Your feelings:</span> ${entry.feelings}`;
    return entry;
}


// retrieves complete entry from local server and displays entry

const displayEntry = async () => {
    // define user inputs
    const zipValue = document.getElementById('zip').value;
    const feelingsValue = document.getElementById('feelings').value;

    let newEntry = await validateSubmission(zipValue, feelingsValue);
    if (newEntry) {  

        // get API data for zip code
        await retrieveWeather(baseURL,zipValue,apiKey)
        .then (apiData => {

            // create object to store journal entry data
            let newEntry = {};
            // add journal details as properties
            newEntry.date = `${newDate}`;
            newEntry.city = `${apiData.name}`;
            newEntry.temp = Math.round(`${apiData.main.temp}`);
            newEntry.feelings = `${feelingsValue}`;

            // post entry (including retrieved API data) to local server
            postData('/add-entry',newEntry);
        })
        .then ( () => {
            // get complete entry from local server
            retrieveData();
        })
        .then( () => {
            // unhide div containing journal entry
            const journalEntry = document.getElementById('display-entry');
            if (journalEntry.style.display !== 'block'){
                journalEntry.style.display = 'block';
            }
        }) 
    }
}


// Event listener for button click
const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', displayEntry);




