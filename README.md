Project Setup Instructions


**********************************************NOTE***********************************************************

These instructions outline how to get the project up and running LOCALLY .

The Entire application is hosted online at the link given BELOW using AWS:

CLOUD LINK :  [https://qc-main.db4e6lp0kz2sp.amplifyapp.com/]

(Although I would prefer for this application to be viewed locally as the Framer Transitions seemed to break on the compiling the REACT build and had to revert back to a slightly older version which makes it look a little bit smoother)

For a detailed understanding of the approach taken while building this project, please refer to the separate README file in this repository.

**********************************************NOTE************************************************************



Requirements to Run the Project
STEP 1:

 Set Up the Frontend

Clone the frontend directory from the following repository:
[https://github.com/ams1302/QuestCompare_FE.git](Front-endRepo)

Navigate into the cloned directory:
```cd QuestCompare_FE ```

Install all required dependencies:
```npm install```

Start the development server:
```npm start```


**********************************************NOTE***********************************************************

IF you start the server from the branch named "QC/main" there is no need to do any of the steps below as the backend has been deployed entirely on the cloud"
The steps below are only necessary if you need  to run the entire application  on a local machine


IF you want to run the ENTIRE  application LOCALLY switch the branch of the frontend to "QC/mainlocal" and proceed with the instructions below

**********************************************NOTE************************************************************

STEP 2:

Clone the backend directory from the following repository:
[https://github.com/ams1302/QuestCompare_BE.git](Back-endRepo)

Navigate into the cloned directory:
```cd QuestCompare_BE ```

Install all required dependencies:
```npm install```

Start the development server:
```node server.js```


STEP 3: View the Project
Open your web browser and go to http://localhost:3000 to view the project.

NOTE: The .env file has been shared to simplify the setup process. Please use it responsibly and avoid any misuse.




