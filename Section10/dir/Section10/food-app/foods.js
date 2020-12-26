"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foods = void 0;
const food_js_1 = require("./food.js");
class Foods {
    constructor() {
        this.elements = document.querySelectorAll('.food'); // foodクラスを全て取得する。
        this._activeElements = []; // food--activeクラスを格納するためのプロパティ。
        this._activeElementsScore = []; // food--activeクラスが付いた要素の、food__scoreのテキストを格納する配列。
        this.elements.forEach(element => {
            new food_js_1.Food(element);
        });
    }
    get activeElements() {
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
    get activeElementsScore() {
        // 配列を初期化する
        this._activeElementsScore = [];
        // food__scoreクラスのテキストを数値として配列に格納する。
        this.activeElements.forEach(element => {
            const foodScore = element.querySelector('.food__score');
            if (foodScore) {
                // ScoreのtextContentがNullならNumberインスタンスにより0に変換される。
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        });
        return this._activeElementsScore;
    }
    static getInstance() {
        // シングルトンパターンの使用。
        if (!Foods.instance) {
            // インスタンスが生成されていない場合のみインスタンスを生成するようにする。
            this.instance = new Foods();
        }
        return Foods.instance;
    }
}
exports.Foods = Foods;
