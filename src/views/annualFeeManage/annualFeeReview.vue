<template>
<!-- 理事年费审核 -->
 <div>
    <el-card>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">理事年费设置</el-menu-item>
            <el-menu-item index="2">理事年费审核</el-menu-item>
        </el-menu>
        <div class="fee-setting" v-show="activeIndex=='1'">
            <el-button type="primary" style="margin-bottom:10px;" @click="addRecord">添加记录</el-button >
            <el-table stripe border :data="feelist" style="width: 100%">
                <el-table-column prop="dirctorType"  label="理事等级"  width="180"></el-table-column>
                <el-table-column prop="dirctorFee"  label="年费金额/元"  width="180"></el-table-column>
                <el-table-column prop="companyType"  label="理事单位等级"  width="180"></el-table-column>
                <el-table-column prop="companyFee"  label="年费金额"  width="180"></el-table-column>
                <el-table-column  label="操作"  width="230">
                    <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-edit" size="mini" @click="edit(scope.row)">修改</el-button>
                        <el-button type="danger"  icon="el-icon-close" size="mini" @click="remove(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="review" v-show="activeIndex=='2'">
            <el-table stripe border :data="submitFeeList" style="width: 100%">
                <el-table-column prop="id"  label="#"  width="80"></el-table-column>
                <el-table-column prop="name"  label="姓名"  width="180"></el-table-column>
                <el-table-column prop="phone"  label="联系电话"  width="180"></el-table-column>
                <el-table-column prop="email"  label="邮箱"  width="180"></el-table-column>
                <el-table-column prop="address"  label="通讯地址"  width="180"></el-table-column>
                <el-table-column prop=""  label="操作"  width="360">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-view" size="mini"  @click="viewImage(scope.row.annualFeeImagesUrls)">查看凭据</el-button>
                        <el-button type="success" icon="el-icon-check" size="mini" @click="pass(scope.row.id)">通过</el-button>
                        <el-button type="danger"  icon="el-icon-close" size="mini" @click="refuse(scope.row.id)">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="添加记录" :visible.sync="previewVisible" width="50%">
            <div>
            <el-form class="login_form" :model="feesetting" ref="loginFormref"  label-width="100px">
                <el-form-item   label="理事等级" >
                    <el-input v-model="feesetting.dirctorType" placeholder="请输入理事等级"  ></el-input>
                </el-form-item>
                <el-form-item   label="金额/元" >
                    <el-input v-model="feesetting.dirctorFee" placeholder="请输入缴纳金额"  ></el-input>
                </el-form-item>
                <el-form-item   label="理事单位等级">
                    <el-input v-model="feesetting.companyType" placeholder="请输入理事单位等级" ></el-input>
                </el-form-item>
                <el-form-item  label="金额/元">
                    <el-input type="text"  v-model="feesetting.companyFee"  placeholder="请输入缴纳金额" ></el-input>
                </el-form-item>
                <div class="btns">
                    <el-button type="primary"  @click="submit">提交</el-button>
                </div>
            </el-form>
            </div>
        </el-dialog>
        <el-dialog title="查看凭据" :visible.sync="previewVisible1" width="50%">
             <img :src="previewImgUrl" alt="" class="previewimg">
        </el-dialog>
    </el-card>
 </div>
</template>

<script>
export default {
     data () {
        return {
            activeIndex:'1',
            feelist:[],
            submitFeeList:[],
            feesetting:{
                id:'0',
                dirctorType:'',
                dirctorFee:'',
                companyType:'',
                companyFee:''
            },
            previewVisible:false,
            previewVisible1:false,
            previewImgUrl:''
        };
    },
    mounted(){
        if(this,this.activeIndex=='1'){
            this.getFeeList()
        }
        else{
            this.getSubmitFeeList()
        }
        
    },
    methods: {
        async getFeeList(){
            const res=await this.$http.get('/get-fee-list')
            console.log(res)
            if(res.status==200){
                this.feelist=res.data.feeList
            }
        },
        async getSubmitFeeList(){
            const res=await this.$http.get('/get-submit-fee-list')
             console.log(res)
            if(res.status==200){
                this.submitFeeList=res.data.submitFeeList
            }
        },
        handleSelect(key){
            this.activeIndex=key
            if(this,this.activeIndex=='1'){
                this.getFeeList()
            }
            else{
                this.getSubmitFeeList()
            }
        },
        addRecord(){
            this.previewVisible=true
        },
        async submit(){
            const res=await this.$http.post('/fee-setting',this.feesetting)
            if(res.status==200){
                this.$message({
                    type:'success',
                    message:res.data.msg
                })
                this.getFeeList()
                this.previewVisible=false
            }
        },
        edit(row){
            console.log(row)
            this.feesetting.id=row.id
            this.feesetting.dirctorType=row.dirctorType
            this.feesetting.dirctorFee=row.dirctorFee
            this.feesetting.companyType=row.companyType
            this.feesetting.companyFee=row.companyFee
            this.previewVisible=true
        },
        async remove(id){
            let confirm=await this.$confirm(
                '是否删除该记录', '提示', 
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
            const res=await this.$http.get('/remove-fee?id='+id)
            if(res.status==200){
                this.getFeeList()
            }
        },
        viewImage(url){ 
            console.log(url)
            this.previewVisible1=true
            this.previewImgUrl=url
        },
        async pass(id){
            const res=await this.$http.get('/pass-fee-review?id='+id)
            if(res.status==200){
                this.$message({
                    type:'success',
                    message:'已通过审核'
                })
                this.getSubmitFeeList()
            }
           
        },
        
        async refuse(id){
            let confirm=await this.$confirm(
                '是否拒绝该审核', '提示', 
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
            const res=await this.$http.get('/refuse-fee-review?id='+id)
            if(res.status==200){
                    this.$message({
                    type:'success',
                    message:'已拒绝该审核'
                })
                this.getSubmitFeeList()
            }
        }

    },
}

</script>
<style lang="less" scoped>
.fee-setting,.review{
    padding: 20px 0;
}
.previewimg{
    width: 100%;
}
</style>
