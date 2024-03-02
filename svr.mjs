import express from 'express';
import * as database from './database.mjs';

const app = express();
app.use(express.static('client'));
app.use(express.json());

let tempCompList = [];

app.get('/competence/', async (req, res) => {
  const competence = await database.getCompetence();
  res.json(competence);
});

app.get('/competence/:id', async (req, res) => {
  const { id } = req.params;
  const competence = await database.getCompetenceById(id);
  res.json(competence);
});

app.get('/placement-diary', async (req, res) => {
  const placementDiary = await database.getPlacementDiary();
  res.json(placementDiary);
});

app.post('/placement-diary', express.json(), async (req, res) => {
  const newJob = req.body;
  const savedJob = await database.savePlacementDiary(newJob);
  res.status(201).json(savedJob);
});

app.get('/temp-comp-list', async (req, res) => {
  res.json([tempCompList]);
});

app.post('/temp-comp-list', express.json(), (req, res) => {
  tempCompList = req.body;
  console.log('Received selected rows:', tempCompList);
  res.json(tempCompList);
});

app.delete('/placement-diary/:id', async (req, res) => {
  const { id } = req.params;
  await database.deletePlacementDiaryById(id);
  res.sendStatus(204);
});

app.get('/placement-diary/:id', async (req, res) => {
  const { id } = req.params;
  const entry = await database.getPlacementDiaryById(id);
  res.json(entry);
});

app.put('/placement-diary/:id', express.json(), async (req, res) => {
  const { id } = req.params;
  const updatedJob = req.body;
  await database.updatePlacementDiaryById(id, updatedJob);
  res.sendStatus(204);
});

async function startServer() {
  await database.init();
  //app.listen(8080);
  app.listen(process.env.PORT || 5000);
  console.log('Serving website on: http://localhost:8080');
  console.log('Press Ctrl+C to stop');
}


startServer();
