export const storageService = {
  load: loadFromStorage,
  save: saveToStorage,
};

function saveToStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value) || "null");
}

function loadFromStorage(key: string) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}
