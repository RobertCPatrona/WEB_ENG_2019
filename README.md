### WEB_ENG_2019
Repository for Web Engineering project.
The project is composed of a Flask server, implementing the back-end API, and a ReactJS server, implementing the front end logic.

It is required to use Mozzila Firefox as the browser, since Chrome 

#### Run Flask Server
This requires Python 3. To install, run:
```
sudo apt-get update
sudo apt-get install python3.6
```
Navigate to the `Web Eng` folder, which contains the back-end Flask server. Type the following commands:
```
export FLASK_ENV=development
FLASK_APP=app.py flask run
```

#### Run React Server

Navgate to the `front_end` folder, which contains the front-end ReactJS server. Install the required modules using the command:
```
npm install
```
The required node modules are included in the `package.json` file.


To run the server, type the following command:
```
npm start
```

#### Notes

If the browser gives the error `Failed to load resource: the server responded with a status 404 (NOT FOUND)`, switch to Firefox since this error is due to the browser's security measures. 

Moreover, make sure to `disable caching` on the browser, to prevent React from returning cached JSON result. 

A more comprehensive guide on using React library can be found [here](https://github.com/facebook/react/blob/master/README.md)
