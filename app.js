const searchData = async (searchTerm) => {
  const response = await axios.get('http://omdbapi.com/', {
    params: {
      apikey: '891d1ad5',
      s: searchTerm,
    },
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const input = document.querySelector('input');
const onInput = async (event) => {
  const films = await searchData(event.target.value);
  for (let film of films) {
    const div = document.createElement('div');
    div.innerHTML = `
        <img src="${film.Poster}}" />
        <h1>${film.Title}</h1>
    `;

    document.querySelector('#target').appendChild(div);
  }
};
input.addEventListener('input', debounce(onInput, 400));
