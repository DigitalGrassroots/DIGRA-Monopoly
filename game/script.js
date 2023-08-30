
// var navC = document.getElementById('nav-content');
// function openNav(){
//     navC.style.display = 'block';
//     setTimeout(function(){
//         navC.style.opacity = 1;
//         navC.style.transform = "scale(0.95)";

//     }, 100);
// }

// function closeNav(){
//     navC.style.opacity = 0;
//     navC.style.transform = "scale(0.8)";

//     setTimeout(function(){
//     navC.style.display = 'none';

//     }, 300);
// }


// function navImg(e=1){
//     document.getElementById('nav-content-left').style.background = "rgb(255, 255, 255, 0.04) url(assets/images/nav/"+e+".jpg) top";
//     // console.log(e)

// }


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('page').style.opacity = 1;
    document.getElementById('page').style.transform = 'scale(1)';
});


document.addEventListener("click", (e) => {
    const { target } = e;
    // if (!target.matches("a")) {
    //     return;
    // }
    // messing with the site. need to check for only <a>
    e.preventDefault();
    // route();
    // console.log(target);
});


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
