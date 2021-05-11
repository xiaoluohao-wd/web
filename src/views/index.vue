<template>
     <el-container class="el_container">
        <!-- 头部区域 -->
        <el-header class="el_header">
            <div>
                <span>学会理事管理系统</span>
            </div>
            <div class="useravatar">
              <!-- <img :src="avatar" alt="">
              <span class="username">{{username}}</span> -->
              <el-button type="info" @click="logout">退出</el-button>
            </div>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <el-aside class="el_aside" width="200px">
                   <!-- 侧边栏菜单区域 -->
                <el-menu :router="true"  background-color="#333744" text-color="#fff" active-text-color="#409eff" 
                unique-opened  :collapse-transition="false" :default-active="activepath">
                    <!-- submenu 是一级菜单 -->
                    <el-submenu :index="item.id+''" v-for="item in menulist" :key=item.id>
                        <!-- template是一级菜单的模板区域 -->
                        <template slot="title">
                            <!-- i是菜单的图标 -->
                            <!-- <i :class="iconobj[index]"></i> -->
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item     @click="saveNavState('/index/'+subitem.path)"  :index="'/index/'+subitem.path" 
                        v-for="subitem in item.children" :key=subitem.id>
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{subitem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容区 -->
            <el-main class="el_main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data () {
        return {
        menulist:[
        
        ],
        activepath:'',
        username:"",
        avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        };
    },
    created(){
        this.getMenuList()
    },
    methods: {
 
        //获取用户菜单
        async getMenuList(){
            const res=await this.$http.get('getmenulist')
            if(res.status==200){
                this.menulist=res.data
            }
        },
        saveNavState(activepath){
            this.activepath=activepath
        },
        async logout(){
            const res=await this.$http.get('/quit')
            console.log(res)
            if(res.status==200){
                this.$router.push('/login')
            }
        },
     },


}

</script>
<style lang="less" scoped>
.el_container{
    height: 100%;
}
.el_header{
    background-color: #373d41;
    display: flex;
    justify-content:space-between ;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    >div{
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
        }
    }
    img{
        width:50px;
        height:50px;
        border-radius:50%;
    }
    .username{
      margin-right: 20px;
      cursor: pointer;
    }
}
.el_aside{
    background-color: #333744;
    height: 100%;
    .el-menu{
        border-right: 0;
    }
}
.el_main{
    border: 1px solid #ccc;
}
</style>