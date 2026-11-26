'use strict';

const iconPaths = {
  book: '<path d="M12 6c-2.5-1.8-5.5-2.2-9-1v14c3.5-1.2 6.5-.8 9 1 2.5-1.8 5.5-2.2 9-1V5c-3.5-1.2-6.5-.8-9 1v14"/>',
  cards: '<rect x="7" y="5" width="14" height="15" rx="2"/><path d="M4 16 2.5 7a2 2 0 0 1 1.6-2.3L14 3"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-12 5 2 2 4-4"/>',
  message: '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l1.5-3.5A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 10h8m-8 4h5"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18m-9-9a14 14 0 0 0 0 18m0-18a14 14 0 0 1 0 18"/>',
  flask: '<path d="M9 3h6m-5 0v7l-5.5 8A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 10V3m-6 12h8"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  sliders: '<path d="M4 6h4m4 0h8M4 12h8m4 0h4M4 18h4m4 0h8"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>',
  link: '<path d="M10 13a4 4 0 0 0 6 0l3-3a4 4 0 1 0-6-6l-2 2m2 5a4 4 0 0 0-6 0l-3 3a4 4 0 1 0 6 6l2-2"/>',
  flame: '<path d="M12 22c4 0 7-3 7-7 0-3-1.5-5-3-6-1 2-2 2.5-2 2.5C14 7 11 3 9 2c.5 3 0 5-2 8-2 2.5-2 4-2 5a7 7 0 0 0 7 7Z"/><path d="M12 22c-2 0-3-1.5-3-3 0-1.5 1-3 3-4 0 1.5 3 2 3 4 0 1.5-1 3-3 3Z"/>',
  repeat: '<path d="m16 2 4 4-4 4m-12 1V9a3 3 0 0 1 3-3h13M8 22l-4-4 4-4m12-1v2a3 3 0 0 1-3 3H4"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>'
};

function icon(name) {
  return '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + iconPaths[name] + '</svg>';
}

document.querySelectorAll('[data-icon]').forEach(element => {
  element.innerHTML = icon(element.dataset.icon);
});

const $ = id => document.getElementById(id);
const cardsByKey = new Map();
const cardsByWord = new Map();

groups.forEach((group, index) => {
  group.id = 'group-' + index;
  group.cards = group.entries.trim().split('\n').map(line => {
    const [word, meaning, note] = line.split('|');
    const card = { key: group.id + ':' + word, word, meaning, note, group };
    cardsByKey.set(card.key, card);
    if (!cardsByWord.has(word)) cardsByWord.set(word, card);
    return card;
  });
});

const allCards = Array.from(cardsByKey.values());
const uniqueCards = Array.from(cardsByWord.values());
const phraseCount = groups.at(-1).cards.length;
const core = coreWords.map(word => cardsByWord.get(word));
const decks = [
  { id: 'core', name: '核心 50 词', description: '优先熟悉阅读和翻译里实用的词义。', cards: core },
  { id: 'all', name: '全部词汇', description: '按分类顺序练习词表中的所有词条。', cards: allCards },
  { id: 'review', name: '错词复习', description: '标记为「不认识」的词条会留在这里。' },
  ...groups.map(group => ({ id: group.id, name: group.name, description: '集中练习这一类词条。', cards: group.cards }))
];
const decksById = new Map(decks.map(deck => [deck.id, deck]));

const storageKey = 'daily-english-vocab:v1';
const goals = [10, 20, 30, 50];
const newState = () => ({ goal: 20, marks: {}, days: {}, sessions: {}, activeDeck: 'core' });

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && typeof saved === 'object') {
      const stored = newState();
      for (const field of ['marks', 'days', 'sessions']) {
        if (saved[field] && typeof saved[field] === 'object' && !Array.isArray(saved[field])) {
          stored[field] = saved[field];
        }
      }
      if (goals.includes(saved.goal)) stored.goal = saved.goal;
      if (decksById.has(saved.activeDeck)) stored.activeDeck = saved.activeDeck;
      return stored;
    }
  } catch {
    $('storage-warning').hidden = false;
  }
  return newState();
}

let state = loadState();
let revealed = false;
let bankFilter = 'all';
let studyDate = dateKey();

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    $('storage-warning').hidden = false;
  }
}

function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function relativeDate(date, offset) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset, 12);
}

function reviewCards() {
  return uniqueCards.filter(card => state.marks[card.word]?.known === false)
    .map(card => cardsByKey.get(state.marks[card.word].key) ?? card);
}

function makeQueue(deck, fresh = false) {
  if (deck.id === 'review') return reviewCards().map(card => card.key);
  const source = deck.cards;
  if (fresh) return source.map(card => card.key);
  const newCards = source.filter(card => state.marks[card.word]?.known !== true);
  return (newCards.length ? newCards : source).map(card => card.key);
}

function currentSession() {
  const deck = decksById.get(state.activeDeck);
  const session = state.sessions[deck.id];
  if (session?.day === studyDate && Array.isArray(session.queue)) return session;
  const starting = { day: studyDate, queue: makeQueue(deck), index: 0 };
  state.sessions[deck.id] = starting;
  return starting;
}

function activeCard() {
  const session = currentSession();
  return cardsByKey.get(session.queue[session.index]);
}

function pickDeck(id, startAt) {
  state.activeDeck = id;
  revealed = false;
  if (id === 'review' && !startAt) delete state.sessions.review;
  if (startAt) {
    const deck = decksById.get(id);
    const queue = makeQueue(deck, true);
    state.sessions[id] = { day: studyDate, queue, index: Math.max(0, queue.indexOf(startAt)) };
  }
  save();
  renderStudy();
}

function renderStudy() {
  const deck = decksById.get(state.activeDeck);
  const session = currentSession();
  const card = activeCard();
  const reviewCount = reviewCards().length;
  const specialEmpty = deck.id === 'review' && !reviewCount;

  $('deck').value = deck.id;
  $('deck-description').textContent = deck.description;
  $('deck-name').textContent = deck.name;
  $('card-position').textContent = session.queue.length
    ? Math.min(session.index + 1, session.queue.length) + ' / ' + session.queue.length
    : '0 / 0';
  $('deck-bar').style.width = (session.queue.length
    ? Math.min(session.index + 1, session.queue.length) / session.queue.length * 100
    : 0) + '%';
  $('flashcard').hidden = !card;
  $('answers').hidden = !card;
  $('empty-card').hidden = Boolean(card);
  $('prev').disabled = session.index <= 0;
  $('next').disabled = !card || session.index >= session.queue.length - 1;
  $('review-link').disabled = !reviewCount || (deck.id === 'review' && Boolean(card));
  $('review-label').textContent = '复习错词' + (reviewCount ? ' · ' + reviewCount : '');

  if (!card) {
    $('empty-title').textContent = specialEmpty ? '暂无待复习的错词' : '这一轮练完了';
    $('empty-description').textContent = specialEmpty
      ? '练习时点「不认识」，词条就会收录到这里。'
      : '可以再练一轮，或从上方切换词组。';
    $('restart').textContent = specialEmpty ? '开始背核心词' : '再练一轮';
    return;
  }

  $('card-category').textContent = card.group.name;
  $('card-word').textContent = card.word;
  $('card-meaning').textContent = card.meaning;
  $('card-meaning').hidden = !revealed;
  $('card-note').textContent = card.note ?? '';
  $('card-note').hidden = !revealed || !card.note;
  $('flip-label').textContent = revealed ? '点击收起释义' : '点击查看中文释义';
  $('flashcard').setAttribute('aria-expanded', String(revealed));
  $('flashcard').setAttribute('aria-label', revealed ? card.word + '，' + card.meaning + '，收起中文释义' : card.word + '，查看中文释义');
}

function ensureCurrentDate() {
  const day = dateKey();
  if (day !== studyDate) {
    studyDate = day;
    revealed = false;
    renderStudy();
    renderProgress();
  }
}

function moveCard(step) {
  ensureCurrentDate();
  const session = currentSession();
  session.index = Math.max(0, Math.min(session.queue.length, session.index + step));
  revealed = false;
  save();
  renderStudy();
  const word = activeCard()?.word;
  $('live').textContent = word ? '当前词条 ' + word : '这一轮练完了';
}

function todayRecord() {
  return state.days[studyDate] ?? { answered: [], checked: false };
}

function updateCheckin(record) {
  if (record.answered.length >= state.goal) record.checked = true;
}

function grade(known) {
  const day = dateKey();
  if (day !== studyDate) {
    ensureCurrentDate();
    return;
  }
  const card = activeCard();
  if (!card) return;
  state.marks[card.word] = { known, key: card.key };
  const record = todayRecord();
  if (!record.answered.includes(card.word)) record.answered.push(card.word);
  const wasChecked = record.checked;
  updateCheckin(record);
  state.days[day] = record;
  moveCard(1);
  renderProgress();
  if (!wasChecked && record.checked) {
    $('live').textContent = '今日打卡完成。' + $('live').textContent;
  }
  if (!activeCard()) $('restart').focus();
}

function renderProgress() {
  const now = new Date();
  const record = todayRecord();
  const count = record.answered.length;
  const mastered = uniqueCards.filter(card => state.marks[card.word]?.known === true).length;
  const dateLabel = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
  const weekday = new Intl.DateTimeFormat('zh-CN', { weekday: 'short' });
  $('today-date').textContent = dateLabel.format(now);
  $('header-date').textContent = dateLabel.format(now);
  $('today-count').textContent = count;
  $('goal-count').textContent = '/ ' + state.goal + ' 词';
  $('goal-bar').style.width = Math.min(100, count / state.goal * 100) + '%';
  $('goal-progress').setAttribute('aria-valuemax', state.goal);
  $('goal-progress').setAttribute('aria-valuenow', Math.min(count, state.goal));
  $('goal-status').textContent = record.checked
    ? '今日已打卡'
    : '再练 ' + (state.goal - count) + ' 个不同词条即可打卡。';
  $('goal-status').classList.toggle('complete', record.checked);
  $('day-icon').innerHTML = icon(record.checked ? 'check-circle' : 'calendar');
  $('goal').value = String(state.goal);
  $('mastery-count').textContent = '已掌握 ' + mastered + ' / ' + uniqueCards.length + ' 个词条';
  $('mastery-bar').style.width = mastered / uniqueCards.length * 100 + '%';

  let streak = 0;
  let offset = record.checked ? 0 : -1;
  while (state.days[dateKey(relativeDate(now, offset))]?.checked) {
    streak++;
    offset--;
  }
  $('streak').textContent = '连续打卡 ' + streak + ' 天';
  const days = document.createDocumentFragment();
  for (let delta = -6; delta <= 0; delta++) {
    const date = relativeDate(now, delta);
    const checked = state.days[dateKey(date)]?.checked ?? false;
    const item = document.createElement('li');
    const label = document.createElement('span');
    const mark = document.createElement('span');
    label.textContent = delta === 0 ? '今天' : weekday.format(date).slice(-1);
    mark.className = 'day-mark';
    mark.classList.toggle('current', delta === 0);
    mark.classList.toggle('done', checked);
    if (checked) mark.innerHTML = icon('check');
    else mark.textContent = date.getDate();
    item.setAttribute('aria-label', dateLabel.format(date) + (checked ? '，已打卡' : '，未打卡'));
    item.append(label, mark);
    days.append(item);
  }
  $('week').replaceChildren(days);
}

function setupTopics() {
  for (const group of groups) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'topic';
    const symbol = document.createElement('span');
    symbol.className = 'topic-icon';
    symbol.innerHTML = icon(group.icon);
    const details = document.createElement('span');
    const name = document.createElement('strong');
    const count = document.createElement('small');
    name.textContent = group.name;
    count.textContent = group.cards.length + ' 个词条';
    details.append(name, count);
    button.append(symbol, details);
    button.addEventListener('click', () => {
      pickDeck(group.id);
      $('study').scrollIntoView({ block: 'start' });
      $('flashcard').focus({ preventScroll: true });
    });
    $('topic-grid').append(button);
  }
}

function setupBank() {
  const filters = [{ id: 'all', name: '全部' }, ...groups];
  for (const filter of filters) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter';
    button.dataset.filter = filter.id;
    button.textContent = filter.name;
    button.addEventListener('click', () => {
      bankFilter = filter.id;
      renderBank();
    });
    $('filters').append(button);
  }
}

function renderBank() {
  const query = $('search').value.trim().toLowerCase();
  const source = bankFilter === 'all' ? allCards : decksById.get(bankFilter).cards;
  const results = source.filter(card => [card.word, card.meaning, card.note ?? '']
    .some(text => text.toLowerCase().includes(query)));
  const fragment = document.createDocumentFragment();

  for (const card of results) {
    const row = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    const word = document.createElement('strong');
    word.lang = 'en';
    word.textContent = card.word;
    const meaning = document.createElement('span');
    meaning.className = 'meaning';
    meaning.textContent = card.meaning;
    const status = document.createElement('span');
    status.className = 'status';
    const mark = state.marks[card.word];
    status.textContent = mark ? (mark.known ? '已掌握' : '待复习') : card.group.name;
    button.append(word, meaning, status);
    button.addEventListener('click', () => {
      pickDeck(card.group.id, card.key);
      location.hash = 'study';
    });
    row.append(button);
    fragment.append(row);
  }

  $('word-list').replaceChildren(fragment);
  $('results-count').textContent = results.length ? results.length + ' 个结果' : '没有找到匹配的词条。';
  for (const filter of $('filters').children) {
    filter.setAttribute('aria-pressed', String(filter.dataset.filter === bankFilter));
  }
}

const pages = {
  study: ['英语一词汇打卡', '按做题优先级背词，从作者观点、逻辑关系和熟词僻义入手。'],
  bank: ['英语一词库', '阅读与翻译词汇按使用场景整理，可按分类查询。'],
  checkin: ['打卡记录', '查看今天的目标、最近七天的学习情况和累计掌握进度。']
};

function route(event) {
  const hash = location.hash.slice(1);
  const page = Object.hasOwn(pages, hash) ? hash : 'study';
  document.body.dataset.page = page;
  $('page-title').textContent = pages[page][0];
  $('page-description').textContent = pages[page][1];
  $('study').hidden = page !== 'study';
  $('topics').hidden = page !== 'study';
  $('bank').hidden = page !== 'bank';
  document.querySelectorAll('[data-page-link]').forEach(link => {
    if (link.dataset.pageLink === page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (page === 'bank') renderBank();
  if (event) {
    window.scrollTo(0, 0);
    $('page-title').focus({ preventScroll: true });
  }
}

for (const deck of decks) $('deck').add(new Option(deck.name, deck.id));
$('deck').addEventListener('change', () => pickDeck($('deck').value));
$('flashcard').addEventListener('click', () => {
  ensureCurrentDate();
  revealed = !revealed;
  renderStudy();
  const card = activeCard();
  if (card && revealed) $('live').textContent = card.meaning;
});
$('known').addEventListener('click', () => grade(true));
$('unknown').addEventListener('click', () => grade(false));
$('prev').addEventListener('click', () => moveCard(-1));
$('next').addEventListener('click', () => moveCard(1));
$('review-link').addEventListener('click', () => pickDeck('review'));
$('restart').addEventListener('click', () => {
  const deck = decksById.get(state.activeDeck);
  if (deck.id === 'review' && !reviewCards().length) {
    pickDeck('core', core[0].key);
  } else {
    state.sessions[deck.id] = { day: studyDate, queue: makeQueue(deck, true), index: 0 };
    revealed = false;
    save();
    renderStudy();
  }
  $('flashcard').focus();
});
$('goal').addEventListener('change', () => {
  const goal = Number($('goal').value);
  ensureCurrentDate();
  state.goal = goal;
  const record = todayRecord();
  updateCheckin(record);
  if (record.answered.length) state.days[studyDate] = record;
  save();
  renderProgress();
});
$('search').addEventListener('input', renderBank);
window.addEventListener('hashchange', route);
window.addEventListener('focus', ensureCurrentDate);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) ensureCurrentDate();
});
window.setInterval(ensureCurrentDate, 30000);
window.addEventListener('storage', event => {
  if (event.key !== storageKey && event.key !== null) return;
  state = loadState();
  revealed = false;
  renderStudy();
  renderProgress();
  if (document.body.dataset.page === 'bank') renderBank();
});

$('word-count').textContent = (uniqueCards.length - phraseCount) + ' 个单词 · ' + phraseCount + ' 个短语';
setupTopics();
setupBank();
renderStudy();
renderProgress();
route();
