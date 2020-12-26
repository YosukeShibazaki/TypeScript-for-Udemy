"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 104 デコレータを使ってClassに関数を適用させる方法
// tsconfig.jsonファイルの「experimentalDecorator」をTrueにする必要がある。
function Logging(constructor) {
    console.log('Logging...');
    console.log(constructor);
}
let User = class User {
    constructor() {
        this.name = 'Mike';
        console.log('User was created');
    }
};
User = __decorate([
    Logging
], User);
// 105 デコレータファクトリーを使用してデコレータに引数を渡す方法
function Logging2(message) {
    return function (constructor) {
        console.log(message + '2');
        console.log(constructor + '2');
    };
}
let User2 = class User2 {
    constructor() {
        this.name = 'Mike';
        console.log('User was created');
    }
};
User2 = __decorate([
    Logging2('User was login')
], User2);
// 106 デコレータを使って簡易版のフレームワークを作成する
function Logging3(message) {
    return function (constructor) {
        console.log(message + '2');
        console.log(constructor + '2');
    };
}
function Component(template, selector) {
    return function (constructor) {
        // 受け取ったClassのインスタンスをデコレータ関数内で使用したい場合は引数をこのように書く
        // インスタンスを生成するときに引数を受け取りたい時は、any型の配列として受け取る。
        const mountedElement = document.querySelector(selector);
        const instance = new User3();
        if (mountedElement) {
            mountedElement.innerHTML = template;
            mountedElement.querySelector('h1').innerHTML = instance.name;
        }
    };
}
let User3 = class User3 {
    constructor() {
        this.name = 'Mike';
        console.log('User was created');
    }
};
User3 = __decorate([
    Component('<h1>{{name}}</h1>', '#app'),
    Logging2('User was login') // デコレータは下から順に実行される。
], User3);
// 108 戻り値にクラスを指定して、新しいクラスを作り出す方法
function Component2(template, selector) {
    return function (constructor) {
        return class extends constructor {
            constructor(...args) {
                super(...args);
                console.log('Component2');
                const mountedElement = document.querySelector(selector);
                const instance = new User3();
                if (mountedElement) {
                    mountedElement.innerHTML = template;
                    mountedElement.querySelector('h1').innerHTML = instance.name;
                }
            }
        }; // インスタンスが生成されたときに実行がされる。
    };
}
let User4 = class User4 {
    constructor(age) {
        this.age = age;
        this.name = 'Mike';
        console.log('User was created');
    }
};
User4 = __decorate([
    Component2('<h1>{{name}}</h1>', '#app')
], User4);
// 109 プロパティデコレータについて(クラスのプロパティに対してデコレーションする)
function PropatyLogging(target, propatyKey) {
    console.log(target); // 第一引数はプロパティがstaticならデコレータを実行するクラス。staticじゃないなら、prototypeのクラス。
    console.log(propatyKey); // 第二引数はクラスのプロパティ名
}
class User5 {
    constructor() {
        this.name = 'Mike';
        console.log('User was created');
    }
}
__decorate([
    PropatyLogging // プロパティの前にデコレータを記述する。
], User5.prototype, "name", void 0);
// 110 メソッドデコレータを使用する方法と、PropertyDescriptorについて
function MethodLogging(target, propatyKey, descriptor) {
    console.log(target); // 第一引数はプロパティがstaticならデコレータを実行するクラス。staticじゃないなら、prototypeのクラス。
    console.log(propatyKey); // 第二引数はクラスのプロパティ名
}
class User6 {
    constructor() {
        this.name = 'Mike';
        console.log('User was created');
    }
    greetign() {
        console.log('Hello!');
    }
}
__decorate([
    PropatyLogging // プロパティの前にデコレータを記述する。
], User6.prototype, "name", void 0);
__decorate([
    MethodLogging // プロパティの前にデコレータを書く必要がある。
], User6.prototype, "greetign", null);
// 111 アクセサデコレータを使用する方法
function AccesserLogging(target, propatyKey, descriptor) {
    console.log(target); // 第一引数はプロパティがstaticならデコレータを実行するクラス。staticじゃないなら、prototypeのクラス。
    console.log(propatyKey); // 第二引数はクラスのプロパティ名
}
class User7 {
    constructor() {
        this.name = 'Mike';
        console.log('User was created');
    }
    greetign() {
        console.log('Hello!');
    }
    get() {
        return this.name;
    }
    set(value) {
        this.name = value;
    }
}
__decorate([
    PropatyLogging
], User7.prototype, "name", void 0);
__decorate([
    MethodLogging
], User7.prototype, "greetign", null);
__decorate([
    AccesserLogging
], User7.prototype, "get", null);
__decorate([
    AccesserLogging
], User7.prototype, "set", null);
// 113 アクセサデコレータを使用する方法
function ParameterLogging(target, propatyKey, parameterIndex) {
    console.log(target); // 第一引数はプロパティがstaticならデコレータを実行するクラス。staticじゃないなら、prototypeのクラス。
    console.log(propatyKey); // 第二引数はクラスのプロパティ名
    console.log(parameterIndex); // 引数が何番目の引数なのかを持っている。(0から始まる。)
}
class User8 {
    constructor() {
        this.name = 'Mike';
        console.log('User was created');
    }
    greeting(value) {
        console.log(value);
    }
    get() {
        return this.name;
    }
    set(value) {
        this.name = value;
    }
}
__decorate([
    PropatyLogging
], User8.prototype, "name", void 0);
__decorate([
    MethodLogging,
    __param(0, ParameterLogging)
], User8.prototype, "greeting", null);
__decorate([
    AccesserLogging
], User8.prototype, "get", null);
__decorate([
    AccesserLogging
], User8.prototype, "set", null);
