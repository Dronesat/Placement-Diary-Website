const el = {};

async function savePlacementDiary() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const editedJob = {
    id: id,
    date: el.dateInput.value,
    work: el.workInput.value,
    example: el.exampleInput.value,
    competence: el.competenceInput.value
  };

  const response = await fetch(`/placement-diary/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedJob)
  });

  if (response.ok) {
    console.log(`Entry with id ${id} updated successfully`);
    navigateToIndexPage();
  } else {
    console.log(`Failed to update entry with id ${id}`);
  }
}

async function loadPlacementDiary() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (id) {
    const response = await fetch(`/placement-diary/${id}`);
    if (response.ok) {
      const Job = await response.json();
      populateForm(Job);
    } else {
      console.log(`Failed to load entry with id ${selectedEntryId}`);
    }
  }
}

function populateForm(job) {
  document.getElementById('dateInput').value = job.date;
  document.getElementById('workInput').value = job.work;
  document.getElementById('exampleInput').value = job.exp;
  document.getElementById('competenceInput').value = job.comp;
}

function navigateToIndexPage() {
  window.location.href = 'index.html';
}

function prepareHandles() {
  el.dateInput = document.querySelector('#dateInput');
  el.workInput = document.querySelector('#workInput');
  el.exampleInput = document.querySelector('#exampleInput');
  el.competenceInput = document.querySelector('#competenceInput');
  el.saveButton = document.querySelector('#saveButton');
}

function addEventListeners() {
  el.saveButton.addEventListener('click', savePlacementDiary);
}

function pageLoaded() {
  prepareHandles();
  addEventListeners();
  loadPlacementDiary();
}

pageLoaded();
