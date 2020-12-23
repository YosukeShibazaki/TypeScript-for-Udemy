const path = require(__dirname); // __dirnameはこのファイルがあるディレクトの絶対パスを取得する。
console.log(path.resolve(__dirname, 'bandle.index'));

module.exports = {
    entry: './Section9・10/main.js',　// どのファイルからbandleしていくか。
    output: { // bandle先についての設定
        filename: 'bandle.js', // bandle後のファイルの名前
        path: path.resolve(__dirname, 'bandle.index') // バンドルしたファイルをどこに作成するか
    }
}