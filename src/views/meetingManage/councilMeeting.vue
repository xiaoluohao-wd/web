<template>
 <div>
    <el-card>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">会议发布</el-menu-item>
          <el-menu-item index="2" >已发布</el-menu-item>
        </el-menu>
        <div class="main" v-show="activeIndex=='1'">
          <el-form  class="login_form" v-model="notice"  ref="loginFormref" label-width="70px">
            <el-form-item    label="标题" >
                <el-input v-model="notice.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item   label="内容" inline>
                <el-input type="textarea" :rows="20" v-model="notice.content" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-upload :action="uploadUrl" style="margin-top:20px; margin-bottom:20px;"
              :with-credentials="true"   :on-success="handleSuccess">
              <el-button size="small"  type="primary">上传附件</el-button>
            </el-upload>
            <el-button type="primary" size="small" @click="submit">发布</el-button>
          </el-form>
        </div>
        <div v-show="activeIndex=='2'">
          <el-table :data="noticeList" border >
            <el-table-column  label="#" prop="id" width="40px"></el-table-column>
            <el-table-column label="通知标题" prop="noticeName" width="800px"></el-table-column>
            <el-table-column label="发布人" prop="noticeAuthor" ></el-table-column>
            <el-table-column label="发布时间" prop="" >
              <template slot-scope="scope">{{scope.row.noticeTime|dateFormat}}</template>
            </el-table-column>
            <el-table-column label="操作" width="200px" >
                <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click="editNotice(scope.row.id)">编辑</el-button>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="RemoveById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
    </el-card>
      <el-dialog title="查看详情"  :visible.sync="previewVisible" width="50%">
          <el-form  class="login_form" v-model="updateNotice"  ref="loginFormref" label-width="70px">
            <el-form-item    label="标题" >
                <el-input v-model="updateNotice.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item   label="内容" inline>
                <el-input type="textarea" :rows="20" v-model="updateNotice.content" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-upload :action="uploadUrl" style="margin-top:20px; margin-bottom:20px;"
              :with-credentials="true"   :on-success="handleSuccess">
              <el-button size="small"  type="primary">上传附件</el-button>
            </el-upload>
            <el-button type="primary" size="small" @click="submit">修改</el-button>
          </el-form>
      </el-dialog>
 </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex:'1',
      notice:{
        title:'',
        content:''
      },
      uploadUrl:'http://127.0.0.1:5000/upload-notice-file',
      noticeList:[],
      previewVisible:false,
      id:'',
      updateNotice:{
          title:'',
        content:''
      }
    };
  },

  methods: {
    handleSelect(key){
      this.activeIndex=key
      if(this.activeIndex=='2'){
        this.getNoticeList()
      }
    },
    async submit(){
      let res={}
      if(this.id!=''){
         res=await this.$http.post('/add-notice?id='+this.id,this.updateNotice)
      }else{
         res=await this.$http.post('/add-notice',this.notice)
      }
      if(res.status==200){
        this.$message({
          type:'success',
          message:res.data.msg
        })
        this.notice={}
        this.updateNotice={}
        if(res.data.edit){
          this.getNoticeList()
        }
      }
    },
    async getNoticeList(){
      const res=await this.$http.get('/get-notice-list')
      console.log(res)
      if(res.status==200){
        this.noticeList=res.data.noticeList
      }
    },
    handleSuccess(){

    },
    async editNotice(id){
      const res=await this.$http.get('/get-notice-detail?id='+id)
      console.log(res)
      this.previewVisible=true
      if(res.status==200){
        this.updateNotice.title=res.data.noticeDetail.noticeName
        this.updateNotice.content=res.data.noticeDetail.noticeContent
        this.id=id
      }
    },
    async RemoveById(id){
      let confirm=await this.$confirm(
                '是否删除该通知', '提示', 
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
            const res=await this.$http.get('/refuse-notice?id='+id)
            console.log(res)
            if(res.status==200){
                this.getNoticeList()
            }
    }
  },

}

</script>
<style lang="less" scoped>
.main{
  padding: 20px 0;
}
</style>