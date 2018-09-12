<template>
	<div class="content-wrapper" style="background-color: white;border:1.5px solid #ffd; padding:0 20px;height:800px;" id="main">
		  <br>
		<div style="padding: 20px; background-color: #F2F2F2; ">
		  <div class="layui-row layui-col-space15">
		    <div class="layui-col-md8">
		      <div class="layui-card">
		        <div class="layui-card-header" ><i class="fa fa-free-code-camp" style="color:red;">&nbsp;</i>最新活动 / 通知公告</div>
		        <div class="layui-card-body">
		   
					<el-collapse v-model="activeName" accordion>
					  <el-collapse-item name="1">
					  	<template slot="title">
					      #<em>志愿活动管理平台 全面升级，正式上线使用！</em>#&nbsp;&nbsp;<span class="layui-badge" >置顶</span>
					    </template>
					    <div>
					    	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为便于各学院青队和总队，对志愿活动的更加高效便捷的展开，特此将原使用于计算机学院的志愿活动管理平台，进行升级换代，提供了更加便捷，丰富的功能。避免了之前较为繁琐的一系列操作，方便数据的使用，查询与保存。 Enjoy It : )  ！
					    </div>
					  </el-collapse-item>
					  <el-collapse-item title="院队管理员 VS 工时管理员" name="2">
					    <div>· 院队管理员：每个学院青队的负责人，可以创建本学院的工时管理员</div>
					    <div>· 工时管理员：可以创建活动，添加志愿者，提交认证申请，修改活动等</div>
					  </el-collapse-item>
					  <el-collapse-item title="听起来不错，如何快速上手呢？" name="3">
					    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别开玩笑了， 这么简单的东西，还需要什么教程指南之类的？</p>
					  </el-collapse-item>
					  <el-collapse-item name="4">
					  	<template slot="title">
					      出问题了，怎么办<i class="el-icon-question"></i>
					    </template>
					    <div>系统平台出现无法解决的BUG</div>
					    <div><i class="el-icon-message"></i>:  <a href="mailto:liuyuanwang4321@gmail.com">liuyuanwang4321@gmail.com</a> </div>
					  </el-collapse-item>
					</el-collapse>
		        </div>
		      </div>
		    </div>
		    <div class="layui-col-md4" >
					<Depart :departShow='this.departS' @hasChange="doChange"></Depart>
					<General v-bind:generalShow ='generalS' @hasChange = "doChange"></General>
		    </div>
		    <div class="layui-col-md12">
		      <div class="layui-card">
		        <div class="layui-card-header">标题</div>
		        <div class="layui-card-body">
		          内容
		        </div>
		      </div>
		    </div>

		  </div>
		</div> 
		 
	</div>
</template>

<script type="text/javascript">

import Depart from '@/part/depart';
import General from '@/part/general';

	export default {
		name:'Index',
		components:{
			'Depart':Depart,
			'General':General
		},
		data () {
			return {
				mDept:'计算机科学与计算学院',
				departS: true,
				generalS: false,
				activeName: ['1'],

				userLevel: '',
			}
		},
		mounted(){															// 挂载之后
			console.log("页面加载完成 判断是否已登陆！");
			// 获取该用户所在学院的基本信息
			this.checkLogin();
			this.getOrganizationInfo();
		},
		afterRouteEnter:function(to, from, next){
			console.log("afterRouteEnter");
			this.test();
		},
	
		methods: {
			
			doChange: function(){
				this.departS = !this.departS;
				this.generalS = !this.generalS;
				console.log("receive change!" );
			},

			/**
		       * [checkLogin 核对是否登陆]
		       * @return {[type]} [description]
		       */
		    checkLogin: function(){
		      		this.axios.post('/WustVolunteer/college/checkLogin.do',{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      		}).then((data) => {
		      			// console.log(data);
		      			if(data.data.status == 1){
		      				this.$router.push({path: '/login'});			// 未登陆则调到登陆页面
		      			}
		      		}).catch((err) => {
						console.log(err);
					})
		    },
			
			/**
		       * [getOrganizationInfo 获取组织信息接口]
		       * @enum 		{5}
		       * @return {[type]} [null]
		       * @url  url+getOrganizationInfo.do
		       */
		    getOrganizationInfo: function(){
		      		this.axios.post('/WustVolunteer/college/getOrganizationInfo.do',{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      		}).then((data) => {
		      			console.log(data);
		      		}).catch((err) => {
						console.log(err);
					})
		    },

		}
	}
</script>


<style >
	@import '../../static/css/index.css'
</style>