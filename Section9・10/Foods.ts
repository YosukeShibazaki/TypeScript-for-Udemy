import { Foodsable } from './Interfaces.js';
import { Food } from './Food.js';

export class Foods implements Foodsable{
    private static instance: Foods;
    elements = document.querySelectorAll<HTMLDivElement>('.food'); // foodクラスを全て取得する。
    private _activeElements: HTMLDivElement[] = []; // food--activeクラスを格納するためのプロパティ。
    private _activeElementsScore: number[] = []; // food--activeクラスが付いた要素の、food__scoreのテキストを格納する配列。

    get activeElements(){
        // 配列を初期化する
        this._activeElements = [];
        // food--activeクラスを持つ要素全てを配列に格納する。
        this.elements.forEach(element => {
            if(element.classList.contains('food--active')){
                this._activeElements.push(element);
            }
        })
        return this._activeElements;
    }

    get activeElementsScore(){
        // 配列を初期化する
        this._activeElementsScore = [];
        // food__scoreクラスのテキストを数値として配列に格納する。
        this.activeElements.forEach(element => {
            const foodScore = element.querySelector('.food__score');
            if(foodScore){
                // ScoreのtextContentがNullならNumberインスタンスにより0に変換される。
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        });
        return this._activeElementsScore;
    }

    private constructor(){
        this.elements.forEach( element => { // foodクラスの要素全てを1つずつインスタンス生成する。
            new Food(element);
        })
    }

    static getInstance(){
        // シングルトンパターンの使用。
        if(!Foods.instance){
            // インスタンスが生成されていない場合のみインスタンスを生成するようにする。
            this.instance = new Foods();
        }
        return Foods.instance;
    }
}