const el = {};
let globalCompList = '';

async function savePlacementDiary() {
  function saveJob() {
    const date = el.date.value;
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const work = el.work.value;
    const exp = el.exp.value;
    const compList = globalCompList.toString();

    const newJob = {
      date: formattedDate,
      work: work,
      exp: exp,
      comp: compList
    };

    return newJob;
  }

  const data = saveJob();

  const response = await fetch('/placement-diary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    console.log('Placement diary saved to server.');
    navigateToIndexPage();
  } else {
    console.log('Failed to save placement diary to server.');
  }
}

async function getTempCompList() {
  const response = await fetch('/temp-comp-list');
  if (response.ok) {
    const compList = await response.json();
    return compList;
  } else {
    console.log('Failed to fetch temporary competency list.');
    return [];
  }
}

async function updateCompList() {
  const compListElement = document.getElementById('compList');
  globalCompList = await getTempCompList();
  compListElement.textContent = 'Selected Competencies: ' + globalCompList + '  (refresh after edit)';
}

function navigateToIndexPage() {
  window.location.href = 'index.html';
}

function navigateToCompetencePage() {
  window.location.href = 'competence.html';
}

function refreshComp() {
  updateCompList();
}

function prepareHandles() {
  el.date = document.querySelector('#date');
  el.work = document.querySelector('#work');
  el.exp = document.querySelector('#exp');
  el.saveButton = document.querySelector('#saveButton');
  el.backButton = document.querySelector('#backButton');
  el.addCompetenceButton = document.querySelector('#competenceButton');
  el.refreshButton = document.querySelector('#refreshButton');
}

function addEventListeners() {
  el.saveButton.addEventListener('click', savePlacementDiary);
  el.backButton.addEventListener('click', navigateToIndexPage);
  el.addCompetenceButton.addEventListener('click', navigateToCompetencePage);
  el.refreshButton.addEventListener('click', refreshComp);
}

async function pageLoaded() {
  prepareHandles();
  addEventListeners();
  await updateCompList();
}

pageLoaded();