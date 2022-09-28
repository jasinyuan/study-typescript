"use strict";
const names = [];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 2000);
});
promise.then(data => {
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'yuan' }, { age: '20' });
console.log(mergedObj.age);
function aa(element) {
    let des = 'go no value.';
    if (element.length === 1) {
        des = 'go 1 element';
    }
    else if (element.length > 1) {
        des = 'go ' + element.length + ' element';
    }
    return [element, des];
}
console.log(aa(['hello', 'yuan']));
function bb(obj, key) {
    return 'value ' + obj[key];
}
console.log(bb({ name: 'yuan' }, 'name'));
class cc {
    constructor() {
        this.data = [];
    }
    additem(item) {
        this.data.push(item);
    }
    removeitem(item) {
        const oo = this.data.indexOf(item);
        this.data.splice(oo, 1);
    }
    getitem() {
        return [...this.data];
    }
}
const pp = new cc();
pp.additem(10);
pp.additem(30);
pp.removeitem(30);
pp.getitem();
console.log(pp);
