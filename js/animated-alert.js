// https://cdn.lordicon.com/jtiihjyw.json
// https://cdn.lordicon.com/tjgiycnd.json
// Star
// https://cdn.lordicon.com/hgqdtxby.json
// https://cdn.lordicon.com/ylmlpmfe.json

// House
// https://cdn.lordicon.com/epietrpn.json

// Single coir
// https://cdn.lordicon.com/lxizbtuq.json

function aa(src="https://cdn.lordicon.com/ylmlpmfe.json", text="", xpos="100", ypos="100", duration=5000) {



    $("#alertAnimationDiv").html(`
            <lord-icon id="alertAnimationIcon"
            src=""
            trigger="loop" class="animate__animated">
            </lord-icon>

            <div id="alertAnimationText"></div>
    `);

    $("#alertAnimationDiv").css({"left": xpos+"px", "top": ypos+"px"})
    $("#alertAnimationDiv").show();
    $("#alertAnimationDiv").addClass('animate__jackInTheBox');
    $("#alertAnimationIcon").addClass('animate__zoomInDown');

    $("#alertAnimationText").html(text);
    $("#alertAnimationIcon").attr("src", src);
    
    setTimeout(function(){
        hideaa();
    }, duration);

}

function hideaa(){
    $("#alertAnimationIcon").removeClass('animate__zoomInDown');
    $("#alertAnimationIcon").addClass('animate__flipOutY');
    $("#alertAnimationDiv").removeClass('animate__jackInTheBox');
    $("#alertAnimationDiv").addClass('animate__flipOutY');

    setTimeout(function(){
        $("#alertAnimationDiv").html("");
    }, 1000);

}

function avatarPower(text, src="https://cdn.lordicon.com/hgqdtxby.json"){
    // hideaa();
    aa(src, "Avatar Power Activated! <br> <br> "+text, 100, 100);
}



// aa("https://cdn.lordicon.com/jtiihjyw.json", "Sold!");




function winningAnimation(){
    
    $('.winning-story-black').show();
    $('.winning-story-black').addClass('animate__fadeIn');
    
    const duration = 50 * 1000,
    animationEnd = Date.now() + duration;

    let skew = 1;

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    (function frame() {
    const timeLeft = animationEnd - Date.now(),
        ticks = Math.max(200, 500 * (timeLeft / duration));

    skew = Math.max(0.8, skew - 0.001);

    confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
        requestAnimationFrame(frame);
    }
    })();

    setTimeout(function(){
        console.log(p.avatar);
    var winnaerImg = "images/avatar"+p.avatar+".png";
    $('.winning-story-icon').css({"background": "url("+winnaerImg+")", "background-size": "cover"});
    $('.winning-story-title').html(p.name + " has won the game!");
    }, 1000);
}


  // Call this function after the window is fully loaded
  function increaseProgressFast() {
    clearInterval(progressInterval); // Stop the previous interval
    increment = 20; // Set a faster increment
    progressInterval = setInterval(increaseProgress, 100);
  }


document.onreadystatechange = function () {
    maxProgressWidth = 100;
    increaseProgressFast();
    progressInner.classList.remove("animate__flash");
    setTimeout(function(){
        clearInterval(progressInterval);
        $("#progress").addClass("animate__bounceOutDown");
        $("#logo").removeClass("animate__flipInX");
        $("#logo").addClass("animate__bounceOutUp");
        setTimeout(function(){
            $('#preloader').addClass("animate__fadeOut");
            setTimeout(function(){
                $('#preloader').hide();
            }, 1000);
    }, 300);
}, 2000);

    

aa("https://cdn.lordicon.com/hpoomrpy.json", "Welcome! Would you like a guided Tour? <br><br> <div onclick='tour1();changeSFX();hideaa();' class='btn rollbtn'>Yes please!</div>", 100, 100, 20000);

};
