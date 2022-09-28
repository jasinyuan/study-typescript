"use strict";
class Depaetment {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createemployee(name) {
        return { name: name };
    }
    demployees(employees) {
        this.employees.push(employees);
    }
    printemployees() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class it extends Depaetment {
    constructor(id, admins) {
        super(id, 'it');
        this.admins = [];
        this.admins = admins;
    }
    describe() {
        console.log('it' + this.id);
    }
}
class accoun extends Depaetment {
    constructor(id, reports) {
        super(id, 'acc');
        this.reports = [];
        this.lastReport = reports[0];
    }
    get aa() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('hhhhhhhh');
    }
    set aa(value) {
        if (!value) {
            throw new Error("qqqqqqqq");
        }
        this.addReport(value);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    getreport() {
        console.log(this.reports);
    }
    addemployees(name) {
        if (name === 'yuan') {
            return;
        }
        this.employees.push(name);
    }
    describe() {
        console.log('acc' + this.id);
    }
}
const em1 = Depaetment.createemployee('liang');
console.log(em1);
const tt = new it('4', ['yuan']);
tt.describe();
tt.printemployees();
console.log(tt);
const ac = new accoun('5', []);
ac.addemployees('yuan');
ac.printemployees();
ac.aa = 'love';
ac.addReport('i love you');
console.log(ac.aa);
ac.getreport();
console.log(ac);
