<template>
  <el-button :type="getType" :icon="getIcon" @click='clickMe' :disabled='disabled' size="medium">{{value}}</el-button>
</template>

<script>
  export default {
    data() {
      return {
        flag: false,
        RMSLIST: []
      }
    },
    props: {
      // 显示文字
      value: {
        default: ''
      },
      // 按钮类型
      type: {
        default: ''
      },
      // 图标
      icon: {
        default: ''
      },
      disabled: {
        default: false
      },
      rms: {
        default: null
      }
    },
    created() {
      this.testRMS()
    },
    watch: {
      rms(val) {
        this.testRMS()
      }
    },
    methods: {
      clickMe (e) {
        this.$emit('click', e)
      },
      testRMS() {
        this.flag = true
        return
        if (this.rms === null) {
          this.flag = true
          return
        }
        if (Array.isArray(this.rms)) {
          for (let i = 0; i < this.rms.length; i++) {
            let str = this.rms[i]
            if (this.RMSLIST.indexOf(str) !== -1) {
              this.flag = true
              return
            }
          }
          this.flag = false
          return
        }
        if (this.RMSLIST.indexOf(this.rms) !== -1) {
          this.flag = true
        } else {
          this.flag = false
        }
      }
    },
    computed: {
      // 待开发。。。
      getIcon () {
        let icon = this.icon
        let iconText = ''
        switch (icon) {
          case 'edit':
            iconText = 'el-icon-edit'
            break
          case 'delete':
            iconText = 'el-icon-delete'
            break
          case 'search':
            iconText = 'el-icon-search'
            break
          default:
            iconText = ''
            break
        }
        return iconText
      },
      getType () {
        let type = this.type
        let typeText = ''
        switch (type) {
          case 'main':
            typeText = 'primary'
            break
          case 'success':
            typeText = 'success'
            break
          case 'info':
            typeText = 'info'
            break
          case 'error':
            typeText = 'danger'
            break
          case 'warn':
            typeText = 'danger'
            break
          default:
            typeText = 'primary'
            break
        }
        return typeText
      }
    }
  }

</script>

<style lang='less'>
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
    color: #fff;
    background-color: #f3d19e!important;
    border-color: #f3d19e!important;
  }
  // .app-disabled{
  //   cursor: not-allowed!important;
  //   color: #bfcbd9!important;
  //   background: #eef1f6!important;
  //   &:hover{
  //     background: #eef1f6!important;
  //   }
  // }
  // .app-button{
  //   display: inline-block;
  //   height: 24px;
  //   line-height: 24px;
  //   padding: 0 10px;
  //   font-size: 12px;
  //   background-color: #089F48;
  //   color: #FFF;
  //   border-radius: 12px;
  //   cursor: pointer;
  //   &:hover{
  //   }
  //   span{
  //     vertical-align: middle;
  //     margin-left: 1px;
  //     font-size: 14px;
  //   }
  // }
  // .app-button-text{
  //   background-color: #FFF;
  //   color: #089F48;
  //   &:hover{
  //   }
  // }

</style>
