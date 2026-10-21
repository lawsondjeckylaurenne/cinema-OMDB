import { searchMovies } from '../api/omdb.js'
import { createMovieCard } from '../components/movieCard.js'
import { debounce } from '../utils/debounce.js'

const input = document.querySelector('#barre-recherche')
const message = document.querySelector('#message-recherche')
const results = document.querySelector('#resultats-recherche')
const loadMoreButton = document.querySelector('#bouton-plus-resultats')

let currentQuery = ''
let page = 1
let loadedCount = 0

function showError(error) {
    if (error.message === 'Movie not found!') {
        message.textContent = 'Aucun film trouvé.'
    } else if (error.message === 'Too many results.') {
        message.textContent = 'Trop de résultats, précisez votre recherche.'
    } else {
        message.textContent = `Erreur : ${error.message}`
    }
}

async function loadResults() {
    const query = currentQuery
    loadMoreButton.disabled = true

    try {
        const data = await searchMovies(query, page)

        if (query !== currentQuery) {
            return
        }

        data.results.forEach((movie) => {
            results.append(createMovieCard(movie))
        })

        loadedCount += data.results.length
        page++

        message.textContent = `${data.total} film(s) trouvé(s)`
        loadMoreButton.hidden = loadedCount >= data.total
    } catch (error) {
        if (query === currentQuery) {
            showError(error)
            loadMoreButton.hidden = true
        }
    }

    loadMoreButton.disabled = false
}

function newSearch() {
    currentQuery = input.value.trim()
    page = 1
    loadedCount = 0
    results.replaceChildren()
    loadMoreButton.hidden = true

    if (currentQuery.length === 0) {
        message.textContent = ''
        return
    }

    if (currentQuery.length < 3) {
        message.textContent = 'Tapez au moins 3 caractères.'
        return
    }

    message.textContent = 'Recherche en cours...'
    loadResults()
}

input.addEventListener('input', debounce(newSearch, 400))
loadMoreButton.addEventListener('click', loadResults)
