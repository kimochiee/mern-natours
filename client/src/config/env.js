let API_ROOT = ''

if (import.meta.env.DEV) {
  API_ROOT = 'http://localhost:8000'
} else {
  API_ROOT = 'https://natours-api-5qfz.onrender.com'
}

export default {
  API_ROOT: API_ROOT,
  MAPBOXGL_ACCESS_TOKEN:
    'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A'
}
