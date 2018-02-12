<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameController extends Controller
{
	public function __construct() {
		$this->middleware('auth');
	}

	public function play() {
		return view('Game.play');
	}

	public function getStations() {
		$curl = curl_init();
		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://data.ratp.fr/api/records/1.0/search/?dataset=accessibilite-des-gares-et-stations-metro-et-rer-ratp&rows=955",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
		    "cache-control: no-cache"
		  ),
		));
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		$response = curl_exec($curl);
		$err = curl_error($curl);
		curl_close($curl);

		$tab = json_decode($response);
		$datas = [];
		foreach ($tab->records as $k => $v) {
			if (preg_match("#^75[0-9]*$#" ,$v->fields->codeinsee))
				array_push($datas, $v);
		}

		return response()->json($datas);
	}
}
