import test from 'node:test';
import assert from 'node:assert/strict';

import {
  QUESTS,
  CATEGORIES,
  DIFFICULTIES,
  filterQuests,
  chooseQuest,
  getQuestById,
} from '../src/quests.js';

test('quest data has at least 24 entries with valid metadata', () => {
  assert.ok(Array.isArray(QUESTS));
  assert.ok(QUESTS.length >= 24);

  for (const quest of QUESTS) {
    assert.ok(typeof quest.id === 'string' && quest.id.length > 0);
    assert.ok(typeof quest.title === 'string' && quest.title.length > 0);
    assert.ok(CATEGORIES.includes(quest.category));
    assert.ok(DIFFICULTIES.includes(quest.difficulty));
    assert.ok(Number.isInteger(quest.duration) && quest.duration > 0);
    assert.ok(typeof quest.instructions === 'string' && quest.instructions.length > 0);
  }

  const ids = QUESTS.map((quest) => quest.id);
  assert.equal(new Set(ids).size, QUESTS.length);
});

test('filterQuests applies category and difficulty filters together', () => {
  const categoryResult = filterQuests({ category: 'Nature' });
  assert.ok(categoryResult.every((quest) => quest.category === 'Nature'));

  const difficultyResult = filterQuests({ difficulty: 'Easy' });
  assert.ok(difficultyResult.every((quest) => quest.difficulty === 'Easy'));

  const combinedResult = filterQuests({ category: 'Movement', difficulty: 'Medium' });
  assert.ok(combinedResult.length > 0);
  assert.ok(combinedResult.every((quest) => quest.category === 'Movement' && quest.difficulty === 'Medium'));
});

test('filterQuests handles empty match and invalid input gracefully', () => {
  const noMatch = filterQuests({ category: 'Observation', difficulty: 'Adventurous' });
  assert.deepEqual(noMatch, []);

  const invalidCategory = filterQuests({ category: 'Unknown' });
  assert.deepEqual(invalidCategory, []);

  const invalidDifficulty = filterQuests({ difficulty: 'Unknown' });
  assert.deepEqual(invalidDifficulty, []);

  const trimmedFilters = filterQuests({ category: ' Nature ', difficulty: ' Easy ' });
  assert.ok(trimmedFilters.length > 0);
  assert.ok(trimmedFilters.every((quest) => quest.category === 'Nature' && quest.difficulty === 'Easy'));
});

test('chooseQuest prefers unseen quests without relying on randomness', () => {
  const first = chooseQuest({ recentIds: [] });
  assert.ok(first);

  const next = chooseQuest({ recentIds: [first.id] });
  assert.ok(next);
  assert.notEqual(next.id, first.id);

  const allButOne = QUESTS.filter((quest) => quest.id !== first.id).map((quest) => quest.id);
  const repeatAware = chooseQuest({ recentIds: allButOne });
  assert.equal(repeatAware.id, first.id);
});

test('chooseQuest remains deterministic when all results are already recent', () => {
  const observationIds = QUESTS.filter((quest) => quest.category === 'Observation').map((quest) => quest.id);
  const recentIds = [...observationIds, observationIds[0]];

  const result = chooseQuest({ category: 'Observation', recentIds });

  assert.ok(result);
  assert.ok(observationIds.includes(result.id));
});

test('getQuestById returns a matching quest and null for missing ids', () => {
  const quest = getQuestById('observation-001');
  assert.ok(quest);
  assert.equal(quest.title.length > 0, true);

  const missing = getQuestById('missing-id');
  assert.equal(missing, null);
});
