const rotateClockwiseButton = document.getElementById('rotateClockwise');
const rotateAnticlockwiseButton = document.getElementById('rotateAnticlockwise');
const board = document.getElementById('gameboard');

let rotationDegree = 0;

rotateClockwiseButton.addEventListener('click', () => {
  rotationDegree = (rotationDegree + 90) % 360;
  board.style.transform = `rotateX(45deg) rotateZ(${rotationDegree}deg)`;
});

rotateAnticlockwiseButton.addEventListener('click', () => {
  rotationDegree = (rotationDegree - 90 + 360) % 360;
  board.style.transform = `rotateX(45deg) rotateZ(${rotationDegree}deg)`;
});


const table = document.getElementById('table');
const vignette = document.getElementById('vignette');
view = '2d';

function toggle3D(){
	if (view=='2d') {
		board.style.transform = `rotateX(30deg) rotateZ(0deg) rotateY(0deg)`;
		table.style.perspective = `1500px`;
		vignette.style.opacity = `1`;
		rotateAnticlockwiseButton.style.display = `block`;
		rotateClockwiseButton.style.display = `block`;

		$('.top-btns').css("margin-top", "5px");
		view='3d';
	}else{
		rotateAnticlockwiseButton.style.display = `none`;
		rotateClockwiseButton.style.display = `none`;
		board.style.transform = `rotateX(0deg) rotateZ(0deg) rotateY(0deg)`;
		vignette.style.opacity = `0`;

		$('.top-btns').css("margin-top", "55px");
		setTimeout(function(){
			table.style.perspective = `none`;
		}, 500)
		view='2d';
	}
}

toggle3D();

settings_view = 'off';
const settingsBlack = document.getElementById('settingsBlack');
const settingsTrigger = document.getElementById('settingsTrigger');


function toggleSettings(){
	if (settings_view=='off') {
		settingsBlack.style.display = `block`;
		setTimeout(function(){
		settingsBlack.style.opacity = `1`;
		},100);
		settings_view = 'on';
		settingsTrigger.style.zIndex = 4;;
		settingsTrigger.style.opacity = 1;;
		settingsTrigger.classList.add('pulse');
	}
	else{
		settingsBlack.style.opacity = `0`;
		setTimeout(function(){
		settingsBlack.style.display = `none`;
		},500);
		settings_view = 'off';
		settingsTrigger.style.zIndex = 2;;
		settingsTrigger.style.opacity = 0.7;;
		settingsTrigger.classList.remove('pulse');
	}
}

trade_view = 'off';
const tradeBlack = document.getElementById('tradeBlack');
const tradeTrigger = document.getElementById('tradeTrigger');


function toggleTrade(){
	if (trade_view=='off') {
		tradeBlack.style.display = `block`;
		setTimeout(function(){
		tradeBlack.style.opacity = `1`;
		},100);
		trade_view = 'on';
		tradeTrigger.style.zIndex = 4;;
		tradeTrigger.style.opacity = 1;;
		tradeTrigger.classList.add('pulse');
	}
	else{
		tradeBlack.style.opacity = `0`;
		setTimeout(function(){
		tradeBlack.style.display = `none`;
		},500);
		trade_view = 'off';
		tradeTrigger.style.zIndex = 2;;
		tradeTrigger.style.opacity = 0.7;;
		tradeTrigger.classList.remove('pulse');
	}
}


buy_view = 'off';
const buyBlack = document.getElementById('buyBlack');


function toggleBuy(){
	if (buy_view=='off') {
		buyBlack.style.display = `block`;
		setTimeout(function(){
		buyBlack.style.opacity = `1`;
		},100);
		buy_view = 'on';
	}
	else{
		buyBlack.style.opacity = `0`;
		setTimeout(function(){
		buyBlack.style.display = `none`;
		},500);
		buy_view = 'off';
	}
}

// toggleBuy();