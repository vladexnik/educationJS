import Slider from "./slider";

export default class MiniSlider extends Slider{
    constructor(container,prev,next, activeClass, animate, autoplay){
        super(container,prev,next, activeClass, animate, autoplay);
        this.paused=false;
    }

    decorizeSlides(){
        // console.log(Array.from(this.slides));
        Array.from(this.slides).forEach(slide => {
            slide.classList.remove(this.activeClass);
            if(this.animate){
                slide.querySelector('.card__title').style.opacity='0.4';
                slide.querySelector('.card__controls-arrow').style.opacity='0';
            }  
        });
 
        if(!this.slides[0].closest('button')){ // если акт первый слайд - не кнопка
            this.slides[0].classList.add(this.activeClass); // доб-ем класс
            if(this.animate){
                this.slides[0].querySelector('.card__title').style.opacity='1';
                this.slides[0].querySelector('.card__controls-arrow').style.opacity='1';
            }  
        }
       
    }  
    
    nextSlide(){
        if (this.prev.parentElement === this.container) {
            console.log(this.prev.parentNode);
            this.container.insertBefore(this.slides[0], this.prev);
         } else {
            this.container.appendChild(this.slides[0]);
         }
         this.decorizeSlides();
    }

    bindTriggers(){
        this.next.addEventListener('click',()=>{
            this.nextSlide();
        });

        this.prev.addEventListener('click',()=>{
            for(let i=this.slides.length-1; i>0;i--){
                if(this.slides[i].tagName!== 'BUTTON'){
                    let active=this.slides[i];
                    this.container.insertBefore(active, this.slides[0])
                    this.decorizeSlides();
                    break; 
                }
            }
        })
    }

    activateAnimation(){
        this.paused=setInterval(() => {
            this.nextSlide();
        }, 1000);
    }

    init(){
        // console.log(this.container,this.prev,this.next);
        
        try{
            this.container.style.cssText=`
            display:flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;
            this.bindTriggers();
            this.decorizeSlides();
        
            if(this.autoplay){
                this.activateAnimation();

                [this.container, this.next, this.prev].forEach(item=>{
                    item.addEventListener('mouseover',()=>{
                        clearInterval(this.paused);
                    })
                    item.addEventListener('mouseout',()=>{
                        this.activateAnimation();
                    })
                })
            } 
        } catch(e){}

    }

}