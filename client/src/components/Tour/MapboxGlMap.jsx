import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A'

function MapboxGlMap({ data }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      scrollZoom: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    data.forEach(location => {
      const el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
      })
        .setLngLat(location.coordinates)
        .addTo(map);

      new mapboxgl.Popup({
        offset: 30
      })
        .setLngLat(location.coordinates)
        .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
        .addTo(map);

      bounds.extend(location.coordinates);
    })

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
      }
    })

    return () => map.remove();
  }, []);


  return (
    <div id="map" ref={mapContainer} />
  )
}

MapboxGlMap.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MapboxGlMap