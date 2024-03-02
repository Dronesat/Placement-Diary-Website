import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import uuid from 'uuid-random';

const DB_PATH = './database.sqlite';
let db;

export async function init() {
  db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });
}

export async function getCompetence() {
  const competence = await db.all('SELECT * FROM Competence');
  return competence;
}

export async function getCompetenceById(id) {
  const competency = await db.get('SELECT * FROM Competence WHERE id = ?', id);
  return competency;
}

export async function getPlacementDiary() {
  const placementDiary = await db.all('SELECT * FROM PlacementDiary ORDER BY Date DESC');
  return placementDiary;
}

export async function savePlacementDiary(newJob) {
  await db.run(
    'INSERT INTO PlacementDiary (id, date, work, exp, comp) VALUES (?, ?, ?, ?, ?)',
    [uuid(), newJob.date, newJob.work, newJob.exp, newJob.comp]
  );
  console.log('Placement diary updated:', newJob);
  return newJob;
}

export async function deletePlacementDiaryById(id) {
  await db.run('DELETE FROM PlacementDiary WHERE id = ?', id);
  console.log('Placement diary entry deleted:', id);
}

export async function getPlacementDiaryById(id) {
  const entry = await db.get('SELECT * FROM PlacementDiary WHERE id = ?', id);
  return entry;
}

export async function updatePlacementDiaryById(id, updatedJob) {
  await db.run(
    'UPDATE PlacementDiary SET date = ?, work = ?, exp = ?, comp = ? WHERE id = ?',
    [updatedJob.date, updatedJob.work, updatedJob.example, updatedJob.competence, id]
  );
  console.log(`Placement diary entry with id ${id} updated:`, updatedJob);
}