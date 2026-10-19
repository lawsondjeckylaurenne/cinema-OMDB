const MONTHS = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
}

export function formatDate(dateText) {
    if (!dateText || dateText === 'N/A') {
        return 'Non disponible'
    }

    const parts = dateText.split(' ')
    const day = parts[0].padStart(2, '0')
    const month = MONTHS[parts[1]]
    const year = parts[2]

    return `${day}/${month}/${year}`
}
