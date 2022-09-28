"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(fbi) {
    console.log('logger factory');
    return function (caa) {
        console.log(fbi);
        console.log(caa);
    };
}
function withTemplate(template, hookid) {
    console.log('template factory');
    return function (Aconstructor) {
        return class extends Aconstructor {
            constructor(..._) {
                super();
                console.log('rendering temlate');
                const ie = document.getElementById(hookid);
                if (ie) {
                    ie.innerHTML = template;
                    ie.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = 'yuan';
        console.log('hello yuan');
    }
};
Person = __decorate([
    Logger('hi i an yuan'),
    withTemplate('<h1>my person object</h1>', 'app')
], Person);
const pers = new Person();
console.log(pers);
function Log(target, pname) {
    console.log('66514616981');
    console.log(target, pname);
}
function Log2(target, name, descriptor) {
    console.log('77777777');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('88888888888');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('999999999');
    console.log(target);
    console.log(name);
    console.log(position);
}
class product {
    constructor(t, p) {
        this.title = t;
        this._pricr = p;
    }
    set pricr(val) {
        if (val) {
            this._pricr = val;
        }
        else {
            throw new Error("hhhhhhhhhhhhhhhh...");
        }
    }
    getprice(tax) {
        return this._pricr * (1 + tax);
    }
}
__decorate([
    Log
], product.prototype, "title", void 0);
__decorate([
    Log2
], product.prototype, "pricr", null);
__decorate([
    Log3,
    __param(0, Log4)
], product.prototype, "getprice", null);
const p1 = new product('yuan', 10);
console.log(p1);
function Autobind(_, _2, descriptor) {
    const orig = descriptor.value;
    const adjd = {
        get() {
            const boundFn = orig.bind(this);
            return boundFn;
        }
    };
    return adjd;
}
class rr {
    constructor() {
        this.pp = 'helllo';
    }
    show() {
        console.log(this.pp);
    }
}
__decorate([
    Autobind
], rr.prototype, "show", null);
const yy = new rr();
const UU = document.querySelector('button');
UU.addEventListener('click', yy.show);
