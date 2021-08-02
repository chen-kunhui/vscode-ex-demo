## @mixin 和 @include

@mixin 相当于定义一个块
@include 用来引用这个块

```scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue, 1in); }
```

```css
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; 
}
```

## @content

@content 有点像钩子函数

```scss
@mixin apply-to-ie6-only {
  * html {
    @content;
  }
}
@include apply-to-ie6-only {
  #logo {
    background-image: url(/logo.gif);
  }
}
```

```css
* html #logo {
  background-image: url(/logo.gif);
}
```