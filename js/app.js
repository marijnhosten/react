$(document).ready(init);

var mensenObjs = [];
var namen = [];
var pageNumber = 2;
var pageNumberPlanet = 2;
var uniekePlaneten = [];
var planeten = [];

function init() {
	jsonInladen();

	$("#personen").on("click", ".persoon", function(){
		console.log("klik");
	});
}

function jsonInladen() {
	$.ajax({
		async: 'false',
		url: 'http://swapi.co/api/people/',
		type: 'GET',
		dataType: 'json'
	}).done(function(data){
		mensenObjs.push(data.results);
		

	//eerst de eerste 10 direct tonen, anders duurt de laadtijd te lang
		for(var i = 0; i < mensenObjs.length; i++){
			for(var j = 0; j < mensenObjs[i].length; j++){
				$("#personen").append("<li class='persoon'>" + mensenObjs[i][j].name + "</li>");
			}
		}

		volgendeMensenLaden(pageNumber);
	});

	$.ajax({
		async: 'false',
		url: 'http://swapi.co/api/planets/',
		type: 'GET',
		dataType: 'json'
	}).done(function(data){
		uniekePlaneten.push(data.results);
		

	//eerst de eerste 10 direct tonen, anders duurt de laadtijd te lang
		for(var i = 0; i < uniekePlaneten.length; i++){
			for(var j = 0; j < uniekePlaneten[i].length; j++){
				$("#planeten").append("<li class='planeet'>" + uniekePlaneten[i][j].name + "</li>");
			}
		}

		volgendePlanetenLaden(pageNumberPlanet);
	});
}

function volgendeMensenLaden(pageNumber) {
	
	$.ajax({
		async: 'false',
		url: 'http://swapi.co/api/people/?page=' + pageNumber,
		type: 'GET',
		dataType: 'json'
	}).done(function(data){
		mensenObjs.push(data.results);
		if(pageNumber < 9){
			pageNumber++;
			volgendeMensenLaden(pageNumber);
		}else{
			mensenInvullen();
		}
	});
}

function volgendePlanetenLaden(pageNumberPlanet) {
	
	$.ajax({
		async: 'false',
		url: 'http://swapi.co/api/planets/?page=' + pageNumberPlanet,
		type: 'GET',
		dataType: 'json'
	}).done(function(data){
		uniekePlaneten.push(data.results);
		if(pageNumberPlanet < 7){
			pageNumberPlanet++;
			volgendePlanetenLaden(pageNumberPlanet);
		}else{
			planetenInvullen();
		}
	});
}


function mensenInvullen() {


	for(var i = 0; i < mensenObjs.length; i++){
		for(var j = 0; j < mensenObjs[i].length; j++){

			//de eerste 10 overslaan (zijn al ingeladen)
			if( i > 1){
				namen.push(mensenObjs[i][j].name);
				
			}
		}
	}

	for(var i = 0; i < namen.length; i++){
		$("#personen").append("<li class='persoon'>" + namen[i] + "</li>");
	}
}

function planetenInvullen() {
	for(var i = 0; i < uniekePlaneten.length; i++){
		for(var j = 0; j < uniekePlaneten[i].length; j++){

			//de eerste 10 overslaan (zijn al ingeladen)
			if( i > 1){
				planeten.push(uniekePlaneten[i][j].name);
				
			}
		}
	}

	for(var i = 0; i < planeten.length; i++){
		$("#planeten").append("<li class='planeet'>" + planeten[i] + "</li>");
	}
}

function planeetPerPersoonLaden(homeworld) {
	$.ajax({
		async: 'false',
		url: homeworld,
		type: 'GET',
		dataType: 'json',
	}).done(function(data){

		$("#planeten").append("<li class='planeet'>" + data.name + "</li>");
		
	});

}