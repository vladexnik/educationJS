

export default class Downloader{
    constructor(triggers){
        this.btns=document.querySelectorAll(triggers);
        this.path1='assets/marketing.pdf';
        this.path2='assets/quoting.pdf';

    }

    downloadItem(path){
        let element=document.createElement('a');
        element.setAttribute('href', path);
        element.setAttribute('download', path.slice(7));
        element.style.display='none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    init(){
        this.btns.forEach(btn=>{
            btn.addEventListener('click',(e)=>{

                switch(btn.getAttribute('data-link')){
                    case "1":
                        console.log(1);
                        e.stopPropagation();
                        this.downloadItem(this.path1);
                        break;
                    case "2":
                        console.log(2);
                        e.stopPropagation();
                        this.downloadItem(this.path2);
                        break;
                }
    
                
            })
        })
    }


}