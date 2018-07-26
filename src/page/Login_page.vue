<template>
	<div class="row">
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
				show_err_msg: ''
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
				this.axios.post('/api/WustVolunteer/college/login.do',qs.stringify(data),{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				})
				.then((data) =>{
					if(data.data.status == 0){
						alert("Login_Ok");
						this.$router.push({path: '/'})
					}else if(data.data.status == 1){
						this.show_err_msg = "用户名不存在";
						this.animate_err();
					}else if(data.data.status == 2){
						this.show_err_msg = "无权限";
						this.animate_err();
					}else if(data.data.status == 3){
						this.show_err_msg = "密码错误";
						this.animate_err();
					}else if(data.data.status == 4){
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
		margin-top: 5%;
		margin-left: 60%;
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
</style>