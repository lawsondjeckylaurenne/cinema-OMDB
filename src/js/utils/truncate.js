export function truncate(text, maxLength) {
    if (text.length <= maxLength) {
        return text
}else{
    return text.slice(0, maxLength).trim() + '...'
}}
//fonction qui va servire au niveau de movieCard.js pour faire les petites et grandes resumés sur la page d'accueil et la page de film details