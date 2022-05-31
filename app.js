 createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption(film) {
        const imgSrc =
            film.Poster === 'N/A' ? 'assets/film-placeholder.jpg' : film.Poster;

        return `
            <img src="${imgSrc}" /> 
            ${film.Title} (${film.Year})
        `;
    },
    onOptionSelect(film) {
        onFilmSelect(film);
    },
    inputValue(film) {
        return film.Title;
    }, 
    async fetchData(searchTerm) {
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
    }
});

const onFilmSelect = async (film) => {
    const response = await axios.get('http://omdbapi.com/', {
        params: {
            apikey: '891d1ad5',
            i: film.imdbID,
        },
    });

    document.querySelector('#summary').innerHTML = filmTemplate(response.data);
};

const filmTemplate = (filmDetail) => {
    return `
        <article>
            <figure>
                <p class="image">
                    <img src="${filmDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${filmDetail.Title}</h1>
                    <h4>${filmDetail.Genre}</h4>
                    <p>${filmDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${filmDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${filmDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${filmDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${filmDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${filmDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};
