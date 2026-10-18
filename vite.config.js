import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rolldownOptions: {
            input: {
                main: resolve(import.meta.dirname, 'index.html'),
                search: resolve(import.meta.dirname, 'search.html'),
                movie: resolve(import.meta.dirname, 'movie.html'),
            },
            },
        },
        })
