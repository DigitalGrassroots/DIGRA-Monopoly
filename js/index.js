
function pager(e, external=false) {
    // closeNav();
    document.getElementById('page').style.opacity = 0;
    document.getElementById('page').style.transform = " scale(0.9)";
    setTimeout(function(){
        if (!external) {
        	window.location.href = e;
        }else{
            // open in new tab
        }

    }, 500);

};

document.addEventListener("visibilitychange", () => {
    document.getElementById('page').style.opacity = 1;
    document.getElementById('page').style.transform = "translateX(0)";
});
