"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const score_js_1 = require("./score.js");
class Food {
    constructor(element) {
        this.element = element;
        element.addEventListener('click', this.clickEventHandler.bind(this)); // ここのthisはFoodクラスのこと。
    }
    clickEventHandler() {
        // foodクラスの要素に、food--activeクラスがあれば、food--activeを消す。なければ付ける。
        // 呼び出しもとでbind(this)を書くと、この関数内のthisはFoodクラス(bindで指定したthis)となる。
        this.element.classList.toggle('food--active');
        const score = score_js_1.Score.getInstance();
        score.render();
    }
}
exports.Food = Food;