"use strict";
let add;
add = (n1, n2) => {
    return n1 + n1;
};
class person {
    constructor(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
        else {
            console.log('hello');
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + '' + this.name);
        }
        else {
            console.log('nihao');
        }
    }
}
let app;
app = new person();
app.greet('hello');
console.log(app);
