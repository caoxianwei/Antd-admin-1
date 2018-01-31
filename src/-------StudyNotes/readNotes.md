## react总结

参考资料：

+ [the-road-to-learn-react]()
+ [深入react技术栈]()


### small tips
```
* 通过 children 和可复用组件来组合组件

```
### 笔记

+ 高阶函数/高阶组件
```javascript
//一个筛选的例子
在 map 映射列表之前，插入一个过滤的方法。这个过滤方
法将只会匹配标题属性中有 searchTerm 内容的列表项

//可以考虑需要传递 searchTerm 到过滤函数并返回一个新
//函数来根据条件求值，即高阶函数
function isSearched(searchTerm) {
    return function(item) {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
}
//使用：
{this.state.list.filter(isSearched(this.state.searchTerm)).map(item =>
...
)}

/*include说明*/
// ES5
string.indexOf(pattern) !== -1
// ES6
string.includes(pattern)

//es6写法
const isSearched = searchTerm => item =>
item.title.toLowerCase().includes(searchTerm.toLowerCase());
```

+ 受控组件

表单元素比如 `<input>`, `<textarea>` 和 `<select>` 会以原生 HTML 的形式保存他们自己的状态。一旦有人从外部做了一些修改，它们就会修改内部的值，在 React 中这被称为不受控组件，因为它们自己处理状态。在 React 中，你应该确保这些元素变为`受控组件`。
