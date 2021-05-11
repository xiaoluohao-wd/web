<template>
 <div>
   <el-card>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">学术会议申请</el-menu-item>
        <el-menu-item index="2" ></el-menu-item>
      </el-menu>
   </el-card>
   
 </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex:'1'
    };
  },

  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex=key
    },
  },

  components: {},

  computed: {},

}

</script>
<style lang="less" scoped>
</style>