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
const onInput = debounce((event) => {
  searchedData(event.target.value);
});
input.addEventListener('input', onInput);
