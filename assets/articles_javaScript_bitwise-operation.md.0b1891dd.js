import{_ as s,c as a,o as n,a as l}from"./app.64e01693.js";const F=JSON.parse('{"title":"位运算","description":"","frontmatter":{},"headers":[{"level":2,"title":"JS中的位运算","slug":"js中的位运算","link":"#js中的位运算","children":[]},{"level":2,"title":"位运算 AND （&）（与运算）","slug":"位运算-and-与运算","link":"#位运算-and-与运算","children":[]},{"level":2,"title":"位运算 OR （|）（或运算）","slug":"位运算-or-或运算","link":"#位运算-or-或运算","children":[]},{"level":2,"title":"位运算 XOR （^）（异或运算）","slug":"位运算-xor-异或运算","link":"#位运算-xor-异或运算","children":[]},{"level":2,"title":"非运算 (~)","slug":"非运算","link":"#非运算","children":[{"level":3,"title":"快速计算","slug":"快速计算","link":"#快速计算","children":[]}]},{"level":2,"title":"位运算的应用场景","slug":"位运算的应用场景","link":"#位运算的应用场景","children":[{"level":3,"title":"管理所有权限","slug":"管理所有权限","link":"#管理所有权限","children":[]}]},{"level":2,"title":"位移运算","slug":"位移运算","link":"#位移运算","children":[]}],"relativePath":"articles/javaScript/bitwise-operation.md"}'),p={name:"articles/javaScript/bitwise-operation.md"},o=l(`<h1 id="位运算" tabindex="-1">位运算 <a class="header-anchor" href="#位运算" aria-hidden="true">#</a></h1><p>从现代计算机中所有的数据二进制的形式存储在设备中。即 0、1 两种状态，计算机对二进制数据进行的运算(+、-、*、/)都是叫位运算，即<strong>将符号位共同参与运算的运算</strong>。（简化为：将一个整数的二进制格式进行运算）</p><h2 id="js中的位运算" tabindex="-1">JS中的位运算 <a class="header-anchor" href="#js中的位运算" aria-hidden="true">#</a></h2><p>JavaScript 将数字存储为 64 位浮点数，但所有按位运算都以 32 位二进制数执行。</p><p>在执行位运算之前，J<strong>avaScript 将数字转换为 32 位有符号整数</strong>。</p><p>执行按位操作后，结果将转换回 64 位 JavaScript 数。</p><p>在JS中规定，对于特殊的数字，如果进行位运算，全部看作0 （NaN、infinity、-infinity）</p><p><strong>第一个0表示符号位，1为负数，0为正数</strong></p><p>1000 0000 0000 0000 0000 0000 0000 0001 （-1）</p><h2 id="位运算-and-与运算" tabindex="-1">位运算 AND （&amp;）（与运算） <a class="header-anchor" href="#位运算-and-与运算" aria-hidden="true">#</a></h2><p>数位均为 1 则返回 1。</p><p>1 &amp; 2 （结果就为0）</p><p>1 对应的二进制是--0000 0000 0000 0000 0000 0000 0000 0001</p><p>2 对应的二进制是--0000 0000 0000 0000 0000 0000 0000 0010</p><h2 id="位运算-or-或运算" tabindex="-1">位运算 OR （|）（或运算） <a class="header-anchor" href="#位运算-or-或运算" aria-hidden="true">#</a></h2><p>如果其中一位是 1 则返回 1</p><h2 id="位运算-xor-异或运算" tabindex="-1">位运算 XOR （^）（异或运算） <a class="header-anchor" href="#位运算-xor-异或运算" aria-hidden="true">#</a></h2><p>当对一对数位进行位运算 XOR 时，如果数位是不同的则返回 1</p><p>0 ^ 0 0<br> 0 ^ 1 1</p><p><strong>交换变量的方法</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//方式一</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> temp </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> temp</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">b)  </span><span style="color:#676E95;font-style:italic;">//输出2 1</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//方式二</span></span>
<span class="line"><span style="color:#A6ACCD;">    a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">b)  </span><span style="color:#676E95;font-style:italic;">//输出2 1</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//方式三</span></span>
<span class="line"><span style="color:#A6ACCD;">    a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">^</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">^</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">^</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">b)  </span><span style="color:#676E95;font-style:italic;">//输出2 1</span></span>
<span class="line"></span></code></pre></div><h2 id="非运算" tabindex="-1">非运算 (~) <a class="header-anchor" href="#非运算" aria-hidden="true">#</a></h2><p>将这个整数全部二进制位按位取反，0变成1，1变成0</p><p>反码：<strong>正数的反码还是等于原码；负数的反码就是它的原码除符号位外，按位取反</strong><br> 补码：<strong>正数的补码等于它的原码；负数的补码等于反码+1</strong></p><p>-1<br> 真码 --&gt; 1000 0000 0000 0000 0000 0000 0000 0001 // 也叫原码<br> 反码 --&gt; 1111 1111 1111 1111 1111 1111 1111 1110 // 真码取反 (符号位不变，其余全部取反) 补码 --&gt; 1111 1111 1111 1111 1111 1111 1111 1111 // 反码加1<br><strong>负数在计算机存储的就是补码</strong></p><p>~1<br> 1 对应的二进制是 --&gt; 0000 0000 0000 0000 0000 0000 0000 0001<br> ~1 对1的二进制序列进行取反 --&gt; 1111 1111 1111 1111 1111 1111 1111 1110<br><strong>这是得到的是存储在计算机中的补码，需要转换成真码，然后才能传换成十进制</strong></p><blockquote><p>取出补码 --&gt; 1111 1111 1111 1111 1111 1111 1111 1110<br> 得到反码 --&gt; 1111 1111 1111 1111 1111 1111 1111 1101 //补码-1就得到反码 得到真码 --&gt; 1000 0000 0000 0000 0000 0000 0000 0010 //符号位不变，其余全部取反，得到真码 转换成十进制 ----得到-2</p></blockquote><h3 id="快速计算" tabindex="-1">快速计算 <a class="header-anchor" href="#快速计算" aria-hidden="true">#</a></h3><p>~x：-x - 1 // 取反某个数字，先让这个数字变成负数，然后减去1，就得到非运算结果<br> ~2 = -2 - 1 = -3<br> ~-2 = 2 - 1 = 1</p><p><strong>JS中最快速取整的方式</strong><br> ~~3.1415926<br> 首先对3.1415926进行非运算 --&gt; ~3.1415926 --&gt;取出整数部分3，结果为-4<br> 然后再对-4进行非运算 --&gt; ~-4 --&gt; 结果为3<br><strong>不太容易阅读，可以拿来炫炫技巧</strong></p><h2 id="位运算的应用场景" tabindex="-1">位运算的应用场景 <a class="header-anchor" href="#位运算的应用场景" aria-hidden="true">#</a></h2><h3 id="管理所有权限" tabindex="-1">管理所有权限 <a class="header-anchor" href="#管理所有权限" aria-hidden="true">#</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;">  AllPermission </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">read</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">0b001</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//读权限</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">write</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">0b010</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//修改权限</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">create</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">0b100</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//创建权限</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//权限1表示可读可写</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> permission1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> AllPermission</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">read </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> AllPermission</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">write</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//判断权限：权限1中是否有可读权限</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    permission1 </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;"> AllPermission </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> AllPermission </span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">可读</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">不可读</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//输出可读</span></span>
<span class="line"></span></code></pre></div><h2 id="位移运算" tabindex="-1">位移运算 <a class="header-anchor" href="#位移运算" aria-hidden="true">#</a></h2><p>1 &lt;&lt; 2<br><strong>左位移</strong>：将数字1的二进制位（除符号外），左位移数字2的次数<br> 左移运算的规律：数字1 乘以 2的数字2次方<br><code>3 &lt;&lt; 1 = 3 * 2 ^ 1 = 6</code></p><p><strong>右位移</strong>: 将数字1的二进制位（除符号外），右位移数字2的次数<br> 右移运算，是整个32位向右移动，最后移动多少位，符号位不变，前面补多少0</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><pre><code>右位移有可能会丢失精度，请谨慎使用
</code></pre></div><p><code>5 &gt;&gt; 1 = 5 * 2 ^ -1 = 2</code> 取整数部分，结果为2</p><p><strong>全右位移</strong>: 同右位移，区别在于，符号位会跟着移动<br> -1 &gt;&gt;&gt; 1</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> 对应的二进制是 </span><span style="color:#89DDFF;">--&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1110</span></span>
<span class="line"><span style="color:#A6ACCD;">    全右移后是        </span><span style="color:#89DDFF;">--&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span></span>
<span class="line"><span style="color:#A6ACCD;">    所以</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;&gt;&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> 的结果为 </span><span style="color:#F78C6C;">0111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1111</span><span style="color:#A6ACCD;"> ，转换为十进制为2147483647</span></span>
<span class="line"></span></code></pre></div><p><a href="https://blog.csdn.net/snsHL9db69ccu1aIKl9r/article/details/121709608" target="_blank" rel="noreferrer">https://blog.csdn.net/snsHL9db69ccu1aIKl9r/article/details/121709608</a><br><strong>十六进制</strong><br> 0x开头表示16进制，浏览器都会将其转换为10进制输出。</p><p><strong>八进制</strong><br> 0开头表示8进制，浏览器都会将其转换为10进制输出。</p><p><strong>二进制</strong><br> 0b开头表示2进制，浏览器都会将其转换为10进制输出。</p><p><a href="https://zhuanlan.zhihu.com/p/99082236" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/99082236</a></p><p><a href="https://blog.csdn.net/hjb2722404/article/details/120514744" target="_blank" rel="noreferrer">浮点精度</a></p><p><a href="https://blog.csdn.net/m0_67502005/article/details/128036344" target="_blank" rel="noreferrer">https://blog.csdn.net/m0_67502005/article/details/128036344</a></p>`,46),e=[o];function t(r,c,C,y,D,A){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{F as __pageData,d as default};
