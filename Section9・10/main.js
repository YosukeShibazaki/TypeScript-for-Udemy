// webpackを使用しない場合はファイル名の拡張地を書く必要がある。
// tsファイルではなくjsファイルをインポートする。
import { Foods } from './Foods.js';
// tsconfig.jsonファイルのmoduleプロパティをES6にしないと、import,exportがjsファイルに記載されない。import,export以外を使用した方法でコンパイルされる。
const foods = Foods.getInstance();
