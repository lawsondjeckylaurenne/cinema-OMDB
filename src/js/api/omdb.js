import { API_URL, API_KEY } from '../config.js'

async function callApi(params) {
    params.append('apikey', API_KEY)
    const url = `${API_URL}?${params}`

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Erreur de connexion au serveur')
    }

    const data = await response.json()
    if (data.Response === 'False') {
        throw new Error(data.Error)
    }

    return data
}

export async function getMovieById(id, plot = 'short') {
    const params = new URLSearchParams({ i: id, plot: plot })
    return await callApi(params)
}

export async function searchMovies(query, page = 1, year) {
    const params = new URLSearchParams({ s: query, page: page, type: 'movie' })
    if (year) {
        params.append('y', year)
    }

    const data = await callApi(params)
    return {
        results: data.Search,
        total: Number(data.totalResults)
    }
}
