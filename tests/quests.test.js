import test from 'node:test';
import assert from 'node:assert/strict';

import {
  QUESTS,
  CATEGORIES,
  DIFFICULTIES,
  filterQuests,
  chooseQuest,
  getQuestById,
  formatDuration,
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

test('each category has a balanced set of quests', () => {
  for (const category of CATEGORIES) {
    const questsInCategory = QUESTS.filter((quest) => quest.category === category);
    assert.ok(
      questsInCategory.length >= 6,
      `Expected at least 6 quests in category "${category}", found ${questsInCategory.length}`
    );
  }
});

test('each difficulty tier is represented in the quest catalog', () => {
  for (const difficulty of DIFFICULTIES) {
    const questsInDifficulty = QUESTS.filter((quest) => quest.difficulty === difficulty);
    assert.ok(
      questsInDifficulty.length >= 4,
      `Expected at least 4 quests in difficulty "${difficulty}", found ${questsInDifficulty.length}`
    );
  }
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

test('filterQuests handles case-insensitivity and whitespace trimming', () => {
  const lowerCase = filterQuests({ category: 'nature', difficulty: 'easy' });
  assert.ok(lowerCase.length > 0);
  assert.ok(lowerCase.every((q) => q.category === 'Nature' && q.difficulty === 'Easy'));

  const upperCase = filterQuests({ category: 'MOVEMENT', difficulty: 'MEDIUM' });
  assert.ok(upperCase.length > 0);
  assert.ok(upperCase.every((q) => q.category === 'Movement' && q.difficulty === 'Medium'));

  const padded = filterQuests({ category: '  Creativity  ', difficulty: '  Easy  ' });
  assert.ok(padded.length > 0);
  assert.ok(padded.every((q) => q.category === 'Creativity' && q.difficulty === 'Easy'));
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

test('chooseQuest returns null when filter matches zero quests', () => {
  const result = chooseQuest({ category: 'NonExistentCategory' });
  assert.equal(result, null);
});

test('getQuestById returns a matching quest and null for missing ids', () => {
  const quest = getQuestById('observation-001');
  assert.ok(quest);
  assert.equal(quest.title.length > 0, true);

  const missing = getQuestById('missing-id');
  assert.equal(missing, null);
});

test('formatDuration formats seconds to MM:SS with zero padding and handles edge cases', () => {
  assert.equal(formatDuration(0), '00:00');
  assert.equal(formatDuration(5), '00:05');
  assert.equal(formatDuration(59), '00:59');
  assert.equal(formatDuration(60), '01:00');
  assert.equal(formatDuration(125), '02:05');
  assert.equal(formatDuration(600), '10:00');
  assert.equal(formatDuration(-10), '00:00');
  assert.equal(formatDuration(NaN), '00:00');
});
