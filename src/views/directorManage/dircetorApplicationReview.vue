<template>
<!-- 理事申请审核 -->
 <div>
    <el-card>
        <el-table stripe border :data="applicationList" style="width: 100%">

            <el-table-column prop="id"  label="#"  width="50"></el-table-column>
            <el-table-column prop="name"  label="姓名"  width="180"></el-table-column>
            <el-table-column prop="company"  label="申请单位"  width="180"></el-table-column>
            <el-table-column prop="dirctorType"  label="申请类型"  width="180"></el-table-column>
            <el-table-column prop="phone"  label="联系电话"  width="180"></el-table-column>
            <el-table-column  label="申请表"  width="270">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-view" size="mini" @click="gotoDetail(scope.row.phone)">查看用户信息</el-button>
                    <el-button type="primary" icon="el-icon-download"  size="mini" @click="downloadApplicationTable(scope.row.applicationTableUrl)">下载申请表</el-button>
                </template>
            </el-table-column>
            <el-table-column prop=""  label="操作"  width="230">
                <template slot-scope="scope">
                    <el-button type="success" icon="el-icon-check" size="mini" @click="passApplication(scope.row.id)">通过申请</el-button>
                    <el-button type="danger"  icon="el-icon-close" size="mini" @click="refuseApplication(scope.row.id)">拒绝申请</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog title="查看详情" :visible.sync="previewVisible" width="50%">
        <div class="userinfo">
        <el-image class="img"  :src="userinfo.avatar" fit="cover "></el-image>
        <div class="info">
          <div>
            <span class="title" >姓名:</span><span>{{userinfo.username}}</span>
          </div>
          <div>
            <span class="title">性别:</span><span>{{userinfo.gender}}</span>
          </div>
          <div>
            <span class="title">生日:</span><span>{{userinfo.birth}}</span>
          </div>
          <div>
            <span class="title">籍贯:</span><span>{{userinfo.nativePlace}}</span>
          </div>
          <div>
            <span class="title">政治面貌:</span><span>{{userinfo.politick}}</span>
          </div>
          <div>
            <span class="title">学历:</span><span>{{userinfo.education}}</span>
          </div>
          <div>
            <span class="title">现任职务:</span><span>{{userinfo.job}}</span>
          </div>
          <div>
            <span class="title">技术职称:</span><span>{{userinfo.technicalTitle}}</span>
          </div>
          <div>
            <span class="title">理事类型:</span><span>{{userinfo.dirctorType}}</span>
          </div>
          <div>
          <span class="title">工作单位:</span><span>{{userinfo.company}}</span>
          </div>
          <div>
            <span class="title">通讯地址:</span><span>{{userinfo.address}}</span>
          </div>
          <div>
            <span class="title">邮政编码:</span><span>{{userinfo.postalCode}}</span>
          </div>
          <div>
            <span class="title">办公电话:</span><span>{{userinfo.fixedPhone}}</span>
          </div>
          <div>
            <span class="title">手机号码:</span><span>{{userinfo.phone}}</span>
          </div>
          <div>
            <span class="title">邮箱:</span><span>{{userinfo.email}}</span>
          </div>
          <div>
            <span class="title">其他学会任职:</span><span>{{userinfo.otherCouncilJob}}</span>
          </div>
        </div>
        </div>
    </el-dialog>
 </div>
</template>

<script>
export default {
    data () {
        return {
            applicationList:[],
            userinfo:{
                avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                username:'',
                gender:'',
                birth:'',
                nativePlace:'',
                politick:'',
                education:'',
                job:'',
                technicalTitle:'',
                dirctorType:'',
                company:'',
                address:'',
                postalCode:'',
                fixedPhone:'',
                phone:'',
                email:'',
                otherCouncilJob:'',
                resume:'',
            },
            previewVisible:false

        };
    },
    mounted(){
        this.getApplicationList()
    },

    methods: {
        async getApplicationList(){
            const res=await this.$http.get('/get-application-list')
            if(res.status==200){
                this.applicationList=res.data.applicationList
            }
        },
        async gotoDetail(phone){
            const res=await this.$http.get('/getuserinfo?phone='+phone)
            if(res.status==200){
                this.userinfo=res.data
                this.previewVisible=true
            }
        },
        downloadApplicationTable(url){
             window.open(url)
        },
        async passApplication(id){
            const res=await this.$http.get('/pass-director-application?id='+id)
            console.log(res)
            this.getApplicationList()

        },
        async refuseApplication(id){
            let confirm=await this.$confirm(
                '是否拒绝该申请', '提示', 
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }
            ).catch(err=>err)
            console.log(confirm)
            if(confirm!=='confirm'){
                this.$message('已取消操作')
                return
            }
            const res=await this.$http.get('/refuse-director-application?id='+id)
            console.log(res)
            if(res.status==200){
                this.getApplicationList()
            }
        },
    },


}

</script>
<style lang="less" scoped>
.userinfo{
  // border: 1px solid #Ccc;
  padding: 20px;
  .img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .info{
    margin-top: 30px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    .title{
      display: inline-block;
      margin-bottom: 20px;
      width: 100px;
    }
  
  }
}
</style>