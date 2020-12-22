// 104 デコレータを使ってClassに関数を適用させる方法
// tsconfig.jsonファイルの「experimentalDecorator」をTrueにする必要がある。
function Logging(constructor: Function) { // デコレーター関数の引数の型はFunctionとする。引数はデコレーションするクラスが渡される
    console.log('Logging...');
    console.log(constructor);
}

@Logging
class User { // クラスの定義時にデコレーター関数が実行される。インスタンスの生成時ではない。
    name = 'Mike';
    constructor(){
        console.log('User was created');
    }
}

// 105 デコレータファクトリーを使用してデコレータに引数を渡す方法
function Logging2(message: string) { // 関数でラッピングしてあげる。
    return function (constructor: Function) { // 無名関数をreturnする。
        console.log(message + '2');
        console.log(constructor + '2');
    }
}

@Logging2('User was login')
class User2 {
    name = 'Mike';
    constructor(){
        console.log('User was created');
    }
}

// 106 デコレータを使って簡易版のフレームワークを作成する
function Logging3(message: string) { // 関数でラッピングしてあげる。
    return function (constructor: Function) { // 無名関数をreturnする。
        console.log(message + '2');
        console.log(constructor + '2');
    }
}

function Component(template: string, selector: string){
    return function(constructor: {new(...args: any[]): { name: string }}){
        // 受け取ったClassのインスタンスをデコレータ関数内で使用したい場合は引数をこのように書く
        // インスタンスを生成するときに引数を受け取りたい時は、any型の配列として受け取る。
        const mountedElement = document.querySelector(selector);
        const instance = new User3();
        if(mountedElement){
            mountedElement.innerHTML = template;
            mountedElement.querySelector('h1')!.innerHTML = instance.name;
        }
    }
}

@Component('<h1>{{name}}</h1>', '#app')
@Logging2('User was login') // デコレータは下から順に実行される。
class User3 {
    name = 'Mike';
    constructor(){
        console.log('User was created');
    }
}

// 108 戻り値にクラスを指定して、新しいクラスを作り出す方法
function Component2(template: string, selector: string){
    return function<T extends {new(...args: any[]): { name: string }}>(constructor: T){
        return class extends constructor { // 無名関数の引数で受け取っているクラス(constructor)でextendsする。
            constructor(...args: any[]){
                super(...args);
                console.log('Component2');
                const mountedElement = document.querySelector(selector);
                const instance = new User3();
                if(mountedElement){
                    mountedElement.innerHTML = template;
                    mountedElement.querySelector('h1')!.innerHTML = instance.name;
                }
            }
        } // インスタンスが生成されたときに実行がされる。
    }
}

@Component2('<h1>{{name}}</h1>', '#app')
class User4 {
    name = 'Mike';
    constructor(public age: number){
        console.log('User was created');
    }
}

// 109 プロパティデコレータについて(クラスのプロパティに対してデコレーションする)
function PropatyLogging(target: any, propatyKey: string) {
    console.log(target); // 第一引数はプロパティがstaticならデコレータを実行するクラス。staticじゃないなら、prototypeのクラス。
    console.log(propatyKey); // 第二引数はクラスのプロパティ名
}

class User5 {
    @PropatyLogging // プロパティの前にデコレータを記述する。
    name = 'Mike';
    constructor(){
        console.log('User was created');
    }
}

// 110 メソッドデコレータを使用する方法と、PropertyDescriptorについて
function MethodLogging(target: any, propatyKey: string, descriptor: PropertyDescriptor) {
    console.log(target); // 第一引数はプロパティがstaticならデコレータを実行するクラス。staticじゃないなら、prototypeのクラス。
    console.log(propatyKey); // 第二引数はクラスのプロパティ名
}

class User6 {
    @PropatyLogging // プロパティの前にデコレータを記述する。
    name = 'Mike';
    constructor(){
        console.log('User was created');
    }

    @MethodLogging // プロパティの前にデコレータを書く必要がある。
    greetign(){
        console.log('Hello!');
    }
}

// 111 アクセサデコレータを使用する方法
function AccesserLogging(target: any, propatyKey: string, descriptor: PropertyDescriptor) {
    console.log(target); // 第一引数はプロパティがstaticならデコレータを実行するクラス。staticじゃないなら、prototypeのクラス。
    console.log(propatyKey); // 第二引数はクラスのプロパティ名
}

class User7 {
    @PropatyLogging
    name = 'Mike';
    constructor(){
        console.log('User was created');
    }

    @MethodLogging
    greetign(){
        console.log('Hello!');
    }

    @AccesserLogging
    get(){
        return this.name;
    }

    @AccesserLogging
    set(value: string){
        this.name = value;
    }
}

// 113 アクセサデコレータを使用する方法
function ParameterLogging(target: any, propatyKey: string, parameterIndex: number) {
    console.log(target); // 第一引数はプロパティがstaticならデコレータを実行するクラス。staticじゃないなら、prototypeのクラス。
    console.log(propatyKey); // 第二引数はクラスのプロパティ名
    console.log(parameterIndex); // 引数が何番目の引数なのかを持っている。(0から始まる。)
}

class User8 {
    @PropatyLogging
    name = 'Mike';
    constructor(){
        console.log('User was created');
    }

    @MethodLogging
    greeting<T>(@ParameterLogging value: T){ // 引数を取る時にデコレータを設定する。
        console.log(value);
    }

    @AccesserLogging
    get(){
        return this.name;
    }

    @AccesserLogging
    set(value: string){
        this.name = value;
    }
}