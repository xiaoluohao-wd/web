<template>
 <div>
    <el-card>
         <el-table :data="noticeList" border >
            <el-table-column type="index" ></el-table-column>
            <el-table-column label="会议标题" prop="noticeName"></el-table-column>
            <el-table-column label="发布时间" prop="noticeTime"></el-table-column>
            <el-table-column label="发布人" prop="noticeAuthor"></el-table-column>
            <el-table-column label="操作"  >
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-view" size="mini" @click="viewDetail(scope.row.id)">详情</el-button>
                </template>
            </el-table-column>
          </el-table>
    </el-card>
    <el-dialog title="查看详情"  :visible.sync="previewVisible" width="50%">
        <h3>{{noticeDetail.noticeName}}</h3>
        <h5>发布人:{{noticeDetail.noticeAuthor}}----发布时间{{noticeDetail.noticeTime}}</h5>
        <div>
          {{noticeDetail.noticeContent}}
        </div>
        <div v-show="noticeDetail.noticeFileUrl!=''">
          附件下载
        </div>
        <el-button type="primary">确认参加</el-button>
    </el-dialog>
 </div>
</template>

<script>
export default {
  data () {
    return {
      noticeList:[],
      previewVisible:false,
      noticeDetail:{}
    };
  },
  mounted(){
    this.getNoticeList()
  },
  methods: {
    async getNoticeList(){
      const res=await this.$http.get('/get-all-notice-list')
      console.log(res)
      this.noticeList=res.data.noticeList
    },
    async viewDetail(id){
      const res =await this.$http.get('/get-notice-detail?id='+id)
      console.log(res)
      if(res.status==200){
        this.noticeDetail=res.data.noticeDetail
        this.previewVisible=true
      }
    }
  },



}

</script>
<style lang="less" scoped>
</style>