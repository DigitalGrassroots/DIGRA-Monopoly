var players = [];
var oldplayers = [];

var playerIndex = 1;

var currentView = 1;

$('#power1, #power2').slideUp();

players = {
	1 :  { name: "Player 1", avatar: "", human: true},
	2 :  { name: "Player 2", avatar: "", human: true},
	3 :  { name: "Player 3", avatar: "", human: true},
	4 :  { name: "Player 4", avatar: "", human: true},
	5 :  { name: "Player 5", avatar: "", human: true},
	6 :  { name: "Player 6", avatar: "", human: true},
	7 :  { name: "Player 7", avatar: "", human: true},
	8 :  { name: "Player 8", avatar: "", human: true},

	};

var playerCount = 1;

var view1 = document.getElementById('view1');
var view2 = document.getElementById('view2');
var view3 = document.getElementById('view3');
var view4 = document.getElementById('view4');
var view5 = document.getElementById('view5');


var progressInner = document.getElementById("progressInner");
var progressWidth = 20;


var viewImg3 = document.getElementById("viewImg3");
var viewTitle3 = document.getElementById("viewTitle3");
var playerSelects = document.getElementsByClassName('setup-player-select');

var btn3 = document.getElementById('btn3');

var selectedPlayerCount = 2;

view1.style.display = 'block';

if (1) {
setTimeout(function(){
    var progressInterval = setInterval(frame, 10);
    function frame() {
      if (progressWidth >= 100) {
        clearInterval(progressInterval);

		setTimeout(function(){
        hideView1().then(function(){
        	showView2();
        });
		}, 1000);

      } else {
        progressWidth++;
        progressInner.style.width = progressWidth + "%";
      }
    }
}, 1000)
}



function goBack() {
	if (currentView == 3) {
	  hideView3().then(function() {
		showView2();
	  });
	} else if (currentView == 4) {
	  hideView4().then(function() {
		showView3();
	  });
	} else if (currentView == 5) {
		players = oldplayers;
		oldplayers = [];
		hideView5().then(function() {
		  showView4();
		});
	}
}


  function hideView1(){
  	var viewImg1 = document.getElementById('viewImg1');
  	var progress = document.getElementById('progress');
  	return new Promise(function(resolve) {

    	viewImg1.style.opacity = 0;
    	setTimeout(function(){
	    	progress.style.opacity = 0;
	    	setTimeout(function(){
		    	view1.style.display = 'none';
		    	// console.log('hv1')
	    		resolve();
	    	}, 300);

    	}, 300);
    })
  }

  function showView2(){
    currentView = 2;

    	gamebtn1.style.opacity = 0;
    	gamebtn2.style.opacity = 0;
  	return new Promise(function(resolve) {
    	view2.style.display = "block";

    	setTimeout(function(){
	    	gamebtn1.style.opacity = 1;
	    	setTimeout(function(){
		    	gamebtn2.style.opacity = 1;
		    	// console.log('sv2')
	    		resolve();
	    	}, 100);

    	}, 500);

    })

  }

  function hideView2(){
  	return new Promise(function(resolve) {
    	gamebtn1.style.opacity = 0;
    	setTimeout(function(){
	    	gamebtn2.style.opacity = 0;
	    	setTimeout(function(){
		    	view2.style.display = 'none';
		    	// console.log('hv2')
	    		resolve();
	    	}, 500);

    	}, 300);
    })
  }


  function showView3(){
  	document.getElementById('backBtn').style.display = "block";

    for (var i = playerSelects.length - 1; i >= 0; i--) {
    	playerSelects[i].style.opacity = 0;
    }

      viewImg3.style.opacity = 0;
      viewTitle3.style.opacity = 0;
      btn3.style.opacity = 0;

      view3.style.display = 'block';
  	return new Promise(function(resolve) {
		setTimeout(function(){
        viewImg3.style.opacity = 1;

	        setTimeout(function(){
	        viewTitle3.style.opacity = 1;

	        setTimeout(function(){
	        	playerSelects[0].style.opacity = 1;
	        setTimeout(function(){
	        	playerSelects[1].style.opacity = 1;
	        setTimeout(function(){
	        	playerSelects[2].style.opacity = 1;
	        setTimeout(function(){
	        	playerSelects[3].style.opacity = 1;
	        setTimeout(function(){
	        	playerSelects[4].style.opacity = 1;
	        setTimeout(function(){
	        	btn3.style.opacity = 1;
	        	playerSelects[5].style.opacity = 1;
	        setTimeout(function(){
	        	playerSelects[6].style.opacity = 1;
				    currentView = 3;
		        resolve();
			}, 75);
			}, 50);
			}, 50);
			}, 100);
			}, 100);
			}, 75);
			}, 50);

			}, 200);

		}, 500);
    })
  }


  function hideView3(){
  	return new Promise(function(resolve) {
		setTimeout(function(){
	        btn3.style.opacity = 0;

	        setTimeout(function(){
	        	playerSelects[0].style.opacity = 0;
	        setTimeout(function(){
	        	playerSelects[1].style.opacity = 0;
	        setTimeout(function(){
	        	playerSelects[2].style.opacity = 0;
	        setTimeout(function(){
	        	playerSelects[3].style.opacity = 0;
	        setTimeout(function(){
		        viewTitle3.style.opacity = 0;
	        	playerSelects[4].style.opacity = 0;
	        setTimeout(function(){
	        	playerSelects[5].style.opacity = 0;
	        setTimeout(function(){
	        	playerSelects[6].style.opacity = 0;
		        viewImg3.style.opacity = 0;
		        setTimeout(function(){
		        view3.style.display = 'none';
			        resolve();
				}, 800);
			}, 75);
			}, 50);
			}, 50);
			}, 100);
			}, 100);
			}, 75);
			}, 50);

		}, 300);
    })
  }


view4Fade1 = document.getElementById("view4Fade1");
view4Fade4 = document.getElementById("view4Fade2");
view4Fade3 = document.getElementById("view4Fade3");
view4Fade4 = document.getElementById("proceedBtn");

function showView4(){
	view4.style.display = "block";
	view4Fade1.style.opacity = 0;
	view4Fade2.style.opacity = 0;
	view4Fade3.style.opacity = 0;
	view4Fade4.style.opacity = 0;


	return new Promise(function(resolve) {
    setTimeout(function(){
    	view4Fade1.style.opacity = 1;
    setTimeout(function(){
    	view4Fade2.style.opacity = 1;
    setTimeout(function(){
    	view4Fade3.style.opacity = 1;
    setTimeout(function(){
    	view4Fade4.style.opacity = 1;
    setTimeout(function(){
					  currentView = 4;
		        resolve();
			}, 800);
		}, 75);
		}, 50);
		}, 50);
		}, 100);

	})

}

function hideView4(){

	return new Promise(function(resolve) {
    setTimeout(function(){
    	view4Fade4.style.opacity = 0;
    setTimeout(function(){
    	view4Fade3.style.opacity = 0;
    setTimeout(function(){
    	view4Fade2.style.opacity = 0;
    setTimeout(function(){
    	view4Fade1.style.opacity = 0;
    setTimeout(function(){
						view4.style.display = "none";
					  currentView = 3;
		        resolve();
			}, 800);
		}, 75);
		}, 50);
		}, 50);
		}, 100);

	})

}



function showView5() {
	// console.log(players);
	oldplayers = players;

    view5.style.display = "block";
    view5Fade1.style.opacity = 0;
    $('.shuffle-circle, #backBtn').hide();

    view5Fade1.style.opacity = 1;
    view5Fade2.style.opacity = 1;


    var selectedPlayers = Object.values(players).slice(0, playerCount);

    // Begin shuffle animation
    const shuffleInterval = 100; // Duration between each shuffle step in milliseconds
    const totalShuffleSteps = Math.ceil(7000 / shuffleInterval);
    let currentStep = 0;

    function animateShuffle() {
        shuffle(selectedPlayers);
        updateDisplay(selectedPlayers);
        currentStep++;

        if (currentStep < totalShuffleSteps) {
            setTimeout(animateShuffle, shuffleInterval);
        } else {
        		$('#startBtn').css({'display':'inline-block'});
            
				    var avatar8Index = selectedPlayers.findIndex(player => player.avatar == "8");
				    if (avatar8Index !== -1) {
				        selectedPlayers.unshift(selectedPlayers.splice(avatar8Index, 1)[0]);
						$("#power2").html("* The Ambassador starts first *");
						$("#power2").slideDown();
				    }
					$("#backBtn").show();

				    updateDisplay(selectedPlayers);
				    players = selectedPlayers;

				    $('.shuffle-circle .setup-player-topcircle').css("animation", "none");

            setTimeout(function () {
            		$('#view5Fade1').html("Alright, let's play!");
            		$('#startBtn').css({'display':'inline-block','opacity':1,'transform':'translateY(10px)'});
            		insertShuffleNames();
                currentView = 5;
            }, 800);
        }
    }

    // Start shuffle animation
    animateShuffle();
}


// Function to update display with shuffled avatars
function updateDisplay(selectedPlayers) {
    for (var i = 0; i < playerCount; i++) {
        playerTopCircleView = document.getElementById('playerTopCircleView' + i);
        document.getElementById("playerSelectView" + i).style.display = "block";
        playerTopCircleView.style.background = "url(images/avatar" + selectedPlayers[i]['avatar'] + ".png) center no-repeat";
        playerTopCircleView.style.backgroundSize = "contain";
        playerTopCircleView.innerHTML = "";
    }
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}



function hideView5(){

	return new Promise(function(resolve) {
    setTimeout(function(){
    	view5Fade2.style.opacity = 0;
    setTimeout(function(){
    	view5Fade1.style.opacity = 0;
    setTimeout(function(){
        		$('#view5Fade1').html("Here we go again..");
						view5.style.display = "none";
						$('#startBtn').css({'display':'none','opacity':0,'transform':'translateY(0)'});
					  currentView = 4;
		        resolve();
			}, 800);
		}, 50);
		}, 100);

	})

}




function selectPlayerCount(e){

  for (var i = playerSelects.length - 1; i >= 0; i--) {
  	playerSelects[i].classList.remove('setup-player-select-selected');
  }	

	playerCount = e;

  for (var i = 8; i>playerCount;i--) {
  	document.getElementById("playerSelect"+i).style.display = "none";
  }

  for (var i = 1; i<e+1;i++) {
  	document.getElementById("playerSelect"+i).style.display = "block";
  }

	document.getElementById("view3btn"+e).classList.add('setup-player-select-selected');
	selectedPlayerCount = e;

	btn3.classList.remove('setup-btn-primary-disabled');


}

  



// exit
function showExit(){
	document.getElementById('sureBlack').style.display = "block";
}
function closeExit(){
	document.getElementById('sureBlack').style.display = "none";
}

function jumpToPlayer(e){
	if (e=="next") {
		if (playerIndex > selectedPlayerCount-1) {
			playerIndex=1;
		}else{
			playerIndex++;
		}
	}else if(e=="prev"){
		if (playerIndex<2) {
			playerIndex=selectedPlayerCount;
		}else{
			playerIndex--;
		}
	}

	// console.log(playerIndex);
	showPlayer(playerIndex);
}

function showPlayer(e){
	playerIndex = e;
	document.getElementById("playerNameInput").value = players[playerIndex].name;

	// active css
  var playerTopCircles = document.getElementsByClassName('setup-player-topcircle');
  for (var i = playerTopCircles.length - 1; i >= 0; i--) {
  	playerTopCircles[i].classList.remove('setup-player-topcircle-active');
  }	
	document.getElementById("playerTopCircle"+e).classList.add('setup-player-topcircle-active');

  // title
	document.getElementById("playerIndex").innerHTML = playerIndex;

	// player type
	if (players[playerIndex].human) {
  	document.getElementById("playerType").checked = false
	}else{
  	document.getElementById("playerType").checked = true;
	}

	checkProcess();
	insertName();
	// console.log(players);
}

function insertName(){
	var playerNameInput = document.getElementById("playerNameInput").value;
	players[playerIndex].name = playerNameInput;
	document.getElementById("playerTopName"+playerIndex).innerHTML = playerNameInput;
	checkProcess()
	// console.log(players);
}

function insertAvatar(e){
	// check if avatar is taken
	var insertAvatarPass = true;
	for (var i = 8; i > 0; i--) {
		if (players[i].avatar == e){
			insertAvatarPass = false;
		}
	}

	if (insertAvatarPass) {
		// uncheck previous checked
  	if (players[playerIndex].avatar!="") {
  		 $(".avatarCheck" + players[playerIndex].avatar).removeClass('setup-select-btn-checked');
  	}
  	players[playerIndex].avatar = e;
		 $(".avatarCheck" + players[playerIndex].avatar).addClass('setup-select-btn-checked');

  	playerTopCircle = document.getElementById('playerTopCircle'+playerIndex);
  	playerTopCircle.style.background = "url(images/avatar"+e+".png) center no-repeat";
  	playerTopCircle.style.backgroundSize = "contain";
  	playerTopCircle.innerHTML = "";

  	checkProcess()
  	// console.log(players);
	}
}

function insertPlayerType(e){
	// change type back to human if playerIndex is 1
	if (playerIndex == 1) {
		document.getElementById("playerType").checked = false;
		return;
	}
	if(document.getElementById("playerType").checked){
  	players[playerIndex].human = false;
	}else{
  	players[playerIndex].human = true;
	}

	checkProcess();

	console.log(players);
}

function insertShuffleNames(){
	for (var i = 0; i < playerCount; i++) {
	    (function(index) {
	        setTimeout(function() {
	        	if (players[index]['avatar']==1) {
	            $("#playerTopNameView" + index).html(players[index]['name']+"<br><b>D2000</b>");
	            $("#power1").html("* "+players[index]['name']+" gets D500 extra *");
	            $("#power1").slideDown();
	        	}else{
	            $("#playerTopNameView" + index).html(players[index]['name']+"<br><b>D1500</b>");
	        	}
				if (players[index]['avatar']==4) {
					$("#power3").html("* "+players[index]['name']+" starts with a Get Out of Jail Free card *");
					$("#power3").slideDown();
				}
	            $("#playerTopNameView" + index).css("opacity", 1);
	        }, 100 * index);
	    })(i);
	}
}


function checkProcess(){
	var proceedBtn = document.getElementById("proceedBtn");

	var proceedState = true;
	playerCount = selectedPlayerCount;
	for (var i = 1; i < playerCount+1; i++) {
		if (players[i].name == "" || players[i].avatar == "") {
			proceedState = false;
		}
	}
	if (proceedState) {
		proceedBtn.classList.remove('setup-next-btn-disabled');
		return true;
	}else{
		proceedBtn.classList.add('setup-next-btn-disabled');
		return false;
	}

}





function Player(name, color, avatar, human) {
	this.name = name;
	this.color = color;
	this.avatar = avatar;
	this.oldposition = 0;
	this.position = 0;
	this.money = 1500;
	this.creditor = -1;
	this.jail = false;
	this.jailroll = 0;
	this.communityChestJailCard = false;
	this.chanceJailCard = false;
	this.bidding = true;
	this.human = human;
	// this.AI = null;
}



function play(){
	// if (checkProcess()) {

		hideView5();

		// console.log(players);
		// console.log(player);
		var player = {};
		var newplayers = {};
		
		for (var i = 1 ; i < playerCount+1; i++) {
				newplayers[i] = players[i-1];
		}

		// player = newplayers;
		// console.log(newplayers);


			for (var i = 0; i <= 8; i++) {
				if (i==0) {
					player[0] = new Player("the bank", "", "");
				}
				else if(i<playerCount+1){

					player[i] = new Player(newplayers[i].name, "", newplayers[i].avatar, newplayers[i].human);
					if (newplayers[i].human) {
							player[i].human = true;
					}else{
							player[i].human = false;
					}
					if(newplayers[i].avatar=="4"){
						player[i].chanceJailCard = true;
					}

				}
				else{
					player[i] = new Player("", "", "", "");
				}
				

				player[i].index = i;
			}

			// console.log(player);

			var groupPropertyArray = [];
			var groupNumber;

			for (var i = 0; i < 40; i++) {
				groupNumber = square[i].groupNumber;

				if (groupNumber > 0) {
					if (!groupPropertyArray[groupNumber]) {
						groupPropertyArray[groupNumber] = [];
					}

					groupPropertyArray[groupNumber].push(i);
				}
			}

			for (var i = 0; i < 40; i++) {
				groupNumber = square[i].groupNumber;

				if (groupNumber > 0) {
					square[i].group = groupPropertyArray[groupNumber];
				}

				square[i].index = i;
			}


			communityChestCards.index = 0;
			chanceCards.index = 0;
			
			// console.log(communityChestCards);

			communityChestCards.deck = [];
			chanceCards.deck = [];

			for (var i = 0; i < 16; i++) {
				chanceCards.deck[i] = i;
				communityChestCards.deck[i] = i;
			}

			// Shuffle Chance and Community Chest decks.
			chanceCards.deck.sort(function() {return Math.random() - 0.5;});
			communityChestCards.deck.sort(function() {return Math.random() - 0.5;});


			var playerArray = player;
			var p;

			for (var i = 1; i <= playerCount; i++) {
				p = player[i];


				p.avatar = playerArray[i].avatar;
				$("#avatar"+playerArray[i].avatar).show();
				$("#avatar"+playerArray[i].avatar).addClass('avatar-active');
				
				$("#playerstats-col"+playerArray[i].avatar).show();
				$("#playerstatsName"+playerArray[i].avatar).html(playerArray[i].name);
				
			}

			
			
			var dataString = JSON.stringify(
				{
					"playerCount" : playerCount,
					"turn" : 0,
					"doublecount" : 0,
					"lastShownCity" : 'city99',
					player,
					square,
					"chanceCardsIndex" : chanceCards.index,
					"communityChestCardsIndex" : communityChestCards.index,
					"chanceCardsDeck" : chanceCards.deck,
					"communityChestCardsDeck" : communityChestCards.deck,
					"pensionerFirstRent" : true,
					"caregiverFirstRow" : true,
					"studentFirstRow" : true,
					"first_load" : true,
					"last_action" : "start",
					"areDiceRolled" : false
					}
				);


		localStorage.setItem('gameData', dataString);


			var gameObjectString = localStorage.getItem('gameData');
			var gameObject = JSON.parse(gameObjectString);
			
			console.log(gameObject);

			setTimeout(function(){
				window.location.href = "game.html";
			}, 500)
				
	// }
}

function checkGameData() {
    // Check if 'gameData' exists in localStorage
    var gameObjectString = localStorage.getItem('gameData');
    if (!gameObjectString) {
        console.log("gameData does not exist in localStorage");
        return false;
    }

    try {
        // Parse 'gameData' string to JSON
        var gameObject = JSON.parse(gameObjectString);

        // Check if required properties exist in the parsed object
        if (!gameObject.hasOwnProperty("playerCount") ||
            !gameObject.hasOwnProperty("turn") ||
            !gameObject.hasOwnProperty("doublecount") ||
            !gameObject.hasOwnProperty("lastShownCity") ||
            !gameObject.hasOwnProperty("player") ||
            !gameObject.hasOwnProperty("square") ||
            !gameObject.hasOwnProperty("communityChestCardsIndex") ||
            !gameObject.hasOwnProperty("communityChestCardsDeck") ||
            !gameObject.hasOwnProperty("chanceCardsDeck") ||
            !gameObject.hasOwnProperty("first_load") ||
            !gameObject.hasOwnProperty("chanceCardsIndex")) {
            console.log("gameData is missing required properties");
            return false;
        }

        // Additional checks if needed
        // For example, you might want to validate specific properties' types or values

        // If all checks pass, return true
        return true;
    } catch (error) {
        console.error("Error parsing gameData:", error);
        return false;
    }
}


if (checkGameData()) {
	$("#gamebtn1 div").css({"color":"black", "border-color":"black", "cursor":"pointer"});
	$("#gamebtn1").attr("href", "game.html");
}


// selectPlayerCount(2);
// showView5();