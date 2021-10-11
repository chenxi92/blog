#### **TypeScript**和**Lua**排序算法比较


###### 1.1  `javaScript sort`

**默认按照字符编码的顺序进行排序**

**升序**

```

array.sort(function(a, b) {
    return a - b;
})
```

**降序**

```
array.sort(function(a, b) {
    return b - a;
})
```

###### 1.2 `lua sort`

**默认以小于进行排序**

**升序**

```
table.sort((a, b){
    return a < b;
});
```

**降序**


```
table.sort((a, b){
    return a > b;
});
```


