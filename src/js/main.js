import Slider from "./modules/slider";
import VideoPlayer from "./modules/playVideo";



window.addEventListener('DOMContentLoaded', ()=>{
    let slider=new Slider('.page','.next');
    slider.render();

    let player=new VideoPlayer('.showup .play','.overlay');
    player.init();


})