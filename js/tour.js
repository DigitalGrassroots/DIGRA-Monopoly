
function resetTour(){
	$("#avatar1").css({'z-index': 3});
	$("#info").css({'z-index': 3, 'display':'block'});
	$("#tour").css("transform", "translate(-50%, -50%)");
	$(".tour-fade").css("opacity", 0.7);
	$("#settingscircle, #tradecircle, #managecircle,  #playerstatscircle").css({"opacity":0.05});
	$("#city1").hide();
	$("#city1, #board").css({"z-index":1});
}

function closeTour(){
	resetTour();

	$("#cpanel").show();
	$("#settingscircle, #tradecircle, #managecircle,  #playerstatscircle").css({"opacity":1});
	$("#tour").hide();
	$(".tour-fade").fadeOut(400);
	$("#info").css({"z-index": 3, "pointer-events":"auto"});
	skipTour();
}


function tour1(){
	resetTour();
	$("#popup, #popupbackground").hide();

	$(".tour-fade").css("opacity", 0.7);
	$(".tour-fade").show();
	$("#cpanel").hide();
	$("#tour").show();

	$('#tourtext').html("This is your avatar.<br>It will show your possible options for your next moves to play when its your turn <br><div class='tour-btns'><div onclick='tour2()'>Next >></div></div>");
	$("#tourcount").html("1/9");

	$("#tour").css("top", "60%")
	$("#avatar1").css({'z-index': 8});
}

function tour2(){
	resetTour();
	$("#tourcount").html("2/9");
	$('#tourtext').html("For example, when you see this button it means its your turn to roll the die <br><div class='tour-btns'><div onclick='tour1()'><< Prev</div> <div onclick='tour3()'>Next >></div></div>");
	$("#tour").css("top", "50%");
	showInfo();

	$("#info").css({"z-index": 8, "pointer-events":"none"});
	$("#avatar1").css({'z-index': 8});
}

function tour3(){
	resetTour();
	$("#cpanel").show();

	$("#tourcount").html("3/9");
	$('#tourtext').html("Game Settings <br>Here you can edit the game settings and view more information about the game <br><div class='tour-btns'><div onclick='tour2()'><< Prev</div> <div onclick='tour4()'>Next >></div></div>");

	$(".tour-fade").css("opacity", 0.95);
	$("#settingscircle, #tradecircle, #managecircle,  #playerstatscircle").css({"opacity":0.05});
	$("#settingscircle").css({"opacity":1});
	$("#tour").css("transform", "translate(-500px, -10%)");
}

function tour4(){
	resetTour();
	$("#cpanel").show();

	$("#tourcount").html("4/9");
	$('#tourtext').html("Trade Center <br>This is where you can trade properties and cards with other players <br><div class='tour-btns'><div onclick='tour3()'><< Prev</div> <div onclick='tour5()'>Next >></div></div>");

	$(".tour-fade").css("opacity", 0.95);
	$("#settingscircle, #tradecircle, #managecircle,  #playerstatscircle").css({"opacity":0.05});
	$("#tradecircle").css({"opacity":1});
	$("#tour").css("transform", "translate(-300px, -10%)");
}

function tour5(){
	resetTour();
	$("#cpanel").show();

	$("#tourcount").html("5/9");
	$('#tourtext').html("Manage Properties <br>Here you can buy policies, upgrade to laws, mortgage and unmortgage your properties <br><div class='tour-btns'><div onclick='tour4()'><< Prev</div> <div onclick='tour6()'>Next >></div></div>");

	$(".tour-fade").css("opacity", 0.95);
	$("#settingscircle, #tradecircle, #managecircle,  #playerstatscircle").css({"opacity":0.05});
	$("#managecircle").css({"opacity":1});
	$("#tour").css("transform", "translate(-100px, -10%)");
}

function tour6(){
	resetTour();
	$("#cpanel").show();

	$("#tourcount").html("6/9");
	$('#tourtext').html("Player Stats <br>You can easily view information about all of the players here <br><div class='tour-btns'><div onclick='tour5()'><< Prev</div> <div onclick='tour7()'>Next >></div></div>");

	$(".tour-fade").css("opacity", 0.95);
	$("#settingscircle, #tradecircle, #managecircle,  #playerstatscircle").css({"opacity":0.05});
	$("#playerstatscircle").css({"opacity":1});
	$("#tour").css("transform", "translate(0px, -10%)");
}


function tour7(){
	resetTour();

	$("#tourcount").html("7/9");
	$('#tourtext').html("The city grows as players get richer during the game so take some time to click on buildings and discover Easter Eggs about the Digital Grassroots organization <br><div class='tour-btns'><div onclick='tour6()'><< Prev</div> <div onclick='tour8()'>Next >></div></div>");

	$(".tour-fade").css("opacity", 0.8);
	$("#settingscircle, #tradecircle, #managecircle,  #playerstatscircle").css({"opacity":0.05});

	$("#city1").fadeIn();
	$("#city1").css({"z-index":8});
	$("#tour").css("transform", "translate(0px, -40%)");
}

function tour8(){
	resetTour();

	$("#tourcount").html("8/9");
	$('#tourtext').html("You can click on a Title Deed to find out more information about it<br><div class='tour-btns'><div onclick='tour7()'><< Prev</div> <div onclick='tour9()'>Next >></div></div>");

	$(".tour-fade").css("opacity", 0.8);

	$("#board").css({"z-index":7});
	$("#tour").css("transform", "translate(-50%, -50%)");
}

function tour9(){
	resetTour();

	$("#tourcount").html("9/9");
	$('#tourtext').html("And that’s a wrap! <br>You’re now ready to play<br><div class='tour-btns'><div onclick='tour8()'><< Prev</div> <div onclick='closeTour()'>Finish >></div></div>");


	$("#tour").css("transform", "translate(-50%, -50%)");
}



	// $("#popup, #popupbackground").hide();

	// $(".tour-fade").css("opacity", 0.7);
	// $(".tour-fade").show();
	// $("#cpanel").hide();
	// $("#tour").show();

// tour7();