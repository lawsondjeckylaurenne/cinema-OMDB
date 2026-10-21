import { truncate } from '../utils/truncate.js'

const NO_POSTER = '/images/no-poster.jpg'

export function createMovieCard(movie) {
    const card = document.createElement('article')
    card.classList.add('film-carte')

    const image = document.createElement('img')
    image.classList.add('film-carte__image')
    image.src = movie.Poster !== 'N/A' ? movie.Poster : NO_POSTER
    image.alt = `Affiche du film ${movie.Title}`
    image.loading = 'lazy'
    image.addEventListener('error', () => {
        image.src = NO_POSTER
    })

    const content = document.createElement('div')
    content.classList.add('film-carte__contenu')

    const title = document.createElement('h3')
    title.classList.add('film-carte__nom')
    title.textContent = `${movie.Title} (${movie.Year})`
    content.append(title)

    if (movie.Plot && movie.Plot !== 'N/A') {
        const summary = document.createElement('p')
        summary.classList.add('film-carte__resume')
        summary.textContent = truncate(movie.Plot, 100)
        content.append(summary)
    }

    const link = document.createElement('a')
    link.classList.add('bouton', 'bouton--secondaire', 'film-carte__bouton')
    link.href = `movie.html?id=${movie.imdbID}`
    link.textContent = 'En savoir plus'
    content.append(link)

    card.append(image, content)
    return card
}
