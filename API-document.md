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