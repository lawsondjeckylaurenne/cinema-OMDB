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

const HERO_IDS = [
    'tt2015381',
    'tt0816692',
    'tt4154796',
    'tt9362722'
]
const HERO_DELAY = 5000

const heroSlides = document.querySelector('#hero-slides')
const heroDots = document.querySelector('#hero-points')

let currentSlide = 0
let heroTimer

const container = document.querySelector('#films-tendances')
const loadMoreButton = document.querySelector('#bouton-plus-films')

let page = 1
let loadedCount = 0

function createHeroSlide(movie) {
    const slide = document.createElement('div')
    slide.classList.add('hero__slide')

    if (movie.Poster !== 'N/A') {
        const image = document.createElement('img')
        image.classList.add('hero__image')
        image.src = movie.Poster.replace('SX300', 'SX1000')
        image.alt = ''
        image.addEventListener('error', () => {
            image.hidden = true
        })
        slide.append(image)
    }

    const text = document.createElement('div')
    text.classList.add('hero__texte')

    const subtitle = document.createElement('p')
    subtitle.classList.add('hero__sous-titre')
    subtitle.textContent = " "

    const title = document.createElement('h2')
    title.classList.add('hero__titre')
    title.textContent = movie.Title

    const buttons = document.createElement('div')
    buttons.classList.add('hero__boutons')

    const moreLink = document.createElement('a')
    moreLink.classList.add('bouton')
    moreLink.href = `movie.html?id=${movie.imdbID}`
    moreLink.textContent = 'En savoir plus'

    const searchLink = document.createElement('a')
    searchLink.classList.add('bouton', 'bouton--secondaire')
    searchLink.href = 'search.html'
    searchLink.textContent = 'Rechercher votre film'

    buttons.append(moreLink, searchLink)
    text.append(subtitle, title, buttons)
    slide.append(text)

    return slide
}

function showSlide(index) {
    const slides = heroSlides.querySelectorAll('.hero__slide')
    const dots = heroDots.querySelectorAll('.hero__point')

    slides[currentSlide].classList.remove('hero__slide--active')
    dots[currentSlide].classList.remove('hero__point--active')

    currentSlide = index

    slides[currentSlide].classList.add('hero__slide--active')
    dots[currentSlide].classList.add('hero__point--active')
}

function nextSlide() {
    const total = heroSlides.children.length
    showSlide((currentSlide + 1) % total)
}

function startCarousel() {
    clearInterval(heroTimer)
    heroTimer = setInterval(nextSlide, HERO_DELAY)
}

async function showHeroMovies() {
    try {
        const movies = await Promise.all(
            HERO_IDS.map((id) => getMovieById(id))
        )

        movies.forEach((movie, index) => {
            heroSlides.append(createHeroSlide(movie))

            const dot = document.createElement('button')
            dot.type = 'button'
            dot.classList.add('hero__point')
            dot.setAttribute('aria-label', `Afficher le film ${index + 1}`)
            dot.addEventListener('click', () => {
                showSlide(index)
                startCarousel()
            })
            heroDots.append(dot)
        })

        showSlide(0)
        startCarousel()
    } catch (error) {
        heroSlides.textContent = 'Impossible de charger les films à l\'affiche.'
    }
}

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
showHeroMovies()
showTrendingMovies()
