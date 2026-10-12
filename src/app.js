import {
  CATEGORIES,
  DIFFICULTIES,
  chooseQuest,
  filterQuests,
  getQuestById,
} from './quests.js';

const categorySelect = document.querySelector('#category-select');
const difficultySelect = document.querySelector('#difficulty-select');
const newQuestButton = document.querySelector('#new-quest-btn');
const questTitle = document.querySelector('#quest-title');
const questCategory = document.querySelector('#quest-category');
const questDifficulty = document.querySelector('#quest-difficulty');
const questDuration = document.querySelector('#quest-duration');
const questInstructions = document.querySelector('#quest-instructions');
const emptyState = document.querySelector('#empty-state');
const sessionSummary = document.querySelector('#session-summary');
const statusRegion = document.querySelector('#status-region');
const timerDisplay = document.querySelector('#timer-display');
const startButton = document.querySelector('#start-timer-btn');
const pauseButton = document.querySelector('#pause-timer-btn');
const resetButton = document.querySelector('#reset-timer-btn');
const completeButton = document.querySelector('#complete-quest-btn');
const timerButtons = document.querySelectorAll('.timer-btn');
const pocketModePanel = document.querySelector('.pocket-mode');
const timerPanel = document.querySelector('.timer-panel');

const state = {
  selectedCategory: '',
  selectedDifficulty: '',
  currentQuestId: null,
  recentIds: [],
  completedIds: new Set(),
  timerMinutes: 2,
  remainingSeconds: 120,
  isRunning: false,
  timerId: null,
  timerEndTimestamp: null,
};

function setStatus(message) {
  statusRegion.textContent = message;
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function syncTimerDisplay() {
  timerDisplay.textContent = formatDuration(state.remainingSeconds);
}

function updatePocketModeState() {
  const active = state.isRunning;
  pocketModePanel.classList.toggle('is-active', active);
  timerPanel.classList.toggle('is-active', active);
}

function clearTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  state.isRunning = false;
  state.timerEndTimestamp = null;
  updatePocketModeState();
}

function resetTimer() {
  clearTimer();
  state.remainingSeconds = state.timerMinutes * 60;
  syncTimerDisplay();
  setStatus('Timer reset. Ready for your next challenge.');
}

function completeCurrentQuest() {
  if (!state.currentQuestId) {
    setStatus('Choose a quest before marking it complete.');
    return;
  }

  state.completedIds.add(state.currentQuestId);
  sessionSummary.textContent = `Completed this session: ${state.completedIds.size}`;
  setStatus('Quest complete. Nice work — you have earned another one.');

  clearTimer();
  state.remainingSeconds = state.timerMinutes * 60;
  syncTimerDisplay();
  selectNextQuest(true);
}

function startTimer() {
  if (!state.currentQuestId) {
    setStatus('Choose a quest before starting the timer.');
    return;
  }

  if (state.isRunning) {
    return;
  }

  if (state.remainingSeconds <= 0) {
    state.remainingSeconds = state.timerMinutes * 60;
  }

  state.isRunning = true;
  updatePocketModeState();
  state.timerEndTimestamp = Date.now() + state.remainingSeconds * 1000;

  state.timerId = window.setInterval(() => {
    const delta = Math.max(0, state.timerEndTimestamp - Date.now());
    state.remainingSeconds = Math.ceil(delta / 1000);
    syncTimerDisplay();

    if (delta <= 0) {
      clearTimer();
      state.remainingSeconds = 0;
      syncTimerDisplay();
      setStatus('Timer complete. Take a moment to notice what you accomplished.');
      return;
    }
  }, 250);

  setStatus('Timer started. Pocket Mode is on. Put the screen away and focus on the quest.');
}

function pauseTimer() {
  if (!state.isRunning) {
    return;
  }

  if (state.timerEndTimestamp !== null) {
    const remainingMs = Math.max(0, state.timerEndTimestamp - Date.now());
    state.remainingSeconds = Math.ceil(remainingMs / 1000);
  }

  clearTimer();
  syncTimerDisplay();
  setStatus('Timer paused. Resume when you are ready.');
}

function renderQuest(quest) {
  if (!quest) {
    questTitle.textContent = 'No quest available';
    questCategory.textContent = 'Category';
    questDifficulty.textContent = 'Difficulty';
    questDuration.textContent = 'Duration';
    questInstructions.textContent = 'No quests match your current filter. Try a different combination.';
    return;
  }

  questTitle.textContent = quest.title;
  questCategory.textContent = `Category: ${quest.category}`;
  questDifficulty.textContent = `Difficulty: ${quest.difficulty}`;
  questDuration.textContent = `Suggested duration: ${quest.duration} min`;
  questInstructions.textContent = quest.instructions;
}

function updateEmptyState(hasQuest) {
  emptyState.hidden = hasQuest;
}

function selectNextQuest(announce = false) {
  const matches = filterQuests({
    category: state.selectedCategory || null,
    difficulty: state.selectedDifficulty || null,
  });

  if (matches.length === 0) {
    state.currentQuestId = null;
    renderQuest(null);
    updateEmptyState(false);
    setStatus('No quests match the current filters. Try a different category or difficulty.');
    return null;
  }

  const quest = chooseQuest({
    category: state.selectedCategory || null,
    difficulty: state.selectedDifficulty || null,
    recentIds: state.recentIds,
  });

  if (!quest) {
    state.currentQuestId = null;
    renderQuest(null);
    updateEmptyState(false);
    return null;
  }

  state.currentQuestId = quest.id;
  state.recentIds = [quest.id, ...state.recentIds].slice(0, 6);
  renderQuest(quest);
  updateEmptyState(true);

  if (announce) {
    setStatus(`New quest selected: ${quest.title}.`);
  }

  return quest;
}

function syncSelectedControls() {
  if (categorySelect) {
    categorySelect.value = state.selectedCategory;
  }

  if (difficultySelect) {
    difficultySelect.value = state.selectedDifficulty;
  }
}

function updateTimerPresetButtons() {
  timerButtons.forEach((button) => {
    const isActive = Number(button.dataset.minutes) === state.timerMinutes;
    button.setAttribute('aria-pressed', String(isActive));
    button.classList.toggle('is-active', isActive);
  });
}

function setTimerPreset(minutes) {
  state.timerMinutes = minutes;
  state.remainingSeconds = minutes * 60;
  clearTimer();
  syncTimerDisplay();
  updateTimerPresetButtons();
  setStatus(`Timer preset set to ${minutes} minutes.`);
}

function initializeFilterOptions() {
  const categoryOptions = ['<option value="">All categories</option>']
    .concat(CATEGORIES.map((category) => `<option value="${category}">${category}</option>`))
    .join('');

  const difficultyOptions = ['<option value="">All difficulties</option>']
    .concat(DIFFICULTIES.map((difficulty) => `<option value="${difficulty}">${difficulty}</option>`))
    .join('');

  categorySelect.innerHTML = categoryOptions;
  difficultySelect.innerHTML = difficultyOptions;
}

function initializePage() {
  initializeFilterOptions();
  syncSelectedControls();
  updateTimerPresetButtons();
  updatePocketModeState();
  syncTimerDisplay();
  sessionSummary.textContent = `Completed this session: ${state.completedIds.size}`;
  selectNextQuest();
  setStatus('Pocket Quest is ready. Pick a challenge and start your timer.');
}

categorySelect.addEventListener('change', (event) => {
  state.selectedCategory = event.target.value;
  clearTimer();
  state.remainingSeconds = state.timerMinutes * 60;
  syncTimerDisplay();
  selectNextQuest(true);
});

difficultySelect.addEventListener('change', (event) => {
  state.selectedDifficulty = event.target.value;
  clearTimer();
  state.remainingSeconds = state.timerMinutes * 60;
  syncTimerDisplay();
  selectNextQuest(true);
});

newQuestButton.addEventListener('click', () => {
  const selectedQuest = getQuestById(state.currentQuestId);
  const recentIds = selectedQuest ? [selectedQuest.id, ...state.recentIds] : state.recentIds;
  const quest = chooseQuest({
    category: state.selectedCategory || null,
    difficulty: state.selectedDifficulty || null,
    recentIds,
  });

  if (!quest) {
    setStatus('No additional quests are available with these filters. Try broadening the search.');
    return;
  }

  state.currentQuestId = quest.id;
  state.recentIds = [quest.id, ...state.recentIds].slice(0, 6);
  renderQuest(quest);
  updateEmptyState(true);
  clearTimer();
  state.remainingSeconds = state.timerMinutes * 60;
  syncTimerDisplay();
  setStatus(`New quest selected: ${quest.title}.`);
});

startButton.addEventListener('click', () => {
  startTimer();
});

pauseButton.addEventListener('click', () => {
  pauseTimer();
});

resetButton.addEventListener('click', () => {
  resetTimer();
});

completeButton.addEventListener('click', () => {
  completeCurrentQuest();
});

timerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const minutes = Number(button.dataset.minutes);
    setTimerPreset(minutes);
  });
});

window.addEventListener('beforeunload', () => {
  clearTimer();
});

initializePage();
