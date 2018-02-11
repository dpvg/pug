@extends ('layouts.app')

@section('csss')
<link href='https://api.mapbox.com/mapbox-gl-js/v0.44.0/mapbox-gl.css' rel='stylesheet' />
<style>
	.point {
		width: 20px;
		height: 20px;
		background-color: #000;
		box-sizing: border-box;
		opacity: 0.9;
	}

	.rounded {
		border-radius: 100%;
	}

	.red {
		background-color: rgba(231, 76, 60,1.0);
		border: 3px solid rgba(192, 57, 43,1.0);
	}

	.green {
		background-color: rgba(46, 204, 113,1.0);
		border: 3px solid rgba(39, 174, 96,1.0);
	}

	.game {
		position: relative;
		height: 800px;
		width: 100%;
	}

	.firstScreen {
		position: absolute;
		top: 0;
		left: 0;
		height: 800px;
		width: 100%;
		background-color: rgba(255,255,255, 0.8);
		z-index: 100;
	}

	.gameScreen {
		position: aboslute;
		top: 0;
		left: 0;
		height: 800px;
		width: 100%;
		z-index: 50;
	}
</style>
@endsection

@section('content')
<div class="container">
	<div class="row justify-content-center">
		<div class="col-12 w-100">
			<div class="game">
				<div class="firstScreen">
					<table class="h-100 w-50 mx-auto">
						<tbody>
							<tr>
								<td class="align-middle text-center">
									<h1>Bienvenue</h1>
									<p class="lead">
										Dans ce jeu, il vous faudra trouver les stations de métro sur la carte.
										Plus vous êtes proche, et moins vous marquez de points.
										Le joueur ayant le plus faible nombre de points est le meilleur.
									</p>
									<button class="btn btn-primary" id="startButton" style="display:none;">Démarrer</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="gameScreen" style="">
					<div id="map" style="height: 800px; width: 100%;"></div>
					<div id="gameMenu" style="display: none;">
						<div class="container">
							<div class="row">
								<div class="col-6">
									<button class="btn btn-danger" id="gameButton">Prochain tour</button>
									<p class="lead" id="toDiscover">Station à localiser : <span></span></p>
									<p class="lead" id="score">Score : <span></span></p>
								</div>
								<div class="col-6">
									<p class="lead" id="turn"><span>1</span>/5 tours</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

@endsection

@section('scripts')
<script
src="http://code.jquery.com/jquery-3.3.1.min.js"
integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
crossorigin="anonymous"></script>
<script src='https://api.mapbox.com/mapbox-gl-js/v0.44.0/mapbox-gl.js'></script>
<script src="/js/map.js"></script>
<script src="/js/game.js"></script>
<script>
	$(document).ready(function() {
		var game = new Game({
			container: 'map',
			token: 'pk.eyJ1IjoiZG9wcGVsZ3ZuZ2VyIiwiYSI6ImNqZGc2MnllbzBjOXoyeGs0ZmM1bHFoYjQifQ.G4JQF0o754W4TORpVLsSZw',
			bounds: [[2.218895, 48.806595], [2.437935, 48.913207]]
		});

		window.addEventListener('available', function() {
			game.launch();
		}, false);
		game.init();
		
	});

</script>
@endsection