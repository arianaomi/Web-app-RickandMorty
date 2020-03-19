async function getAllCharacters() {
  const response = await fetch("https://rickandmortyapi.com/api/character/");

  const parseJson = await response.json();
  return parseJson.results;
}

async function getCharactersById(id) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );

  const parseJson = await response.json();
  return parseJson;
}

export default {
  getAllCharacters,
  getCharactersById
};
