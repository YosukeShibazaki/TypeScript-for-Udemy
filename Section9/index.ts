class Score {

}

class Food {
    constructor(public element: HTMLDivElement){
        element.addEventListener('click', this.clickEventHandler.bind(this)); // ここのthisはFoodクラスのこと。
    }

    clickEventHandler(){
        // foodクラスの要素に、food--activeクラスがあれば、food--activeを消す。なければ付ける。
        // 呼び出しもとでbind(this)を書くと、この関数内のthisはFoodクラス(bindで指定したthis)となる。
        this.element.classList.toggle('food--active');
    }
}

class Foods {
    elements = document.querySelectorAll<HTMLDivElement>('.food'); // foodクラスを全て取得する。

    constructor(){
        this.elements.forEach( element => { // foodクラスの要素全てを1つずつインスタンス生成する。
            new Food(element);
        })
    }
}

const foods = new Foods();