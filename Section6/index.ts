// 72 '&'を使用して、AかつBのようにインターセクション型を使用する方法
type Engineer = {
    name: string,
    role: string
}

type Blloger = {
    name: string,
    follower: number
}

type EngineerBlloger = Engineer & Blloger
const quiile: EngineerBlloger = { // 2つの型のプロパティを必ず持っている必要がある。
    name: 'quiile',
    role: 'front-end',
    follower: 1000
} // interfaceでもextendsを使用して同じような定義方法をすることもできる。

type NumberBoolean = number | boolean;
type StringNumber = string | number;
type Mix = NumberBoolean & StringNumber; // number型になる。

// 73 条件文を使って肩を絞り込む3つのTypeGuard
// 1.typeofを使用する方法
function toUpperCase(value: string | number){
    if(typeof value === 'string'){ // typeofを使用して、引数の型がstringなら...と条件を絞り込む。
        return value.toUpperCase();
    }
    return value;
}

 // 2.in演算子を使用する方法
 type NomadWorder = Engineer | Blloger;
 const profile = (nomadWorder: NomadWorder) => {
     console.log(nomadWorder.name);
     if('role' in nomadWorder){ // roleプロパティがあると保障していることになる。
         console.log(nomadWorder.role);
     }
     if('follower' in nomadWorder){ // followerプロパティがあると保障していることになる。
         console.log(nomadWorder.follower);
     }
 }

 profile(quiile);

 // 3.instanceof
 class Dog {
     kind: 'dog' = 'dog';
     speak(){
        console.log('baw-waw');
     }
 }

 class Bird {
    kind: 'bird' = 'bird';
     speak(){
         console.log('tweet');
     }

     fly(){
         console.log('flluter');
     }
 }

type Pet = Dog | Bird;
const havePet = (pet: Pet): void => {
    pet.speak();
    if(pet instanceof Bird){ // 引数がBirdクラスから生成したインスタンスだったらTrue。オブジェクトを渡したらFalseになる。
        pet.fly();
    }
}
// havePet(new Bird());

// 74 タグ付きユニオンを使って型を絞り込む方法
const havePet2 = (pet: Pet): void => {
    switch(pet.kind){
        case 'bird':
            pet.fly();
        case 'dog':
            pet.speak();
    }
}
havePet2(new Bird());

// 75.型アサーションを使って手動で型を上書きする方法
// const input = document.getElementById('input'); input.valueにアクセスできない。HTMLInputElementという認証がない。
const jsxInput = document.getElementById('input') as HTMLInputElement; // JSXはこの書き方がエラーになりにくい。
const domInput = <HTMLInputElement>document.getElementById('input') // 通常のJSはこちらの書き方でもOK。
console.log(jsxInput.value);
console.log(domInput.value);
console.log((document.getElementById('input') as HTMLInputElement).value); // 変数に代入しないで直接アクセスすることもできる。

// 76 ! (NonNull - assertion operator)を使ってnullじゃないと言い切る方法
const input = document.getElementById('input')!; // 定数inputの型がHTMLElementだけになる。(nullが消える。)

// 77インデックスシグネチャを使用して柔軟なオブジェクトを作る方法
interface Designer {
    name: string,
    [index: string]: string // string型のプロパティをいくらでも追加できる。ただし、他のプロパティは全てstringでなければならない。
}

const designer: Designer = {
    name: 'Mike',
    kind: 'web',
    sex: 'man'
}
console.log(designer.sss); // エラーにならないため注意が必要。

// 78 関数のオーバーロードを使用して戻り値の型を正しくTypeScriptに伝える方法
const helloUpperCase = toUpperCase('hello'); // null or string

function toUpperCase2(value: string): string; // 引数がstringの時の戻り値を先に書いてあげる。
function toUpperCase2(value: string | number){
    if(typeof value === 'string'){ // typeofを使用して、引数の型がstringなら...と条件を絞り込む。
        return value.toUpperCase();
    }
    return value;
}
const helloUpperCase2 = toUpperCase2('hello'); // string only

// 79 OptionalChainingを使う。： objectのundefinedエラーを防ぐ
interface DownloadedDate {
    id: number,
    user?: {
        name?: {
            first: string,
            last: string
        }
    }
}

const downloaedDate: DownloadedDate = {
    id: 1
}
// console.log(downloaedDate.user.name) userがundefinedの可能性があるためエラーになる。
console.log(downloaedDate.user?.name?.first); // ?を付けたプロパティがundefinedならエラーを返さずにundefinedを返す。

// 80 Nullish Coalescing
const userDate = downloaedDate.user ?? 'no-data'; // ??の前の値がundefinedなら、後ろのdataを代入する。
// const userDate = downloaedDate.user || 'no-data' この書き方だと、空文字や0で後ろのdataが代入されてしまう。

// 81 LookUp型を使ってオブジェクトのメンバーの型を取得する方法
type id = DownloadedDate['id'] // string
// type id = DownloadedData['id']['name'] // このような書き方で深い階層の型を取得することもできる。

// 84 関数型のoverloadはinterfaceで定義する必要がある。
interface tmpFnc {
    (x: string): number;
    (x: number): number;
}
const tmpFnction: tmpFnc = function(x: string | number){return 0}

// 85 関数型のインターセクションはオーバーロードになる。
interface FncA {
    (a: string, b: number): number;
    (a: number, b: string): number;
}

interface FncB {
    (a: string): number;
}

let intersectionFnc: FncA & FncB
intersectionFnc = (a: string | number, b?: string | number) => { // 引数はinterfaceで指定したもの全てを満たす形にする必要がある。
    return 0
}

// 86 関数型のUnion型はパラメータがインターセクション型、戻り値がUnion型になる。。
interface unionFncA {
    (a: string): string;
}

interface unionFncB {
    (a: number): number;
}

let unionFnc: unionFncA | unionFncB; // 引数の型はnever、戻り値の型はstring もしくは numberとなる。
unionFnc = (a: string) => {
    return 'Hi'
}

// 87 レストパラメーターに配列やタプルを指定する方法, 88 配列とタプルにreadonlyを使用する方法
function advFnc(...arg: [string, number, boolean]){ // タプルを型として指定することで引数を省略して書いているのと同じことになる。
    // [string, number, boolean?] => adv('', 52) OK!
    // [stirng, number, boolean?, ...numbers[]] => adv('', 52, false, 3, 3, 3, 2) OK!
    // readonly [string, number, boolean] => readonlyプロパティを使用すると読み取り専用になる。配列にも使用できる。
    return
}
// advFnc('', 20, true, '') error!
advFnc('', 52, false); // OK!

// 89 constアサーション
const array = [10, 50, 'Hy'] as const; // arrayはreadonlyのタプル型になる。

// 90 型の中でtypeofを使用する
type ArrayType =  typeof array; // 変数arrayの型をArrayTypeに代入している。便利！！