export const localeDate = (date, day) => {
  return new Date(date).toLocaleString('en-us', {
    day: day ? 'numeric' : undefined,
    month: 'long',
    year: 'numeric'
  })
}
