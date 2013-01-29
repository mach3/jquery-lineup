
# jQuery.lineUp

version 1.0.0

## これはなに

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
行は jQuery.position().top の値から判断しています。


## 作者

mach3

- [Blog](http://blog.mach3.jp)
- [Website](http://www.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)

