# 移动端用sass批量合成2倍图.

## 配置sass

## mixin代码

```sass
$icons: sprite-map("icons/*.png",$spacing:4px,$layout:vertical,$dimensions:true);

@mixin icons-sprite($name,$retina) {
	background-position: round(nth(sprite-position($retina, $name), 1) / 2) round(nth(sprite-position($retina, $name), 2) / 2);
	height:round(image-height(sprite-file($retina, $name)) / 2);
  width: round(image-width(sprite-file($retina, $name)) / 2);
}

@mixin icons-background($retina) {
	background-image:sprite-url($retina);
	$double-width:ceil(image-width(sprite-path($retina)) / 2);
   $auto-height:auto;
   @include background-size($double-width $auto-height);
}

@mixin background-size($size){
	 -webkit-background-size: $size;
     -moz-background-size: $size;
       -o-background-size: $size;
          background-size: $size;
}

.icons {
	display: inline-block;
	vertical-align: middle;
	line-height:1;
	position:relative;
	@include icons-background($icons);
}
//home page
.icons-home-title {
	@include retina-sprite-backgrounds(home-title,$icons);
}

```
