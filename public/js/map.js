class Map {

	constructor(mapConfig) {
		this.container = mapConfig.container;
		this.mapboxToken = mapConfig.token;
		this.mapBounds = mapConfig.bounds;

		this.mapbox = null;
		
		this.toDiscoverMarker = null;
		this.toDiscoverMarkerEl = null;
		this.playerMarker = null;
		this.playerMarkerEl = null;

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

	restart() {
		this.removeMarkers();
	}

	drawToDiscoverMarker(map, lng, lat) {
		map.toDiscoverMarkerEl = document.createElement('div');
		map.toDiscoverMarkerEl.className = 'point rounded green';
		map.toDiscoverMarker = new mapboxgl.Marker(map.toDiscoverMarkerEl)
			.setLngLat([lng, lat])
			.addTo(map.mapbox);
	}

	drawPlayerMarker(map, lng, lat) {
		map.playerMarkerEl = document.createElement('div');
		map.playerMarkerEl.className = 'point rounded red';
		map.playerMarker = new mapboxgl.Marker(map.playerMarkerEl)
			.setLngLat([lng, lat])
			.addTo(map.mapbox);
	}

	drawLineBetweenMarkers(map, coordinates) {
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
						"coordinates": coordinates
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
	}

	setUpEventListener(game) {
		var map = this;
		this.mapbox.on('click', function(event) {
			if (map.playerMarker == null && map.toDiscoverMarker == null) {
				map.drawToDiscoverMarker(map, game.stationToDiscover.fields.coord[1], game.stationToDiscover.fields.coord[0]);
				map.drawPlayerMarker(map, event.lngLat.lng, event.lngLat.lat);
				map.drawLineBetweenMarkers(map, [
			        [game.stationToDiscover.fields.coord[1], game.stationToDiscover.fields.coord[0]],
			        [event.lngLat.lng, event.lngLat.lat]
			    ]);

				game.updateScore(Math.floor(map.calcDist(game.stationToDiscover.fields.coord[0], event.lngLat.lat,
				game.stationToDiscover.fields.coord[1], event.lngLat.lng) * 100));
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
		if (this.toDiscoverMarker != null) {
			this.toDiscoverMarker.remove();
			this.toDiscoverMarker = null;
			this.toDiscoverMarkerEl = null;
		}
		if (this.playerMarker != null) {
			this.playerMarker.remove();
			this.playerMarker = null;
			this.playerMarkerEl = null;
		}
		if (this.line != null) {
			this.mapbox.removeLayer("route");
			this.mapbox.removeSource("route");
			this.line = null;
		}	
	}

}