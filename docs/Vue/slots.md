## Slots 用法



### 基础用法

通过 `<slot>` 标签来定义插槽， 可以通过 `name` 属性来定义具名插槽， 默认插槽是 default



#### 完整代码

##### AppButton.vue

```vue
<template>
  <button class="app-button" v-on="$attrs">
    <slot></slot>
  </button>
</template>

<style scoped>
.app-button {
  margin: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: rgb(39, 224, 163);
  color: white;
  font-size: 20px;
}
</style>
```

##### App.vue

```vue
<template>
    <AppButton>press me</AppButton>
</template>

<script>
import AppButton from './components/AppButton.vue'

  export default {
  name: 'App',
  components: {
    AppButton
  }
}
</script>
```



### 事件传递

子控件通过 `v-on="$attrs"` 来传递点击事件，父控价通过 `@click="xxx"` 来响应点击事件。



#### 完整代码

##### AppButton.vue

```vue
<template>
  <button class="app-button" v-on="$attrs">
    <slot></slot>
  </button>
</template>

<style scoped>
.app-button {
  margin: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: rgb(39, 224, 163);
  color: white;
  font-size: 20px;
}
</style>
```

##### App.vue

```vue
<template>
    <AppButton @click="log">press me</AppButton>
</template>

<script>
import AppButton from './components/AppButton.vue'

  export default {
  name: 'App',
  components: {
    AppButton
  },
  methods: {
    log() {
      console.log('clicked');
    }
  }
}
</script>
```





### 传递数据到父控件 - Function

通过提供一个带函数类型的 props， 把数据传递给父控件

```vue
{{ secondrow(item) }}

props: {
  secondrow: {
    type: Function,
    default: () => {}
  }
}

<AppUserList :secondrow="user => user.email"></AppUserList>
```



#### 完整代码

##### AppUserList.vue

```vue
<template>
  <section>
    <slot name="title">Users</slot>
    <ul class="userlist" v-if="state === 'loaded'">
      <li v-for="item in data.results" :key="item.email">
        <div class="list-item">
          <img width="48" height="48" :src="item.picture.large" :alt="item.name.first + ' ' + item.name.last" />
          <div class="text">
            <div> {{ item.name.first }}</div>
            <slot></slot>
            {{ secondrow(item) }}
          </div>
        </div>
      </li>
    </ul>
    <slot v-if="state === 'loading'" name="loading">
      loading...
    </slot>
    <slot v-if="state === 'failed'" name="error">
      Oops, something went wrong.
    </slot>
  </section>
</template>

<script>
const states = {
  idle: "idle",
  loading: "loading",
  loaded: "loaded",
  failed: "failed"
}
export default {
  props: {
    secondrow: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      state: 'idle',
      error: undefined,
      data: undefined,
      states
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.state = "loading";
      this.error = undefined;
      this.data = undefined;
      try {
        setTimeout(async() => {
          const response = await fetch("https://randomuser.me/api/?results=5");
          const json = await response.json();
          console.log("data = ", json);
          this.state = "loaded";
          this.data = json;
          return response;
        }, 1000);
      } catch(error) {
        this.state = "failed"
        this.error = error;
        console.log("--- error: ", error);
        return error;
      }
    }
  }
}
</script>

<style scoped>
.userlist li {
  display: inline;
}
.list-item {
  display: inline;
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}
.text {
  font-weight: bold;
  font-size: 19px;
  display: block;
  margin-left: 20px;
  text-align: left;
}
</style>
```



##### App.vue

```vue
<template>
  <AppUserList :secondrow="user => user.email"></AppUserList>
</template>

<script>
import AppUserList from '@/components/AppUserList'

export default {
  name: 'App',
  components: {
    AppUserList
  }
}
</script>
```



### 传递数据到父控件 - Scoped Slot

使用 `Scoped Slot` 将数据传递给父控件

```vue
<slot name="secondrow" :item="item"></slot>

<AppUserList>
  <template #secondrow="slotProps">
    <a :href="'tel:' + slotProps.item.phone">
      {{ slotProps.item.phone}}
    </a> 
    <a :href="'mailto:' + slotProps.item.email">
      {{ slotProps.item.email}}
    </a>
  </template>
</AppUserList>
```



#### 完整代码

##### AppUserList.vue

```vue
<template>
  <section>
    <slot name="title">Users</slot>
    <ul class="userlist" v-if="state === 'loaded'">
      <li v-for="item in data.results" :key="item.email">
        <div class="list-item">
          <img width="48" height="48" :src="item.picture.large" :alt="item.name.first + ' ' + item.name.last" />
          <div class="text">
            <div> {{ item.name.first }}</div>
            <slot name="secondrow" :item="item"></slot>
          </div>
        </div>
      </li>
    </ul>
    <slot v-if="state === 'loading'" name="loading">
      loading...
    </slot>
    <slot v-if="state === 'failed'" name="error">
      Oops, something went wrong.
    </slot>
  </section>
</template>

<script>
const states = {
  idle: "idle",
  loading: "loading",
  loaded: "loaded",
  failed: "failed"
}
export default {
  data() {
    return {
      state: 'idle',
      error: undefined,
      data: undefined,
      states
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.state = "loading";
      this.error = undefined;
      this.data = undefined;
      try {
        setTimeout(async() => {
          const response = await fetch("https://randomuser.me/api/?results=5");
          const json = await response.json();
          console.log("data = ", json);
          this.state = "loaded";
          this.data = json;
          return response;
        }, 1000);
      } catch(error) {
        this.state = "failed"
        this.error = error;
        console.log("--- error: ", error);
        return error;
      }
    }
  }
}
</script>

<style scoped>
.userlist li {
  height: auto;
  display: inline;
}
.list-item {
  display: inline;
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}
.text {
  font-weight: bold;
  font-size: 19px;
  display: block;
  margin-left: 20px;
  text-align: left;
}
</style>
```



##### App.vue

```vue
<template>
  <AppUserList>
    <template #secondrow="slotProps">
      <a :href="'tel:' + slotProps.item.phone">
        {{ slotProps.item.phone}}
      </a> 
      <a :href="'mailto:' + slotProps.item.email">
        {{ slotProps.item.email}}
      </a>
    </template>
  </AppUserList>
</template>

<script>
import AppUserList from '@/components/AppUserList'

export default {
  name: 'App',
  components: {
    AppUserList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```



### 传递方法到Slot

通过给Slot绑定一个函数， 使父控件可以传递事件到Slot



#### 完整代码

##### AppUserList.vue

```vue
<template>
  <section>
    <slot name="title">Users</slot>
    <ul class="userlist" v-if="state === 'loaded'">
      <li v-for="item in data.results" :key="item.email">
        <div class="list-item">
          <img width="48" height="48" :src="item.picture.large" :alt="item.name.first + ' ' + item.name.last" />
          <div class="text">
            <div> {{ item.name.first }}</div>
            <slot name="secondrow" :item="item" :remove="remove"></slot>
          </div>
        </div>
      </li>
    </ul>
    <slot v-if="state === 'loading'" name="loading">
      loading...
    </slot>
    <slot v-if="state === 'failed'" name="error">
      Oops, something went wrong.
    </slot>
  </section>
</template>

<script>
const states = {
  idle: "idle",
  loading: "loading",
  loaded: "loaded",
  failed: "failed"
}
export default {
  data() {
    return {
      state: 'idle',
      error: undefined,
      data: undefined,
      states
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.state = "loading";
      this.error = undefined;
      this.data = undefined;
      try {
        setTimeout(async() => {
          const response = await fetch("https://randomuser.me/api/?results=5");
          const json = await response.json();
          console.log("data = ", json);
          this.state = "loaded";
          this.data = json;
          return response;
        }, 1000);
      } catch(error) {
        this.state = "failed"
        this.error = error;
        console.log("--- error: ", error);
        return error;
      }
    },
    remove(item) {
      this.data.results = this.data.results.filter((entry) => {
        return entry.email !== item.email;
      });
    }
  }
}
</script>

<style scoped>
.userlist li {
  height: auto;
  display: inline;
}
.list-item {
  display: inline;
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}
.text {
  font-weight: bold;
  font-size: 19px;
  display: block;
  margin-left: 20px;
  text-align: left;
}
</style>
```



##### App.vue

```vue
<template>
  <AppUserList>
    <template #secondrow="{remove, item: user}">
      <AppButton @click="remove(user)">{{ user.name.first }}</AppButton>
    </template>
  </AppUserList>
</template>

<script>
import AppButton from './components/AppButton.vue'
import AppUserList from '@/components/AppUserList'

export default {
  name: 'App',
  components: {
    AppButton,
    AppUserList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

