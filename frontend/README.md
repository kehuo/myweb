# Kevinhuo.cool 个人网站 前端说明文档

该网站采用 React + Umi + Nginx + Docker 方式开发 + 打包 + 部署.

## 静态文件机制

我们通常所说的静态文件, 是指图片, js文件 和 css文件.

根据 umi build 的原理, 一共有3个放置静态文件的位置, 分别是:
> public/
> src/assets/
> src/pages/Page1/xxx.js

其中, public/ 文件夹放置通用的静态文件, 这里放置的文件和文件夹, 在 umi build 后, 会原封不动地放在 dist/根目录下。 比如, 在build之前, 在 public 路径下有一个图片文件夹 imgs, 里面存放了一张图片 pic1.jpg. 那么在打包后, 这个img文件夹, 以及里面存放的 pic1.jpg, 会被放在dist路径下, 即:
> 打包前: public/imgs/pic1.jpg
> umi build 打包后: dist/imgs/pic1.jpg

### 哪种场景的静态文件适合放在public下?

如果后台的某些 md 文件, 或者其他服务需要直接 http/https 请求这个静态文件, 比如:

https://kevinhuo.cool/imgs/pic1.jpg

那么建议放在 public下, 因为他的路径在打包后不会变化, 不会造成 "打包前页面能显示图片, 打包后全部无法显示的问题".

### 什么静态文件适合放在 src/assets 和 src/pages 下？

首先, 根据我的测试和看到的实际结果, umi build 在打包 src/assets 和 src/pages 下的文件, 是基于这个准则的:

你在任意地方 import 过这个静态文件, umi build 就会将这个 "用到的静态文件" 打包后放在 dist/static 下, 并且给这个文件后面随机添加1个 长度为8的随机字符串. 举例来说:
> 假如你在 src/assets/ 下有2个图片 sun.jpg 和 lion.jpg. 如果你在 某一段代码中, import sub_pic from "sub.jpg", 但是你从来没有在任何文件或者代码中 import 过 lion.jpg 这个图片. 那么, umi build 后的结果如下:
>   > dist/static/ 下会有一个文件, 叫做 sun.2g5h5j0h.jpg
>   > 但是 dist 下并不会有 lion.jpg, 因为你的前端项目中, 根本没有使用过它.

## 最后的建议

如果要保证静态文件的可访问性, 又不想太复杂, 建议都放在 public 下, 并且按照需求建立清晰的文件夹目录, 比如 public/js/ 目录专门放置js静态文件, public/css/ 放置css文件, public/imgs/animals/ 放置动物类型图片, public/imgs/logos/ 专门放置logo类型图片, 等等, 以保证清晰的分类, 容易维护.