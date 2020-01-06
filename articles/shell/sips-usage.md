1. 获取所有图片信息

```
sips -g all <image-path>
```

例如
```
➜  sips sips -g all icon-1024.png
/Users/chenxi/Desktop/sips/icon-1024.png
  pixelWidth: 1024
  pixelHeight: 1024
  typeIdentifier: public.png
  format: png
  formatOptions: default
  dpiWidth: 72.000
  dpiHeight: 72.000
  samplesPerPixel: 3
  bitsPerSample: 8
  hasAlpha: no
  space: RGB
  profile: sRGB IEC61966-2.1
```

2. 旋转图片

```
sips --out output.png -r 90 icon-1024.png 
```

`icon-1024.png` 顺时针旋转90, 图片输出为 `output.png` ， 默认情况下 `sips` 在原图上操作。


3. 指定宽高

```
sips -out output.png -z 512 512 icon-1024.png
```
`icon-1024.png` 图片的宽高指定为 512 .