export const DEFAULT_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Groceries',
  'Others',
];

const USERS_KEY = 'expense-tracker:users';
const CURRENT_USER_KEY = 'expense-tracker:current-user';
const DATA_PREFIX = 'expense-tracker:data:';

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const parseJson = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const normalizeEmail = (value = '') => value.trim().toLowerCase();

const getDefaultWorkspace = () => ({
  expenses: [],
  categories: [...DEFAULT_CATEGORIES],
  budgets: {},
  wallet: { amount: 0, month: '', setDate: '' },
  income: [],
});

const normalizeWorkspace = (workspace = {}) => ({
  expenses: Array.isArray(workspace.expenses) ? workspace.expenses : [],
  categories: Array.isArray(workspace.categories) && workspace.categories.length ? workspace.categories : [...DEFAULT_CATEGORIES],
  budgets: workspace.budgets && typeof workspace.budgets === 'object' ? workspace.budgets : {},
  wallet: workspace.wallet && typeof workspace.wallet === 'object'
    ? { amount: 0, month: '', setDate: '', ...workspace.wallet }
    : { amount: 0, month: '', setDate: '' },
  income: Array.isArray(workspace.income) ? workspace.income : [],
});

const safeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

const getUsers = () => parseJson(localStorage.getItem(USERS_KEY), []);

const setUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getWorkspaceKey = (userId) => `${DATA_PREFIX}${userId}`;

export const getCurrentLocalUser = () => parseJson(localStorage.getItem(CURRENT_USER_KEY), null);

export const setCurrentLocalUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const clearCurrentLocalUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const registerLocalUser = ({ name, email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const trimmedPassword = password.trim();
  const users = getUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error('यह ईमेल पहले से उपयोग में है (Email already in use)');
  }

  const newUser = {
    id: createId(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: trimmedPassword,
  };

  users.push(newUser);
  setUsers(users);

  const user = safeUser(newUser);
  setCurrentLocalUser(user);
  return user;
};

export const authenticateLocalUser = ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const trimmedPassword = password.trim();
  const users = getUsers();
  const user = users.find((item) => item.email === normalizedEmail);

  if (!user || user.passwordHash !== trimmedPassword) {
    throw new Error('अमान्य क्रेडेंशियल (Invalid credentials)');
  }

  const safe = safeUser(user);
  setCurrentLocalUser(safe);
  return safe;
};

export const resetLocalPassword = ({ email, newPassword, confirmPassword }) => {
  const normalizedEmail = normalizeEmail(email);

  if (!email || !newPassword || !confirmPassword) {
    throw new Error('कृपया ईमेल, नया पासवर्ड और confirm password भरें (Please fill email, new password and confirm password)');
  }

  if (newPassword.trim() !== confirmPassword.trim()) {
    throw new Error('पासवर्ड मेल नहीं खा रहे (Passwords do not match)');
  }

  const users = getUsers();
  const userIndex = users.findIndex((item) => item.email === normalizedEmail);

  if (userIndex === -1) {
    throw new Error('इस ईमेल से कोई अकाउंट नहीं मिला (No account found for this email)');
  }

  users[userIndex] = {
    ...users[userIndex],
    passwordHash: newPassword.trim(),
  };

  setUsers(users);
  return safeUser(users[userIndex]);
};

export const updateLocalUserProfile = ({ userId, name, email }) => {
  const normalizedEmail = normalizeEmail(email);
  const users = getUsers();
  const userIndex = users.findIndex((item) => item.id === userId);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const emailInUse = users.some((item, index) => index !== userIndex && item.email === normalizedEmail);
  if (emailInUse) {
    throw new Error('Email already in use');
  }

  users[userIndex] = {
    ...users[userIndex],
    name: name.trim(),
    email: normalizedEmail,
  };

  setUsers(users);

  const user = safeUser(users[userIndex]);
  setCurrentLocalUser(user);
  return user;
};

export const getWorkspaceData = (userId) => {
  const workspace = parseJson(localStorage.getItem(getWorkspaceKey(userId)), null);
  return normalizeWorkspace(workspace || getDefaultWorkspace());
};

export const saveWorkspaceData = (userId, workspace) => {
  localStorage.setItem(getWorkspaceKey(userId), JSON.stringify(normalizeWorkspace(workspace)));
};

export const resetWorkspaceData = (userId) => {
  saveWorkspaceData(userId, getDefaultWorkspace());
};

export const createEmptyWorkspace = getDefaultWorkspace;