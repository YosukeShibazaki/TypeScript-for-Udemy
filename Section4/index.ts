//  Section4-47 Class
class Person {
    name: string;
    constructor(initName: string){
        this.name = initName;
    }

    greeting(this: {name: string}){ //  Section4-49 Classにメソッドを追加する第一引数は必ずthisとする。
        console.log(`Hello! My name is ${this.name}`)
    }
}
const friendName = new Person('ビジコン太郎');
console.log(friendName);
friendName.greeting();

const anotherFriend = { // nameプロパティを指定することで、friendName.greetingで使用しているthisをがundefinedとならないようにする。
    name: 'ビジコン花子',
    anotherGreeting: friendName.greeting
}
anotherFriend.anotherGreeting()

//  Section4-50 Classを型として使う
class Workman {
    name: string;
    
    constructor(initName: string){
        this.name = initName;
    }

    greeting(this: Workman){ // 引数の型にClass名を使用することで、Workmanクラスのプロパティ・メソッド全て引数とすることができる。
        console.log(`Yah! 私は${this.name}です。`);
    }
}
const worker = new Workman('Mike');
console.log(worker.name);
worker.greeting();

const anotheWorker = { // greetingの引数がWorkmanクラスの中で使用されているので、必ずgreetingを使用する必要がある。
    name: 'tenten',
    greeting: worker.greeting
}
anotheWorker.greeting();

//  Section4-51 Private修飾子とPublic修飾子
class Parson2 {
    // name: string; // <= 外からもアクセスできてしまう状態
    // age: number; // <= 外からもアクセスできてしまう状態
    public name: string; // <= 外からもアクセスできる！メソッドに対しても使用できる。修飾子を書かない場合はデフォルトでパブリックになる。
    private age: number; // <= 外からはアクセスできない！(更新・参照できない)Classの中でしかアクセスできない。メソッドに対しても使用できる。

    constructor(initName: string, initAge: number){
        this.name = initName;
        this.age = initAge;
    }

    greeting(this :Parson2){
        console.log(`My name is ${this.name}. My age is ${this.age}`);
    }

    incrementAge(this: Parson2){
        this.age += 1;
    }
}

const parson = new Parson2('Mike', 20);
parson.greeting();
parson.incrementAge();
parson.greeting()
// console.log(parson.age); // <= error!!

//  Section4-52 初期化の処理の省略
class Parson3 {
    // name: string; // <= 宣言しなくても。。。
    // age: number; // <= 宣言しなくても。。。
    constructor(public name: string, private age: number){ // constructorの引数で宣言できる。pubulic,privateは省略ができなくなる
        this.name = name;
        this.age = age;
    }

    greeting(this :Parson3){
        console.log(`My name is ${this.name}. My age is ${this.age}`);
    }

    incrementAge(this: Parson3){
        this.age += 1;
    }
}
const parsen3 = new Parson3('Mike', 31);
parsen3.greeting();

//  Section4-53 readOnly修飾子を使って書き換えできないようにする方法
class Parson4 {
    readonly id: number;

    constructor(public readonly name: string, protected age: number, id: number){//  Section4-54 protectedを使用して継承先でも使えるようにする。
         // readOnlyでクラス内外から書き換えができない
        this.name = name;
        this.age = age;
        this.id = id + 1 // ただし、初期化関数であるconstructor内では書き換えすることができる
    }

    greeting(this :Parson4){
        console.log(`My name is ${this.name}. My age is ${this.age}`);
    }

    callId(this: Parson4){
        // this.id += 1; error!!
        console.log(`id:{this.id}`);
    }

    incrementAge(this: Parson4){
        this.age += 1;
    }

    // private ・・・　classの外から参照・更新ができない
    // readOnly ・・・ classの内外から更新ができない(constructor関数では更新できる)
}

//  Section4-54 extendsを使用して、他のclassの機能を継承する
class Teachar extends Parson4 { // 継承先のクラス名 extends 継承元のクラス名とするだけで、継承元の機能を全て引き継げる！
    constructor(name: string, age: number, id: number,public subject: string){ // constructorを使用するなら、継承元のconstructorの引数を書く必要がある。
        super(name, age, id); // extendsした場合、constructor内には必ずsuper()を宣言。引数には継承元のconstructorの引数を受け取る。
        this.subject = subject;
    }

    greeting(this: Teachar){ // 継承元のメソッドを変更したい場合は上書きをする。
        console.log(`My name is ${this.name}. My age is ${this.age}. Subject is ${this.subject}`); // 継承元がprotectedなので、外からのアクセスはできないが派生先のクラスでは使用することができる。
    }

    callSub(this: Teachar){
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
    get callSubject(){ // 
        if(!this.subject){
            throw new Error('エラーが発生しました。引数が設定されていません')
        }
        return this.subject;
    }

    set callSubject(value){ // ゲッターと同じ名称なら、引数はゲッターの戻り値と同じ型になる。(明示する必要はない。)
        this.subject = value;
    }

    constructor(name: string, age: number, id: number,public subject: string){
        super(name, age, id); 
        this.subject = subject;
    }

    greeting(){
        console.log(`My name is ${this.name}. My age is ${this.age}. Subject is ${this.subject}`); 
    }

    callSub(this: Teachar){
        console.log(this.subject);
    }
}

const teachar2 = new Teachar2('Mike', 20, 1, 'Sports');
console.log(teachar2.callSubject); // return値を取得する
teachar2.callSubject = ''; // = の右の値が引数となる。この場合は''(空文字)が引数。
// console.log(teachar2.callSubject);

//  Section4-57 staticを使用して、インスタンスを作らずにクラスを使う方法
class Teachar3 extends Parson4 {
    static hello = 'Hello'; // staticを宣言すると、インスタンスを作成しなくてもメソッドやプロパティにアクセスすることができる。
    static isAdult(age: number){
        return 17 > age
    }

    constructor(name: string, age: number, id: number,public subject: string){
        super(name, age, id); 
        this.subject = subject;
    }

    greeting(){
        console.log(`My name is ${this.name}. My age is ${this.age}. Subject is ${this.subject}`); 
        console.log(Teachar3.isAdult(16)); // クラス内でstatic宣言したプロパティにアクセスす場合は、クラス名.メソッド/プロパティと書く。
    }
}

console.log(Teachar3.hello);
console.log(Teachar3.isAdult(40));

//  Section4-58 Abstractを使用して、継承にのみ使用できるクラスを作る
abstract class Parson5 { // abstractクラスは、インスタンスの生成ができない。
    constructor(public name: string, protected age: number){
        this.name = name;
        this.age = age;
    }

    static isAdult(age: number){
        return 17 > age
    }

    greeting(this :Parson5){
        console.log(`My name is ${this.name}. My age is ${this.age}`);
        this.explainJob()
    }

    incrementAge(this: Parson4){
        this.age += 1;
    }

    abstract explainJob() :void // 継承先で使用することを保障するのabstract修飾子。abstract Classの中でしか使用できない。
}
// const parson4 = new Parson5('Mike', 20); error!!
Parson5.isAdult(50); // staticメソッド/変数にはアクセスできる。あくまでインスタンスの生成ができない。

class Teachar4 extends Parson5{
    constructor(name: string, age: number, public job: string){
        super(name, age); 
        this.job = job;
    }

    explainJob(){ // 継承先で必ず使用する。
        console.log(`I am a ${this.job}`);
    }
}

const teachar4 = new Teachar4('Mike', 20, 'SE');
teachar4.greeting();

//  Section4-59 constructor関数にprivate修飾子を付けて、シングルトンパターンを実装する。(1つのパターンのインスタンスのみ生成できるようにする)
class Parson6 {
    constructor(public name: string, protected age: number){
        this.name = name;
        this.age = age;
    }

    greeting(this :Parson6){
        console.log(`My name is ${this.name}. My age is ${this.age}`);
    }

    incrementAge(this: Parson6){
        this.age += 1;
    }
}

class Teachar6 extends Parson6{
    private static instance: Teachar6
    // constructor関数にprivate修飾子を付けると、newでクラス外部からインスタンスの生成ができない。
    private constructor(name: string, age: number, public job: string){
        super(name, age); 
        this.job = job;
    }

    static getInstance(){ // ただし、クラスの中でだったらインスタンスの生成はできる
        // Teachar6.instanceの中身がundefinedじゃなければinstanceをreturnする
        if(Teachar6.instance) return Teachar6.instance
        // undefinedならinstanceの中にインスタンスを生成してreturnする
        Teachar6.instance =  new Teachar6('Mike', 20, 'Teachar');
        return Teachar6.instance;
    }
}
const teachar6 = Teachar6.getInstance();
const anotheTeachar6 = Teachar6.getInstance(); // 同じ内容にインスタンスが返される。