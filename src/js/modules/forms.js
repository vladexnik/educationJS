import { db} from '../modules/firebaseConfig';

import { addDoc, collection} from "firebase/firestore"; 



export default class Form{
    constructor(forms){
        this.forms=document.querySelectorAll(forms);
        this.inputs=document.querySelectorAll('input');
        this.message={
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро с вами свяжемся.',
            failure: 'Что-то пошло не так...'
        };
    
        this.path={
            designer: 'assets/server.php',
            question: 'assets/question.php'
        };
    }


    clearInputs(){
        this.inputs.forEach(input=>{
            input.value='';
        })
    }

    checkMailInputs=()=>{    
        const mailInputs=document.querySelectorAll('[type="email"]');
        mailInputs.forEach(input => {
            input.addEventListener('keypress',function (e){
                if(e.key.match(/[^a-z 0-9 @ \.]/ig) || (input.getAttribute('autocomplete')==='language')== 'eng') {
                    e.preventDefault();
                }
            });
            input.addEventListener('input', function(){
                input.value=input.value.replace(/[^a-z 0-9 @ \.]/ig,'');
            })
        });
    } 

    initMaskPhone(){
        let setCursorPosition=(pos, elem)=>{
            elem.focus();
    
            if(elem.setSelectionRange){
                elem.setSelectionRange(pos,pos)
            } else if (elem.createTextRange) {
                let range=elem.createTextRange();
            
                range.collapse(true); // 
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }
    
        function createMask(event){
            let matrix='+1 (___) ___-____',
                i=0,
                def=matrix.replace(/\D/g, ''),
                val=this.value.replace(/\D/g, ''); // избавл от не цифр
    
            if(def.length>=val.length){
                val=def; 
            }
            
            this.value=matrix.replace(/./g, function(a){
                return /[_\d]/.test(a) && i<val.length ?  val.charAt(i++) : i>=val.length ? '' : a;
            });
            //console.log(val.length);
    
            if(event.type==='blur'){
                if(this.value.length==2){
                    this.value='';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
    
            // количество цифр в номере проверка
            let btnsOrder=document.querySelectorAll('.btn');
            btnsOrder.forEach(btnOrder=>{
                if(val.length<11){
                   btnOrder.setAttribute("disabled","disabled");
                }
                else{
                    btnOrder.removeAttribute("disabled","disabled");
                }
            })
        }
        
        let inputs=document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input=>{
            input.addEventListener('mouseup', createMask, (e)=>{
                e.preventDefault();
                input.setSelectionRange(1);
            });
    
            input.addEventListener('keyup', createMask, (e)=>{
                if (e.code==='ArrowLeft'){
                    e.preventDefault();
                    input.setSelectionRange(1);
                }
            })
            
    
        });
    
        inputs.forEach(input=>{
            input.addEventListener('input', createMask); // формируются вводные
            input.addEventListener('focus', createMask); // устан-ся курсор
            input.addEventListener('blur', createMask); // очищ-ся введённые
        })
        
    }


    async postData(url, data) {
        await addDoc(collection(db, "orders"), data); 
    
    }


    init(){
        this.initMaskPhone();
        this.checkMailInputs();
        this.forms.forEach(form=>{
            form.addEventListener('submit', (e)=>{
                e.preventDefault();

                let status=document.createElement('div');
                form.parentNode.appendChild(status);
                status.textContent=this.message.loading;
                status.style.cssText=`
                    color: grey;
                    font-size: 21px;
                    padding-top: 20px;
                    font: Georgia, serif;
                    
                `
                let formData=new FormData(form);
                let formDataObject = Object.fromEntries(formData.entries());
                this.postData(this.path.question, formDataObject)
                    .then(res=>{
                        console.log(res);
                        status.textContent=this.message.success;
                    })
                    .catch(()=>{
                        status.textContent=this.message.failure;
                    })
                    .finally(()=>{
                        this.clearInputs();
                        setTimeout(() => {
                            status.remove();
                        }, 3000);
                    })
            })
        })
    }


}