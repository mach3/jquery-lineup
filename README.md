
# jQuery.lineUp

ブロック要素の高さを行ごとに揃えるjQueryプラグインです。

## 使い方

例えばフロート等で横並びにしている要素があるとして、

```html
<div class="items">
	<div class="item"> ... </div>
	<div class="item"> ... </div>
	<div class="item"> ... </div>
	<div class="item"> ... </div>
	...
</div>
```

これらの要素（.item）の高さを行ごとに揃えます。

```js
$(".item").lineUp();
```

3カラムの場合は3カラムずつ、5カラムの場合は5カラムずつ高さを揃えます。
行は jQuery.offset().top の値から判断しています。

## オプション

オブジェクトを引数に渡すとオプションを設定できます。
既に初期化済みの場合は、オプションを上書きして再度リフレッシュします。

```js
$(".item").lineUp({
	onFontResize : false,
	onResize : false
});
```

※ オプションキー : 型 (初期値)

### onFontResize : Boolean (true)

フォントサイズ変更時に高さを更新する

### checkFontInterval : Integer (10)

フォントサイズチェックのインターバル

### fontSamplerName : String (lineup-font-size-sampler)

フォントサイズチェック用の要素のidを設定する

### onResize : Boolean (true)

ウィンドウサイズ変更時に高さを更新する

### hook : Function ($.noop)

リフレッシュ時に呼ばれる関数

## script要素のdata-*属性を利用した使い方

jquery.lineup.js を読み込んだscript要素にdata-lineup-selector属性を設定する事で、
ページ読み込み時にそのセレクタの要素に対して整列を行う事ができます。
整列を行うタイミングは、domreadyです。

尚、`.item-01, .item-02`のようにカンマで区切られたセレクタは、それぞれ別のグループとして扱われます。

```html
<script src="jquery.lineup.js" data-lineup-selector=".item"></script>
```


## 作者

mach3

- [Blog](http://blog.mach3.jp)
- [Website](http://www.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)

