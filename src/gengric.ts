const names:Array<string> = []

const promise: Promise<number> = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(10)
    }, 2000);
})

promise.then(data => {
    // data.split('')
})

function merge<T extends object ,U extends object>(objA:T,objB:U){
    //extends:类型约束
    return Object.assign(objA,objB)
}

const mergedObj = merge({name:'yuan'},{age:'20'})
console.log(mergedObj.age);


//接口泛型
interface lengthy{
    length:number
}

function aa<T extends lengthy>( element:T ):[T,string]{
    let des = 'go no value.'
    if (element.length === 1) {
        des = 'go 1 element'
    }else if (element.length > 1 ) {
        des = 'go '+ element.length +' element'
    }
    return [element,des]
}

console.log(aa(['hello','yuan']));


//泛型函数
function bb<T extends object,U extends keyof T>(obj:T,key:U){
    return 'value ' + obj[key]
}
console.log(bb({name:'yuan'},'name'));

//classes泛型
class cc <T>{
    private data:T[] = []

    additem(item:T){
        this.data.push(item)
    }
    removeitem(item:T){
        const oo = this.data.indexOf(item)
        this.data.splice(oo,1)
    }
    getitem(){
        return [...this.data]
    }
}

const pp = new cc<number>()

pp.additem(10);
pp.additem(30);
pp.removeitem(30);
pp.getitem();

console.log(pp);


