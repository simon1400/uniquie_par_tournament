const data = require('./data.json')

let a, i, j;

let games = [];
for(i = 0; i < data.players.length; i++){
	games[i] = [];
}

for(a = 0; a < data.players.length; a++){
	for(i = 0; i < data.rounds.length; i++){
		for(j = 0; j < data.rounds[i].matches.length; j++){
			if(a == data.rounds[i].matches[j].home){
				games[a].push(data.rounds[i].matches[j].away);
			}else if(a == data.rounds[i].matches[j].away){
				games[a].push(data.rounds[i].matches[j].home);
			}
		}
	}
}
// console.log(games)

const maxTeams = games.length;  // vsechniho hracu
const teamNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // pomocne pole - id hracu
const aviableMatches = []; //Pole moznich protivniku
const pairsFlat = []; // Ploske pole najdenych par
const pairs = []; // Itohove pary

// Naplnujem pole s moznimy protivnikamy pro kazdeho hrace
for(let i = 0; i < maxTeams; i++){
  const aviableTeams = teamNumbers.filter(function(team){
    return (team !== i) && (games[i].indexOf(team) === -1);
  });
 aviableMatches.push(aviableTeams);
}

// recursivna funkce hledani par
function findMatches(){
  let teamIndex;
  if(pairsFlat.length >= maxTeams) return true; // Нашли все пары Nasli jsme vsechni pary
  for(teamIndex = 0; teamIndex < maxTeams; teamIndex++){

    if(pairsFlat.indexOf(teamIndex) === -1){
      const aviableTeams = aviableMatches[teamIndex];
      const teamPair = aviableTeams.find(function(team){
        return pairsFlat.indexOf(team) === -1;
      })

      if(teamPair === undefined) continue; // Neni dostupne pary, hledame dal   
      pairsFlat.push(teamIndex); 
      pairsFlat.push(teamPair);
      if(findMatches()){ // hledame recursivne
        return true;
      } else {         // S takovou parov ne nasli reseni. Mazem paru a pokracujem hledani
        pairsFlat.pop();
        pairsFlat.pop();
      }
    }
  } 
  return false; // Ne nasli reseni
}

// kontrolujem!
if(findMatches()){
  for(let i = 0; i < maxTeams; i += 2){   // Nasli! Maplnujem pole
    pairs.push([pairsFlat[i], pairsFlat[i+1]]);   
  } 
  console.dir(pairs)
} else {
  console.log('Neni par!')
}


// var numberTeam = []
// for(var b = 0; b < games.length; b++){
// 	numberTeam.push(b)
// }
// // console.log(numberTeam)

// Array.prototype.diff = function(a) {
// 	return this.filter(function(i) {return a.indexOf(i) < 0;});
// };

// var newGames = []
// for(var i = 0; i < games.length; i++){
// 	newGames.push(numberTeam.diff(games[i]));
// }
// // console.log(newGames);

// for(var i = 0; i < newGames.length; i++){
// 	for(var a = 0; a < newGames[i].length; a++){
// 		if(i == newGames[i][a]){
// 			newGames[i].splice(a, 1);
// 		}
// 	}
// 	// console.log(newGames[i])
// }





// var player = 0;
// var pars = [];

// for(var i = 0; i < newGames.length; i++){

// 	if(player != newGames[i][0]) pars.push([player, newGames[i][0]])
// 	else pars.push([player, newGames[i][1]])

// 	// console.log(newGames[i])
	
// 	for(var a = 1; a < newGames.length; a++){
// 		for(var b = 0; b < newGames[a].length; b++){
// 			if(newGames[a][b] == newGames[i][0] || newGames[a][b] == player){
// 				newGames[a].splice(b, 1);
// 			}
// 		}
// 	}
// 	newGames.shift()
// 	player++;
// }


// const playedMatches = [
//   [8, 3, 10, 1, 13, 11],
//   [7, 6, 13, 0, 11, 5],
//   [3, 8, 5, 7, 12, 9],
//   [2, 0, 8, 14, 9, 10],
//   [11, 5, 14, 13, 7, 6],
//   [6, 4, 2, 9, 14, 1],
//   [5, 1, 9, 10, 8, 4],
//   [1, 9, 12, 2, 4, 14],
//   [0, 2, 3, 15, 6, 13],
//   [10, 7, 6, 5, 3, 2],
//   [9, 11, 0, 6, 15, 3],
//   [4, 10, 15, 12, 1, 0],
//   [13, 14, 7, 11, 2, 15],
//   [12, 15, 1, 4, 0, 8],
//   [15, 12, 4, 2, 5, 7],
//   [14, 13, 11, 8, 10, 12]
// ];