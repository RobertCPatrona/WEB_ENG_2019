### WEB_ENG_2019
Repository for Web Engineering project.
The project is composed of a Flask server, implementing the back-end API, and a ReactJS server, implementing the front end logic.


#### Run Flask Server
This requires Python 3. To install, run:
```
sudo apt-get update
sudo apt-get install python3.6
```
Navigate to the `Back_End` folder. Type the following commands:
```
export FLASK_ENV=development
FLASK_APP=app.py flask run
```

#### Run React Server

First navgate to the `Front_End` folder and install the required modules using the command:
```
npm install
```
The required node modules are included in the `package.json` file.


To run the server, type the following command:
```
npm start
```
