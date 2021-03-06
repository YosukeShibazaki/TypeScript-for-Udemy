export {};

const greething: string = 'hello!';
console.log(greething);

// Section2-14
let boolValue: boolean = false;
let intCount: number = 2; // number型は浮動小数点、負の整数を代入することもできる。
let strValue: string = 'Hello World';

// Section2-15 型推論
let hasValue = 50; // 型は自動でnumberになる。最初に代入する値で型を推論・自動決定している。
let numValuse; // 変数の初期値を代入しない場合は、型はanyになる。= 何でも代入できる。
numValuse = 'Hello World';
// 基本は型推論でOK。変数を初期化しない場合は型注釈を使用するべき。

// Section2-16 オブジェクトに型を付ける方法
const person: {
    name: string;
    age: number;
} = {
    name : 'Mike',
    age : 20
}
console.log(`I am ${person.name}. My age is ${person.age}`);

// ネストした場合
const person2: {
    name: {
        firstName: string;
        lastName: string;
    };
    age: number;
} = {
    name: {
        firstName: '洋輔',
        lastName: '柴崎'
    },
    age: 23
}
console.log(person2.name.firstName);

// Section2-17 配列に型を着ける方法
const arrPersons: string[] = ['akane', 'yosuke', 'waki'] // 型の後に［］をつけると配列と認識させることができる。
// 型注釈をしない場合はany型で値を配列に代入することができる。
arrPersons.forEach(person => {
    console.log(person);
});

// Section2-18 Tuple型
const arrBook: [string, number, boolean] = ['bookName', 1500, true];
// Tuple型は必ず型注釈をする。n番目の値はどの型なのか明示的にする必要がある。
arrBook.push(50) // pushメソッドはエラーが起きない。
// console.log(arrBook[3]); // 参照するときにpushしたものが参照できないというエラーになる。

// Section2-19 Enumを使って、特定のまとまったグループを変数として利用できるようにする。
enum CoffeeSize {
    SHORT = 'SHORT',
    MIDIUM = 'MIDIUM',
    GRANDE = 'GRANDE',
    TALL = 'TALL'
}
console.log(CoffeeSize.MIDIUM);
// coffeeSizeに指定した変数のみしか使用できない。代入しようとするとエラーになる。
// Enumは頭文字を大文字にしたキャメルケースを使用。ただし、memberは全て大文字にするという暗黙のルールが...。

// Section2-20 any型について
let anything: any = true;
anything = 'mozi';
anything = 5;
anything = []
anything[5] = 50;
console.log(anything);
anything = {}
anything.hoge = true;
console.log(anything);
boolValue = anything; // boolValueはbooleanなのに代入できてしまう。⇒ any型は型チェックが通らないので、なるべく避ける。

// Section2-21 Union型
let unionType: string | number = 10;
unionType = 'Hello'; // 文字列も数十も代入ができる。
let unionTypes: (string | number)[] = ['string', 1500] // 配列の場合の書き方

// Section2-22 Literal型
let literal: 'Hello' = 'Hello';
console.log(literal); // 型注釈として値を直接指定する。指定の値しか代入できなくなる。

let clothSize: 'small' | 'midium' | 'large' = 'midium';
console.log(clothSize); // 型注釈の際にUnion型で定義することもできる。

let cloth = {
    color: 'white',
    size:clothSize
}// cloth.sizeには再代入することができない。clothを定義するときに先にプロパティの型注釈をUnion型ですれば特定の複数の値を代入できるようになる。

// Section2-23 型エイリアス
type anySize = 'small' | 'midium' | 'large';
let drinkSize: anySize = 'midium';
console.log(drinkSize); // 型を変数かできる。同じ型の変数を宣言するときに型注釈が冗長にならない。

// Section2-24 関数に型を適応させる
function add(num1: number, num2: number): number { // 引数と戻り値を型注釈する。
    return num1 + num2
}
console.log(add(5, 60));

// Section2-25 void型について
function sayHello(): void { // 関数が何も返さない場合は明示的にvoid型を宣言する。
    console.log('Hello');
}
console.log(sayHello());

function sayHello2(): undefined { // 関数が何も返さない場合でもreturn句があると型にundefinedが使える。※使用する必要はない。基本は全てvoid。
    console.log('Hello');
    return;
}
console.log(sayHello2());
// ※型にはundefined,null型というのも存在する。

// Section2-27 特定の関数のみを代入できる変数を作る。
const anoterAdd: (n1: number, n2: number) => number = add // 変数を定義する際に引数・戻り値の型注釈をして関数を代入する。
console.log(anoterAdd(5, 10));

const doubleNumber = (num: number): number => num * 2; // Arrow function(引数が1つでも型注釈する場合は括弧が必要)
const tripleNumber: (num: number) => number = num => num * 3 // 引数が1つで括弧を書きたくない場合は、関数名の後に型注釈する。

// Section2-28 コールバック関数の型
function doubleAndHandle(num: number, cbFunction: (num: number) => number): void {
    const doubleNumber = cbFunction(num * 2);
    console.log(doubleNumber);
    console.log(num * 2);
}

doubleAndHandle(10, doubleNum => {
    return doubleNum;
});

// Section2-29 unknown型
let unknownInput: unknown;
unknownInput = 'string';
unknownInput = 50;
unknownInput = true;
let text: string;
// text = unknownInput; // any型はどの型の変数に対しても代入ができるが、unknown型は代入されている値の型と同じ型の変数にしか代入できない。
if (typeof unknownInput === 'string') { // if文で型を確認してから代入を行うようにする。
    text = unknownInput;
}

// Section2-29 never型
function error(message: string): never { // never型は決して何も返さないということ。void型は明示的に返さないことを示しているが、一応undefinedを返す。
    throw new Error(message);
}
console.log(error('this is error!'));