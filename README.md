# Placement Diary Website
<img src="https://github.com/Dronesat/Placement-Diary-Website/assets/20153310/31f45b6a-c825-4b17-bf1a-f0fa7d32ef6f" width="650" height="280">


A simple diary website where you can record daily tasks during your placement year! You can try out the [website](https://placement-diary.cyclic.app/)

## Technologies
1. Front-end: HTML, CSS, Javascript
2. Back-end:
   - Node.js with Express 
   - SQLite
3. RESTful API
   - Express Routes (GET, POST, PUT, DELETE)
   - [API Documentation](https://github.com/Dronesat/Placement-Diary-Website/blob/main/API-document.md)
## How to install locally?
Why? The demo website currently breaks the database so you won't be able to add/edit/delete any tasks.
```
- RUN PROGRAM
clone repository
in svr.mjs modify app.listen port to 8080
npm install 
npm start 
http://localhost:8080

- DATABASE SETUP
sqlite3 database.sqlite
.read migrations-sqlite/initial.sql
```
## DEPENDENCIES
```
"express": "^4.18.2",
"sqlite": "^4.2.1",
"sqlite3": "^5.1.6"
"uuid-random": "^1.3.2"
```

## PROGRAM STRUCTURE
No | File | Description
--- | --- | ---
1 | addjob | User enters date,work,example,edit competence and save the job.	
2 | competence | Display all competences in table, user select checkbox on each row and return back to addjob with user selected competencies
3 | edit | Display the selected job detail in textbox, user can modify the job details and save changes
4 | index | Main page, table display all placement diary with options to add,edit,delete each job and when user hover mouse on top of each competence. Element below table displays detail of that competence
5 | readonly | Same as main but without option to add,edit,delete placement and user can print the printable version of the table
6 | database | Exports functions that interact with an SQLite database to perform operations such as initializing the database, retrieving and manipulating competence and placement diary data, and saving, updating, and deleting placement diary entries.
7 | svr.mjs | Sets up Express server that serves client website, handles interaction with a database using the provided functions.

## SOURCE
- Setup database: https://www.youtube.com/watch?v=ZRYn6tgnEgM
- Printing: https://developer.mozilla.org/en-US/docs/Web/Guide/Printing
- Write API: https://www.archbee.com/blog/how-to-write-api-documentation
- Create table/row/cell: https://stackoverflow.com/questions/52499079/create-table-rows-and-cells-in-javascript
		                       https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
- sqlite database code: https://www.tutorialspoint.com/sqlite/
- URLSearchParam: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
- Regex: https://stackoverflow.com/questions/19011161/what-do-s-w-d-stand-for-in-regex
- Project template: https://github.com/portsoc/staged-simple-message-board

