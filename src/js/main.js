
import MainSlider from "./modules/slider/slider-main";
import VideoPlayer from "./modules/playVideo";



window.addEventListener('DOMContentLoaded', ()=>{
    let slider=new MainSlider({btns: '.next', page: '.page'});
    slider.render();

    let player=new VideoPlayer('.showup .play','.overlay');
    player.init();


})