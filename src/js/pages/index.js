
import { getMovieById, searchMovies } from '../api/omdb.js'
import { createMovieCard } from '../components/movieCard.js'

const TRENDING_IDS = [
    'tt15239678',
    'tt6263850',
    'tt22022452',
    'tt9218128',
    'tt1262426',
    'tt12037194',
    'tt15398776',
    'tt6791350'
]

const SEARCH_WORD_2024 = 'love'

const container = document.querySelector('#films-tendances')
const loadMoreButton = document.querySelector('#bouton-plus-films')

let page = 1
let loadedCount = 0

async function showTrendingMovies() {
    container.textContent = 'Chargement des films...'

    try {
        const movies = await Promise.all(
            TRENDING_IDS.map((id) => getMovieById(id))
        )

        container.textContent = ''
        movies.forEach((movie) => {
            container.append(createMovieCard(movie))
        })
    } catch (error) {
        container.textContent = 'Impossible de charger les films tendances.'
    }
}

async function loadMoreMovies() {
    loadMoreButton.disabled = true
    loadMoreButton.textContent = 'Chargement...'

    try {
        const data = await searchMovies(SEARCH_WORD_2024, page, 2024)

        data.results.forEach((movie) => {
            container.append(createMovieCard(movie))
        })

        loadedCount += data.results.length
        page++

        if (loadedCount >= data.total) {
            loadMoreButton.hidden = true
        }
    } catch (error) {
        loadMoreButton.hidden = true
    }

    loadMoreButton.disabled = false
    loadMoreButton.textContent = 'Voir plus de films de 2024'
}

loadMoreButton.addEventListener('click', loadMoreMovies)

showTrendingMovies()
