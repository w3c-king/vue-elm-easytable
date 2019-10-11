<template>
  <div>
    <easy-table :data='tableData'/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: {
        head: [{
          key: 'state1',
          value: 'state1'
        }, {
          key: 'state2',
          value: 'state2'
        }, {
          key: 'state3',
          value: 'state3'
        }, {
          key: 'state4',
          value: 'state4'
        }, {
          key: 'state5',
          value: 'state5'
        }, {
          key: 'buttons',
          value: '操作',
          children: [{
            key: 'modifyBtn'
          }, {
            key: 'removeBtn'
          }]
        }],
        body: [],
        config: {
          pageSize: 10,
          currentPage: 1,
          border: true,
          total: 1,
          cover: true,
          radio: false,
          select: false,
          http: {
            data: {},
            callback (data) {},
            url: ''
          }
        }
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let data = []
      for (let i = 0; i < 5; i++) {
        data.push({
          state1: '',
          state2: '数据2',
          state3: '数据3',
          state4: '数据4',
          state5: '数据5',
          modifyBtn: '修改',
          removeBtn: '删除',
          bodyConfig: [{
            type: 'button',
            position: [{
              key: 'modifyBtn',
              type: 'primary',
              click (row) {
                alert('update')
              }
            }, {
              key: 'removeBtn',
              type: 'danger',
              click (row) {
                alert('remove')
              }
            }]
          }, {
            type: 'hover',
            position: ['state2']
          }, {
            type: 'select',
            position: [{
              key: 'state1',
              data: [],
              // 下拉选中改变
              change (val) {
                console.log(val)
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
          }]
        })
      }
      this.tableData.body = data
      this.tableData.config.total = data.length
    }
  }
}
</script>
<style lang="less">
</style>
