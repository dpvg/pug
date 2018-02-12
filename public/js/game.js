class Game {

	constructor(mapConfig) {
		this.map = new Map(mapConfig);
		this.ui = new GameUI();
		
		this.stations = null;
		this.stationToDiscover = null;
		this.turn = 0;
		this.score = 0;

		this.event = new Event('available');
	}

	init() {
		this.loadStations();
		this.map.init();
		this.map.setUpEventListener(this);
		this.ui.init(this);
		window.dispatchEvent(this.event);
	}

	restart() {
		this.stationToDiscover = null;
		this.turn = 0;
		this.score = 0;
		this.map.restart();
		this.ui.restartUI();
	}

	/**
	* Difficile de changer de liste de sations, les structures n'étant pas les mêmes
	*/
	loadStations() {
		this.stations = JSON.parse(localStorage.getItem("stations"));
		if (this.stations === null) {
			$.get({
				//url: "https://data.ratp.fr/api/records/1.0/search/?dataset=positions-geographiques-des-stations-du-reseau-ratp&lang=fr&rows=6345&facet=stop_name&facet=departement&refine.departement=75", // NIVEAU COMPLEXE TOUT (BUS TRAM METRO ...)
				//url : "http://pwebc.projet.local/resources/stations.json", // NIVEAU SIMPLE (METRO UNIQUEMENT)
				url : "http://pwebc.projet.local/api/getStations",
				success: function(data) {
					this.stations = data;
					localStorage.setItem("stations", JSON.stringify(this.stations));
				},
				error: function() {
					alert("Impossible de charger les stations");
				}
			});
		}
	}

	initTurn() {
		++this.turn;
		if (this.turn <= 5) {
			this.map.removeMarkers();

			this.stationToDiscover = this.stations[Math.floor(Math.random()*this.stations.length)];
			this.ui.refreshToDiscover(this.stationToDiscover);
		}
	}

	updateScore(score) {
		this.score += score;
		this.ui.updateScoreSpan(this.score);
		this.checkEnd();
	}

	/**
	* A retravailler
	*/
	checkEnd() {
		if (this.turn >= 5) {
			this.ui.showEnd(this.score);
		}
	}
}