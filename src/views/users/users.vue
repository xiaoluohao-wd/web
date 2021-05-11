<template>
 <div>
    <el-card>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">个人中心</el-menu-item>
        <el-menu-item index="2" >编辑个人信息</el-menu-item>
      </el-menu>
      <div class="userinfo" v-if="activeIndex=='1'">
        <el-image class="img"  :src="userinfo.avatar" fit="cover "></el-image>
        <div class="info">
          <el-row>
            <el-col :span="6">
              <div>
                <span class="title" >姓名:</span><span>{{userinfo.username}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">性别:</span><span>{{userinfo.gender}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">生日:</span><span>{{userinfo.birth}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">籍贯:</span><span>{{userinfo.nativePlace}}</span>
              </div>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="6">
              <div>
                <span class="title">政治面貌:</span><span>{{userinfo.politick}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">学历:</span><span>{{userinfo.education}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">现任职务:</span><span>{{userinfo.job}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">技术职称:</span><span>{{userinfo.technicalTitle}}</span>
              </div>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <span class="title">理事类型:</span><span>{{userinfo.dirctorType}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">工作单位:</span><span>{{userinfo.company}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">通讯地址:</span><span>{{userinfo.address}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">邮政编码:</span><span>{{userinfo.postalCode}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <span class="title">办公电话:</span><span>{{userinfo.fixedPhone}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">手机号码:</span><span>{{userinfo.phone}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">邮箱:</span><span>{{userinfo.email}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="title">其他学会任职:</span><span>{{userinfo.otherCouncilJob}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <span class="title">工作简历:</span><span>{{userinfo.resume}}</span>
              </div>
            </el-col>
          </el-row>

        </div>
      </div>
       <div class="userinfo edituserinfo" v-else>
        <div>
          <el-image class="img"  :src="userinfo.avatar" fit="cover "></el-image>
          <!-- action表示图片要上传到的后台API地址 -->
          <el-upload :action="uploadUrl" style="margin-top:20px; margin-bottom:20px;"
              :with-credentials="true" :show-file-list="showfilelist"  :on-success="handleSuccess">
              <el-button size="small" type="primary">上传头像</el-button>
          </el-upload>
        </div>
        <div class="updateinfo">
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

            <!-- 按钮区域 -->
              <div class="btns">
                <el-button type="primary" @click="updateInfo">立即修改</el-button>
                <el-button type="info" @click="reset">重置</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-card>
 </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
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
        resume:''
      },
      showfilelist:false,
      updateuser:{
        username:'林应刚',
        gender:'男',
        birth:'',
        nativePlace:'海南海口',
        politick:'团员',
        education:'本科',
        job:'无',
        technicalTitle:'无',
        dirctorType:'',
        company:'重庆大学',
        address:'沙正街174号重庆大学',
        postalCode:'570000',
        fixedPhone:'无',
        phone:'13028320759',
        email:'836419102@qq.com',
        otherCouncilJob:'无',
        resume:'无'
      },
      uploadUrl:'http://127.0.0.1:5000/uploadavatar',
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
      }
    };
  },
  mounted(){
    this.getUserInfo()
    
  },
  methods: {
    async getUserInfo(){
      const res=await this.$http.get('/getuserinfo')
      console.log(res)
      if(res.status==200){
        this.userinfo=res.data
        window.sessionStorage.setItem('username',this.userinfo.username)
        window.sessionStorage.setItem('avatar',this.userinfo.avatar)
      }
    },
    handleSelect(key) {
      this.activeIndex=key
    },
    //上传图片成功时触发
    handleSuccess(res){
      console.log(res)
        this.getUserInfo()
    },
    async updateInfo(){
      let d=new Date(this.updateuser.birth)
      console.log(d)
      this.updateuser.birth=d.toLocaleDateString()
      console.log(this.updateuser)
      const res=await this.$http.post('/updateuserinfo',this.updateuser)
      if(res.status==200){
        if(res.data.type=='success'){
            this.getUserInfo()
            console.log(this.userinfo)
            this.$message({
            message:res.data.msg,
            type: res.data.type,
            duration:1000
            });
        }
        else{
              this.$message({
              showClose: true,
              message:res.data.msg,
              type: res.data.type,
              duration:0
              });
            }
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
// .el_input{
//   width: 200px;
// }
</style>