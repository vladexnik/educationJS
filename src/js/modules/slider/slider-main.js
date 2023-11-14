import Slider from "./slider";



export default class MainSlider extends Slider{
    constructor(container,btns){
        super(container,btns);
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try{
            this.hanson.style.opacity='0';
            if(n==3){
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.classList.add('slideInUp');
                    this.hanson.style.opacity='1';
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch(e){}


        Array.from(this.slides).forEach(slide => {
            slide.style.display = 'none';
        });
        this.slides[this.slideIndex-1].classList.add('animated', 'fadeIn');
        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    goToSchedule(){
        let btns=document.querySelectorAll('.menu__block-schedule');
        
        btns.forEach(btn=>{
            btn.addEventListener('click',()=>{
                console.log(1);
                console.log(Array.from(this.slides));
                Array.from(this.slides).forEach(slide => {
                    slide.style.display = 'none';
                });
                this.slideIndex=4;
                this.showSlides(this.slideIndex);
                
            })
        })
    }


    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers(){

        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });
        
            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex=1;
                
                this.showSlides(this.slideIndex);
            });
        });

        
        document.querySelectorAll('.prevmodule').forEach(item=>{
            item.addEventListener('click',(e)=>{
                e.preventDefault();
                this.plusSlides(-1);
            })
        })
        document.querySelectorAll('.nextmodule').forEach(item=>{
            item.addEventListener('click',(e)=>{
                e.stopPropagation(); //чтоб не было всплытия событий
                e.preventDefault();
                 this.plusSlides(+1);
            })
        })
    }


    render() {
        
        if(this.container){ // если контейнер не налл т е сущ-ет
            try{
                this.hanson=document.querySelector('.hanson');           
            }
            catch(e){}

            this.showSlides(this.slideIndex);
            this.bindTriggers();
            this.goToSchedule();
        } 
    }
}