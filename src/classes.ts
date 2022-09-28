abstract class Depaetment{
    // private readonly id : string;
    // private name: string;
    protected employees: string[] = [];//与private不用，在私有基础上不完全私有，可以用于类与扩展类
    constructor(protected readonly id : string, public name:string){
        //readonly：ts中只需要初始化一次的只读关键字
    }
    static createemployee(name:string){
        return {name:name}
        //使用static可不需要实例化，但必须通过类名才能直接调用
    }
    abstract describe(this:Depaetment):void;
    
    
    demployees(employees:string){
        this.employees.push(employees)
    }
    printemployees(){
        console.log(this.employees.length);
        console.log(this.employees);      
    }

}

class it extends Depaetment{
    admins:string[] = [];
    constructor(id:string,admins:string[]){
        super(id,'it')
        this.admins = admins;
    }
    describe() {
        console.log('it' + this.id);
        
    }
}

class accoun extends Depaetment{
    private reports:string[] = []
    private lastReport: string;
    get aa(){
        if(this.lastReport){
            return this.lastReport
        }
        throw new Error('hhhhhhhh')
    }
    set aa(value:string){
        if (!value) {
             throw new Error("qqqqqqqq");           
        }
        this.addReport(value);
    }
    constructor(id:string,reports:string[]){
        super(id,'acc');
        this.lastReport = reports[0];
    }
    addReport(text:string){
        this.reports.push(text)
        this.lastReport = text
    }
    getreport(){
        console.log(this.reports);
        
    }
    addemployees(name: string){
        if (name === 'yuan') {
            return
        }
        this.employees.push(name)
    }
    describe(){
        console.log('acc' + this.id);
    }
}
const em1 = Depaetment.createemployee('liang')
console.log(em1);


const tt = new it('4',['yuan']);

tt.describe()
tt.printemployees()

console.log(tt);

const ac = new accoun('5',[])
ac.addemployees('yuan')
ac.printemployees()
ac.aa = 'love'
ac.addReport('i love you')
console.log(ac.aa);
ac.getreport();
console.log(ac);






// const jj = {name:'cc',describe:accountng.describe}

// jj.describe();

