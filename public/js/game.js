class Game {

	constructor(mapConfig) {
		this.map = new Map(mapConfig);
		this.map.init();
		this.stations = null;
		

		this.stationToDiscover = null;
		this.turn = 1;
		this.score = 0;
		this.gameButton = $("#gameButton");
		this.startButton = $("#startButton");
		this.firstScreen = $(".firstScreen");
		this.gameScreen = $(".gameScreen");
		this.menu = $("#gameMenu");
		this.scoreSpan = $("#score span");
		this.turnSpan = $("#turn span");
		this.toDiscoverSpan = $('#toDiscover span');

		this.event = new Event('available');
	}

	restart() {
		this.stationToDiscover = null;
		this.turn = 1;
		this.score = 0;
		this.turnSpan.text(this.turn);
		this.toDiscoverSpan.text("");
		this.map.restart();
	}

	init() {
		this.loadStations();
		this.setUpEventsListeners();
		window.dispatchEvent(this.event);
	}

	setUpEventsListeners() { 
		var game = this;
		this.gameButton.on('click', function() {
			++game.turn;
			game.turnSpan.text(game.turn);	
			game.launch();
		});

		this.startButton.on('click', function() {
			game.firstScreen.hide();
			game.menu.slideDown();
		});

		$(window).on('available', function() {
			game.startButton.fadeIn();
		});

		this.map.setUpEventListener(this);
	}

	loadStations() {
		this.stations = JSON.parse(localStorage.getItem("stations"));
		if (this.stations === null) {
			$.get({
				url: "https://data.ratp.fr/api/records/1.0/search/?dataset=positions-geographiques-des-stations-du-reseau-ratp&lang=fr&rows=6345&facet=stop_name&facet=departement&refine.departement=75", // NIVEAU COMPLEXE TOUT (BUS TRAM METRO ...)
				//url : "http://pwebc.projet.local/resources/stations.json", // NIVEAU SIMPLE (METRO UNIQUEMENT)
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

	launch() {
		if (this.turn <= 5) {
			if (this.turn>1)
				this.map.removeMarkers();
			var nbStationToDiscover = Math.floor(Math.random() * Math.floor(this.stations.records.length));
			this.stationToDiscover = this.stations.records[nbStationToDiscover];
			this.toDiscoverSpan.text(this.stationToDiscover.fields.stop_name);
		}
		else {
			this.restart();
			this.firstScreen.slideDown();
			this.launch();
			this.menu.slideUp();
		}
	}

	turnPlayed() {
		this.scoreSpan.text(this.score);
	}

}