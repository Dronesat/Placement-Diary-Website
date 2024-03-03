RUN PROGRAM
npm install 
npm start 
http://localhost:8080
start will run: node --experimental-modules svr.mjs

DATABASE SETUP
sqlite3 database.sqlite
.read migrations-sqlite/initial.sql

PROGRAM STRUCTURE
addjob - User enters date,work,example,edit competence and save the job.	

competence - Display all competences in table, user select checkbox on each row and return back to addjob with user selected competencies

edit - Display the selected job detail in textbox, user can modify the job details and save changes

index - Main page, table display all placement diary with options to add,edit,delete each job and when user hover mouse on top of each competence. Element below table displays detail of that competence

readonly - Same as main but without option to add,edit,delete placement and user can print the printable version of the table

database - Exports functions that interact with an SQLite database to perform operations such as initializing the database, retrieving and manipulating competence and placement diary data, and saving, updating, and deleting placement diary entries.

svr.mjs - Sets up Express server that serves client website, handles interaction with a database using the provided functions.


DEPENDENCIES USED
"express": "^4.18.2",
"sqlite": "^4.2.1",
"sqlite3": "^5.1.6"
"uuid-random": "^1.3.2"


SERVER-SIDE API DOCUMENTATION
- GET /competence 
	Retrieve all competences
- GET /competence/:id
	Retrieve a competence by its ID
- GET /placement-diary
	Retrieve all placement diary
- POST /placement-diary
	Add a new placement diary
- DELETE /placement-diary/:id
	Delete a placement diary by its ID
- GET /placement-diary/:id
	Retrieve a placement diary by its ID
- PUT /placement-diary/:id
	Update a placement diary by its ID.
- GET /temp-comp-list
	Retrieve a temporary competence list
- POST /temp-comp-list
	Add a temporary competence list

CLIENT-SIDE API DOCUMENTATION
- index.js
	- loadPlacementDiary()
	 	Load the placement diary from database and populate to the diary table
	- createTableRow(data)
	 	create a row in table of element
	- editJobById(data)
		Navigate to edit.html page with ID of a selected job
	- deleteJobById(id)
		Delete a placement diary by its ID.
	- displayCompetencyDetails(competencyObject)
		Display the details of a competency
	- showCompetenceDetail(event)
		Retrieve and display details of a competence when the mouse hovers over an element

- readonly.js
	- createTableRow(data)
		create a row in table of element
	- loadPlacementDiary()
	 	Load the placement diary from database and populate to the diary table
	- printTable()
		Open a new window and print the diary table
	- displayCompetencyDetails(competencyObject)
		Display the details of a competency
	- showCompetenceDetail(event)
		Retrieve and display details of a competence when the mouse hovers over an element

- addjob.js
	- savePlacementDiary()
		Save the placement diary to database
	- getTempCompList()
		Retrieve the temporary competency list from database
	- updateCompList()
		Update the displayed competency list

- competence.js
	- loadCompetenceData()
		Load competence data from database and display it in the table
	- createTableRow(id, competence, examples)
		Create a table row element for the competence data
	- handleCheckboxChange(event)
		Handle the checkbox event in the competence table
	- updateCompList()
		Update the displayed competency list
	- displaySavedCompList()
		Display the saved competency list

- edit.js
	- savePlacementDiary()
		Update an existing placement diary by sending the edited job data to database.
	- loadPlacementDiary()
		Load a specific placement diary from database and populate its data to textboxes
	- populateForm(job)
		Populate textboxes with the data from the job object

SOURCE 
- Setup database: https://www.youtube.com/watch?v=ZRYn6tgnEgM
- Printing: https://developer.mozilla.org/en-US/docs/Web/Guide/Printing
- Write API: https://www.archbee.com/blog/how-to-write-api-documentation
- Create table/row/cell: https://stackoverflow.com/questions/52499079/create-table-rows-and-cells-in-javascript
						 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
- sqlite database code: https://www.tutorialspoint.com/sqlite/
- URLSearchParam: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
- Regex: https://stackoverflow.com/questions/19011161/what-do-s-w-d-stand-for-in-regex
- Project template: https://github.com/portsoc/staged-simple-message-board
