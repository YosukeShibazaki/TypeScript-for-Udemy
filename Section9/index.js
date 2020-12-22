"use strict";
class Score {
}
class Food {
    constructor(element) {
        this.element = element;
        element.addEventListener('click', this.clickEventHandler.bind(this)); // ここのthisはFoodクラスのこと。
    }
    clickEventHandler() {
        // foodクラスの要素に、food--activeクラスがあれば、food--activeを消す。なければ付ける。
        // 呼び出しもとでbind(this)を書くと、この関数内のthisはFoodクラス(bindで指定したthis)となる。
        this.element.classList.toggle('food--active');
    }
}
class Foods {
    constructor() {
        this.elements = document.querySelectorAll('.food'); // foodクラスを全て取得する。
        this._activeElements = []; // food--activeクラスを格納するためのプロパティ。Score用。
        this.elements.forEach(element => {
            new Food(element);
        });
    }
    get activeElemnts() {
        // 配列を初期化する
        this._activeElements = [];
        // food--activeクラスを持つ要素全てを配列に格納する。
        this.elements.forEach(element => {
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element);
            }
        });
        return this._activeElements;
    }
}
const foods = new Foods();
