//装饰器的记录是从上往下的，遵循js的规则
//装饰器的功能是从下往上的，最底层的装饰器先执行功能
//都在定义时执行

function Logger(fbi:string){
    console.log('logger factory');   
    return function (caa:Function) {
        console.log(fbi);
        console.log(caa);     
    }  
}

function withTemplate(template: string,hookid: string) {
    console.log('template factory'); 
    return function<T extends {new(...args:any[]):{name : string}}> (Aconstructor:T) {
        //保持原class的基础上，增加了其他的方法替换原class
        return class extends Aconstructor{
            constructor(..._:any[]){
                super()//保持了原来的类以及类的方法函数
                console.log('rendering temlate'); 
                const ie = document.getElementById(hookid);
                if (ie) {
                    ie.innerHTML = template;
                    ie.querySelector('h1')!.textContent = this.name
                }
            }
        }
    }
}

@Logger('hi i an yuan')
@withTemplate('<h1>my person object</h1>','app')
class Person {
    name = 'yuan';

    constructor(){
        console.log('hello yuan');
        
    }
}

const pers = new Person();

console.log(pers);


function Log(target: any,pname: string | symbol) {
    console.log('66514616981');
    console.log(target,pname);
    
}

function Log2(target: any,name: string,descriptor: PropertyDescriptor) {
    console.log('77777777');
    console.log(target);
    console.log(name);
    console.log(descriptor); 
}

function Log3(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
    console.log('88888888888');
    console.log(target);
    console.log(name);
    console.log(descriptor); 
}

function Log4(target: any, name: string | symbol, position: number) {
    console.log('999999999');
    console.log(target);
    console.log(name);
    console.log(position); 
}


class product{
    @Log
    title: string;
    private _pricr: number;

    @Log2
    set pricr(val: number){
        if (val) {
            this._pricr = val   
        }else{
            throw new Error("hhhhhhhhhhhhhhhh...");
            
        }
    }

    constructor(t: string,p: number){
        this.title = t;
        this._pricr = p;
    }

    @Log3
    getprice(@Log4 tax: number){
        return this._pricr * (1 + tax)
    }
}

 const p1 = new product('yuan',10);

 console.log(p1);


 function Autobind(_:any,_2:string,descriptor:PropertyDescriptor) {
    const orig = descriptor.value;
    const adjd:PropertyDescriptor = {
        // configurable:true,
        // enumerable:false,
        get (){
            const boundFn = orig.bind(this)
            return boundFn
        }     
    };
    return adjd;
 }
 


 class rr {
    pp = 'helllo';

    @Autobind
    show(){
        console.log(this.pp);
    }

 }

 const yy = new rr();

const UU = document.querySelector('button')!;
UU.addEventListener('click',yy.show)


