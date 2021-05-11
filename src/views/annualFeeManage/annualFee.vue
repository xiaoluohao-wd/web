<template>
 <div>
   <el-card>
     <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">个人年费缴纳</el-menu-item>
        <el-menu-item index="2">单位年费缴纳</el-menu-item>
      </el-menu>
        <div v-if="showTables">
          <div class="money" v-if="activeIndex=='1'">
            您当前的理事类型为{{type}},应缴纳年费{{money}}
          </div>
            <div class="money" v-else>
            您当前的理事单位类型为{{type}},应缴纳年费{{money}}
          </div>
          <!-- action表示图片要上传到的后台API地址 -->
          <el-upload :action="uploadUrl" style="margin-top:20px; margin-bottom:20px;"
              :with-credentials="true"   :on-success="handleSuccess">
              <el-button size="small" type="primary">上传缴费凭据</el-button>
          </el-upload>
          <el-form class="login_form" :model="form" ref="loginFormref"  label-width="70px">
            <el-form-item   label="税号" >
                <el-input v-model="form.dutyParagraph" placeholder="请输入税号"  ></el-input>
            </el-form-item>
            <el-form-item   label="金额/元" >
                <el-input v-model="form.money" placeholder="请输入缴纳金额"  ></el-input>
            </el-form-item>
            <el-form-item   label="通讯地址">
                <el-input v-model="form.address" placeholder="请输入通讯地址" ></el-input>
            </el-form-item>
            <el-form-item  label="邮箱">
                <el-input type="text"  v-model="form.email"  placeholder="请输入邮箱" ></el-input>
            </el-form-item>
            <div class="btns">
                <el-button type="primary" :disabled="submitable" @click="submit">提交</el-button>
            </div>
          </el-form>
        </div>
   </el-card>
     
 </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex:'1',
        form:{
        dutyParagraph:'xxxxxxxxxxxxxxxxxx',
        money:'500',
        address:'',
        dirctorType:'',
        email: '',
        
      },
      type:'理事',
      money:'500',
      uploadUrl:'http://127.0.0.1:5000/upload-fee-image',
      showTables:true,
      submitable:true
    };
  },
  mounted(){
    this.getAnnualFeeStatus()
  },

  methods: {
    async getAnnualFeeStatus(){
      const res=await this.$http.get('get-annual-fee-status')
      console.log(res)
      if(res.status==200){
        if(res.data.feeStatus==1){
          this.getUserInfo()
        }
      }
    },
    async getUserInfo(){
      const res=await this.$http.get('/getuserinfo')
      if(res.status==200)
      this.form.email=res.data.email
      this.form.address=res.data.address
      this.form.dirctorType=res.data.dirctorType
    },
    async submit(){
      const res=await this.$http.post('/submit-fee',this.form)
      console.log(res)
      if(res.status==200&&res.submitAble){
        this.showTables=false
      }
    },
    handleSelect(key){
      this.activeIndex=key
    },
    handleSuccess(res){
      console.log(res)
      if(res.submitAble){
        this.$message({
          type:'success',
          message:res.msg
        })
        this.submitable=false
      }
    }
  },

}

</script>
<style lang="less" scoped>
.money{
  margin: 20px 0;
  font-size: 20px;
}
</style>