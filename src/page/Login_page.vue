<template>
	<div >
		<div  id="login_header">
			<p> <span>志愿服务管理平台</span> <span>武汉科技大学</span></p>
		</div>
		<div class="row" style="margin-top:60px;">
			<div class="col-md-1"></div>
			<div class="col-md-5" >
				<!-- <img src="../../static/img/礼让.jpg" style="width:250px;height:320px;"> -->
				<el-carousel :interval='5000'  arrow="never" height="350px">
			      <el-carousel-item v-for="item in imgList" :key="item">
			        <!-- <h3>{{ item }}</h3> -->
			        <img :src="item.url" style="width:100%;height:100%;">
			      </el-carousel-item>
			    </el-carousel>
			</div>
			<div class="col-md-1"></div>
			<div class="col-md-3" id="contenter">
				  <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
					  <ul class="layui-tab-title">
					    <li class="layui-this" >院队登陆</li>
					    <li>总队登陆</li>
					    
					  </ul>
					  <div class="layui-tab-content">
							<!-- 院队部分 -->
					    	<div class="layui-tab-item layui-show">
					    		<br><br>
								<div class="row">
									<div class="col-md-2" style="line-height:35px;text-align:left;">账号</div>
									<div class="col-md-10"><input type="text" class="form-control input_login" v-model="userid"></div>
								</div>

								<div class="row" style="margin-top:15px;">
									<div class="col-md-2" style="line-height:35px;text-align:left;">密码</div>
									<div class="col-md-10"><input type="text" class="form-control input_login" v-model="userpw" @keyup.13 ='userlogin'></div>
								</div>
								 
								<div style="margin-top:15px;">
									<input type="checkbox" lay-skin="primary" > <span style="font-size:12px;">记住密码</span>
								</div>
								<!-- 错误类型提示 -->
								<!-- <div v-show='loginErr'>
									<span id="show_err_msg" >
										<i class="layui-icon layui-icon-face-cry" style="font-size: 26px; color: red;"></i> &nbsp;{{show_err_msg}}
									</span>
								</div> -->
								 <el-alert 
								 	v-show='loginErr'
								    :title = 'show_err_msg'
								    type="error"
								    center
								    show-icon>
								 </el-alert>
								<div id="btn_login">
									<el-button type="success"  size='small' style="width:80px;" @click='userlogin'>Login</el-button>
									<el-button  size='small' @click="resetAll">重置</el-button>
								</div>
					    	</div>
							<!-- 总队部分 -->
					    	<div class="layui-tab-item">				    		
					    		<div class="layui-tab-item layui-show">
						    		<br><br>
									<div class="row">
										<div class="col-md-2" style="line-height:35px;text-align:left;">账号</div>
										<div class="col-md-10"><input type="text" class="form-control input_login" v-model="userid"></div>
									</div>

									<div class="row" style="margin-top:15px;">
										<div class="col-md-2" style="line-height:35px;text-align:left;">密码</div>
										<div class="col-md-10"><input type="text" class="form-control input_login" v-model="userpw" @keyup.13 ='userlogin'></div>
									</div>
									 
									<div style="margin-top:15px; ">
										<input type="checkbox" lay-skin="primary" > <span style="font-size:12px;">记住密码</span>
									</div>
									<!-- 错误类型提示 -->
									<div v-show='loginErr'>
										<span id="show_err_msg" >
											<i class="layui-icon layui-icon-face-cry" style="font-size: 26px; color: red;"></i> &nbsp;{{show_err_msg}}
										</span>
									</div>

									<div id="btn_login">
										<el-button type="success"  size='small' style="width:80px;" @click='userlogin'>Login</el-button>
										<el-button  size='small' @click="resetAll">重置</el-button>
									</div>

					    		</div>
					 		</div>
				   		</div> 
				 </div>
			</div>
			
		</div>
		<div  id="login_footer">
			<span><a href="http://www.wust.edu.cn" target="_blank">武汉科技大学</a></span> &nbsp;|&nbsp; <span><a href="http://www.zgzyz.org.cn/" target="_blank">中国青年志愿者</a></span> &nbsp;|&nbsp; <span><a href="http://www.cn.undp.org/content/china/zh/home/about-us/united-nations-volunteers.html" target="_blank">联合国志愿人员组织</a></span> &nbsp;|&nbsp;&nbsp;&nbsp; <span>©2017 - 2020 305工作室. All Rights Reserved.</span>
		</div>
	</div>
</template>

<script type="text/javascript">
import qs from 'qs';

	export default{
		name: 'Login_page',
		data(){
			return{
				userid: '',
				userpw: '',
				loginErr: false,
				show_err_msg: '',

				imgList: [
					// {url: '../../static/img/s1.jpg'},
					{url: '../../static/img/s5.jpg'},
					{url: '../../static/img/s4.jpg'},
					{url: '../../static/img/s2.jpg'},
				]
			}
		},
		methods:{
			// 重置按钮 将输入内容清空
			resetAll(){
				this.userid = '';
				this.userpw = '';	
			},
			// 登陆按钮
			userlogin(){
				if(this.userid == '' && this.userpw == ''){		// 如果皆为空，则返回。
					return ;
				}
				var data ={
					stuNum: this.userid,
					password: this.userpw
				}
				console.log(this.userid+' '+ this.userpw);
				this.axios.post('/WustVolunteer/college/login.do',qs.stringify(data),{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				})
				.then((data) =>{
					if(data.data.status == 0){
						alert("Login_Ok");
						this.$router.push({path: '/home/introduce'});
					}else if(data.data.msg == "用户名不存在"){
						this.show_err_msg = "用户名不存在";
						this.animate_err();
					}else if(data.data.msg == "无权限"){
						this.show_err_msg = "无权限";
						this.animate_err();
					}else if(data.data.msg == '密码错误'){
						this.show_err_msg = "密码错误";
						this.animate_err();
					}else if(data.data.msg == '系统错误'){
						this.show_err_msg = "系统暂时出错，快去通知管理员！";
						this.animate_err();
					}
				})
				;
			},
			// 未成功登陆时 触发shake的动画效果
			animate_err: function(){
				this.loginErr = true;
				$('.input_login').addClass('animated shake input_err_style');				
				setTimeout(function(){
					$('.input_login').removeClass('animated shake input_err_style');
					this.loginErr = false;
				},1500);
			}
		},
		mounted(){
			// console.log(window.element);
		}
	}
</script>

<style type="text/css">
	#contenter{
		border:1px solid #e1e1e1;
		/*margin-top: 5%;*/
		/*margin-left: 60%;*/
		box-shadow: 5px 5px 5px #e3e3e3;
	}
	.layui-tab-title{
		width: 100%;
	}
	.layui-tab-title li {
		width: 50%;
		border:1px solid #e6e6e6;

	}
	
	.layui-this{
		/*box-shadow: 10px 10px 5px #eee;*/
	}

	#btn_login{
		/*border:1px solid red;*/
		text-align: right;
		margin-top: 35px;
	}

	.input_err_style{
		color: red;
		border:1px solid red;
	}

	#show_err_msg{
		display:inline-block;
		width:100%;
		text-align:center;
		line-height:26px;
		color:red;
	}

	#login_header{
		width: 100%;
		height: 55px;
		/*border:1px solid grey;*/
		/*background: #dcbdee;*/
		background: #ebf4f3;
		/*opacity: 0.8;*/
		/*background: #dd4b39;*/
		/*color: white;*/
		box-sizing: border-box;
		padding: 10px 125px;
		line-height: 35px;
		font-size: 20px;
	}
	#login_header p{
		opacity: 1;
	}
	#login_footer{
		width: 100%;
		height: 40px;
		border:1px solid grey;
		position: fixed;
		bottom: 0px;
		text-align: center;
		line-height: 40px;
	}




	.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>