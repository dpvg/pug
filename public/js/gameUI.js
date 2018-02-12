class GameUI {

	constructor() {
		this.gameButton = $("#gameButton");
		this.startButton = $("#startButton");
		this.restartButton = $("#restartButton");
		this.firstScreen = $(".firstScreen");
		this.gameScreen = $(".gameScreen");
		this.endScreen = $(".endScreen");
		this.menu = $("#gameMenu");
		this.scoreSpan = $("#score span");
		this.turnSpan = $("#turn span");
		this.toDiscoverSpan = $('#toDiscover span');
	}

	init(game) {
		this.initEventsListeners(game);
	}

	initEventsListeners(game) {
		var ui = this;
		this.gameButton.on('click', function() {
			game.initTurn();
			ui.turnSpan.text(game.turn);	
		});

		this.startButton.on('click', function() {
			ui.firstScreen.hide();
			ui.menu.slideDown();
			game.initTurn();
		});

		this.restartButton.on('click', function() {
			ui.endScreen.hide();
			ui.menu.slideDown();
			game.restart();
			game.initTurn();
		});

		$(window).on('available', function() {
			ui.startButton.fadeIn();
		});
	}

	restartUI() {
		this.refreshTurn(1);
		this.toDiscoverSpan.text("");
	}

	refreshTurn(turn) {
		this.turnSpan.text(turn);
	}

	refreshToDiscover(toDisc) {
		this.toDiscoverSpan.text(toDisc.fields.nomptar);
	}

	proposeRestart() {
		this.menu.slideUp();
		this.firstScreen.fadeIn();
	}

	updateScoreSpan(sc) {
		this.scoreSpan.text(sc);
	}

	showEnd(sc) {
		this.menu.slideUp();
		this.endScreen.find("span.score").text(sc);
		this.endScreen.fadeIn();
	}

}