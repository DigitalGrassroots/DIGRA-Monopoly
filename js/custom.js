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

        $(".avatar, #cpanel, #alertDiv, #info, .city").hide();
        $(".faceProperty").css("opacity", 0);
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
        $(".avatar-active, #cpanel, #alertDiv, #info, .faceProperty").css("opacity", 0);
        $(".avatar-active, #cpanel, #alertDiv, #info, .activated-city").show();
        $("#centerCards").css("display", "none");
        $("body").removeClass('body-plain');
          $('#centerCards').css("transform", "translate(0, 0)");
        setTimeout(function(){
        $(".avatar-active, #cpanel, #alertDiv, #info, .activated-city").css("opacity", 1);
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
alertLeft = 540 * scale_x;
// scale_y = $(window).height() / 619;
$('#canvas').css("transform-origin","top left");
$('#canvas').css("transform","scale("+scale_x+")");
$('#alertDiv').css("left", alertLeft+"px");

// for (var key in positions) {
//     positions[key][1] *= scale_x;
//     positions[key][0] *= scale_x;
// }

});


scale_x = $(window).width() / 1366;
scale_y = $(window).height() / 619;
$('#canvas').css("transform-origin","top left");
$('#canvas').css("transform","scale("+scale_x+")");


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


$('#city1').on('click', function(){
  var HTML = "Internet Health <p style='font-weight:normal'>Enabling people in underrepresented regions to assess the state of the Internet in their community <br> A Digital Grassroots Project <br><br><a class='btn rollbtn' href='https://digitalgrassroots.org/community-leaders-for-internet-health.html' target='_blank'>Community Leaders</a> </p>";
  popup(HTML, "", "blank");
})

$('#city2').on('click', function(){
  var HTML = "Digra @ IGF 2023 <p style='font-weight:normal'>We facilitated sessions on Digital Inclusion and Internet Governance at the IGF 2023 in Japan. <br> Give us a like and a repost! <br><br><a class='btn rollbtn' href='https://x.com/rachadsanoussi/status/1712155510710161610?s=20' target='_blank'>View on X</a> </p>";
  popup(HTML, "", "blank");
})

$('#city3').on('click', function(){
  var HTML = "Justice Stand <p style='font-weight:normal'>Internet Justice for everyone. We have a long history for advocating against all forms of cyber bullying, cyber stalking and online harrasment. You can join the movement here. <br><br><a class='btn rollbtn' href='https://digitalgrassroots.org' target='_blank'>Take a look</a> </p>";
  popup(HTML, "", "blank");
})

$('#city4').on('click', function(){
  var HTML = "News Stand <p style='font-weight:normal'> <br><br><a class='btn rollbtn' href='https://digitalgrassroots.org' target='_blank'>Take a look</a> </p>";
  popup(HTML, "", "blank");
})

$('#city5').on('click', function(){
  var HTML = "The Gas Station <p style='font-weight:normal'>We support the use of clean energy tools and technologies for a better environment and a more sustainable internet. These include servers that utilize renewables and partnering with organizations that support green IoT infrastructure<br><br><a class='btn rollbtn' href='https://digitalgrassroots.org' target='_blank'>Take a look</a> </p>";
  popup(HTML, "", "blank");
})

$('#city6').on('click', function(){
  var HTML = "Bridging the Internet Divide <p style='font-weight:normal'>Even in 2024, the Internet still remains inaccessible for millions of marginilized people. <br> Several limiting factors stand in the way of including everybody. <br> As you continue to play this game, be on the look out for more easter eggs that appear; helping you understand more about the internet and the efforts we at <b>Digital Grassroots</b> are taking to help!</p>";
  popup(HTML, "", "blank");
})

$('#city7').on('click', function(){
  var HTML = "CChange <p style='font-weight:normal'>C/Change promotes interdisciplinary teams and individuals around the globe to build interactive prototypes that articulate a vision for the future of online cross-cultural exchange. We are proud to be one the the selected projects of 2023 <br><br><a class='btn rollbtn' href='https://cchange.xyz/lab-2023/' target='_blank'>Take a Look</a> </p>";
  popup(HTML, "", "blank");
})

$('#city8').on('click', function(){
  var HTML = "Train <p style='font-weight:normal'> <br><br><a class='btn rollbtn' href='https://digitalgrassroots.org/' target='_blank'>Take a Look</a> </p>";
  popup(HTML, "", "blank");
})

$('#city9').on('click', function(){
  var HTML = "The Cohort Academy <p style='font-weight:normal'>Digital Grassroots Ambassadors Program introduces youth from underrepresented communities to internet governance issues and provides a pathway for the youth to engage their local community on activities that promote digital citizenship. <br><br><a class='btn rollbtn' href='https://digitalgrassroots.org/ambassadors-program-cohort-4.html' target='_blank'>Take a Look</a> </p>";
  popup(HTML, "", "blank");
})

$('#city10').on('click', function(){
  var HTML = "Gamified Learning at MozFest 2023 <p style='font-weight:normal'>We were proud to conduct a session at the Gamified Learning for Internet Governance at MozFest 2023. You can read all about the session here <br><br><a class='btn rollbtn' href='https://digitalgrassroots.org/blog/digital-grassroots-at-mozilla-festival-2023.html' target='_blank'>Take a Look</a> </p>";
  popup(HTML, "", "blank");
})

$('#city11').on('click', function(){
  var HTML = "Pada Park <p style='font-weight:normal'>The Pada Platform is a space that brings young women and girls to innovate, create and speak-up. Pada is a symbol of sisterhood, competitiveness, claiming space, agility, creativity and celebration of women’s achievements. We are proud partners in this space. <br><br><a class='btn rollbtn' href='https://digitalgrassroots.org/blog/fostering-a-feminist-internet-insights-from-pada-platforms-founder.html' target='_blank'>Article: Fostering a Feminist Internet</a> </p>";
  popup(HTML, "", "blank");
})






// showCpanelBoard('tradecircle','trade-board');



// tiler(11);