<template>
 <div class="container">
    <div class="login">
      <span class="title">学会理事管理系统--注册</span>
      <el-form class="login_form" :model="user" status-icon ref="registerFormref" :rules="registerRules">
        <!-- 登录输入框 -->
        <el-form-item class="item" label="姓名"   prop="username">
           <el-input v-model="user.username" placeholder="请输入用户名"  prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item class="item" label="手机号"  prop="phone">
           <el-input v-model="user.phone" placeholder="请输入手机号"  prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item class="item" label="密码" prop="password">
           <el-input type="password"  v-model="user.password"  placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item class="item" label="请确认密码" prop="confirmpassword">
           <el-input type="password"  v-model="user.confirmpassword"  placeholder="请确认密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
          <div class="btns">
            <el-button type="primary" @click="register">立即注册</el-button>
            <el-button type="info" @click="reset">重置</el-button>
        </div>
    </el-form>
    </div>
 </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
       console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.user.password !== '') {
          this.$refs.registerFormref.validateField('confirmpassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      user:{
        username:'',
        phone:'',
        password:'',
        confirmpassword:''
      },
      //验证规则对象
      registerRules:{
          username:[
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 3, max: 11, message: '长度在3-20个字符', trigger: 'blur' }
          ],
            phone:[
              { required: true, message: '请输入手机号', trigger: 'blur' },
              {pattern: /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/ ,message:'请输入正确的手机号'}
          ],
          password:[
              { min: 6, max: 12, message: '长度在6-12个字符', trigger: 'blur' },
              { validator: validatePass, trigger: 'blur' }
          ],
          confirmpassword:[
            { min: 6, max: 12, message: '长度在6-12个字符', trigger: 'blur' },
              { validator: validatePass2, trigger: 'blur' }

          ]
      }
    };
  },

  methods: {
    register(){
      this.$refs.registerFormref.validate( async (valid)=>{
        if(valid){
          const res=await this.$http.post('/register',this.user)
          if(res.status==200){
            if(res.data.type=='success'){
                this.$message({
                message:res.data.msg,
                type: res.data.type,
                duration:1000
                });
                this.$router.push('/login')
            }
            else{
                this.$message({
                message:res.data.msg,
                type: res.data.type,
                duration:2000
                });
            }
          }
        } 
        else {
            return false;
        }
      })
    },
    reset(){
      this.$refs.registerFormref.resetFields()
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
}
.login{
  width: 400px;
  height: 400px;
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  .title{
    color: #0A6BEC;
    font-size: 36px;
  }
 .login_form{
   margin-top: 30px;
 }
 .btns{
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