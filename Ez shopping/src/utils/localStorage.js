// Ajouter / remplacer une clef et sa valeur (objet) dans le localStorage
export const addToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Récupère et retourne une valeur du localStorage grâce à sa clef
export const getFromLocalStorage = (key) => {
  console.log(localStorage.getItem(key));
  const data = localStorage.getItem(key);
  return JSON.parse(data);
};

// Vérifier si une clef est présente dans le localStorage
export const isKeyInLocalStorage = (key) => {
  if (localStorage.getItem(key) !== null) {
    return true;
  }
  return false;
};

export const addToLocalStorageFromMiddleware = (key, value) => {
  const existingData = JSON.parse(localStorage.getItem(key)) || [];
  const newData = [...existingData, value];
  if (!existingData.includes(value)) {
    localStorage.setItem(key, JSON.stringify(newData));
    return;
  }
  return;
};
