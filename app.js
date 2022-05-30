const fetchFilm = async () => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '891d1ad5',
      i: 'tt0848228',
    },
  });

  console.log(response.data);
};

const fetchFilms = async () => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '891d1ad5',
      s: 'batman',
    },
  });

  console.log(response.data);
};

// fetchFilm();
// fetchFilms();

const searchedData = async (searchTerm) => {
  const response = await axios.get('http://omdbapi.com/', {
    params: {
      apikey: '891d1ad5',
      s: searchTerm,
    },
  });

  console.log(response.data);
};

const input = document.querySelector('input');
let timeoutId;
const onInput = (event) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    searchedData(event.target.value);
  }, 400);
};
input.addEventListener('input', onInput);
