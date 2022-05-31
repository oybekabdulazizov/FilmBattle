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
const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For A Film</b></label>
    <input class='input'/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    </div>
`;
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async (event) => {
  const films = await searchData(event.target.value);

  if (!films.length) {
    dropdown.classList.remove('is-active');
    return;
  }

  resultsWrapper.innerHTML = ``;

  dropdown.classList.add('is-active');
  for (let film of films) {
    const option = document.createElement('a');
    const imgSrc =
      film.Poster === 'N/A' ? 'assets/film-placeholder.jpg' : film.Poster;

    option.classList.add('dropdown-item');
    option.innerHTML = `
        <img src="${imgSrc}" /> 
        ${film.Title}
    `;

    option.addEventListener('click', () => {
      dropdown.classList.remove('is-active');
      input.value = `${film.Title}`;
    });

    resultsWrapper.appendChild(option);
  }
};
input.addEventListener('input', debounce(onInput, 400));

document.addEventListener('click', (event) => {
  if (!root.contains(event.targe)) {
    dropdown.classList.remove('is-active');
  }
});
