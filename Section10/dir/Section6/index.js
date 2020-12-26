"use strict";
var _a, _b, _c;
const quiile = {
    name: 'quiile',
    role: 'front-end',
    follower: 1000
}; // interfaceでもextendsを使用して同じような定義方法をすることもできる。
// 73 条件文を使って肩を絞り込む3つのTypeGuard
// 1.typeofを使用する方法
function toUpperCase(value) {
    if (typeof value === 'string') { // typeofを使用して、引数の型がstringなら...と条件を絞り込む。
        return value.toUpperCase();
    }
    return value;
}
const profile = (nomadWorder) => {
    console.log(nomadWorder.name);
    if ('role' in nomadWorder) { // roleプロパティがあると保障していることになる。
        console.log(nomadWorder.role);
    }
    if ('follower' in nomadWorder) { // followerプロパティがあると保障していることになる。
        console.log(nomadWorder.follower);
    }
};
profile(quiile);
// 3.instanceof
class Dog {
    constructor() {
        this.kind = 'dog';
    }
    speak() {
        console.log('baw-waw');
    }
}
class Bird {
    constructor() {
        this.kind = 'bird';
    }
    speak() {
        console.log('tweet');
    }
    fly() {
        console.log('flluter');
    }
}
const havePet = (pet) => {
    pet.speak();
    if (pet instanceof Bird) { // 引数がBirdクラスから生成したインスタンスだったらTrue。オブジェクトを渡したらFalseになる。
        pet.fly();
    }
};
// havePet(new Bird());
// 74 タグ付きユニオンを使って型を絞り込む方法
const havePet2 = (pet) => {
    switch (pet.kind) {
        case 'bird':
            pet.fly();
        case 'dog':
            pet.speak();
    }
};
havePet2(new Bird());
// 75.型アサーションを使って手動で型を上書きする方法
// const input = document.getElementById('input'); input.valueにアクセスできない。HTMLInputElementという認証がない。
const jsxInput = document.getElementById('input'); // JSXはこの書き方がエラーになりにくい。
const domInput = document.getElementById('input'); // 通常のJSはこちらの書き方でもOK。
console.log(jsxInput.value);
console.log(domInput.value);
console.log(document.getElementById('input').value); // 変数に代入しないで直接アクセスすることもできる。
// 76 ! (NonNull - assertion operator)を使ってnullじゃないと言い切る方法
const input = document.getElementById('input'); // 定数inputの型がHTMLElementだけになる。(nullが消える。)
const designer = {
    name: 'Mike',
    kind: 'web',
    sex: 'man'
};
console.log(designer.sss); // エラーにならないため注意が必要。
// 78 関数のオーバーロードを使用して戻り値の型を正しくTypeScriptに伝える方法
const helloUpperCase = toUpperCase('hello'); // null or string
function toUpperCase2(value) {
    if (typeof value === 'string') { // typeofを使用して、引数の型がstringなら...と条件を絞り込む。
        return value.toUpperCase();
    }
    return value;
}
const helloUpperCase2 = toUpperCase2('hello'); // string only
const downloaedDate = {
    id: 1
};
// console.log(downloaedDate.user.name) userがundefinedの可能性があるためエラーになる。
console.log((_b = (_a = downloaedDate.user) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.first); // ?を付けたプロパティがundefinedならエラーを返さずにundefinedを返す。
// 80 Nullish Coalescing
const userDate = (_c = downloaedDate.user) !== null && _c !== void 0 ? _c : 'no-data'; // ??の前の値がundefinedなら、後ろのdataを代入する。
const tmpFnction = function (x) { return 0; };
let intersectionFnc;
intersectionFnc = (a, b) => {
    return 0;
};
let unionFnc; // 引数の型はnever、戻り値の型はstring もしくは numberとなる。
unionFnc = (a) => {
    return 'Hi';
};
// 87 レストパラメーターに配列やタプルを指定する方法, 88 配列とタプルにreadonlyを使用する方法
function advFnc(...arg) {
    // [string, number, boolean?] => adv('', 52) OK!
    // [stirng, number, boolean?, ...numbers[]] => adv('', 52, false, 3, 3, 3, 2) OK!
    // readonly [string, number, boolean] => readonlyプロパティを使用すると読み取り専用になる。配列にも使用できる。
    return;
}
// advFnc('', 20, true, '') error!
advFnc('', 52, false); // OK!
// 89 constアサーション
const array = [10, 50, 'Hy']; // arrayはreadonlyのタプル型になる。
