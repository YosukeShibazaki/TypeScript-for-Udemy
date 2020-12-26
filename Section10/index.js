"use strict";
class Score {
    constructor() { } // 何もしない
    get totalScore() {
        const foods = Foods.getInstance();
        // 合計を返す
        // reducdeの第1引数は、コールバック関数。第2引数は合計したい値の初期値。scoreには配列の値が代入される。
        return foods.activeElementsScore.reduce((total, score) => total + score, 0);
    }
    render() {
        // 合計点をレンダリングする
        document.querySelector('.score__number').textContent = String(this.totalScore);
    }
    static getInstance() {
        // シングルトンパターンの使用。
        if (!Score.instance) {
            // インスタンスが生成されていない場合のみインスタンスを生成するようにする。
            Score.instance = new Score();
        }
        return Score.instance;
    }
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
        const score = Score.getInstance();
        score.render();
    }
}
class Foods {
    constructor() {
        this.elements = document.querySelectorAll('.food'); // foodクラスを全て取得する。
        this._activeElements = []; // food--activeクラスを格納するためのプロパティ。
        this._activeElementsScore = []; // food--activeクラスが付いた要素の、food__scoreのテキストを格納する配列。
        this.elements.forEach(element => {
            new Food(element);
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
const foods = Foods.getInstance();
