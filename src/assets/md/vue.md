[[TOC]]



# Vue

## CH1

#### 003	

vue是一个用于 **构建用户界面（基于数据渲染构建用户界面）**的 **渐进式** 框架

![image-20250313164525054](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250313164525307.png)

![image-20250313164742104](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250313164742230.png)

#### 004

![image-20250313165032173](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250313165032241.png)

#### 005

![image-20250313171901327](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250313171901417.png)

- 插值表达式使用的数据必须要存在
- 插值表达式支持表达式而非语句
- 插值表达式不能出现在标签属性中

#### 006

响应式数据：数据改动，视图自动更新

![image-20250313172544411](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250313172544471.png)

![image-20250313172613063](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250313172613117.png)

#### 008

- v-html动态解析字符串标签语义，通过插值表达式只会解析为inner-Text
- 当使用v-html会屏蔽掉内部的子标签元素

- ```v-if v-else-if v-else v-show```进行标签组件的展示，区别在于前者标签组件的注册与否，后者控制标签组件的显示与否
- ```v-on:click```进行事件的注册，简写为@click

![image-20250313183901458](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250313183901616.png)

- v-bind 动态给标签属性设置数据值，（我们知道常规的插值表达式不能在标签属性中使用，所以我们自定义```v-bind:src```设置动态数据值）

- v-for用于进行数组的遍历，进行标签的循环生成（包括内部的子标签）

  > v-for可以循环渲染出多个标签，但是如何标识特定的标签呢？也就是说点击单个标签的删除或者添加按钮，响应时间事件判断出点击按钮的特定标签？直接在响应函数中传入参数id表明参数

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    img {
      height: 200px;
    }

    span {
      display: inline-block;
      height: 30px;
      width: 300px;
      text-align: center;
      line-height: 30px;
    }
  </style>
</head>

<body>
  <div id="app">
    <ul>
      <li v-for="item in list" :key="item.id">
        <span>{{item.name}}</span>
        <button @click="del(item.id)">del</button>
      </li>
    </ul>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        list: [{ id: 1, name: 'apple' }, { id: 2, name: 'banana' }, { id: 3, name: 'pear' }]
      },
      methods: {
        del(id) {
          this.list = this.list.filter(item => item.id !== id)
        }
      }
    })

  </script>
</body>

</html>
```

![image-20250314112440767](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314112441014.png)

- v-for中的key用于给循环赋值的标签进行在dom的唯一标识，也就是说在vue中标签和数据是 **绑定关系**，没有key关键字vue会在v-for中的数据项改动复用原来的标签关系，也就是说原地修改标签上的数据元素，进行简单的替换。这也就导致了原有删除标签的样式被复用

  ![image-20250314112758295](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314112758410.png)

- v-model 实现数据的双向数据绑定，之前的数据绑定视图实现的是数据驱动视图（数据变化->视图变化），那么有没有可能视图变化导致数据变化呢？表单标签的用户的输入！细想，无非是我们需要进行监听用户人机交互的行为改变原有的数据，这不正是监听事件的变化？事实上v-model正是通过监听事件调用函数实现的视图向数据的变化驱动

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    #app {
      margin: 100px auto;
      text-align: center;
      width: 800px;
    }
  </style>
</head>

<body>
  <div id="app">
    username <input type="text" v-model="username">
    password <input type="password" v-model="password">
    <br>
    username <input type="text" v-model="username">
    password <input type="password" v-model="password">
    <br>
    <span>{{username}} {{password}}</span>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        username: "",
        password: ""
      },
    })

  </script>
</body>

</html>
```

## CH2

#### p24

![image-20250314114642930](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314114643122.png)

- 指令修饰符实现了功能的特定事件操作处理。图中```v-on:keyup```事件我们需要针对特定的Enter按键进行特殊处理,当然我们也可以实现函数内部的细分判断

- ```v-bind:class``` 实现标签类的动态设置

  ![image-20250314115502871](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314115503065.png)

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      width: 100px;
      height: 100px;
    }

    .active {
      background-color: red;
    }

    .button1 {
      background-color: skyblue;
      border: 1px pink solid;
    }

    .button2 {
      width: 100px;
      height: 30px;
    }
  </style>
</head>

<body>
  <div id="app">
    <div :class="{box:true,active:index===activeIndex}" v-for="(item,index) in list"></div>
    <button :class="['button1','button2']" @click="next"></button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        activeIndex: 0,
        list: [0, 1, 2, 3, 4]
      },
      methods: {
        next() {
          console.log('click')
          this.activeIndex = (this.activeIndex + 1) % this.list.length
        }
      }
    })

  </script>
</body>

</html>
```

> [!WARNING]
>
> - ```v-bind:class```中列表类的指定需要添加字符串格式，对象键当然没有必要，但是面对  **-**  等特殊字符还是需要添加字符串格式
>
> - ```v-bind:style```写成的对象style格式也是同理，```background-color```需要添加字符串格式或者转成驼峰形```backgroundColor```
>
> - 所以说为什么vue需要格外添加这些class，style？因为原生的html标签属性不支持响应数据绑定！
>
> - 观察:class  :style都是为了对标签样式进行便捷式的数据绑定的管理

![image-20250314122048988](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314122102338.png)

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .wrapper {
      width: 400px;
      height: 50px;
      background-color: black;
      border-radius: 25px;
      overflow: hidden;
    }

    .process {
      /* border-radius: 25px; */
      height: 100%;
      background-color: skyblue;
      transition: all 1s;
    }

    .btn {
      width: 30px;
      height: 30px;
      margin: 10px 80px;
    }
  </style>
</head>

<body>
  <div id="app">
    <div class="wrapper">
      <div class="process" :style=" {width:length+'%'}"></div>
    </div>
    <button @click="sub" :class="['btn']">-</button>
    <button @click="add" :class="['btn']">+</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        length: 50
      },
      methods: {
        sub() {
          if (this.length <= 0) return
          this.length -= 10
        },
        add() {
          if (this.length >= 100) return
          this.length += 10
        }
      }
    })

  </script>
</body>

</html>
```

- v-model可以实现表单数据和数据驱动的双向绑定，但是表单元素存在value，checked不同类型，我们应该如何区分？
- 表单name用于后台进行提交表单数据，至于提交内容为value指定，因此v-model绑定的也是value

![image-20250314133022720](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314133022803.png)

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
  </style>
</head>

<body>
  <div id="app">
    <input type="text" v-model="username">
    <input type="checkbox" name="gender" value="0" v-model="isMale">male
    <input type="checkbox" name="gender" value="1" v-model="isFeMale">female


  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        username: 'pls input value',
        isMale: true,
        isFeMale: false
      }
    })

  </script>
</body>

</html>
```

- Vue组件对象存在data，methods提供数据和操作方法，除此以外还存在着computed和watched等实现数据的特定功能
- computed实现的是data数据的分析，并对结果进行缓存（data更改自动清除）
- computed和methods的区别是什么？我已经说过了，可以对数据进行缓存并且具有数据一致性

> [!WARNING]
>
> - {{}}插值表达式使用computed不需要（）调用，but methods在调用求值中需要，因此vue更多把computed看为了一个属性而非方法
> - 回顾computed，这其实是一个get过程。但是当我们改变computed属性，也就是set会发生什么呢？这时候需要我们自己实现逻辑属性
> - vue当然不推荐set功能，当你自定义set时候get，set数据一致便有可能会被破坏，需要你手动维护

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
  </style>
</head>

<body>
  <div id="app">
    姓<input type="text" name="" id="" v-model="lastName"><br>
    名<input type="text" name="" id="" v-model="firstName"><br>
    姓名<input type="text" name="" id="" v-model="fullName"><br>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        firstName: '',
        lastName: ''
      },
      computed: {
        // fullName() {
        //   return this.lastName + this.firstName
        // }
        fullName: {
          get() {
            return this.lastName + this.firstName
          },
          set(fullName) {
            this.lastName = fullName.slice(0, 1)
            this.firstName = fullName.slice(1)
          }
        }
      }
    })

  </script>
</body>

</html>
```

- 我们实现了标签组件数据data，方法操作methods，数据分析computed。同时我们还有数据监视的需求

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
  </style>
</head>

<body>
  <div id="app">
    <input type="text" name="" id="" v-model="name">
    <input type="text" name="" id="" v-model="user.name">
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        name: "abc",
        user: {
          name: 'ddd',
          password: '123'
        }
      },
      watch: {
        name(newValue, oldValue) {
          // this.name = this.name + this.name
        },
        'user.name'(newValue, oldValue) {
          this.user.name = this.name + this.name
        }
      }
    })
  </script>
</body>

</html>
```

> [!WARNING]
>
> - 我的疑问出现了，computed和watch之间存在什么关系？可以注意到computed可以实现数据一致性是通过watch监听数据变化实现的，可以说watch是computed的更加底层的实现
> - 所以说在实时翻译中针对用户的输入进行文本翻译我们为什么不可以使用computed实现呢？因为我们在更加底层的watch中可以自由的进行防抖节流的功能，暂缓对于数据变化进行翻译的更新提高性能

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
  </style>
</head>

<body>
  <div id="app">
    <input type="text" v-model="val.a">
    <input type="text" v-model="val.b">
    <br>
    {{c}}
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        val: {
          a: '',
          b: ''
        },
        c: 0
      },
      watch: {
        val: {
          deep: true,//进行数据的深度监视侦听
          immediate: true,//进入界面立即执行
          handler(newValue) {
            console.log(newValue);
            this.c++
          }
        }
      }
    })

  </script>
</body>

</html>
```

- deep对于对象数据的深度监视，而非表面的引用数据
- immediate组件标签创建时的立刻执行

## CH3

#### p35

![image-20250314142226732](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314142226868.png)

- created完成响应式数据的创建，开始进行界面渲染数据的请求
- mounted完成模板创建，可以进行dom操作
- updated通过数据更新进行实现
- destoryed在组件销毁之后，vue组件结束，常用于定时器，延时器的销毁。但是注意的是vue组件销毁并不意味着dom标签的毁灭，vue组件只是操作控制dom的框架

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
  </style>
</head>

<body>
  <div id="app">
    <input type="text">
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {

      },
      mounted() {
        document.querySelector('input').focus()
      }
    })

  </script>
</body>

</html>
```

![image-20250314144050270](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314144050468.png)

#### p41

![image-20250314145056722](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314145056848.png)

![image-20250314145617076](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314145617191.png)

- 网页的主体是index.html，内部存在div.app标签，通过main.js进行App.vue标签的创建和div.app的挂载
- App.vue根组件挂载到index.html中，可以在App.vue进行根组件界面的设置

![image-20250314150018197](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314150018370.png)

![image-20250314150029594](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314150029705.png)

> [!IMPORTANT]
>
> 在Vue中，组件的导出（使用`export default`）和导入机制是基于ES6模块系统实现的，它允许开发者将组件定义封装在一个模块内，并通过`import`语句在其他地方使用这些组件。对于Vue组件来说，导出自己定义的数据(`data`)、方法(`methods`)等是为了实现组件的功能性和复用性。
>
> ### 为什么Vue组件要导出自己的`data`, `methods`等？
>
> 1. **封装性**：通过导出一个对象，这个对象包含了组件的所有选项（如`data`, `methods`, `computed`, 生命周期钩子等），实现了组件内部逻辑的良好封装。这使得每个组件都是独立且自包含的，可以方便地被重用和测试。
> 2. **复用性**：一旦组件被定义并导出，它可以在整个应用程序的不同地方被导入和使用。例如，在多个视图或页面之间共享相同的组件，只需导入即可。
> 3. **组织结构清晰**：通过将组件相关的逻辑（数据、方法、计算属性等）集中管理，可以帮助开发者更容易理解和维护代码。
>
> ### 底层原理
>
> 当你执行如下代码时：
>
> javascript
>
> 浅色版本
>
> 
>
> ```
> import Vue from 'vue'
> import App from './App.vue'
> 
> Vue.config.productionTip = false
> 
> new Vue({
>   render: h => h(App),
> }).$mount('#app')
> ```
>
> 这里涉及到几个关键点：
>
> - **模块导入**：`import App from './App.vue';` 这行代码从指定路径导入了`App.vue`组件。由于`App.vue`文件通常是一个单文件组件（SFC），它包含了模板、脚本和样式部分。在这个脚本部分，你定义了组件的所有选项，并通过`export default`将其导出。
> - **渲染函数**：`render: h => h(App)` 指定了Vue实例应该渲染的根组件。这里的`h`是`createElement`的简写，它是一个用于创建虚拟DOM节点的函数。通过传递`App`组件给`h`函数，Vue知道应用程序启动时首先渲染的是`App`组件。
> - **挂载实例**：`.mount('#app')` 将Vue实例挂载到DOM中的特定元素上（此处为ID为`app`的元素）。这意味着Vue会接管该元素及其内部内容，根据组件定义渲染界面。
>
> 当Vue实例化过程中解析到`render`函数时，它会处理`App`组件的导入，并依据组件定义中的`data`, `methods`, `computed`等配置来初始化组件的状态和行为。这样就形成了Vue应用的基础架构，其中各个组件能够相互协作，共同构建复杂的用户界面。通过这种方式，Vue实现了高度的灵活性和可扩展性，同时也保持了代码的清晰度和可维护性。

![image-20250314152547090](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314152547252.png)

- ```npm install less less-loader --save-dev```

![image-20250314152731012](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314152731118.png)

![image-20250314152840630](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314152840851.png)

```js
<template>
  <div class="App">
    <HmHeader></HmHeader>
    <HmMain></HmMain>
    <HmFooter></HmFooter>
  </div>
</template>

<script>
import HmHeader from "./components/HmHeader.vue";
import HmMain from "./components/HmMain.vue";
import HmFooter from "./components/HmFooter.vue";
export default {
  // 进行组件的注册
  components: {
    HmHeader: HmHeader,
    HmMain: HmMain,
    HmFooter: HmFooter,
  },
};
</script>
  
<style>
.App {
  width: 800px;
  /* height: 100px; */
  background-color: skyblue;
  margin: 100px auto;
}
</style>


<template>
  <div class="header"></div>
</template>

<script>
export default {};
</script>

<style>
.header {
  width: 600px;
  height: 100px;
  background-color: pink;
  margin: 10px auto;
}
</style>



<template>
  <div class="main"></div>
</template>

<script>
export default {};
</script>

<style>
.main {
  width: 600px;
  height: 300px;
  background-color: lightgreen;
  margin: 30px auto;
}
</style>



<template>
  <div class="footer"></div>
</template>

<script>
export default {};
</script>

<style>
.footer {
  width: 600px;
  height: 100px;
  background-color: black;
  margin: 10px auto;
}
</style>
```

![image-20250314155253819](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314155254037.png)

- 组件的导入和使用
- 组件通过import导入使用
- 局部在export defalut进行注册，全局在main使用Vue.component注册使用

## CH04

#### p48

![image-20250314160455115](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314160455354.png)

- template中的只能存在一个根元素（vue3无限制）
- 组件定义的style样式作用全局，使用scope进行局部样式限制（原理是给每个组件标签属性添加自定义属性hash值，style设置样式局限了hash自定义属性）
- el/$mounted进行组件元素对于html div标签的挂载，

![image-20250314160818018](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314160818231.png)

- 在工程化的标签组件中对于data的定义需要封装成函数，保证每次创建组件的时候可以进行函数调用得到独立的数据对象，为什么函数methods等不需要？共用一份也无妨~

  ![image-20250314161005586](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314161005709.png)

#### p50

![image-20250314161203224](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314161203458.png)

![image-20250314162153628](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314162153773.png)

- 在此处的代码我们观察子父组件进行的通信规则
- 首先我们对使用的子组件进行自定义属性的数据携带，并且注意到的是常量数据可以直接```title```，当时如果是数据响应，需要实时更新的话我们需要使用```:title```

> [!IMPORTANT]
>
> 在 Vue 中，`title` 和 `:title`（即 `v-bind:title` 的缩写形式）用于向组件或元素传递属性值，但它们之间存在重要的区别：
>
> 1. **`title`**:
>    - 当你使用 `title="静态内容"` 这种方式时，Vue 会将 `"静态内容"` 作为字符串字面量直接赋值给元素的 `title` 属性。这意味着无论组件内部如何变化，这个 `title` 属性的值都是固定的。
>    - 示例：`<my-component title="这是一个标题"></my-component>` 在这里，“这是一个标题”是一个固定的字符串，不会随任何数据的变化而变化。
> 2. **`:title` 或 `v-bind:title`**:
>    - 使用 `:title="表达式"` 或 `v-bind:title="表达式"` 则允许你绑定一个动态的值到 `title` 属性上。这里的“表达式”可以是 Vue 实例中的数据属性、计算属性或者方法返回的结果等。
>    - 这意味着该属性的值可以根据 Vue 实例的数据状态动态更新。如果绑定的数据发生变化，那么这个属性的值也会自动更新以反映最新的数据状态。
>    - 示例：`<my-component :title="dynamicTitle"></my-component>` 假设 `dynamicTitle` 是 Vue 组件实例中的一个数据属性，其值可以随时间或者其他因素改变，从而导致 `<my-component>` 的 `title` 属性也相应地更新。
>
> **总结**：
>
> - 直接使用 `title="..."` 设置的是静态值。
> - 使用 `:title="..."` 或 `v-bind:title="..."` 可以绑定动态值，这些值可以基于 Vue 组件的状态进行更新。
>
> 这种机制使得 Vue 非常适合于构建数据驱动的用户界面，因为你可以轻松地将 DOM 属性与组件内部的数据状态保持同步。

- 子组件没有更改父组件数据的权限，必须要通知父组件借助父组件函数进行数据的修改

- 因此我们伪造一个子组件的事件触发，父组件通过监听触发事件进行数据的更改

- 首先进行在父组件中对于子组件注册时的数据传输和数据更改事件（自定义）的监听

  ```<HmSon :cnt="cnt" @addCnt="addCnt"></HmSon>```

  添加methods方法中addCnt响应逻辑（更改数据）

  ```js
  methods: {
      addCnt(i) {
        this.cnt += i;
      },
  },
  ```

  子组件中进行响应事件的发送

  ```js
  add() {
    this.$emit("addCnt", 1);
  },
  ```

```js
<template>
  <div class="App">
    <HmSon :cnt="cnt" @addCnt="addCnt"></HmSon>
  </div>
</template>

<script>
import HmSon from "./components/HmSon";

export default {
  // 进行组件的注册
  components: {
    HmSon: HmSon,
  },
  data() {
    return {
      cnt: 100,
    };
  },
  methods: {
    addCnt(i) {
      this.cnt += i;
    },
  },
};
</script>
  
<style>
.App {
  width: 500px;
  height: 500px;
  background-color: skyblue;
}
</style>
```

```js
<template>
  <div class="son">
    {{ cnt }}
    <button @click="add"></button>
  </div>
</template>

<script>
export default {
  props: ["cnt"],
  methods: {
    add() {
      this.$emit("addCnt", 1);
    },
  },
};
</script>

<style>
.son {
  width: 100px;
  height: 100px;
  background-color: pink;
}
button {
  width: 40px;
  height: 20px;
  border-radius: 2px;
}
</style>
```

![image-20250314163950821](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314163951068.png)

![image-20250314164651583](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314164651776.png)

![image-20250314165617309](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314165617464.png)

#### p55

非父子组件通信（拓展）

略

#### p57

![image-20250314170031662](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314170031789.png)

```js
<template>
  <div class="App">
    <input type="text" v-model="msg1" />{{ msg1 }}
    <input type="text" :value="msg2" @input="msg2 = $event.target.value" />{{
      msg2
    }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg1: "",
      msg2: "",
    };
  },
};
</script>
  
<style>
</style>
```

- 因此在子组件的表单元素更改父组件传递数据中我们无法使用v-model,而是选择手写监听表单数据更改事件进行emit的提交

![image-20250314173707734](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314173708009.png)

- sync修饰符干嘛的？进行数据双向绑定的优化的。v-model不就是干这事的？要这个干什么？注意v-model确实常用于表单元素的数据双向绑定，但是我们注意到v-model的数据属性固定为 :**value** ,也就是说如果我们的父子组件双向数据绑定的数据属性是:value可以直接使用v-model,但是如果不是呢？
- 我们可以手写自定义属性:cnt 和监听事件即cnt的update更新事件，在子组件进行时间的传递。那么有没有什么简单有效的方法呢？有的有的，我们使用 .**sync** 添加在传递的自定义属性后面，可以简化监听事件的绑定，只需要子组件进行事件的产生就可以了

![image-20250314175151245](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314175151437.png)

```js
<template>
  <div class="son" ref="div"></div>
</template>

<script>
export default {
  mounted() {
    this.$refs.div.style.background = "skyblue";
  },
};
</script>

<style>
.son {
  width: 100px;
  height: 100px;
  background-color: pink;
}
</style>
```

- 调用this.$refs有s!
- 得到组件标签的实例对象可以进行所要操作，比如样式更改，组件函数的调用等（当然这是父对子标签操作的权力）

![image-20250314175618672](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314175618919.png)

![image-20250314175710651](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314175710834.png)

- 我们希望通过is_show进行标签组件的展示，同时希望创建该组件进行展示的立刻将焦点聚集在该组件的输入文本框中，问题在于vue对于dom的标签操作是异步进行的，导致我们怎么知道什么时候创建标签完成，再去进行焦点的聚集呢？

![image-20250314180309844](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314180310015.png)

```js
<template>
  <div class="App">
    <input type="text" v-if="isShow" ref="inp" />
    <button v-else @click="handleEdit">click</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: {
  },
  methods: {
    handleEdit() {
      this.isShow = true;
      console.log(this.$refs.inp); //undefined
      this.$nextTick(() => {
        this.$refs.inp.focus();
      });
    },
  },
};
</script>
  
<style>
</style>
```

- 回顾一下v-if v-show的区别是什么？没有标签的实时创建，那么v-show是否占据空间呢？也就是说是否等效透明度opcitity=0?答案是否定的，v-show不会占据空间

## CH05

#### p62

![image-20250314192949246](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314192949567.png)

- 利用钩子方法对标签的活动进行指令目的的插入
- 我们还注意到示例中bgc的优先级比style更高
- 有点意思

```js
<template>
  <div class="App">
    <div v-red></div>
	<div></div>
  </div>
</template>

<script>
// import HmSon from "./components/HmSon";
export default {
  data() {
    return {};
  },
};
</script>
  
<style scoped>
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
}
</style>
```

```js
Vue.directive('color', {
  inserted(el, binding) {
    el.style['background-color'] = binding.value;
  },
  update(el, binding) {
    console.log('update')
    el.style['background-color'] = binding.value;
  },
  componentUpdated() {
    console.log('componentUpdate')
  }
})
```

> [!IMPORTANT]
>
> 在 Vue.js 中，当你创建一个自定义指令时，你可以定义几个不同的钩子函数来处理不同的阶段。你给出的例子中使用了 `inserted` 钩子，它是用于定义当指令绑定的元素插入到其父节点时调用的方法。以下是你可以在自定义指令中使用的钩子方法列表：
>
> 1. **bind**: 只调用一次，在指令第一次绑定到元素上时调用。这里适合执行一次性的初始化工作。
> 2. **inserted**: 当被绑定的元素插入到其所在的父节点时调用（不仅仅是简单的DOM插入，也包括其父节点存在的情况）。在这个钩子里你可以访问到该元素的父级DOM元素。
> 3. **update**: 所在组件的 VNode 更新时调用，但是可能发生在其子组件更新之前。这个钩子在指令需要根据最新的更新作出响应时很有用，不过要注意的是此时整个更新还未完成。
> 4. **componentUpdated**: 指令所在组件的所有子组件都更新完毕后调用。如果你的指令依赖于子组件的状态，那么最好在这个钩子中执行操作。
> 5. **unbind**: 只调用一次，当指令与元素解绑时调用。可以在这里清理一些资源或者取消事件监听等。
>
> 每个钩子函数都有 `el`, `binding`, `vnode`, 和 `oldVnode` 作为参数（除了 `unbind` 不会传入 `oldVnode`），这些参数提供了对元素、指令的属性值、虚拟节点以及旧的虚拟节点的访问权限，以便你更灵活地操作和控制指令的行为。

- bind和unbind并不常用
- 自定义属性可以设值，在binding.value中取得进行动态设置，但是该值只能是响应式数据
- 自定义属性数据变化触发update函数，如果没有自定义那么数据变化无法实时同步视图
- update的触发是在自定义属性变化才会调用的，**而且会触发两次**（不知道为什么）console控制台输出如下

```
update	main.js:14 
componentUpdate	main.js:10 
update	main.js:14 
componentUpdate	main.js:10 
```

```js
<template>
  <div class="App">
    <div v-color="red" ref="div"></div>
    <div v-color="pink"></div>
    <button @click="handleBind">change bind to black</button>
    <button @click="handleStyle">change style to red</button>
  </div>
</template>

<script>
// import HmSon from "./components/HmSon";
export default {
  data() {
    return {
      red: "red",
      pink: "pink",
    };
  },
  methods: {
    handleBind() {
      this.red = "black";
    },
    handleStyle() {
      this.$refs.div.style.backgroundColor = "red";
    },
  },
};
</script>
  
<style scoped>
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
}
</style>
```

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.directive('color', {
  inserted(el, binding) {
    el.style['background-color'] = binding.value;
  },
  update(el, binding) {
    console.log('update')
    el.style['background-color'] = binding.value;
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')

```

- 在这个案例中我们发现自定义属性数据改变才会调用update
- 所谓的数据绑定不过是内部封装了对dom标签属性的更改，如果自己私下进行dom属性修改有可能会出现数据和视图不统一的情况（私下修改属性如同修改表单元素般，没有统一的原因在于没有实现双向绑定，除非你监听属性修改事件的变化）

#### p64

![image-20250314203659978](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314203700142.png)

- 我们已经很好的实现了组件之间的解耦和复用，但是组件的复用是否可以存在多态性质？也就是自定义某些属性？这也正是此处用到的插槽技术
- 我们首先在定制化组件的位置进行slot插槽占位，等待父组件使用该组件自定义插槽位置具体内容

```js
<template>
  <transition name="fade">
    <div class="dialog" v-if="isShow">
      <div class="title">友情提示</div>
      <div class="main">
        <slot></slot>
      </div>
      <div class="btn">
        <button class="yes" @click="exit">yes</button>
        <button class="no">no</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    exit() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
/* 定义进入开始的状态和离开结束的状态 */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.dialog {
  position: fixed;
  width: 600px;
  height: 250px;
  background-color: #ccc;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  .title {
    font-size: 28px;
    font-weight: 700;
    height: 50px;
    margin: 0 20px;
    line-height: 50px;
    border-bottom: 1px black solid;
  }
  .main {
    font-size: 18px;
    color: #333;
    margin: 10px 20px;
    flex: 1;
  }
  .btn {
    display: flex;
    flex-direction: row-reverse;
    height: 50px;
    margin: 0 20px;
    button {
      width: 50px;
      height: 30px;
      margin: 10px 10px;
      border: 1px #ccc solid;
      &.yes {
        background-color: blue;
        color: #fff;
      }
      &.no {
        background-color: #fff;
      }
    }
  }
}
</style>
```

```js
<template>
  <div class="App">
    <HmDialog></HmDialog>
  </div>
</template>

<script>
import HmDialog from "./components/HmDialog";
export default {
  data() {
    return {};
  },
  components: {
    HmDialog: HmDialog,
  },
};
</script>
  
<style scoped>

</style>
```

> [!IMPORTANT]
>
> Vue 的 `<transition>` 标签是一个非常有用的内置组件，它简化了元素或组件在进入和离开 DOM 时添加过渡效果的过程。以下是关于 `<transition>` 标签的总结：
>
> ### 基本概念
>
> - **作用**：`<transition>` 组件用于包裹需要过渡效果的单个元素或组件，使得当这些元素或组件插入、更新或移除时可以应用进入和离开的动画或过渡效果。
> - **原理**：当 Vue 遇到一个被 `<transition>` 包裹的元素或组件时，在其状态发生变化（如通过 `v-if` 或 `v-show` 显示/隐藏）时，会自动根据当前的状态添加或移除相应的类名，从而触发 CSS 过渡或动画。

![image-20250314212809802](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314212810013.png)

```js
<template>
  <div class="App">
    <HmDialog ref="nameDialog">你可知我姓名？</HmDialog>
    <button @click="handleShow">toggle</button>
  </div>
</template>

<script>
import HmDialog from "./components/HmDialog";
export default {
  data() {
    return {};
  },
  components: {
    HmDialog: HmDialog,
  },
  methods: {
    handleShow() {
      this.$refs.nameDialog.rev();
    },
  },
};
</script>
  
<style scoped>
button {
  margin: 100px auto;
  display: block;
  width: 100px;
  height: 30px;
}
</style>
```

```js
<template>
  <transition name="fade">
    <div class="dialog" v-if="isShow">
      <div class="title">友情提示</div>
      <div class="main">
        <slot>未知错误</slot>
      </div>
      <div class="btn">
        <button class="yes" @click="exit">yes</button>
        <button class="no">no</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    rev() {
      this.isShow = !this.isShow;
    },
    exit() {
      console.log("exit");

      this.isShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 10s;
}
/* 定义进入开始的状态和离开结束的状态 */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.dialog {
  position: fixed;
  width: 600px;
  height: 250px;
  background-color: #ccc;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  .title {
    font-size: 28px;
    font-weight: 700;
    height: 50px;
    margin: 0 20px;
    line-height: 50px;
    border-bottom: 1px black solid;
  }
  .main {
    font-size: 18px;
    color: #333;
    margin: 10px 20px;
    flex: 1;
  }
  .btn {
    display: flex;
    flex-direction: row-reverse;
    height: 50px;
    margin: 0 20px;
    button {
      width: 50px;
      height: 30px;
      margin: 10px 10px;
      border: 1px #ccc solid;
      &.yes {
        background-color: blue;
        color: #fff;
      }
      &.no {
        background-color: #fff;
      }
    }
  }
}
</style>
```

- 观察这段代码我们发现首先添加了默认插槽内容
- 其次我们发现创建页面时transition并不会对标签有过渡效果，但是在创建页面之后标签的创建和毁灭过渡效果是存在的。**这是为什么呢？**

![image-20250314214106879](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314214107179.png)

```js
<template>
  <div class="dialog" v-if="isShow">
    <div class="title">
      <slot name="title">标题</slot>
    </div>
    <div class="main">
      <slot name="main">内容</slot>
    </div>
    <div class="btn">
      <button class="yes" @click="exit">yes</button>
      <button class="no">no</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    rev() {
      this.isShow = !this.isShow;
    },
    exit() {
      console.log("exit");

      this.isShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.dialog {
  position: fixed;
  width: 600px;
  height: 250px;
  background-color: #ccc;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  .title {
    font-size: 28px;
    font-weight: 700;
    height: 50px;
    margin: 0 20px;
    line-height: 50px;
    border-bottom: 1px black solid;
  }
  .main {
    font-size: 18px;
    color: #333;
    margin: 10px 20px;
    flex: 1;
  }
  .btn {
    display: flex;
    flex-direction: row-reverse;
    height: 50px;
    margin: 0 20px;
    button {
      width: 50px;
      height: 30px;
      margin: 10px 10px;
      border: 1px #ccc solid;
      &.yes {
        background-color: blue;
        color: #fff;
      }
      &.no {
        background-color: #fff;
      }
    }
  }
}
</style>
```

```js
<template>
  <div class="App">
    <HmDialog>
      <template v-slot:title>姓名标题</template>
      <template v-slot:main>你可知我姓名？</template>
    </HmDialog>
    <HmDialog ref="nameDialog">
      <template v-slot:main>你可知我痛楚？</template>
      <template v-slot:title>痛楚标题</template>
    </HmDialog>
    <HmDialog ref="nameDialog"> </HmDialog>
  </div>
</template>

<script>
import HmDialog from "./components/HmDialog";
export default {
  data() {
    return {};
  },
  components: {
    HmDialog: HmDialog,
  },
};
</script>
  
<style scoped>
</style>
```

- 首先对slot插槽进行name标签属性命名（可以补充默认内容）
- 在使用组件时使用template标签属性v-slot:{slotname}进行插槽指定（可以简化为#{slotname}）

![image-20250314214900133](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314214900395.png)

![image-20250314215136853](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314215137040.png)

- 回顾之前的组件复用，我们有时需要进行数据的传递
- 如今我们需要个性化插槽内容，在父组件中进行了子组件插槽的样式定制，也就是子组件的部分标签在父组件中实现，那么该类标签如何与子组件的其他标签进行交互呢？比如说v-for中item信息的获取，我们在slot插槽中绑定数据，传递到template的obj对象中以便给父组件diy时使用

![image-20250314215439452](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250314215439667.png)

> [!IMPORTANT]
>
> 在 Vue.js 中，`<slot>` 元素用于内容分发，它允许你在一个组件的模板中定义一个或多个插槽（slots），这些插槽可以被父组件提供的内容填充。这提供了一种灵活的方式让父组件能够向子组件传递内容，增强了组件的复用性和灵活性。
>
> ### 为什么 `<slot>` 需要实现传递数据的功能？
>
> 虽然 `<slot>` 主要用于内容分发，但有时也需要从子组件向插槽传递数据。这是因为在某些情况下，除了简单地插入一些静态 HTML 或文本外，你还可能希望根据子组件的状态或数据动态地渲染插槽的内容。这种需求促使了作用域插槽（scoped slots）的概念，它允许子组件向插槽传递数据。
>
> #### 作用域插槽的作用
>
> 1. **增强组件的灵活性**：通过作用域插槽，父组件可以根据子组件的数据自定义渲染逻辑，而不需要修改子组件本身。这意味着同一个子组件可以在不同的上下文中表现出不同的行为和外观。
> 2. **封装与复用**：子组件可以通过插槽将内部状态暴露给父组件，使得父组件能够基于这些状态来定制化显示，同时保持子组件的封装性。这样既实现了代码复用，又不会牺牲灵活性。
> 3. **简化复杂的交互逻辑**：当需要处理较为复杂的交互逻辑时，比如列表项的渲染，作用域插槽可以让父组件决定如何呈现每个列表项，而不是强制子组件负责所有的渲染逻辑。

- 说的太好了！为什么需要作用域插槽？**根据子组件的状态或者数据动态的渲染插槽的内容**

## CH06

#### p72

![image-20250315092454260](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315092454557.png)

![image-20250315092552784](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315092553125.png)

![image-20250315092615550](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315092615918.png)

![image-20250315092634965](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315092635289.png)

![image-20250315092835454](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315092835683.png)

- 233/344 是vue和router和vuex版本的对应关系，vue2下载最新版的vue-router（vue-router4）肯定是不兼容的，而是下载router3版本```npm install vue-router@^3```

- 思考路由组件，无非是在一个html页面中通过不同路由路径希望可以切换根组件中元素的不同组件（使用route-view标签标识路由路口）
- view和component的区别是什么？本质没有区别，都是组件，只不过规定view给路由导航使用，component是view进行复用的简单组件
- 我们推荐route配置代码专门放到route文件夹中index.js进行配置，main.js进行导入使用
- 文件引用路径使用相对路径会导致文件移动路径无效，此时可以使用```@```代表绝对路径下的src，如```@/views/MyFriend```
- 导航标签使用a标签进行路由，但是如果需要导航对应标签高亮我们需要手动实现active类的转移，此时我们可以方便的使用route-link
- 相较于a标签href跳转，我们需要route-link的to跳转，并且可以省略掉默认的前缀#。本质上解析出来route-link其实还是a标签，只不过对活动的标签自动添加了route-link-active类，

![](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315103428283.png)

![image-20250315104334052](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315104334313.png)

![image-20250315104442716](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315104443053.png)

![image-20250315104611231](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315104611395.png)

```js
<template>
  <div class="App">
    <div class="nav">
      <a href="#/friend">我的朋友</a><a href="#/like">我的喜欢</a
      ><a href="#/music">我的音乐</a>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
};
</script>
  
<style lang='less' scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.nav {
  display: flex;
  width: 100%;
  a {
    flex: 1;
    // width: 100px;
    text-decoration: none;
    background-color: #555;
    border-right: 1px #000 solid;
    color: white;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  :last-child {
    border: none;
  }
}
</style>
```

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import VueRouter from 'vue-router'
import MyFriend from './views/MyFriend'
import MyLike from './views/MyLike'
import MyMusic from './views/MyMusic'


Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/friend', component: MyFriend },
    { path: '/like', component: MyLike },
    { path: '/music', component: MyMusic },
  ]
}
)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
```







```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import MyFriend from '@/views/MyFriend'
import MyLike from '@/views/MyLike'
import MyMusic from '@/views/MyMusic'


Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/friend', component: MyFriend },
    { path: '/like', component: MyLike },
    { path: '/music', component: MyMusic },
  ]
}
)
export default router
```

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import router from './route/index'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
```

![image-20250315104722563](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315104722921.png)

```js
<template>
  <div class="App">
    <div class="nav">
      <router-link to="/friend">我的朋友</router-link>
      <router-link to="/like">我的喜欢</router-link>
      <router-link to="/music">我的音乐</router-link>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
};
</script>
  
<style lang='less' scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.nav {
  display: flex;
  width: 100%;
  a {
    flex: 1;
    text-decoration: none;
    background-color: #555;
    border-right: 1px #000 solid;
    color: white;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    &.router-link-active {
      background-color: skyblue;
    }
  }
  :last-child {
    border: none;
  }
}
</style>
```

- 在声明式导航（router-link）跳转路由如何传参？（比如说搜索栏搜索跳转查询结果，结果界面需要搜索询问展示）
- 在template中可以省略this，但是created等函数中使用组件this必须要添加this（**不明白为什么**）

- 总结来说查询语句的内容在路由跳转中放到查询参数param中或者路由动态路径中，比如说查询id=1的路由分别为```/image/search?id=1```   ```/image/search/1```

![image-20250315111030618](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315111030802.png)

![image-20250315111157579](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315111158003.png)

![image-20250315111254449](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315111254850.png)

![image-20250315111417306](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315111417495.png)

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import MyFriend from '@/views/MyFriend'
import MyLike from '@/views/MyLike'
import MyMusic from '@/views/MyMusic'


Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/friend' },
    { path: '/friend', component: MyFriend },
    { path: '/like', component: MyLike },
    { path: '/music', component: MyMusic },
    { path: '*', component: MyLike }
  ]
}
)
export default router
```

![image-20250315111857410](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315111857767.png)



> [!IMPORTANT]
>
> 在使用 Vue Router 的 `history` 模式时，URL 看起来更加传统且友好（例如 `http://example.com/path`），但它需要服务器端的支持来确保所有路由都能正确指向应用的入口文件（通常是 `index.html`）。这是因为当用户直接访问一个深层链接（如 `http://example.com/about`）时，如果没有正确的服务器配置，服务器可能会尝试查找一个实际存在的 `/about` 路径的文件或目录，从而导致 404 错误。
>
> ### 示例说明
>
> 假设你有一个基于 Vue.js 的单页应用（SPA），并且你已经配置了 Vue Router 使用 `history` 模式：
>
> javascript
>
> 浅色版本
>
> 
>
> ```
> const router = new VueRouter({
>   mode: 'history',
>   routes: [
>     { path: '/', component: Home },
>     { path: '/about', component: About },
>     // 其他路由...
>   ]
> });
> ```
>
> #### 场景描述
>
> 1. **正常导航**：当你通过点击应用内的 `<router-link>` 或者使用 `this.$router.push('/about')` 进行导航时，Vue Router 会使用 HTML5 History API (`pushState`) 来更新 URL，并渲染相应的组件。由于整个过程都在前端完成，因此不会出现 404 错误。
> 2. **直接访问深层链接**：如果用户直接在浏览器地址栏输入 `http://example.com/about` 并按下回车键，此时请求会被发送到服务器。如果服务器没有被配置为处理这种请求，它将尝试寻找 `/about` 目录下的资源。如果该资源不存在，服务器将返回 404 错误页面。
>
> ### 解决方案：服务器端配置
>
> 为了确保所有未匹配的请求都返回 `index.html`，以便 Vue Router 可以接管并显示正确的视图，你需要根据你的服务器环境进行适当的配置。
>
> #### Nginx 配置示例
>
> 如果你使用的是 Nginx 作为你的 Web 服务器，可以在 Nginx 配置文件中添加如下规则：
>
> nginx
>
> 浅色版本
>
> 
>
> ```
> server {
>   listen 80;
>   server_name yourdomain.com;
> 
>   location / {
>     try_files $uri $uri/ /index.html;
>   }
> }
> ```
>
> 这里的 `try_files $uri $uri/ /index.html;` 指令表示：
>
> - 尝试匹配提供的 URI。
> - 如果找不到对应的文件或目录，则返回 `index.html` 文件，这样 Vue Router 就可以接管并显示正确的视图。
>
> ### 总结
>
> 通过上述服务器端配置，你可以确保无论用户如何访问你的 SPA 应用（无论是通过点击内部链接还是直接输入 URL），都能正确加载并显示预期的内容。这对于使用 Vue Router 的 `history` 模式来说至关重要，因为它依赖于服务器能够正确处理这些请求并将它们指向应用的入口文件。这不仅提升了用户体验，也避免了不必要的 404 错误。

- 也就是说路由组件视图url其实污染了标准url的请求
- 后端只会监听接口请求路径而非前端路由url，否则报错。此时需要我们后端进行屏蔽非法url转为index.html



- 现在我们回顾一下，如何实现路由跳转？可以a标签跳转，其实就是改变url路由，但如果我需要手动改变url路由呢？对于我们的单页面无法更改location.href改变页面了。

![image-20250315112858469](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315112858791.png)



![image-20250315113313658](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315113313868.png)

![image-20250315113343447](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315113343798.png)

![image-20250315113357699](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315113358139.png)

![image-20250315113621026](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315113621257.png)



#### P82

![image-20250315113736025](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315113736260.png)

- 在导航中我们需要考虑多级路由的问题，虽然url可以看起来是平等的
- 也就是说从根视图开始存在首页和详情的两个以及路由，也就是根视图只能写一个router-view，除非你希望html界面中永远存在一个组件标签元素
- 在我的一级路由首页中又需要在永远存在导航栏的基础上配置不同的二级路由（展示不同导航栏的内容）

> [!IMPORTANT]
>
> 在 Vue.js 应用中，一个组件内同时存在两个或更多的 `<router-view>` 是合理的，并且是 Vue Router 支持的功能之一。这种情况通常用于实现布局（Layouts）和嵌套路由（Nested Routes）。通过嵌套路由，你可以创建更加复杂的用户界面，其中不同的部分可以独立地响应路由变化。
>
> ### 嵌套路由与多 `<router-view>`
>
> 当你需要在一个页面的多个区域根据不同的子路由显示不同的内容时，就可以使用嵌套路由和多个 `<router-view>`。Vue Router 允许你定义一个路由层级结构，每个层级可以有自己的视图和子路由。
>
> #### 示例：定义嵌套路由
>
> 假设你有一个应用，主页面分为顶部导航、主要内容区和底部信息区。你希望主要内容区和底部信息区可以根据路由显示不同的内容。
>
> 1. **定义路由配置**：
>
>    javascript
>
>    浅色版本
>
>    
>
>    ```
>    const routes = [
>      {
>        path: '/',
>        component: Layout, // 主布局组件
>        children: [
>          {
>            path: '',
>            components: { // 注意这里使用了 components 而不是 component
>              default: HomePage, // 默认渲染到最外层 <router-view>
>              footer: FooterInfo // 渲染到 name="footer" 的 <router-view>
>            }
>          },
>          {
>            path: 'about',
>            components: {
>              default: AboutPage,
>              footer: AboutFooter
>            }
>          }
>        ]
>      }
>    ];
>    ```
>
> 2. **在主布局组件中使用多个 `<router-view>`**：
>
>    vue
>
>    浅色版本
>
>    
>
>    ```
>    <!-- Layout.vue -->
>    <template>
>      <div>
>        <header>
>          <!-- 顶部导航内容 -->
>        </header>
>        <main>
>          <router-view></router-view> <!-- 默认的 router-view -->
>        </main>
>        <footer>
>          <router-view name="footer"></router-view> <!-- 具有名字的 router-view -->
>        </footer>
>      </div>
>    </template>
>    ```
>
> 3. **定义具体的页面组件**：
>
>    - `HomePage.vue` 和 `AboutPage.vue` 将会渲染在 `<main>` 标签内的默认 `<router-view>` 中。
>    - `FooterInfo.vue` 和 `AboutFooter.vue` 将会渲染在 `<footer>` 标签内的名为 `footer` 的 `<router-view>` 中。
>
> ### 使用具名视图
>
> 如上所示，如果你需要在同一级中有多个视图，可以使用具名视图（Named Views）。这样，你可以为每个 `<router-view>` 指定一个名称，并在路由配置中根据这些名称分配不同的组件。
>
> - 在模板中指定视图名称：
>
>   vue
>
>   浅色版本
>
>   
>
>   ```
>   <router-view name="a"></router-view>
>   <router-view name="b"></router-view>
>   ```
>
> - 在路由配置中指定要渲染的组件：
>
>   javascript
>
>   浅色版本
>
>   
>
>   ```
>   {
>     path: '/user/:id',
>     components: {
>       default: UserProfile,
>       a: UserDetails,
>       b: UserPosts
>     }
>   }
>   ```
>
> ### 总结
>
> - **合理性**：在一个组件中使用多个 `<router-view>` 是完全合理的，并且是处理复杂布局和嵌套路由的有效方式。
> - **灵活性**：通过给 `<router-view>` 设置名字，你可以更灵活地控制不同部分的内容展示。
> - **应用场景**：适用于需要在同一个页面的不同区域根据路由变化展示不同内容的场景，比如具有固定头部和侧边栏的应用布局，其中主体内容和某些特定区域随路由改变而更新。
>
> 这种方法使得你的应用更加模块化和易于维护，同时也提高了代码的可读性和复用性。

![image-20250315120939853](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315120940182.png)



- 我们希望路由跳转之后的返回保持原有状态，但是路由跳转组件会销毁，此时我们希望保证组件存活
- 在路由路口中可以include自由选择特定组件是否保存，标识组件需要在原组件中export name进行特定标识。注意，这和import得到的组件有不同的含义（它更像是一个组件对象）

#### p88

- babel 进行语法降级
- router 默认搭建route规则配置
- css 自由选择less样式
- lint 进行语法规范

![image-20250315122923516](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315122923822.png)

![image-20250315134210760](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315134210972.png)



![image-20250315134249909](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315134250308.png)

![image-20250315134442513](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315134442738.png)

> [!IMPORTANT] 
>
> vue创建工程的时候添加了lint，但是后悔了想要取消怎么办？
>
> ![image-20250315134953820](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315135049918.png)

#### p91

- 常规下我们的组件和数据是绑定的，如果需要其他组件使用组件数据需要进行组件的通信，但是如果是多组件共享的数据呢？此时我们使用vuex

![image-20250315135406550](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315135406767.png)



![image-20250315142303456](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315142303817.png)

![image-20250315142405062](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315142405410.png)

![image-20250315142443397](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315142443712.png)

![image-20250315143328934](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315143329381.png)

![image-20250315143741108](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315143741319.png)

- 回顾我们的组件元素，data数据，computed数据分析，methods方法，watch数据监听

![image-20250315144040542](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315144040923.png)

- 在我们的组件元素中，我们知道scoped会添加hash class，该class深递归给每个子组件

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    val: 100
  },
  mutations: {
    add(state) {
      state.val++
    },
    sub(state) {
      state.val--
    }
  }
})

export default store
```

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
Vue.config.productionTip = false;



new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')

```

```js
<template>
  <div class="p">
    <span>val: {{ $store.state.val }}</span>
    <MySon1></MySon1>
    <MySon2></MySon2>
  </div>
</template>

<script>
import MySon1 from "./components/MySon1.vue";
import MySon2 from "./components/MySon2.vue";
export default {
  components: {
    MySon1,
    MySon2,
  },
};
</script>

<style lang="less" scoped>
.p {
  text-align: center;
  width: 300px;
  height: 300px;
  border: 1px black solid;
  margin: 100px auto;
}
</style>
```

```js
<template>
  <div>
    <span>val: {{ $store.state.val }}</span>
    <br />
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$store.commit("add");
    },
  },
};
</script>

<style lang="less" scoped>
div {
  width: 100px;
  height: 100px;
  border: 1px black solid;
  margin: 10px auto;
}
</style>
```

```js
<template>
  <div>
    <span>val: {{ $store.state.val }}</span>
    <br />
    <button @click="sub">-1</button>
  </div>
</template>

<script>
export default {
  methods: {
    sub() {
      this.$store.commit("sub");
    },
  },
};
</script>

<style lang="less" scoped>
div {
  width: 100px;
  height: 100px;
  border: 1px black solid;
  margin: 10px auto;
}
</style>
```

![image-20250315144500617](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315144500812.png)

- 提交参数只能有一个，想要提交多个传对象

![image-20250315150439022](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315150439378.png)

> [!IMPORTANT]
>
> 当你使用扩展运算符 `...` 应用于一个对象，比如 `stu`，在支持扩展运算符的上下文中（例如，在创建新对象时），它会“展开”该对象的所有可枚举属性。这意味着它会复制对象的自有可枚举属性到新的对象中。
>
> 假设你有如下对象：
>
> javascript
>
> 浅色版本
>
> 
>
> ```
> const stu = {name: 'aaa', age: 18};
> ```
>
> ### 在对象字面量中使用扩展运算符
>
> 如果你在一个新的对象字面量中使用扩展运算符来展开 `stu` 对象，例如：
>
> javascript
>
> 浅色版本
>
> 
>
> ```
> const newStu = {...stu};
> ```
>
> 此时，`newStu` 将是一个具有相同属性的新对象：
>
> javascript
>
> 浅色版本
>
> 
>
> ```
> console.log(newStu); // 输出: {name: 'aaa', age: 18}
> ```
>
> 这里，`newStu` 是 `stu` 的一个浅拷贝。这意味着如果 `stu` 中包含对象或数组等引用类型的数据，那么 `newStu` 和 `stu` 将共享这些引用。
>
> ### 独立使用扩展运算符
>
> 值得注意的是，扩展运算符不能单独使用或者在不支持其语法的地方直接使用。也就是说，下面这样的用法是错误的，并且会导致语法错误：
>
> javascript
>
> 浅色版本
>
> 
>
> ```
> // 错误示例
> const result = ...stu; // 这行代码将导致语法错误
> ```
>
> 扩展运算符只能在特定的上下文中使用，如构建数组或对象字面量、函数调用时传参等。例如：
>
> - **构建对象**：如上所示，可以用来快速复制对象或合并多个对象。
> - **构建数组**：可以在数组字面量中展开另一个数组。
> - **函数调用**：可以将数组展开为函数参数列表。
>
> 所以，简单来说，`...stu` 并不是一个可以直接得到返回值的操作，而是需要在特定的语法环境中使用，比如创建一个新的对象或数组时，它能够帮助你快速地复制或合并数据。在对象字面量中使用 `{...stu}` 才能正确地生成一个新的对象，其包含了 `stu` 对象的所有自有可枚举属性。
>
> 
>
> 但是请注意，当你将其通过扩展运算符 `...` 应用到组件的 `computed` 属性中时，Vue 和 Vuex 会自动处理好状态的访问逻辑，使得你可以在模板中直接使用 `this.val` 访问到 Vuex store 中的 `state.val` 值。

![image-20250315151104462](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315151104832.png)

![image-20250315151242488](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315151242882.png)

- 我们发现，actions只是进行异步的请求，具体的数据修改依旧需要在mutations中修改state数据

![image-20250315151846477](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315151846719.png)

- 和mutation传参规则同理，只能传递最多一个参数

![image-20250315153109354](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315153109697.png)

- data==state computed==getters methods=mutations 当然存在一些不同

- 问题出现了，组件特有的watch和vuex特有的actions为什么没有同步呢？等效的模块之间有存在什么差异呢？
- watch->监听事件变化，回顾之前的实时翻译，其实我们完全可以通过监听器实现更加底层的数据变化的，这样看来watch并非必要，尤其是我们遵循了单向数据流的情况下，数据的改动是可控的
- actions实现的异步操作在组件中可以在methods实现，vuex的mutations方法必须要是同步的，因此添加了actions
- data和state都是存储数据的功能，computed和getters都是对于数据的分析获取，但是computed有更强大的拓展set功能
- 总而言之set拓展是情分，没有要你自个维护是本分



- 展示了vuex的state，mutations，actions，getters之后，我们需要考虑的vuex数据在大型项目中难道全部在state嘛？我们需要分模块
- 模块之间拥有独立的state，getters等

![image-20250315153448989](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315153449305.png)

![image-20250315153543396](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315153543746.png)



- 在mapState中进行映射时为了防止模块之间的命名污染，请给模块添加命名空间

![image-20250315154458242](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315154458492.png)

![image-20250315154536748](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315154537068.png)

![image-20250315154638147](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315154638467.png)

- 在actions内部实现mutations方法调用，context上下文在本模块内，不需要添加模块名前缀
- 我们说的虽然分模块但还是挂载到了根级别的state，指的是将模块名和state作为一个对象存在了根state中，因此我们在通过this.store.state时需要先找模块名再找属性值，如```this.$store.state.user.userInfo.age```
- 但是对于actions，getters，mutations方法来说，默认不开启命名空间，所有模块的该类对象方法全部在根对象中，也就是```this.$store.commit("addAge", 10);```   ```{{ this.$store.getters["getAge"] }}```
- 当我们开启了命名空间之后其实是给每个方法添加了模块名\的前缀，特殊字符\导致我们只能['']形式访问

## CH07

![image-20250315162236344](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315162236696.png)

#### p107

- vant2移动端的网页组件库（vant3，4支持vue3）

![image-20250315164934186](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315164934429.png)

![image-20250315165710224](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315165710547.png)

![image-20250315170229659](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315170229970.png)



- 具体参见链接([Vant 2 - 轻量、可靠的移动端组件库](https://youzan.github.io/vant/v2/?ref=browsee.io#/zh-CN/quickstart))

![image-20250315170700571](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315170700911.png)

- 同样使用vant官方文档获取更多信息，标准屏使用375px，vw进行放大缩小自动适配

#### p109

![image-20250315171308799](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315171309048.png)

![image-20250315172512004](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315172512249.png)

![image-20250315172452166](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315172452538.png)

![image-20250315172935351](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315172935696.png)



- axios具体信息参见[Axios中文网](https://www.axios-http.cn/docs/intro)

![image-20250315173334636](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315173334871.png)

![image-20250315173453417](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315173453804.png)

![image-20250315173721357](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315173721652.png)

![image-20250315174555871](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315174556106.png)

![image-20250315174834208](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315174834602.png)

![image-20250315175449941](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315175450442.png)

![image-20250315175922219](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315175922461.png)



![image-20250315180124306](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315180124520.png)

![image-20250315181140915](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315181141353.png)

![image-20250315200958418](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315200958677.png)

![image-20250315201054517](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315201054881.png)

![image-20250315201159019](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315201159387.png)

## CH08

#### p141

![image-20250315201544762](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315201544972.png)

![image-20250315201709099](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315201709493.png)



![image-20250315203712394](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315203712643.png)

![image-20250315204623292](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315204623535.png)

```js
<!-- <script>
export default{
  setup(){
    const message = 'hello Vue3';
    const logMessage = ()=>{
      console.log(message);
    }
    return {
      message,
      logMessage
    }
  }
}
</script> -->
<script setup>
  const message="Hello setup";
  const logMessage = ()=>{
    console.log(message);
  }
</script>

<template>
  {{ message }}
  <button @click="logMessage"></button>
</template>

<style scoped>

</style>
```

![image-20250315204852380](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315204852768.png)





- setup是我们组合式api的入口，通过于此进行数据函数的书写

![image-20250315204948002](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315204948344.png)

- reactive接收对象类型的数据返回响应式数据

- ref可以接收对象数据或者简单数据并且返回一个对象，响应数据在成员value中，template只需要写对象，自动解析value，加上了value反而访问不到

![image-20250315210915789](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315210916145.png)



```js
<script setup>
import { reactive, ref } from 'vue'
const state = ref("Hello setup")
</script>

<template>
  {{ state.message }}
  <input type="text" v-model="state.value">
</template>

<style scoped></style>
```

![image-20250315211506063](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315211506485.png)

![image-20250315211627153](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315211627642.png)

![image-20250315211644167](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315211644533.png)



- 此处注意的是，我们监视的是ref对象而非ref.value
- 监视多个数据其中一个变量变化的时候便会触发回调
- 如果监视对象中的某个属性呢？此时跨越了value的界面，如stu.name 我们写成```watch(()=>stu.name,(new,old)=>{console.log(new,old)})```格式进行监听

![image-20250315212318096](C:\Users\alan\AppData\Roaming\Typora\typora-user-images\image-20250315212318096.png)

![image-20250315213133172](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315213133696.png)

> [!IMPORTANT]
>
> <script setup> 是 Vue 3.2 中引入的一个编译时语法糖，旨在简化组合式 API（Composition API）的使用方式，使得在单文件组件（SFC, Single File Component）中使用 Composition API 更加直观和简洁。
>
> 以下是 `<script setup>` 的一些关键作用：
>
> 1. **简化导入**：在普通 Composition API 中，你需要通过 `export default` 来暴露组件选项。而在 `<script setup>` 中，所有顶级的绑定（包括变量、函数等）都会自动暴露给模板，无需手动导出。
> 2. **提升开发体验**：由于其更加直接的语法形式，它能够提供更好的类型推断支持，尤其是在使用 TypeScript 时，可以带来更流畅的开发体验。
> 3. **提高性能**：`<script setup>` 在编译时会被转换成普通的 JavaScript 函数调用，这样可以减少运行时的开销，并且因为避免了 Vue 的响应式系统的一些额外处理，理论上可以生成更高效的代码。
> 4. **增强可读性**：它使得逻辑复用代码块更容易组织和理解。比如你可以更容易地将逻辑相关的代码放在同一个地方，而不是分散在不同的选项（如 `data`, `methods`, `computed` 等）里。
> 5. **更好地支持工具化**：因为它的结构更为扁平和直接，对构建工具（如 Vite）、编辑器插件等的支持也更好，有助于实现更好的语法检查、自动补全等功能。
>
> 使用 `<script setup>` 需要确保你的项目配置正确支持这一特性。对于大多数现代 Vue 3 项目，特别是那些基于 Vite 构建的项目，这个功能是默认启用的。如果你正在使用 Vue CLI 或其他构建工具，则可能需要确认或调整相关配置以确保兼容性。

- 在添加了setup语法糖之后，在setup，即beforeCreate的代码逻辑直接在script调用
- 顶级变量和函数会自动的暴露给模板，我说的是data，methods，computed，以便给组件模板使用
- setup是把顶级的computed，变量函数作为外部暴露的数据

> [!IMPORTANT]
>
> 在 Vue 组件中，通过 `export default` 定义组件选项时，哪些会被暴露（即可以在模板中使用）和哪些不会，取决于它们的类型和用途。以下是一些基本的原则：
>
> ### 会暴露给模板的
>
> 1. **`data` 返回的对象属性**：这些是响应式的，并且可以在模板中直接访问。例如：
>
>    javascript
>
>    浅色版本
>
>    
>
>    ```
>    export default {
>      data() {
>        return {
>          message: 'Hello Vue!'
>        }
>      }
>    }
>    ```
>
>    在这个例子中，`message` 可以在模板中使用，如 `<p>{{ message }}</p>`。
>
> 2. **计算属性 (`computed`)**：定义的计算属性也会暴露给模板，并且可以根据依赖的数据自动更新。
>
>    javascript
>
>    浅色版本
>
>    
>
>    ```
>    export default {
>      computed: {
>        reversedMessage() {
>          return this.message.split('').reverse().join('');
>        }
>      }
>    }
>    ```
>
> 3. **方法 (`methods`)**：定义的方法可以被直接调用或绑定到事件上。
>
>    javascript
>
>    浅色版本
>
>    
>
>    ```
>    export default {
>      methods: {
>        greet() {
>          alert('Hello!');
>        }
>      }
>    }
>    ```
>
> 4. **`props`**：父组件传递给子组件的数据也会暴露给模板，允许子组件接收并使用这些数据。
>
> ### 不会暴露给模板的
>
> 1. **生命周期钩子**（如 `mounted`, `created` 等）：这些是用来指定组件在其生命周期的不同阶段执行特定逻辑的钩子函数，并不提供任何可供模板使用的功能或属性。
> 2. **内部变量和函数**：如果在组件选项外部声明了变量或函数，这些是不会自动暴露给模板的。例如，在 `export default` 外部声明的普通变量或函数需要通过适当的方式（如作为 `data`、`computed` 或 `methods` 的一部分）引入到组件选项内才能在模板中使用。
>
> 总结来说，Vue 中可以通过 `export default` 暴露给模板的内容主要是那些明确声明为 `data`、`computed`、`methods` 或者 `props` 的部分。而生命周期钩子和其他仅用于组织代码结构或实现某些逻辑的内部变量和函数则不会暴露给模板，它们的作用是控制组件的行为和逻辑流程。

![image-20250315214850444](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315214851048.png)

- 首先我vue2的methods呢？哦，直接是顶级的函数了
- 我的components呢？如何使用子组件呢？直接导入不用注册，喜
- 我的props呢？用了setup语法糖，这可怎么办啊？defineProps，而且template也是直接使用变量名
- 我的this呢？不然我该如何获取router，store，emit？defineEmits(Array<String>),还要规定emit的方法范围！
- 没有this，我的ref（dom标签引用获取也没有了啊！）创建ref对象，对象名作为标签标识

![image-20250315215610893](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315215611335.png)

![image-20250315215648655](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315215649174.png)

![image-20250315220050988](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250315220051270.png)

- 首先我们需要声明的是script获得ref但不能立即使用（比如获取焦点），因为此时还没有dom加载完全，可以在onMounted中进行初始化的工作
- 虽然组件中script setup暴露顶级data，methods，但是给模板使用，如果是父组件需要defineExpose暴露

```js
<script setup>
import { onMounted, ref } from 'vue'
const val = 100
const refBox = ref(null)
console.log(refBox.value)
onMounted(() => {

})
defineExpose({
  val
})
</script>

<template>
  <div class="son" ref="refBox"></div>
</template>

<style scoped>
.son {
  width: 100px;
  height: 100px;
  background-color: pink;
}
</style>
```

```js
<script setup>
import MySon from './components/MyBox.vue'
import { onMounted, ref } from 'vue'
const refBox = ref(null)

onMounted(() => {
  console.log(refBox.value.val)
})

</script>

<template>
  <div class="par">
    <MySon ref="refBox"></MySon>
  </div>
</template>

<style scoped>
.par {
  width: 300px;
  height: 300px;
  background-color: skyblue;
}
</style>
```

#### p150

![image-20250316090807249](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250316090807464.png)



![image-20250316090826450](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250316090826873.png)

- 传递消息方法好！
- 细丝极恐？ref不是给dom获取标签吗？现在又集成了构造ref响应式数据的功能了！
- 传递消息需要响应式，那么需要传递的是响应式对象
- 需要修改传递过来的数据，那么把修改数据的方法也传递过去
- 传递过去的响应式数据ref不需要解开为ref.value

```js
<script setup>
import MySon from './components/MyBox.vue'
import { provide } from 'vue'

provide('theme-color', '#555')


</script>

<template>
  <div class="par">
    <MySon></MySon>
  </div>
</template>

<style scoped>
.par {
  width: 300px;
  height: 300px;
  background-color: skyblue;
}
</style>
```

```js
<script setup>
import { inject, onMounted, ref } from 'vue'
const refBox = ref(null)
onMounted(() => {
  refBox.value.style.backgroundColor = inject('theme-color')
})


</script>

<template>
  <div class="son" ref="refBox"></div>
</template>

<style scoped>
.son {
  width: 100px;
  height: 100px;
  background-color: pink;
}
</style>
```

![image-20250316092011030](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250316092011388.png)

![image-20250316092123974](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250316092124249.png)

![image-20250316092135746](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250316092136095.png)

![image-20250316092523419](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250316092523676.png)

![image-20250316092717636](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250316092718081.png)

![image-20250316092735127](https://gitee.com/alan0925/typora-alan0925/raw/master/image/20250316092735536.png)

- 试验性质特性，但是现在貌似可以直接使用了，v-model通过defineModel接收可以直接使用修改

#### p153

- pinia进行函数useCountStore的暴露给组件使用
- 直接import使用，否则直接解构import导致响应式数据丢失，使用storeToRefs。因为导入的store是reactive得到的响应式对象，解构丢失了内部的响应功能元素
- 总结 const {cnt} = storeToRefs(useCountStore),但是action不需要进行响应处理，解构可以直接const {addCnt}=useCountStor