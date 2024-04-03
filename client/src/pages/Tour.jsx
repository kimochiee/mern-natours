import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { setTitle } from "../utils/setTitle"
import OverviewBox from "../components/Tour/OverviewBox"
import { localeDate } from "../utils/localeDate"
import ReviewCard from "../components/Tour/ReviewCard"

function Tour() {
  const { tourId } = useParams()
  const [loading, setLoading] = useState(true)
  const [tour, setTour] = useState(null)

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true)
        setTitle('...')
        const response = await fetch(`http://localhost:8000/api/v1/tours/${tourId}`)
        const data = await response.json()
        console.log(data.data.locations);

        setTour(data.data)
        setTitle(data.data.name)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTour()
  }, [tourId])



  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img className="header__hero-img" src={`img/tours/${tour.imageCover}`} alt={`${tour.name}`} />
        </div>
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="img/icons.svg#icon-clock"></use>
              </svg>
              <span className="heading-box__text">{tour.duration} days</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="img/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">{tour.startLocation.description}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <OverviewBox label={'Next date'} text={localeDate(tour.startDates[0], 'en-us')} icon={'calendar'} />
              <OverviewBox label={'Difficulty'} text={tour.difficulty} icon={'trending-up'} />
              <OverviewBox label={'Participants'} text={`${tour.maxGroupSize} people`} icon={'user'} />
              <OverviewBox label={'Rating'} text={`${tour.ratingsAverage} / 5`} icon={'star'} />
            </div>

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>

              {tour.guides.map((guide, i) => {
                return <div key={i} className="overview-box__detail">
                  <img
                    src={`img/users/${guide.photo}`}
                    alt={`${guide.name}`}
                    className="overview-box__img"
                  />
                  <span className="overview-box__label">{guide.role}</span>
                  <span className="overview-box__text">{guide.name}</span>
                </div>
              })}

            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">About {tour.name} tour</h2>
          {tour.description.split('\n').map((text, i) => <p key={i} className="description__text">{text}</p>)}
        </div>
      </section>

      <section className="section-pictures">
        {tour.images.map((image, i) => {
          return (
            <div key={i} className="picture-box">
              <img
                className={`picture-box__img picture-box__img--${i + 1}`}
                src={`img/tours/${image}`}
                alt={`${tour.name} ${i + 1}`}
              />
            </div>
          )
        })}
      </section>

      <section className="section-map">
        <div id="map"></div>
        {/* <script>
          mapboxgl.accessToken =
          'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A';

          const geojson = {
            type: 'FeatureCollection',
          features: [
          {
            type: 'Feature',
          geometry: {
            type: 'Point',
          coordinates: [-112.987418, 37.198125]
              },
          properties: {
            description: 'Zion Canyon National Park'
              }
            },
          {
            type: 'Feature',
          geometry: {
            type: 'Point',
          coordinates: [-111.376161, 36.86438]
              },
          properties: {
            description: 'Antelope Canyon'
              }
            },
          {
            type: 'Feature',
          geometry: {
            type: 'Point',
          coordinates: [-112.115763, 36.058973]
              },
          properties: {
            description: 'Grand Canyon National Park'
              }
            },
          {
            type: 'Feature',
          geometry: {
            type: 'Point',
          coordinates: [-116.107963, 34.011646]
              },
          properties: {
            description: 'Joshua Tree National Park'
              }
            }
          ]
        };

          const map = new mapboxgl.Map({
            container: 'map',
          style: 'mapbox://styles/jonasschmedtmann/cjnxfn3zk7bj52rpegdltx58h',
          scrollZoom: false
        });

          const bounds = new mapboxgl.LngLatBounds();

          geojson.features.forEach(function(marker) {
          var el = document.createElement('div');
          el.classNameName = 'marker';

          new mapboxgl.Marker({
            element: el,
          anchor: 'bottom'
          })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);

          new mapboxgl.Popup({
            offset: 30,
          closeOnClick: false
          })
          .setLngLat(marker.geometry.coordinates)
          .setHTML('<p>' + marker.properties.description + '</p>')
          .addTo(map);

          bounds.extend(marker.geometry.coordinates);
        });

          map.fitBounds(bounds, {
            padding: {
            top: 200,
          bottom: 150,
          left: 50,
          right: 50
          }
        });

          map.on('load', function() {
            map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: [
                      [-112.987418, 37.198125],
                      [-111.376161, 36.86438],
                      [-112.115763, 36.058973],
                      [-116.107963, 34.011646]
                    ]
                  }
                }
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#55c57a',
                'line-opacity': 0.6,
                'line-width': 3
              }
            });
        });
        </script> */}
      </section>

      <section className="section-reviews">
        <div className="reviews">
          {tour.reviews.map((review, i) => {
            return <ReviewCard key={i} review={review} />
          })}
        </div>
      </section>

      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src="img/logo-white.png" alt="Natours logo" className="" />
          </div>
          <img src={`img/tours/${tour.images[1]}`} alt="" className="cta__img cta__img--1" />
          <img src={`img/tours/${tour.images[2]}`} alt="" className="cta__img cta__img--2" />

          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {tour.duration} days. 1 adventure. Infinite memories. Make it yours today!
            </p>
            <button className="btn btn--green span-all-rows">Book tour now!</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Tour