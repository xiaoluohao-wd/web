<template>
 <div class="container">
    <div class="login">
      <span class="title">学会理事管理系统</span>
      <el-form class="login_form" :model="user" status-icon ref="loginFormref" :rules="loginrules" label-width="70px">
        <!-- 登录输入框 -->
        <el-form-item   prop="phone" label="手机号">
            <el-input v-model="user.phone" placeholder="请输入手机号"  prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password" label="密码">
            <el-input type="password"  v-model="user.password"  placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
          <div class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
            <span class="tag">忘记密码?</span>
            <span class="tag" @click="gotoRegister">立即注册</span>
        </div>
    </el-form>
    </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      user:{
        phone:'13028320758',
        password:'111111',
      },
      //验证规则对象
      loginrules:{
          phone:[
              { required: true, message: '请输入手机号', trigger: 'blur' },
              {pattern: /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/ ,message:'请输入正确的手机号'}
      ],
          password:[
                { required: true, message: '请输入登录密码', trigger: 'blur' },
                { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ]
      }
    };
  },

  methods: {
    login(){
      this.$refs.loginFormref.validate(async (valid)=>{
        if(!valid)return
        const res=await this.$http.post('/login',this.user)
        if(res.status==200&&res.data.type=='success'){
          this.$router.push('/index')
        }else{
          this.$message({
          message:res.data.msg,
          type: res.data.type,
          duration:2000
          });
        }
      })
  
    },
    reset(){
      this.$refs.loginFormref.resetFields()
    },
    gotoRegister(){
      this.$router.push('/register')
    }
  },


}

</script>
<style lang="less" scoped>
.container{
    height: 100%;
    background-color:#f0f2f5 ;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login{
  width: 400px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .title{
    color: #0A6BEC;
    font-size: 48px;
  }
 .login_form{
   margin-top: 30px;
 }
 .btns{
   margin-top: 20px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   .tag{
     align-self: center;
     border-bottom: 1px solid black;
     cursor: pointer;
   }
 }
}
</style>