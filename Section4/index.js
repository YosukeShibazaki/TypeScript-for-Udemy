"use strict";
//  Section4-47 Class
class Person {
    constructor(initName) {
        this.name = initName;
    }
    greeting() {
        console.log(`Hello! My name is ${this.name}`);
    }
}
const friendName = new Person('ビジコン太郎');
console.log(friendName);
friendName.greeting();
const anotherFriend = {
    name: 'ビジコン花子',
    anotherGreeting: friendName.greeting
};
anotherFriend.anotherGreeting();
//  Section4-50 Classを型として使う
class Workman {
    constructor(initName) {
        this.name = initName;
    }
    greeting() {
        console.log(`Yah! 私は${this.name}です。`);
    }
}
const worker = new Workman('Mike');
console.log(worker.name);
worker.greeting();
const anotheWorker = {
    name: 'tenten',
    greeting: worker.greeting
};
anotheWorker.greeting();
//  Section4-51 Private修飾子とPublic修飾子
class Parson2 {
    constructor(initName, initAge) {
        this.name = initName;
        this.age = initAge;
    }
    greeting() {
        console.log(`My name is ${this.name}. My age is ${this.age}`);
    }
    incrementAge() {
        this.age += 1;
    }
}
const parson = new Parson2('Mike', 20);
parson.greeting();
parson.incrementAge();
parson.greeting();
// console.log(parson.age); // <= error!!
//  Section4-52 初期化の処理の省略
class Parson3 {
    // name: string; // <= 宣言しなくても。。。
    // age: number; // <= 宣言しなくても。。。
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.name = name;
        this.age = age;
    }
    greeting() {
        console.log(`My name is ${this.name}. My age is ${this.age}`);
    }
    incrementAge() {
        this.age += 1;
    }
}
const parsen3 = new Parson3('Mike', 31);
parsen3.greeting();
//  Section4-53 readOnly修飾子を使って書き換えできないようにする方法
class Parson4 {
    constructor(name, age, id) {
        this.name = name;
        this.age = age;
        // readOnlyでクラス内外から書き換えができない
        this.name = name;
        this.age = age;
        this.id = id + 1; // ただし、初期化関数であるconstructor内では書き換えすることができる
    }
    greeting() {
        console.log(`My name is ${this.name}. My age is ${this.age}`);
    }
    callId() {
        // this.id += 1; error!!
        console.log(`id:{this.id}`);
    }
    incrementAge() {
        this.age += 1;
    }
}
//  Section4-54 extendsを使用して、他のclassの機能を継承する
class Teachar extends Parson4 {
    constructor(name, age, id, subject) {
        super(name, age, id); // extendsした場合、constructor内には必ずsuper()を宣言。引数には継承元のconstructorの引数を受け取る。
        this.subject = subject;
        this.subject = subject;
    }
    greeting() {
        console.log(`My name is ${this.name}. My age is ${this.age}. Subject is ${this.subject}`); // 継承元がprotectedなので、外からのアクセスはできないが派生先のクラスでは使用することができる。
    }
    callSub() {
        console.log(this.subject);
    }
}
const teachar = new Teachar('Json', 32, 2, 'Math');
teachar.greeting();
teachar.callId();
teachar.incrementAge(); // クラスメソッドを使用することもできる
teachar.callSub();
//  Section4-56 ゲッターとセッター ※ES3には無いのでコンパイルする際は注意が必要
class Teachar2 extends Parson4 {
    constructor(name, age, id, subject) {
        super(name, age, id);
        this.subject = subject;
        this.subject = subject;
    }
    get callSubject() {
        if (!this.subject) {
            throw new Error('エラーが発生しました。引数が設定されていません');
        }
        return this.subject;
    }
    set callSubject(value) {
        this.subject = value;
    }
    greeting() {
        console.log(`My name is ${this.name}. My age is ${this.age}. Subject is ${this.subject}`);
    }
    callSub() {
        console.log(this.subject);
    }
}
const teachar2 = new Teachar2('Mike', 20, 1, 'Sports');
console.log(teachar2.callSubject); // return値を取得する
teachar2.callSubject = ''; // = の右の値が引数となる。この場合は''(空文字)が引数。
// console.log(teachar2.callSubject);
//  Section4-57 staticを使用して、インスタンスを作らずにクラスを使う方法
class Teachar3 extends Parson4 {
    constructor(name, age, id, subject) {
        super(name, age, id);
        this.subject = subject;
        this.subject = subject;
    }
    static isAdult(age) {
        return 17 > age;
    }
    greeting() {
        console.log(`My name is ${this.name}. My age is ${this.age}. Subject is ${this.subject}`);
        console.log(Teachar3.isAdult(16)); // クラス内でstatic宣言したプロパティにアクセスす場合は、クラス名.メソッド/プロパティと書く。
    }
}
Teachar3.hello = 'Hello'; // staticを宣言すると、インスタンスを作成しなくてもメソッドやプロパティにアクセスすることができる。
console.log(Teachar3.hello);
console.log(Teachar3.isAdult(40));
//  Section4-58 Abstractを使用して、継承にのみ使用できるクラスを作る
class Parson5 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.name = name;
        this.age = age;
    }
    static isAdult(age) {
        return 17 > age;
    }
    greeting() {
        console.log(`My name is ${this.name}. My age is ${this.age}`);
        this.explainJob();
    }
    incrementAge() {
        this.age += 1;
    }
}
// const parson4 = new Parson5('Mike', 20); error!!
Parson5.isAdult(50); // staticメソッド/変数にはアクセスできる。あくまでインスタンスの生成ができない。
class Teachar4 extends Parson5 {
    constructor(name, age, job) {
        super(name, age);
        this.job = job;
        this.job = job;
    }
    explainJob() {
        console.log(`I am a ${this.job}`);
    }
}
const teachar4 = new Teachar4('Mike', 20, 'SE');
teachar4.greeting();
//  Section4-59 constructor関数にprivate修飾子を付けて、シングルトンパターンを実装する。(1つのパターンのインスタンスのみ生成できるようにする)
class Parson6 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.name = name;
        this.age = age;
    }
    greeting() {
        console.log(`My name is ${this.name}. My age is ${this.age}`);
    }
    incrementAge() {
        this.age += 1;
    }
}
class Teachar6 extends Parson6 {
    // constructor関数にprivate修飾子を付けると、newでクラス外部からインスタンスの生成ができない。
    constructor(name, age, job) {
        super(name, age);
        this.job = job;
        this.job = job;
    }
    static getInstance() {
        // Teachar6.instanceの中身がundefinedじゃなければinstanceをreturnする
        if (Teachar6.instance)
            return Teachar6.instance;
        // undefinedならinstanceの中にインスタンスを生成してreturnする
        Teachar6.instance = new Teachar6('Mike', 20, 'Teachar');
        return Teachar6.instance;
    }
}
const teachar6 = Teachar6.getInstance();
const anotheTeachar6 = Teachar6.getInstance(); // 同じ内容にインスタンスが返される。
