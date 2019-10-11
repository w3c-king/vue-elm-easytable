<html>
    <h2 style='text-align:center;'>app-Table表格组件文档 - LJB</h2>
</html>

#### 基本使用

```
<template>
    <app-table :data='tableData'></app-table>
</template>
<script>
  export default {
    data () {
      return {
        tableData: {
            // 表头数据
          head: [{
            key: 'key1',
            value: '显示的文字'
          }, {
            key: 'key2',
            value: '显示的文字'
          }],
          // 表数据
          body: [{
            key: '显示数据',
            // 当前行配置,body中每个元素都有一个bodyConfig用于配置当前行控件类型以及自定义配置,稍后单独介绍
            bodyConfig: []
          }],
          // 多选数据存放
          select: [],
          // 表格配置
          config: {
            // 每页记录数
            pageSize: 10,
            // 当前页,默认为1
            currentPage: 1,
            // 是否存在边框,默认显示
            border: true,
            // 总记录数
            total: 0,
            // 单选功能(点击行高亮)
            radio: true,
            // 是否存在复选框
            select: true,
            // 分页请求配置
            http: {
                // 请求参数
                data: {},
                // 请求回调
                callback (data) {},
                // 请求url
                url: ''
            }
          }
        }
      }
    }
  }
</script>
```
<html>
    <h4 style='text-align:center;'>bodyConfig介绍</h4>
</html>

##### 下拉框
```
{
  type: 'select',
  position: [{
    key: 'key',
    // 下拉数据
    data: [],
    // change下拉框改变事件
    change (val, row, item) {
      // TODO...
    },
    // 远程搜索
    httpSearch: false,
    // 远程搜索实现
    callback (val, positionObj) {
      setTimeout(() => {
        positionObj.data = [{
          label: '111',
          value: '222'
        }, {
          label: '333',
          value: '444'
        }]
      }, 1000)
    }
  }]
}
```
#### 输入框
```
{
  type: 'input',
  position: [{
    key: '',
    change (val, row, item) {
      // todo...
    }
  }]
}

```

##### buttons
```
// TODO...
```
