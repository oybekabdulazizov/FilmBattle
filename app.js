const autoCompleteConfig = {
    renderOption(film) {
        const imgSrc =
            film.Poster === 'N/A' ? 'assets/film-placeholder.jpg' : film.Poster;

        return `
            <img src="${imgSrc}" /> 
            ${film.Title} (${film.Year})
        `;
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
};

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(film) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onFilmSelect(film, document.querySelector('#left-summary'), 'left');
    },
});

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'), 
    onOptionSelect(film) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onFilmSelect(film, document.querySelector('#right-summary'), 'right');
    },
});


let leftFilm;
let rightFilm;
const onFilmSelect = async (film, summaryTarget, side) => {
    const response = await axios.get('http://omdbapi.com/', {
        params: {
            apikey: '891d1ad5',
            i: film.imdbID,
        },
    });

    summaryTarget.innerHTML = filmTemplate(response.data);
    
    if (side === 'left') {
        leftFilm = response.data;
    } else {
        rightFilm = response.data;
    }

    if (leftFilm && rightFilm) {
        runComparison();
    }
};

const runComparison = () => {
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];

        const leftSideValue = parseFloat(leftStat.dataset.value);
        const rightSideValue = parseFloat(rightStat.dataset.value);

        if (leftSideValue > rightSideValue) {
            rightStat.classList.remove('is-primary');
            rightStat.classList.remove('is-success');
            rightStat.classList.add('is-warning');

            leftStat.classList.remove('is-primary');
            leftStat.classList.remove('is-warning');
            leftStat.classList.add('is-success');
        } else if (leftSideValue < rightSideValue) {
            leftStat.classList.remove('is-primary');
            leftStat.classList.remove('is-success')
            leftStat.classList.add('is-warning');

            rightStat.classList.remove('is-primary');
            rightStat.classList.remove('is-warning');
            rightStat.classList.add('is-success');
        } else if (leftSideValue == rightSideValue) {
             leftStat.classList.remove('is-primary');
             leftStat.classList.remove('is-success');
             leftStat.classList.remove('is-warning')
             leftStat.classList.add('is-light');
             
             rightStat.classList.remove('is-primary');
             rightStat.classList.remove('is-success');
             rightStat.classList.remove('is-warning');
             rightStat.classList.add('is-light');
        } else {
             rightStat.classList.remove('is-primary');
             leftStat.classList.remove('is-primary');
        } 
    });
}

const filmTemplate = (filmDetail) => {
    const boxOffice = parseInt(filmDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(filmDetail.Metascore);
    const imdbRating = parseFloat(filmDetail.imdbRating)
    const imdbVotes = parseInt(filmDetail.imdbVotes.replace(/,/g, ''));

    const awards = filmDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);

        if (isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }
    }, 0);

    return `
        <article class="poster-plot">
            <figure>
                <p class="image">
                    <img src="${filmDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h3>${filmDetail.Title} (${filmDetail.Year})</h3>
                    <h6>${filmDetail.Genre}</h6>
                    <p>${filmDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article data-value=${awards} class="notification is-primary">
            <p class="title">${filmDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${boxOffice} class="notification is-primary">
            <p class="title">${filmDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${metascore} class="notification is-primary">
            <p class="title">${filmDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRating} class="notification is-primary">
            <p class="title">${filmDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${imdbVotes} class="notification is-primary">
            <p class="title">${filmDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};
