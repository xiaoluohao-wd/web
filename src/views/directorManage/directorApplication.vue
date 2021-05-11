<template>
 <div>
    <el-card>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">理事申请</el-menu-item>
      </el-menu>
       <div class="userinfo edituserinfo">
        <div class="updateinfo" v-if="showTables">
          <el-form class=""  :model="updateuser" ref="loginFormref" :rules="loginrules" label-width="100px" inline>
            <el-row>
              <el-col :span="6">
                <el-form-item class="item" label="姓名"  >
                  <el-input v-model="updateuser.username" placeholder="请输入姓名"  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="item" label="性别" >
                  <el-input v-model="updateuser.gender" placeholder="请输入性别" ></el-input>
                </el-form-item>
              </el-col>     
              <el-col :span="6">
                <el-form-item class="item" label="生日">
                    <el-date-picker style="width:200px"  v-model="updateuser.birth"  type="date"    placeholder="选择日期">  </el-date-picker>
                </el-form-item>
              </el-col>   
              <el-col :span="6">
                <el-form-item class="item" label="籍贯" >
                  <el-input type="text"  v-model="updateuser.nativePlace"  placeholder="请输入籍贯" ></el-input>
                </el-form-item>
              </el-col>   
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item class="item" label="政治面貌" >
                  <el-input v-model="updateuser.politick" placeholder="请输入政治面貌" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="item" label="学历" >
                  <el-input v-model="updateuser.education" placeholder="请输入学历"  ></el-input>
                </el-form-item>
              </el-col>     
              <el-col :span="6">
                <el-form-item class="item" label="现任职务"  >
                  <el-input v-model="updateuser.job" placeholder="请输入现任职务" ></el-input>
                </el-form-item>
              </el-col>   
              <el-col :span="6">
                <el-form-item class="item" label="技术职称" >
                  <el-input type="text"  v-model="updateuser.technicalTitle"  placeholder="请输入技术职称" ></el-input>
                </el-form-item>
              </el-col>   
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item class="item" label="工作单位" >
                  <el-input type="text"  v-model="updateuser.company"  placeholder="请输入工作单位" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="item" label="通讯地址" >
                  <el-input type="text"  v-model="updateuser.address"  placeholder="请输入通讯地址" ></el-input>
                </el-form-item>
              </el-col>     
              <el-col :span="6">
                <el-form-item class="item" label="邮政编码"  >
                  <el-input v-model="updateuser.postalCode" placeholder="请输入邮政编码" ></el-input>
                </el-form-item>
              </el-col>   
              <el-col :span="6">
                <el-form-item class="item" label="办公电话">
                  <el-input type="text"  v-model="updateuser.fixedPhone"  placeholder="请输入办公电话" ></el-input>
                </el-form-item>
              </el-col>   
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item class="item" label="手机号" >
                  <el-input type="text"  v-model="updateuser.phone"  placeholder="请输入手机号" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="item" label="邮箱">
                  <el-input type="text"  v-model="updateuser.email"  placeholder="请输入邮箱" ></el-input>
                </el-form-item>
              </el-col>     
              <el-col :span="6">
                <el-form-item class="item" label="其他学会任职" >
                  <el-input type="text"  v-model="updateuser.otherCouncilJob"  placeholder="请输入其他学会任职" ></el-input>
                </el-form-item>
              </el-col>   
            </el-row>
            <el-row >
              <el-col :span="24" >
                <el-form-item class="item" label="工作简历" >
                  <el-input type="textarea" :rows="6" style="width:1366px;" v-model="updateuser.resume"  placeholder="请输入工作简历" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 附件资源 -->
          <el-table  border :data="file" style="width:1466px;">
            <el-table-column type="index" ></el-table-column>
            <el-table-column label="附件资源" prop="name"></el-table-column>
            <el-table-column label="操作"  >
                <template>
                  <el-button type="primary" icon="el-icon-download" size="mini" @click="downloadApplicationTable">下载</el-button>
                </template>
            </el-table-column>
          </el-table>



          <h3>请上传盖章的申请表</h3>
          <el-upload :action="uploadUrl" style="margin-top:20px; margin-bottom:20px;"
            :with-credentials="true"   :on-success="handleSuccess" :file-list="fileList" :on-change="hadleChange">
             <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
            <el-button size="small"  type="primary">上传文件</el-button>
          </el-upload>
            <!-- 按钮区域 -->
          <div class="btns">
            <el-button type="primary" :disabled="applicationDisable" @click="sendApplicaton">立即申请</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </div>

        </div>
        <h3 v-else>{{message}}</h3>
      </div>
    </el-card>
 </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      updateuser:{
        username:'无',
        gender:'无',
        birth:'无',
        nativePlace:'无',
        politick:'无',
        education:'无',
        job:'无',
        technicalTitle:'无',
        dirctorType:'无',
        company:'无',
        address:'无',
        postalCode:'无',
        fixedPhone:'无',
        phone:'无',
        email:'无',
        otherCouncilJob:'无',
        resume:'无'
      },
      uploadUrl:'http://127.0.0.1:5000/upload-application-file',
      file:[{name:'理事申请表.doc'}],
      fileList:[],
       //验证规则对象
      loginrules:{
          username:[
              { required: false, message: '请输入用户名', trigger: 'blur' },
              { min: 3, max: 20, message: '长度在3-20个字符', trigger: 'blur' }
          ],
            phone:[
              { required: false, message: '请输入手机号', trigger: 'blur' },
              { min: 11, max: 11, message: '请输入11位的手机号', trigger: 'blur' }
          ],
          password:[
                { required: false, message: '请输入邮箱', trigger: 'blur' },
              { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
          confirmpassword:[
              { required: false, message: '请确认所在单位 ', trigger: 'blur' },
              { min: 6, max: 40, message: '长度在 6 到 40 个字符', trigger: 'blur' }
          ]
      },
      applicationDisable:true,
      showTables:false,
      message:''
    };
  },
  mounted(){
    this.getApplicationStatus()
  },
  methods: {
    async getApplicationStatus(){
      const res=await this.$http.get('/get-application-status')
      console.log(res)
      if(res.data.isDirctor==2||res.data.isDirctor==1){
        this.message=res.data.msg
      }
      else{
        this.getUserInfo()
        this.showTables=true
      }
      
    },
    async getUserInfo(){
      const res=await this.$http.get('/getuserinfo')
      if(res.status==200)
      this.updateuser=res.data
    },
    handleSelect(key) {
      this.activeIndex=key
    },
    downloadApplicationTable(){
      window.open('http://127.0.0.1:5000/static/adminFiles/学会理事申请表.doc')
    },
    //上传申请表成功时触发
    handleSuccess(res){
        console.log(res)
        console.log(this.fileList)
        if(res.applicationAble){
          this.applicationDisable=false
          this.$message({
            message:res.msg,
            type: res.type,
            });
        }
    },
    hadleChange(file,filelist){
      console.log(file)
      console.log(filelist)
    },

    async sendApplicaton(){
      let d=new Date(this.updateuser.birth)
      this.updateuser.birth=d.toLocaleDateString()
      console.log(this.updateuser)
      const res=await this.$http.post('/application',this.updateuser)
      console.log(res)
      if(res.status==200&&res.data.application){
        this.$message({
           message:res.data.msg,
            type: res.data.type,
        })
        this.getApplicationStatus()
      }
    },
     reset(){
      this.$refs.loginFormref.resetFields()
    },
  },

}

</script>
<style lang="less" scoped>
.menu{
  height: 80px;
  width: 100%;
  display: flex;
  div{
    width: 120px;
    height: 50px;
    border: 1px solid #ccc;
  }
}
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