import{_ as e,c as t,o as d,a as r}from"./app.64e01693.js";const b=JSON.parse('{"title":"防抖 和 节流","description":"","frontmatter":{},"headers":[{"level":2,"title":"debounce （防抖）","slug":"debounce-防抖","link":"#debounce-防抖","children":[{"level":3,"title":"常用场景","slug":"常用场景","link":"#常用场景","children":[]}]},{"level":2,"title":"throttle （节流）","slug":"throttle-节流","link":"#throttle-节流","children":[{"level":3,"title":"常用场景","slug":"常用场景-1","link":"#常用场景-1","children":[]}]},{"level":2,"title":"resize 事件","slug":"resize-事件","link":"#resize-事件","children":[]},{"level":2,"title":"区别","slug":"区别","link":"#区别","children":[]}],"relativePath":"articles/javaScript/debounce-throttle.md"}'),a={name:"articles/javaScript/debounce-throttle.md"},o=r('<h1 id="防抖-和-节流" tabindex="-1">防抖 和 节流 <a class="header-anchor" href="#防抖-和-节流" aria-hidden="true">#</a></h1><p>针对一些 <strong><code>执行频率非常高</code></strong> 的交互或事件，做性能优化。</p><h2 id="debounce-防抖" tabindex="-1">debounce （防抖） <a class="header-anchor" href="#debounce-防抖" aria-hidden="true">#</a></h2><p>在一段时间内，函数多次调用，<code>只执行最后的一次</code>， <code>每次调用都新建定时器 </code><br> 有一个等待时长，如果在这个等待时长内，再次调用了函数，就取消上一个定时器，并新建一个定时器</p><h3 id="常用场景" tabindex="-1">常用场景 <a class="header-anchor" href="#常用场景" aria-hidden="true">#</a></h3><p><code>input, keyup, keydown</code> 等事件<br> 用户搜索<br> 防止用户按钮多次点击</p><h2 id="throttle-节流" tabindex="-1">throttle （节流） <a class="header-anchor" href="#throttle-节流" aria-hidden="true">#</a></h2><p>在一段时间内，函数多次调用，<code>只执行第一次</code>，<code>每次调用不会新建定时器</code><br> 有一个等待时长，每隔一段这个等待时长，函数必须执行一次。如果在这个等待时长内，当前延迟执行没有完成，它会忽略接下来调用该函数的请求，不会去取消上一个定时器</p><h3 id="常用场景-1" tabindex="-1">常用场景 <a class="header-anchor" href="#常用场景-1" aria-hidden="true">#</a></h3><p><code>scroll, mousemove</code> 等事件</p><h2 id="resize-事件" tabindex="-1">resize 事件 <a class="header-anchor" href="#resize-事件" aria-hidden="true">#</a></h2><ul><li><code>debounce</code> : 用户停止改变浏览器窗口大小时触发，也就是只是在<code>最后触发一次</code></li><li><code>throttle</code> : 用户改变浏览器窗口大小的过程中，<code>每隔一段时间触发一次</code></li></ul><h2 id="区别" tabindex="-1">区别 <a class="header-anchor" href="#区别" aria-hidden="true">#</a></h2><p><code>throttle</code> 相对于 <code>debounce</code> 的最大区别就是它不会 <code>取消</code> 上一次函数的执行</p>',14),c=[o];function i(l,n,h,s,u,p){return d(),t("div",null,c)}const f=e(a,[["render",i]]);export{b as __pageData,f as default};
