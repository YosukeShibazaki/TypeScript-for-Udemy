class Score {

}

class Food {
    constructor(public element: HTMLDivElement){

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