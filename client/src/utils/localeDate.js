export const localeDate = (date, locale) => {
  return new Date(date).toLocaleString(locale, {
    month: 'long',
    year: 'numeric'
  })
}
