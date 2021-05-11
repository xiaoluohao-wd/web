import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
Vue.config.productionTip = false
axios.defaults.withCredentials=true;//让ajax携带cookie
Vue.prototype.$http=axios
axios.defaults.baseURL=`http://127.0.0.1:5000/`
//格式化时间的过滤器
Vue.filter('dateFormat',function(originVal){
	const dt= new Date(originVal)
	const y = dt.getFullYear()
	const m = (dt.getMonth() + 1 +'').padStart(2,'0')
	const d = (dt.getDay() +'').padStart(2,'0')
	const h = (dt.getHours() +'').padStart(2,'0')
	const min=(dt.getMinutes() +'').padStart(2,'0')
	const s =(dt.getSeconds() +'').padStart(2,'0')
	return `${y}-${m}-${d} `
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
