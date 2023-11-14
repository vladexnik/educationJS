import MiniSlider from "./modules/slider/slider-mini";
import MainSlider from "./modules/slider/slider-main";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Form from "./modules/forms";
import ShowInfo from "./modules/showInfo";
import Downloader from "./modules/downloader";


window.addEventListener('DOMContentLoaded', ()=>{
    let slider=new MainSlider({btns: '.next', container: '.page'});
    slider.render();

    let modulePageSlider=new MainSlider({
        container: '.moduleapp',
        btns: '.next'
    })
    modulePageSlider.render();

    let showUpSlider=new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev', 
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();


    const modulesSlider=new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev', 
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    })
    modulesSlider.init();

    const feedSlider=new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev', 
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active',
        autoplay: false
    })
    feedSlider.init();

    new VideoPlayer('.showup .play','.overlay').init();

    new VideoPlayer('.module__video-item .play', '.overlay').init();

    new Difference('.officerold', '.officernew','.officer__card-item').init();
    new Form('.form').init();

    new ShowInfo('.plus__content').init();
    new Downloader('.download').init();
})