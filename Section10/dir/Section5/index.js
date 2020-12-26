"use strict";
const human = {
    name: 'Mike',
    age: 20,
    greeting(message) {
        console.log(message);
    }
};
// 64 implementsを使用してclassに対してinterfaceを適用する方法
class Developer {
    constructor(name, age, expelience) {
        this.name = name;
        this.age = age;
    } // プロパティはPublicかprotectedでなければNG。
    greeting() {
        console.log(`My name is ${this.name}. I am ${this.age}`);
    }
}
// 65 構造的部分型
const user = new Developer('Hyde', 38, 3); // Humanに定義されているプロパティが、インスタンスで最低限使用されていればエラーにならない。
const tmpDeveloper = {
    name: 'Hyde',
    age: 38,
    greeting(message) {
        console.log(message);
    },
    expelience: 4
};
const use2 = tmpDeveloper; // この形で代入することもできる。部分的に全てのプロパティを使用していればOK！
// 66 readonly修飾子で読み取り専用のinterfaceのプロパティを作成する。
// use2.name = 'HH' readonlyプロパティを変更しようとしているので、エラーになる。
const developer = new Developer('Mike', 38, 3);
developer.name = 'HH'; // クラスの初期化関数ではnameプロパティがPublicになっているので書き換えができる。
const addFnc = (num1, num2) => {
    return num1 + num2;
};
const nameble = {
    name: 'Mike'
};
const greeting2 = (message) => {
    if (message) {
        console.log(message);
    }
    else {
        console.log('引数プロパティはundefinedです。');
    }
};
greeting2();
greeting2('Hello');
class Dev2 {
    constructor(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        if (job) {
            this.job = job;
        }
    }
}
