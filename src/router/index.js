import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/account/login.vue';
import index from '../views/index.vue'
import register from '../views/account/register.vue'
import users from '../views/users/users.vue'
import councilInfo from '../views/councilManage/councilInfo.vue'
import councilApplication from '../views/councilManage/councilApplication.vue'
import councilManage from '../views/councilManage/councilManage.vue'
import dircetorApplication from '../views/directorManage/directorApplication.vue'
import dircetorApplicationReview from '../views/directorManage/dircetorApplicationReview.vue'
import annualFee from '../views/annualFeeManage/annualFee.vue'
import annualFeeReview from '../views/annualFeeManage/annualFeeReview.vue'
import academicMeeting from '../views/meetingManage//academicMeeting.vue'
import councilMeeting from '../views/meetingManage//councilMeeting.vue'
import notices from '../views/noticeManage/notice.vue'
import reports from '../views/reports/report.vue'
import welcome from '../views/welcome.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component:login},
  {path:'/register',component:register},
  {path:'/index',redirect:'/index/welcome'},
  {path:'/index',component:index,
    children:[
      
      {path:'welcome',component:welcome},
      {path:'users',component:users},
      {path:'council-info',component:councilInfo},
      {path:'council-application',component:councilApplication},
      {path:'council-manage',component:councilManage},
      {path:'director-application',component:dircetorApplication},
      {path:'director-application-review',component:dircetorApplicationReview},
      {path:'annual-fee',component:annualFee},
      {path:'annual-fee-review',component:annualFeeReview},
      {path:'academic-meeting',component:academicMeeting},
      {path:'council-meeting',component:councilMeeting},
      {path:'notices',component:notices},
      {path:'reports',component:reports},
      
    ]},

]

const router = new VueRouter({
  routes
})

export default router
