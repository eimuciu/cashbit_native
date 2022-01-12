import config from './config.json';

export function loadExpenses(accessToken) {
  return fetch(`${config.apiUrl}/data/expense`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export function loadIncome(accessToken) {
  return fetch(`${config.apiUrl}/data/income`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export function addExpense(expense, accessToken) {
  return fetch(`${config.apiUrl}/data/expense`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(expense),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export function addIncome(income, accessToken) {
  return fetch(`${config.apiUrl}/data/income`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(income),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export function deleteIncome(income, accessToken) {
  return fetch(`${config.apiUrl}/data/income/${income._id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function deleteExpense(expense, accessToken) {
  return fetch(`${config.apiUrl}/data/expense/${expense._id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function updateIncome(income, accessToken) {
  return fetch(`${config.apiUrl}/data/income`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(income),
  });
}

export function updateExpense(expense, accessToken) {
  return fetch(`${config.apiUrl}/data/expense`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(expense),
  });
}

export function loadSettings(settings, accessToken) {
  return fetch(`${config.apiUrl}/data/settings`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(settings),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export function updateSettings(settings, accessToken) {
  fetch(`${config.apiUrl}/data/settings_update`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(settings),
  }).catch(err => console.log(err));
}
