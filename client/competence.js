let selectedRows = [];

async function loadCompetenceData() {
  try {
    const response = await fetch('/competence/');
    if (response.ok) {
      const data = await response.json();
      displayCompetenceTable(data);
    } else {
      console.log('Failed to fetch competence data from the server.');
    }
  } catch (error) {
    console.log('Error occurred while fetching competence data:', error);
  }
}

function displayCompetenceTable(data) {
  const table = document.getElementById('competenceTable');

  for (const item of data) {
    const row = createTableRow(item.id, item.standards, item.examples);
    table.appendChild(row);
  }
}

function createTableRow(id, competence, examples) {
  const row = document.createElement('tr');

  const idCell = document.createElement('td');
  idCell.textContent = id;
  row.appendChild(idCell);

  const competenceCell = document.createElement('td');
  competenceCell.textContent = competence;
  row.appendChild(competenceCell);

  const examplesCell = document.createElement('td');
  examplesCell.textContent = examples;
  row.appendChild(examplesCell);

  if (/\w\d+/.test(id)) {
    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', handleCheckboxChange);
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);
  }

  return row;
}

function handleCheckboxChange(event) {
  const checkbox = event.target;
  const id = checkbox.closest('tr').querySelector('td:first-child').textContent;

  if (checkbox.checked) {
    selectedRows.push(id);
  } else {
    selectedRows = selectedRows.filter((rowId) => rowId !== id);
  }

  updateCompList();
}

function updateCompList() {
  const compList = document.getElementById('compList');
  compList.textContent = 'Selected IDs: ' + selectedRows.join(', ');
}

function prepareHandles() {
  this.competenceTable = document.getElementById('competenceTable');
  this.compList = document.getElementById('compList');
  this.backButton = document.getElementById('backButton');
}

function addEventListeners() {
  const checkboxes = this.competenceTable.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });

  this.backButton.addEventListener('click', () => {
    sendSelectedRows(selectedRows);
    window.history.go(-1);
  });
}

async function sendSelectedRows(rows) {
  try {
    const response = await fetch('/temp-comp-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rows),
    });
    if (response.ok) {
      console.log('Selected rows sent to the server successfully.');
    } else {
      console.log('Failed to send selected rows to the server.');
    }
  } catch (error) {
    console.log('Error occurred while sending selected rows:', error);
  }
}

function displaySavedCompList() {
    const compList = document.getElementById('compList');

    if (savedCompList) {
      compList.textContent = 'Competence list: ' + selectedRows.join(', ');
    }
}

function pageLoaded() {
  loadCompetenceData();
  prepareHandles();
  addEventListeners();
  displaySavedCompList();
}

pageLoaded();
