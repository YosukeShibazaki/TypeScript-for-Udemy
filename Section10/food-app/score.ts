import { Scoreable } from './interfasec.js';
import { Foods } from "./foods.js";

export class Score implements Scoreable{
    private static instance: Score;

    private constructor(){} // 何もしない

    get totalScore(){
        const foods = Foods.getInstance();
        // 合計を返す
        // reducdeの第1引数は、コールバック関数。第2引数は合計したい値の初期値。scoreには配列の値が代入される。
        return foods.activeElementsScore.reduce((total, score) => total + score, 0);
    }

    render(){
        // 合計点をレンダリングする
        document.querySelector('.score__number')!.textContent = String(this.totalScore);
    }

    static getInstance(){
        // シングルトンパターンの使用。
        if(!Score.instance){
            // インスタンスが生成されていない場合のみインスタンスを生成するようにする。
            Score.instance = new Score();
        }
        return Score.instance;
    }
}