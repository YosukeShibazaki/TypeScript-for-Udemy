"use strict";
class Score {
}
class Food {
    constructor(element) {
        this.element = element;
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
