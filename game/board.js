const rotateClockwiseButton = document.getElementById('rotateClockwise');
const rotateAnticlockwiseButton = document.getElementById('rotateAnticlockwise');
const board = document.getElementById('board');

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
		board.style.transform = `rotateX(45deg) rotateZ(0deg) rotateY(0deg)`;
		table.style.perspective = `1500px`;
		vignette.style.opacity = `1`;
		rotateAnticlockwiseButton.style.display = `block`;
		rotateClockwiseButton.style.display = `block`;
		view='3d';
	}else{
		rotateAnticlockwiseButton.style.display = `none`;
		rotateClockwiseButton.style.display = `none`;
		board.style.transform = `rotateX(0deg) rotateZ(0deg) rotateY(0deg)`;
		vignette.style.opacity = `0`;
		setTimeout(function(){
			table.style.perspective = `none`;
		}, 500)
		view='2d';
	}
}

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
		settingsTrigger.classList.add('pulse');
	}
	else{
		settingsBlack.style.opacity = `0`;
		setTimeout(function(){
		settingsBlack.style.display = `none`;
		},500);
		settings_view = 'off';
		settingsTrigger.classList.remove('pulse');
	}
}