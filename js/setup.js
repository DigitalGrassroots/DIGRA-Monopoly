var players = [];
var playerIndex = 1;

var currentView =1;

players = {
	1 :  { name: "", avatar: "", human: true},
	2 :  { name: "", avatar: "", human: true},
	3 :  { name: "", avatar: "", human: true},
	4 :  { name: "", avatar: "", human: true},
	5 :  { name: "", avatar: "", human: true},
	6 :  { name: "", avatar: "", human: true},
	7 :  { name: "", avatar: "", human: true},
	8 :  { name: "", avatar: "", human: true},

	};

var playerCount = 1;

var view1 = document.getElementById('view1');
var view2 = document.getElementById('view2');
var view3 = document.getElementById('view3');
var view4 = document.getElementById('view4');


var progressInner = document.getElementById("progressInner");
var progressWidth = 20;


var viewImg3 = document.getElementById("viewImg3");
var viewTitle3 = document.getElementById("viewTitle3");
var playerSelects = document.getElementsByClassName('setup-player-select');

var btn3 = document.getElementById('btn3');

var selectedPlayerCount = 0;

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

  function hideView1(){
  	var viewImg1 = document.getElementById('viewImg1');
  	var progress = document.getElementById('progress');
  	return new Promise(function(resolve) {

    	viewImg1.style.opacity = 0;
    	setTimeout(function(){
	    	progress.style.opacity = 0;
	    	setTimeout(function(){
		    	view1.style.display = 'none';
		    	console.log('hv1')
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
		    	console.log('sv2')
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
		    	console.log('hv2')
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


function selectPlayerCount(e){

  for (var i = playerSelects.length - 1; i >= 0; i--) {
  	playerSelects[i].classList.remove('setup-player-select-selected');
  }	

	playerCount = e;

  for (var i = 8; i>playerCount;i--) {
  	document.getElementById("playerSelect"+i).style.display = "none";
  }

  for (var i = 1; i<e+1;i++) {
  	console.log('dfd');
  	document.getElementById("playerSelect"+i).style.display = "block";
  }

	document.getElementById("view3btn"+e).classList.add('setup-player-select-selected');
	selectedPlayerCount = e;

	btn3.classList.remove('setup-btn-primary-disabled');


}


function goBack(){
	if (currentView==3) {
		hideView3().then(function(){showView2();});
	}
	if (currentView==4) {
		hideView4().then(function(){showView3();});
	}
}



// exit
function showExit(){
	document.getElementById('sureBlack').style.display = "block";
}
function closeExit(){
	document.getElementById('sureBlack').style.display = "none";
}

function jumpToPlayer(e){
	console.log(playerIndex);
	if (e=="next") {
		if (playerIndex==selectedPlayerCount) {
			playerIndex=1;
		}else{
			playerIndex++;
		}
	}else if(e=="prev"){
		if (playerIndex==1) {
			playerIndex=selectedPlayerCount;
		}else{
			playerIndex--;
		}
	}

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

	checkProcess()
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
  		document.getElementById("avatarCheck"+players[playerIndex].avatar).classList.remove('setup-select-btn-checked');
  	}
  	players[playerIndex].avatar = e;
		document.getElementById("avatarCheck"+players[playerIndex].avatar).classList.add('setup-select-btn-checked');

  	playerTopCircle = document.getElementById('playerTopCircle'+playerIndex);
  	playerTopCircle.style.background = "url(images/avatar"+e+".png) center no-repeat";
  	playerTopCircle.style.backgroundSize = "contain";
  	playerTopCircle.innerHTML = "";

  	checkProcess()
  	// console.log(players);
	}
}

function insertPlayerType(e){
	if(document.getElementById("playerType").checked){
  	players[playerIndex].human = false;
	}else{
  	players[playerIndex].human = true;
	}

	checkProcess()

	console.log(players);
}


function checkProcess(){
var proceedBtn = document.getElementById("proceedBtn");


var proceedState = true;
// console.log(playerCount);
for (var i = 1; i < playerCount+1; i++) {
	if (players[i].name == "" || players[i].avatar == "") {
		proceedState = false;
		return false;
	}
}
if (proceedState) {
	proceedBtn.classList.remove('setup-next-btn-disabled');
	return true;
}

}


function play(){
	if (checkProcess()) {
		console.log('ddf');

		var dataString = JSON.stringify(
			{
				"playerCount" : playerCount,
				players,
				}
			);
		// console.log(dataString);
		document.cookie = "gameData=" + encodeURIComponent(dataString);

		var cookieValue = document.cookie  
		.split('; ')
	  .find(row => row.startsWith('gameData='))
	  .split('=')[1];

		console.log(document.cookie);
		var gameObject = decodeURIComponent(cookieValue);
		console.log(gameObject);

		hideView4();
		setTimeout(function(){
			window.location.href = "game.html";
		}, 500)

	}
}
		// console.log(document.cookie);
console.log(players);