//接口与类型
//接口只能用于描述对象的结构
//类型中还能储存其他东西（联合类型等等）
//可以让class调用接口，让class遵循接口的模板但是也可以自行扩展属性以及方法，但必须存在接口中的方法
//可以一次性进行多个接口的继承，class只能一个
interface addfn{
    (n1:number,n2:number):number
}
let add:addfn;
add = (n1:number,n2:number) => {
    return n1 + n1
}
interface Greetable{
    readonly name?:string;//在接口中不能使用私有，公有等，只能使用可读
    greet(phrase:string):void
}

class person implements Greetable{
    name?: string;
    age=30;
    constructor(n?:string){
        if(n){
            this.name = n
        }else{
            console.log('hello');
            
        }
    }
    greet(phrase:string){
        if (this.name) {
            console.log(phrase + '' +this.name); 
        } else {
            console.log('nihao');
            
        }      
    }
}

let app:Greetable

app = new person()
app.greet('hello')
console.log(app);


