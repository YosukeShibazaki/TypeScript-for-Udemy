"use strict";
class Score {
}
class Food {
    constructor(element) {
        this.element = element;
        element.addEventListener('click', this.clickEventHandler);
    }
    clickEventHandler() {
        // foodクラスの要素に、food--activeクラスがあれば、food--activeを消す。なければ付ける。
        this.element.classList.toggle('food--active');
    }
}
class Foods {
    constructor() {
        this.elements = document.querySelectorAll('.food'); // foodクラスを全て取得する。
        this.elements.forEach(element => {
            new Food(element);
        });
    }
}
const foods = new Foods();
