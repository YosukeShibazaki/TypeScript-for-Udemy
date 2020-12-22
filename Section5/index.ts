// 62 インターフェイスはこう使う！
interface Human { // オブジェクトのみで使用できる型エイリアス。オブジェクトの型変数。
    // ユニオン型などを扱う場合はtypeエイリアスを使用する必要がある。
    readonly name: string,
    age: number
    // 63 メソッドをオブジェクトの型に指定する方法
    greeting(message: string): void
}

const human: Human = {
    name: 'Mike',
    age: 20,
    greeting(message){
        console.log(message)
    }
}

// 64 implementsを使用してclassに対してinterfaceを適用する方法
class Developer implements Human { // name,numberプロパティ、greetingメソッドを必ず使用する必要がある。
    constructor(public name: string, public age: number, expelience: number){} // プロパティはPublicかprotectedでなければNG。
    greeting(){
        console.log(`My name is ${this.name}. I am ${this.age}`);
    }
}

// 65 構造的部分型
const user: Human = new Developer('Hyde', 38, 3); // Humanに定義されているプロパティが、インスタンスで最低限使用されていればエラーにならない。
const tmpDeveloper = {
    name: 'Hyde',
    age: 38,
    greeting(message: string): void{
        console.log(message);
    },
    expelience: 4
}
const use2: Human = tmpDeveloper; // この形で代入することもできる。部分的に全てのプロパティを使用していればOK！

// 66 readonly修飾子で読み取り専用のinterfaceのプロパティを作成する。
// use2.name = 'HH' readonlyプロパティを変更しようとしているので、エラーになる。
const developer = new Developer('Mike', 38, 3);
developer.name = 'HH'; // クラスの初期化関数ではnameプロパティがPublicになっているので書き換えができる。
// user.name = '' userはHuman型のinterfaceで宣言した変数に、インスタンスを代入しているので上書きすることができない。

// 67 extendsを使用してinterfaceを継承する
interface sexAndHuman extends Human {
    sex: string
    // Humanの型を継承している。
}

// 68 interfaceで関数の型を表現する方法
interface addFnc { // interfaceで関数の型を表現する。typeによる型の定義と意味合いは同じ。両方の書き方を覚えておく。
    (num1: number, num2: number): number
}

const addFnc: addFnc = (num1: number, num2: number) => {
    return num1 + num2;
}

// 69 ?を使用して、あってもなくてもいいオプショナルプロパティ、オプショナルパラメータを指定する方法
interface Nameble {
    name: string,
    nickName?: string // あってもなくてもいい
}
const nameble = { // nickNameはないけどエラーにならない！
    name: 'Mike'
}

const greeting2 = (message?: string) => { // 関数の引数にもプロパティを使用することができる。
    if(message){
        console.log(message);
    } else {
        console.log('引数プロパティはundefinedです。');
    }
}

greeting2();
greeting2('Hello');

class Dev2 {
    constructor(public name: string, public age: number, public job?: string){ // クラスにも引数を指定することができる。
        if(job){
            this.job = job
        }
    }
}