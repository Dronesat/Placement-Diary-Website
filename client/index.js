const el = {};

//create a row in table of element
function createTableRow(data) {
  const row = document.createElement('tr');
  const dateCell = document.createElement('td');
  dateCell.textContent = data.date;
  const workCell = document.createElement('td');
  workCell.textContent = data.work;
  const expCell = document.createElement('td');
  expCell.textContent = data.exp;
  const compCell = document.createElement('td');
  const actionCell = document.createElement('td');
  
  const competencyCodes = data.comp.split(',');
  for (const code of competencyCodes) {
    const span = document.createElement('span');
    span.textContent = code.trim();
    compCell.appendChild(span);
    compCell.appendChild(document.createElement('br'));
  }
  
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    editJobById(data);
  });
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteJobById(data.id);
  });
  
  actionCell.appendChild(editButton);
  actionCell.appendChild(deleteButton);

  row.appendChild(dateCell);
  row.appendChild(workCell);
  row.appendChild(expCell);
  row.appendChild(compCell);
  row.appendChild(actionCell);

  return row;
}

async function editJobById(data) {
  const urlParams = new URLSearchParams();
  urlParams.append('id', data.id);
  window.location.href = 'edit.html?' + urlParams.toString();
}

async function deleteJobById(id) {
  const response = await fetch(`/placement-diary/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    console.log(`Deleted entry with id ${id}`);
    loadPlacementDiary(); 
  } else {
    console.log(`Failed to delete entry with id ${id}`);
  }
}

//Load the placement diary from database and populate to the diary table.
async function loadPlacementDiary() {
  const diaryTable = document.querySelector('#diaryTable');
  diaryTable.innerHTML = '';

  const titleRow = document.createElement('tr');
  const titleHeaders = ['Date', 'Work carried out', 'Knowledge/Experience gained or applied', 'Competency'];
  for (const header of titleHeaders) {
    const th = document.createElement('th');
    th.textContent = header;
    titleRow.appendChild(th);
  }
  diaryTable.appendChild(titleRow);

  const response = await fetch('/placement-diary');
    if (response.ok) {
      const placementDiary = await response.json();

      for (const entry of placementDiary) {
        const row = createTableRow(entry);
        diaryTable.appendChild(row);
      }
      competenceCellEventHandler();
    } else {
      console.log('Failed to load placement diary from server.');
    }
}

function navigateToAddJobPage() {
  window.location.href = 'addjob.html';
}

function navigateToReadOnlyPage() {
  window.location.href = 'readonly.html';
}

function prepareHandles() {
  el.addJobButton = document.querySelector('#addJobButton');
  el.readonlyButton = document.querySelector('#readonlyButton');
  el.compStandard = document.querySelector('#compStandard');
  el.compExamples = document.querySelector('#compExamples');
  el.compId = document.querySelector('#compId')
}

async function showCompetenceDetail(e) {
  const competency = e.target.textContent.trim();
  const response = await fetch(`/competence/${competency}`);
    if (response.ok) {
      const competencyObject = await response.json();
  
      displayCompetencyDetails(competencyObject);
    } else {
      console.log('Failed to retrieve competency details from the server.');
    }
}

function displayCompetencyDetails(competencyObject) {
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const p3 = document.createElement('p');
  p1.textContent = "Standard: " + competencyObject.standards;
  p2.textContent = "Example: " + competencyObject.examples;
  p3.textContent = "Competence " + competencyObject.id;
  if (el.compStandard && el.compExamples && el.compId) {
    removeContentFrom(el.compStandard);
    removeContentFrom(el.compExamples);
    removeContentFrom(el.compId);
    el.compStandard.appendChild(p1);
    el.compExamples.appendChild(p2);
    el.compId.appendChild(p3);
  }
}

async function competenceCellEventHandler() {
  const competencyCells = document.querySelectorAll('#diaryTable td:nth-child(4) span');
  for (const cell of competencyCells) {
    cell.addEventListener('mouseover', showCompetenceDetail);
  }
}

function addEventListeners() {
  el.addJobButton.addEventListener('click', navigateToAddJobPage);
  el.readonlyButton.addEventListener('click', navigateToReadOnlyPage);
}

function removeContentFrom(element) {
  if (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

function pageLoaded() {
  prepareHandles();
  addEventListeners();
  loadPlacementDiary();
}

pageLoaded();