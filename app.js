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

fetchFilm();
fetchFilms();
