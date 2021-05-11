<template>
 <div>
     <el-card>
        <el-table :data="councilList" border >
            <el-table-column type="index" ></el-table-column>
            <el-table-column label="单位名称" prop="name" width="800px"></el-table-column>
            <el-table-column label="操作"  >
                <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click="viewDirectorList(scope.row.name)">查看理事名单</el-button>
                      <!-- <el-button type="danger" icon="el-icon-delete" size="mini" @click="RemoveById(scope.row.id)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
     </el-card>
     <el-dialog title="查看详情 每个理事单位只能有一个管理员"  :visible.sync="previewVisible" width="50%">
         <el-table :data="userlist" border >
            <el-table-column type="index" ></el-table-column>
            <el-table-column label="姓名" prop="username"></el-table-column>
            <el-table-column label="电话" prop="phone"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="设为管理员"  >
                <template slot-scope="scope">
                    <el-switch :disabled="!scope.row.isAdmin&&disabled" @change="userStateChange(scope.row.phone,scope.row.isAdmin)" v-model="scope.row.isAdmin"></el-switch>
                </template>
            </el-table-column>
          </el-table>
     </el-dialog>
 </div>
</template>

<script>
export default {
  data () {
    return {
      councilList:[],
      previewVisible:false,
      userlist:[],
      disabled:false
    };
  },
  mounted(){
    this.getCouncilList()
  },
  methods: {
    async getCouncilList(){
      const res=await this.$http.get('/get-council-list')
      console.log(res)
      if(res.status==200){
         let list=res.data.companyList
         for(let i=0;i<list.length;i++){
           this.councilList.push({name:list[i]})
         }
      }
    },
    async viewDirectorList(company){
      const res=await this.$http.get('/get-director-list?company='+company)
      console.log(res)
      if(res.status==200){
        this.userlist=res.data.userslist
        // for(let i=0;i<this.userlist.length;i++){
        //   if(this.userlist[i].isAdmin){
        //     this.disabled=true
        //   }

        // }
        this.previewVisible=true
      }
    },
    async userStateChange(phone,state){
      const res=await this.$http.get(`/setting-admin?phone=${phone}&&state=${state}`)
      console.log(res)
      this.disabled=!this.disabled
    }
  },


}

</script>
<style lang="less" scoped>
</style>