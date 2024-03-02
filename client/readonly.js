const el = {};

function createTableRow(data) {
  const row = document.createElement('tr');
  const dateCell = document.createElement('td');
  dateCell.textContent = data.date;
  const workCell = document.createElement('td');
  workCell.textContent = data.work;
  const expCell = document.createElement('td');
  expCell.textContent = data.exp;
  const compCell = document.createElement('td');

  const competencyCodes = data.comp.split(',');
  for (const code of competencyCodes) {
    const span = document.createElement('span');
    span.textContent = code.trim();
    compCell.appendChild(span);
    compCell.appendChild(document.createElement('br'));
  }

  row.appendChild(dateCell);
  row.appendChild(workCell);
  row.appendChild(expCell);
  row.appendChild(compCell);

  return row;
}

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

function navigateToAddIndexPage() {
  window.location.href = 'index.html';
}


function prepareHandles() {
  el.backButton = document.querySelector('#backButton');
  el.compStandard = document.querySelector('#compStandard');
  el.compExamples = document.querySelector('#compExamples');
  el.compId = document.querySelector('#compId')
  el.printButton = document.querySelector('#printButton');
}

function addEventListeners() {
  el.backButton.addEventListener('click', navigateToAddIndexPage);
  el.printButton.addEventListener('click', printTable);
}

function printTable() {
  const printWindow = window.open("", "_blank");
  printWindow.document.write("<html><head><title>Print</title>");
  printWindow.document.write("<style>table { border-collapse: collapse; }");
  printWindow.document.write("table, th, td { border: 1px solid black; }</style>");
  printWindow.document.write("</head><body>");
  printWindow.document.write("<h1>Placement Diary</h1>");
  printWindow.document.write(document.getElementById("diaryTable").outerHTML);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}

async function competenceCellEventHandler() {
  const competencyCells = document.querySelectorAll('#diaryTable td:nth-child(4) span');
  for (const cell of competencyCells) {
    cell.addEventListener('mouseover', showCompetenceDetail);
  }
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