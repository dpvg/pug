class Map {

	constructor(mapConfig) {
		this.container = mapConfig.container;
		this.mapboxToken = mapConfig.token;
		this.mapBounds = mapConfig.bounds;
		this.mapbox = null;
		this.marker = null;
		this.markerEl = null;
		this.marker2 = null;
		this.markerEl2 = null;
		this.line = null;
	}

	restart() {
		this.marker.remove();
		this.marker = null;
		this.markerEl = null;
		this.marker2.remove();
		this.marker2 = null;
		this.markerEl2 = null;
		this.mapbox.removeLayer("route");
		this.mapbox.removeSource("route");
		this.line = null;
	}

	init() {
		mapboxgl.accessToken = this.mapboxToken;
		this.mapbox = new mapboxgl.Map({
			container: this.container,
			style: 'mapbox://styles/mapbox/dark-v9',
			maxBounds: this.mapBounds
		});
	}

	setUpEventListener(game) {
		var map = this;
		this.mapbox.on('click', function(event) {
			if (map.markerEl == null && map.markerEl2 == null) {
				map.markerEl = document.createElement('div');
	  			map.markerEl.className = 'point rounded green';
				map.marker = new mapboxgl.Marker(map.markerEl)
				  .setLngLat([game.stationToDiscover.fields.stop_lon, game.stationToDiscover.fields.stop_lat])
				  .addTo(map.mapbox);

				map.markerEl2 = document.createElement('div');
				map.markerEl2.className = 'point rounded red';
				map.marker2 = new mapboxgl.Marker(map.markerEl2)
					.setLngLat([event.lngLat.lng, event.lngLat.lat])
				  	.addTo(map.mapbox);

				game.score += Math.floor(map.calcDist(game.stationToDiscover.fields.stop_lat, event.lngLat.lat,
				game.stationToDiscover.fields.stop_lon, event.lngLat.lng) * 100);

				map.line = map.mapbox.addLayer({
			        "id": "route",
			        "type": "line",
			        "source": {
			            "type": "geojson",
			            "data": {
			                "type": "Feature",
			                "properties": {},
			                "geometry": {
			                    "type": "LineString",
			                    "coordinates": [
			                        [game.stationToDiscover.fields.stop_lon, game.stationToDiscover.fields.stop_lat],
			                        [event.lngLat.lng, event.lngLat.lat]
			                    ]
			                }
			            }
			        },
			        "layout": {
			            "line-join": "round",
			            "line-cap": "round"
			        },
			        "paint": {
			            "line-color": "rgba(52, 73, 94,1.0)",
			            "line-width": 5
			        }
			    });
				game.turnPlayed();
			}
		});
	}

	calcDist(lat1, lat2, long1, long2) {
		var latitude1 = lat1 * Math.PI / 180;
		var latitude2 = lat2 * Math.PI / 180;
		var longitude1 = long1 * Math.PI / 180;
		var longitude2 = long2 * Math.PI / 180;
		var R = 6371;
		var d = R * Math.acos(Math.cos(latitude1) * Math.cos(latitude2) *
			Math.cos(longitude2 - longitude1) + Math.sin(latitude1) *
			Math.sin(latitude2));
		return d;
	}

	removeMarkers() {
		this.marker.remove();
		this.marker2.remove();
		this.mapbox.removeLayer("route");
		this.mapbox.removeSource("route");
		this.markerEl = null;
		this.markerEl2 = null;
		this.line = null;
	}

}