var boardzoom = true;
function tiler(e){
      const container = document.getElementById('board');
      const containerRect = container.getBoundingClientRect();
      var clickX, clickY;

      clickX = positions[e][0] - containerRect.left;
      clickY = positions[e][1] - containerRect.top;

      // clickX = event.clientX - containerRect.left;
      // clickY = event.clientY - containerRect.top;


      // Calculate the percentage position of the click relative to the container size
      const percentX = clickX / containerRect.width;
      const percentY = clickY / containerRect.height;

      // Set the new transform origin based on the click position
      container.style.transformOrigin = `${percentX * 100}% ${percentY * 100}%`;

      // Toggle the 'zoomed' class on the container
      container.classList.toggle('zoomed');
      document.getElementById('bodyPage').classList.toggle('zoomed');

      if (boardzoom) {

        $(".avatar, #cpanel, #alertDiv, #info").hide();
        $("body").addClass('body-plain');
        $("#tile"+e).addClass("tile-selected");
        $("#centerCards").css("display", "flex");
        showdeed(e);

        if (e>0 && e<10) {
          $('#centerCards').css("transform", "translate(100px, -100px)");
        }
        if (e>10 && e<20) {
          $('#centerCards').css("transform", "translate(100px, 100px)");
        }
        if (e>20 && e<30) {
          $('#centerCards').css("transform", "translate(-50px, 50px)");
        }
        if (e>30 && e<40) {
          $('#centerCards').css("transform", "translate(0px, -30px)");
        }
        boardzoom = false;
      }else{
        $(".tile").removeClass("tile-selected");
        $(".avatar-active, #cpanel, #alertDiv, #info").css("opacity", 0);
        $(".avatar-active, #cpanel, #alertDiv, #info").show();
        $("#centerCards").css("display", "none");
        $("body").removeClass('body-plain');
          $('#centerCards').css("transform", "translate(0, 0)");
        setTimeout(function(){
        $(".avatar-active, #cpanel, #alertDiv, #info").css("opacity", 1);
          boardzoom = true;
        }, 500)
      }

  };

var positions = {
  0 : [650, 500],
  1 : [610, 470],
  2 : [575, 450],
  3 : [540, 425],
  4 : [510, 400],
  5 : [470, 375],
  6 : [435, 350],
  7 : [405, 325],
  8 : [370, 300],
  9 : [335, 270],
  10 : [300, 240],
  11 : [335, 210],
  12 : [370, 190],
  13 : [405, 160],
  14 : [435, 135],
  15 : [470, 115],
  16 : [505, 85],
  17 : [540, 65],
  18 : [570, 40],
  19 : [610, 15],
  20 : [650, 0],
  21 : [690, 15],
  22 : [720, 40],
  23 : [760, 65],
  24 : [795, 90],
  25 : [825, 115],
  26 : [860, 140],
  27 : [890, 165],
  28 : [925, 190],
  29 : [960, 215],
  30 : [1000, 245],
  31 : [965, 275],
  32 : [925, 300],
  33 : [895, 325],
  34 : [860, 350],
  35 : [825, 375],
  36 : [790, 400],
  37 : [755, 425],
  38 : [720, 450],
  39 : [690, 470],

}



$(window).resize(function() { 

scale_x = $(window).width() / 1366;
// scale_y = $(window).height() / 619;
$('#canvas').css("transform-origin","top left");
$('#canvas').css("transform","scale("+scale_x+")");

for (var key in positions) {
    positions[key][1] *= scale_x;
    positions[key][0] *= scale_y;
}

});


scale_x = $(window).width() / 1366;
// scale_y = $(window).height() / 619;
$('#canvas').css("transform-origin","top left");
// $('#canvas').css("transform","scale("+scale_x+", "+scale_y+")");
$('#canvas').css("transform","scale("+scale_x+"), translateY(50%)");
// console.log('dfdfdf');

// console.log('fdf');

$("#avatar1, #avatar2, #avatar3, #avatar4, #avatar5, #avatar6, #avatar7").css({"left": positions[0][0]+"px", "top": positions[0][1]+"px"});


function showCpanelBoard(radio, board){
  $(".cpanel-board").css("display", "none");
  $(".cpanel-circle").removeClass("cpanel-circle-active");
  $("#"+radio+" .cpanel-circle").addClass("cpanel-circle-active");
  $("."+board).css("display", "block");
  $(".cpanel-board-black").css("opacity", 0);
  $(".cpanel-board-black").css("display", "block");
  $("#cpanel").css("z-index", 4);

  setTimeout(function(){
    $("."+board).css("opacity", 1);
    $(".cpanel-board-black").css("opacity", 1);
  }, 100)
}


function closeCpanel(radio, board){
  $(".cpanel-board").css("opacity", 0);
  $(".cpanel-board-black").css("opacity", 0);
  $(".cpanel-circle").removeClass("cpanel-circle-active");
  $(".cpanel-board-black").css("opacity", 0);
    $(".cpanel-board-black").css("display", "block");
  $("#cpanel").css("z-index", 1);

  setTimeout(function(){
  $(".cpanel-board").css("display", "none");
  $(".cpanel-board-black").css("display", "none");
  }, 100)
}

function closeAlert(){
    $("#alertDiv").css("transform", "translateY(0)");
    $("#alertDiv").css("opacity", 0);
}


$('.black-fade').on("click", function(){
  $(".black-fade").css("opacity", 0);
  setTimeout(function(){
    $(".black-fade").hide();  
  }, 500)
  console.log('ff')
});










// showCpanelBoard('tradecircle','trade-board');



// tiler(11);