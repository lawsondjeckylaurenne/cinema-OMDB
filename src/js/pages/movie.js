import { getMovieById } from '../api/omdb.js'
import { formatDate } from '../utils/formatDate.js'

const NO_POSTER = '/images/no-poster.png'

const message = document.querySelector('#message-film')
const details = document.querySelector('#details-film')

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

function showRatings(ratings) {
    const list = document.querySelector('#film-notes')

    if (ratings.length === 0) {
        const item = document.createElement('li')
        item.textContent = 'Aucune note disponible'
        list.append(item)
        return
    }

    ratings.forEach((rating) => {
        const item = document.createElement('li')
        item.textContent = `${rating.Source} : ${rating.Value}`
        list.append(item)
    })
}

async function showMovie() {
    details.hidden = true

    if (!id) {
        message.textContent = 'Aucun film sélectionné. Utilisez la recherche pour trouver un film.'
        return
    }

    message.textContent = 'Chargement...'

    try {
        const movie = await getMovieById(id, 'full')

        document.title = `${movie.Title}-Cinéma`

        const poster = document.querySelector('#film-poster')
        poster.src = movie.Poster !== 'N/A' ? movie.Poster : NO_POSTER
        poster.alt = `Affiche du film ${movie.Title}`

        document.querySelector('#film-titre').textContent = movie.Title
        document.querySelector('#film-genre').textContent = movie.Genre
        document.querySelector('#film-acteurs').textContent = movie.Actors
        document.querySelector('#film-resume').textContent = movie.Plot
        document.querySelector('#film-dvd').textContent = formatDate(movie.DVD)

        showRatings(movie.Ratings)

        message.textContent = ''
        details.hidden = false
    } catch (error) {
        message.textContent = `Erreur : ${error.message}`
    }
}

showMovie()
