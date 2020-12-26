"use strict";
// 93 ジェネリクスを使用して、型を引数として受け取る
function copy(value) {
    return value;
}
console.log(copy('Hello')); // 実行する関数名の後ろに<型>とすることで、関数に型を渡すことができる。
console.log(copy({ name: 'Mike' }).name); // オブジェクトの場合は<>を書かなくても型推論してくれる！
// 94 extendsを使用して型パラメーターに制約を付ける方法
function copy2(value) {
    return value;
}
console.log(copy2({ name: 'Json' }));
// 95 keyofを使ってオブジェクトのキーのユニオン型を作成する方法
function copy3(value, key) {
    value[key]; // <= 引数keyの型は、nameかageを受け取る。引数valueのオブジェクトのキーのユニオン型となっている。
    return value;
}
console.log(copy2({ name: 'Daniel', age: 38 }), 'name');
// 96 クラスに対してジェネリクスを使用する方法
class LightDatabase {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
    }
    remove(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data;
    }
}
const lightDatabase = new LightDatabase(); // クラス名の後に渡したい引数を書く
lightDatabase.add('banana');
console.log(lightDatabase.get());
const tmpDatabase = {
    id: 1,
    data: ['banana', 'apple', 'grape']
};
const fetchDate = new Promise(resolve => {
    setTimeout(() => {
        console.log('Hello TypeScript!');
    }, 3000);
    return resolve;
});
fetchDate.then(data => {
    console.log(data.toUpperCase());
});
const fluits = ['banana', 'apple', 'grape']; // string[]でも配列の型を宣言できる、このような方法も取れる。
let tmp; // エラーにならない。
const mappedTypes = {
    tomato: 'tomato',
    pumpkin: 'pumpkin'
};
let tmp4; // numberとbooleanのUnion型となる。渡した型を両方とも判定する。
