// 93 ジェネリクスを使用して、型を引数として受け取る
function copy<T>(value: T): T { // <>で括った中身が型の引数。複数受け取ることもできる。慣例として、<>の中身は大文字Tを使用することが多い。
    return value
}
console.log(copy<string>('Hello')); // 実行する関数名の後ろに<型>とすることで、関数に型を渡すことができる。
console.log(copy({name: 'Mike'}).name); // オブジェクトの場合は<>を書かなくても型推論してくれる！

// 94 extendsを使用して型パラメーターに制約を付ける方法
function copy2<T extends {name: string}>(value: T): T { // パラメーターがオブジェクトという型を指定をしている。
    return value
}
console.log(copy2({name: 'Json'}));

// 95 keyofを使ってオブジェクトのキーのユニオン型を作成する方法
function copy3<T extends {name: string}, U extends keyof T>(value: T, key: U): T { // パラメーターがオブジェクトという指定をしている。
    value[key] // <= 引数keyの型は、nameかageを受け取る。引数valueのオブジェクトのキーのユニオン型となっている。
    return value
}
console.log(copy2({name: 'Daniel', age: 38}), 'name');

// 96 クラスに対してジェネリクスを使用する方法
class LightDatabase<T extends string | number | boolean> { //クラス名の後に受け取りたい引数を書く
    private data: T[] = [];
    add(item: T){
        this.data.push(item);
    }
    remove(item: T){
        this.data.splice(this.data.indexOf(item), 1);
    }
    get(){
        return this.data
    }
}
const lightDatabase = new LightDatabase<string>(); // クラス名の後に渡したい引数を書く
lightDatabase.add('banana');
console.log(lightDatabase.get());

// 97 interfaceに対してジェネリクスを使用する方法
interface TmpDatabase<T>{ // インターフェイス名の後に受け取りたい引数名を書く。
    id: number,
    data: T[]
} // typeエイリアスに対しても使用することができる。

const tmpDatabase: TmpDatabase<string> = { // 型(インターフェイス名)の後に渡したい型を書く。
    id: 1,
    data:['banana', 'apple', 'grape']
}

// 98 内蔵されているジェネリック型であるUtility型(型のライブラリのようなもの)
interface Todo {
    title: string,
    text: string
}
type Todoable = Partial<Todo> // Todoableタイプに、Todo型を渡している。ただし、プロパティは全てオプションプロパティとなる。
type Readable = Readonly<Todo> // Todo型のプロパティを全てreadonlyプロパティにして渡している。

const fetchDate: Promise<string> = new Promise(resolve => { // Promiseインスタンスを作成する場合、変数の後にPromiseの型を渡すことができる。
    setTimeout(()=>{
        console.log('Hello TypeScript!');
    }, 3000);
    return resolve;
})

fetchDate.then(data => { // dataのデータ型はstringとなっている。
    console.log(data.toUpperCase());
})

const fluits: Array<string> = ['banana', 'apple', 'grape']; // string[]でも配列の型を宣言できる、このような方法も取れる。

// 99 デフォルトの型パラメーターを指定する方法
interface ResponseDate<T extends {massage: string} = any> {
     // 引数名の後に型名を指定すると、これがデフォルトの型になる。
     // extendsをすることもできる。
    id: number,
    data: T
}

let tmp: ResponseDate; // エラーにならない。

// 100 型のfor文であるMappedTypes
type MappedTypes = {
    [P in 'tomato'|'pumpkin']: P; // Pにプロパティ名と、型名を入れてマッピング
}

type MappedTypes2 = {
    [P in 'banana'|'apple']: string; // Pにプロパティ名、型はstringとしてマッピング
}

interface Vesitables {
    tomato: string;
    pumpkin: string;
}
type MappedTypes3 = {
    [P in keyof Vesitables]: P; // Vesitablesのinterfaceを継承する。
}

type MappedTypes4<T> = { // 受け取った型でマッピングする
   readonly [P in keyof T]?: P; // readonly、オプショナルプロパティを使用することもできる
}
const mappedTypes: MappedTypes4<Vesitables> = {
    tomato: 'tomato',
    pumpkin: 'pumpkin'
}

type MappedTypes5<T> = {
    -readonly [P in keyof T]-?: P;
     // -readonlyとすると受け取った型のreadonlyプロパティを外すことができる。
      // -?とすると受け取った型のオプショナルプロパティを外すことができる。
 }

 // 102 型のIf文であるConditional Types
 type ConditionalType = 'tomato' extends string ? number : boolean;
 // tomato型がstring型に代入できるなら、ConditionalTypeはnumber型、そうじゃなければboolean型
 // 今回は代入できるのでnumber型となる。
 type ConditionalType2 = string extends 'tomato' ? number : boolean; // boolean

 type ConditonalInfer = { tomato: 'tomato' } extends { tomato: infer R } ? R : boolean; // 'tomato'型
 // { tomato: 'tomato' }型が{ tomato: infer(anyのようなもの) }代入できるなら、'tomato'型がRに代入されて、R型がConditionalInferに代入される。
 // Rは型推論される。

 type DistribitiveConditionalTypes<T> = T extends 'tomato' ? number : boolean;
 let tmp4: DistribitiveConditionalTypes<'tomato' | 'number'>; // numberとbooleanのUnion型となる。渡した型を両方とも判定する。