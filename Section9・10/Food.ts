import { Foodable } from './Interfaces.js';
import { Score } from './Score.js';

export　class Food implements Foodable{
    constructor(public element: HTMLDivElement){
        element.addEventListener('click', this.clickEventHandler.bind(this)); // ここのthisはFoodクラスのこと。
    }

    clickEventHandler(){
        // foodクラスの要素に、food--activeクラスがあれば、food--activeを消す。なければ付ける。
        // 呼び出しもとでbind(this)を書くと、この関数内のthisはFoodクラス(bindで指定したthis)となる。
        this.element.classList.toggle('food--active');
        const score = Score.getInstance();
        score.render();
    }
}