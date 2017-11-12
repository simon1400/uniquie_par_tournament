var data = require('./data.json')

var games = [];
for(var i = 0; i < data.players.length; i++){
	games[i] = [];
}




for(var a = 0; a < data.players.length; a++){
	for(var i = 0; i < data.rounds.length; i++){
		for(var j = 0; j < data.rounds[i].matches.length; j++){
			if(a == data.rounds[i].matches[j].home){
				games[a].push(data.rounds[i].matches[j].away);
			}else if(a == data.rounds[i].matches[j].away){
				games[a].push(data.rounds[i].matches[j].home);
			}
		}
	}
}
// console.log(games)




var numberTeam = []
for(var b = 0; b < games.length; b++){
	numberTeam.push(b)
}
// console.log(numberTeam)

Array.prototype.diff = function(a) {
	return this.filter(function(i) {return a.indexOf(i) < 0;});
};

var newGames = []
for(var i = 0; i < games.length; i++){
	newGames.push(numberTeam.diff(games[i]));
}
// console.log(newGames);

for(var i = 0; i < newGames.length; i++){
	for(var a = 0; a < newGames[i].length; a++){
		if(i == newGames[i][a]){
			newGames[i].splice(a, 1);
		}
	}
	// console.log(newGames[i])
}





var player = 0;
var pars = [];

for(var i = 0; i < newGames.length; i++){

	if(player != newGames[i][0]) pars.push([player, newGames[i][0]])
	else pars.push([player, newGames[i][1]])

	// console.log(newGames[i])
	
	for(var a = 1; a < newGames.length; a++){
		for(var b = 0; b < newGames[a].length; b++){
			if(newGames[a][b] == newGames[i][0] || newGames[a][b] == player){
				newGames[a].splice(b, 1);
			}
			// console.log(newGames[a]);
		}
	}

	// console.log(newGames);
	newGames.shift()
	player++;
}

console.log(pars)
