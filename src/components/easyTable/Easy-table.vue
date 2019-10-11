<!--
  * 表格组件
  * email : admin@w3c.top
-->
<template>
  <div class="app-table2">
    <el-table
      :data="tableData.body"
      border
    >
      <el-table-column
        v-for='item of tableData.head'
        :label='item.value'
        :key='item.key'
        :width="getTdWidth(item)">
        <template slot-scope="scope">
          <template v-if='item.key === "buttons"'>
            <!-- <app-button 
            /> -->
            <el-button type="primary"
              v-for='temp of item.children'
              :type='getBtnType(scope.row, temp)'
              :key='temp.key'
              @click='btnClick(scope.row, temp)'>{{scope.row[temp.key]}}</el-button>
          </template>
          <el-popover trigger="hover" placement="top" v-else-if='testTextHover(scope.row, item)' :open-delay='1000'>
            <div v-html='scope.row[item.key]' class='app-table-tips'></div>
            <div slot="reference" class="name-wrapper">
              <span>{{scope.row[item.key]}}</span>
            </div>
          </el-popover>
          <el-select
            v-model="scope.row[item.key]"
            filterable
            clearable
            :remote='testSelectRemote(scope.row, item)'
            placeholder="请选择"
            :remote-method='selectRemoteMethod(scope.row, item)'
            v-else-if='testSelect(scope.row, item)'
            @input='selectEventChange(scope.row, item)'>
            <template v-for='temp of scope.row.bodyConfig' v-if='temp.type === "select"'>
              <template v-for='position of temp.position'>
                <el-option
                  v-for="item2 in position.data"
                  :key="item2.value"
                  :label="item2.label"
                  :value="item2.value"
                  v-if='position.key === item.key'>
                </el-option>
              </template>
            </template>
          </el-select>
          <el-input v-model="scope.row[item.key]" @input="inputEventChange(scope.row, item)" v-else-if='testInput(scope.row, item)' placeholder="请输入内容"></el-input>
          <template v-else>
            {{scope.row[item.key]}}
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class='easy-pagination'
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="data.config.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      ref='paginstion'
      :total="tableData.config.total"
      @current-change="currentChange"
      :current-page.sync="currentPage"
      v-if='tableData.config.noLimit !== true'>
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentPage: this.data.config.http.currentPage
      }
    },
    props: {
      data: {
        default: {}
      }
    },
    methods: {
      inputEventChange (row, item) {
        const temp = this._getPosition_item(row, item, 'input')
        if (typeof temp.change === 'function') temp.change(row[item.key], row, item)
      },
      testInput (row, item) {
        return !this._getPosition_item_isEmpty(row, item, 'input')
      },
      testSelect(row, item) {
        return !this._getPosition_item_isEmpty(row, item, 'select')
      },
      // 分页触发
      currentChange() {
        this.$nextTick(function() {
          let config = this.data.config.http
          config.data.page = this.currentPage
          this.data.config.http.page = this.currentPage
          this.data.config.http.data.pageSize = this.data.config.pageSize
          const pageChange = this.data.config.http.pageChange
          if (typeof pageChange === 'function') {
            const flag = pageChange(this.currentPage, this.data.config.pageSize)
            // 到此为止,前端处理分页
            if (flag === true) return
          }
          let baseIndex = 0
          if (typeof this.data.config.http.baseIndex === 'number') 
            baseIndex = this.data.config.http.baseIndex
          this.$request.post(config.url, config.data, baseIndex).then(data => {
            config.callback(data)
          })
        })
      },
      handleSizeChange (val) {
        this.data.config.pageSize = val
        this.data.setCurrentPage(1)
      },
      // 获取position对象
      _getPosition (row, type) {
        for (const temp of row.bodyConfig) {
          if (temp.type === type) return temp.position
        }
        return []
      },
      _getPosition_item_isEmpty (row, item, type) {
        const temp = this._getPosition_item(row, item, type)
        return Object.keys(temp).length === 0
      },
      _getPosition_item (row, item, type) {
        const position = this._getPosition(row, type)
        for (const temp of position) {
          if (temp.key === item.key) {
            return temp
          }
        }
        return {}
      },
      getBtnType (row, item) {
        return this._getPosition_item(row, item, 'button').type
      },
      btnClick (row, item) {
        const temp = this._getPosition_item(row, item, 'button')
        // on click
        temp.click(row)
      },
      // 纯文本hover
      testTextHover (row, item) {
        const position = this._getPosition(row, 'hover')
        return position.indexOf(item.key) !== -1
      },
      // 每个td宽度
      getTdWidth (item) {
        if (item.width === 0 || item.width === null || item.width === undefined) return ''
        return item.width
      },
      // select change callback
      selectEventChange(row, item) {
        const temp = this._getPosition_item(row, item, 'select')
        if (typeof temp.change === 'function') temp.change(row[item.key], row, item)
      },
      // get select data
      getSelectData (row, item) {
        const temp = this._getPosition_item(row, item, 'select')
        return temp.data
      },
      testSelectRemote (row, item) {
        const temp = this._getPosition_item(row, item, 'select')
        return temp.httpSearch || false
      },
      selectRemoteMethod (row, item) {
        return query => {
          const temp = this._getPosition_item(row, item, 'select')
          if (typeof temp.callback === 'function') temp.callback(query, temp, row, item)
        }
      }
    },
    computed: {
      tableData() {
        if (this.data.config.treeIndex === null || this.data.config.treeIndex === undefined) this.data.config.treeIndex = 1
        let body = this.data.body
        for (let i = 0; i < body.length; i++) {
          let temp = body[i]
          // 不存在bodyConfig默认空数组
          if (temp.bodyConfig === null || temp.bodyConfig === undefined) temp.bodyConfig = []
        }
        return this.data
      }
    },
    mounted () {
      const _this = this
      // 当前页改变事件,此事件默认会自动触发一次查询,可由参数二确定是否不触发查询
      this.data.setCurrentPage = function(currentPage, flag = false) {
        // if (_this.currentPage === currentPage)
        //   _this.data.reload()
        // else
          _this.currentPage = currentPage
          _this.data.reload()
      }
      // 强制刷新表格数据
      this.data.reload = function() {
        let config = _this.data.config.http
        config.data.pageSize = _this.data.config.pageSize
        config.data.page = _this.currentPage
        let baseIndex = 0
        if (typeof _this.data.config.http.baseIndex === 'number')
          baseIndex = _this.data.config.http.baseIndex
        _this.$request.post(config.url, config.data, baseIndex).then(data => {
          config.callback(data)
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  .easy-pagination{
    margin-top: 10px;
  }
</style>
