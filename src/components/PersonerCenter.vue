<template>
		 	<div class="content-wrapper" style="height:100%;overflow-y:auto;overflow-x:hidden;">
			<div style="margin-bottom:20px;">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					 <el-breadcrumb-item :to="{ path: '/home/introduce' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
					 <el-breadcrumb-item>个人中心</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="row " >
						<div class="col-md-1"></div>
						<div class=" col-md-4 " id="personBox" style="height:700px;">
					            <div class="panel-heading" >
					               <em> # 个人基本信息 #</em>           
					            </div>

					            <div class="panel-body">

					                <div  data-toggle="validator"  class="nice-validator n-default n-bootstrap" novalidate="novalidate">
					               
					                    <div class="box-body box-profile">
					                        
					                        <div class="profile-avatar-container">
					                        	<el-tooltip class="item" effect="dark" content="项目开发人力、时间有限,尚未开通上传头像功能，敬请期待！" placement="right">
					                            	<img class="profile-user-img img-responsive img-circle plupload" src="../../static/img/avatar.png">
					                            </el-tooltip>
					                        </div>
					                        
					                        <h3 class="profile-username text-center"><span>{{userName}}</span>&nbsp;--&nbsp;<span>{{authority}}</span></h3>

					                        <p class="text-muted text-center">{{connectWay}}</p>
					                        <br>
					                        <div style="">
					                        <div class="row form-group ">
					                        		<div class="col-md-6">
					                        				<label for="username" class="control-label">学号:</label>
					                           				<input type="text" class="form-control" value="201613136023" readonly style="text-align: center; background: transparent;">
					                        		</div>
					                        		<div class="col-md-6">
					                        				<label for="username" class="control-label">工时:</label>
					                            			<input type="text" class="form-control"  value="13"  style="text-align: center;background: transparent;" readonly v-model="userWorkTime">
					                        		</div>
					                        </div>
					                        <div class="form-group has-success">
					                            <label>姓名:</label>
					                            <input type="text" class="form-control" v-model="userName" style="background:transparent;" readonly>
					                        </div>
					                        <div class="form-group has-success">
					                            <label >联系方式:</label>
					                            <input type="text" class="form-control" v-model="connectWay" style="background:transparent;"  readonly>
					                        </div>
					                        <div class="form-group has-success">
					                            <label >所属学院:</label>
					                            <input type="text" class="form-control" style="background:transparent;"  readonly v-model='userCollegeName'>
					                        </div>
					                        <div class="form-group has-success">
					                            <label >所属班级:</label>
					                            <input type="text" class="form-control" style="background:transparent;"  readonly v-model="userClassName">
					                        </div>
					                        <div class="form-group" id="form_group_btn">
						                            <button  class="btn btn-success" @click="dialogVisible = true">修改密码</button>
						                           <!--  <el-popover
														  placement="buttom-start"
														  width="500"
														  trigger="click"
														  content="如遇转专业、留级等需要 修改学院、班级的情况，需院队管理员进行操作">
														    <el-button slot="reference" size="small" >更多</el-button>
						                        	</el-popover> -->
					                        </div>
											</div>
											
					                    </div>
					                </div>
           						</div>
        				</div>
						

        				<div class="col-md-6" style="padding: 10px 20px;background: white;margin-left: 30px;">
			        
			            	 <el-tabs  >
								    <el-tab-pane label="近期操作记录" name="first" style="background: white;">
								    		<table class="table table-bordered table-hover" id="personerCenterTable" >
								    				<thead  align="center">
								    						<tr>
								    							<th>ID</th>
								    							<th>操作人</th>
								    							<th>操作时间</th>
								    							<th>操作类型</th>
								    						</tr>
								    				</thead>
								    				<tbody>
								    						<tr v-for="item in show_list_msg" :key="item.id">
								    							<td>{{item.id}}</td>
								    							<td>{{item.stuName}}</td>
								    							<td>{{item.time}}</td>
								    							<td>{{item.operation}}</td>
								    						</tr>
								    				</tbody>
								    		</table>

								    		<span id="show_recent_record"># 共展示 {{show_list_num}} 条你的操作记录 </span>
								    		<span id="last_login">最近一次登陆：{{last_login}}</span>
								    </el-tab-pane>
							  </el-tabs>
			        
						</div>
			</div>

			<el-dialog title="修改密码"  :visible.sync="dialogVisible"  width="35%" >
							  
							<div class="row"> 
									<div class="col-md-2">原密码:</div>
									<div class="col-md-8"><input type="password" class="form-control" v-model='old_pw'></div>
									<!-- 未提供判断原密码正确与否的接口，暂不能判断 -->
									<!-- <div class="col-md-2" v-show="show_old_pw">
											<span><i class="fa fa-check"></i></span>
											<span><i class="fa fa-error"></i></span>
									</div> -->
							</div><br/>
							<div class="row"> 
									<div class="col-md-2">新密码:</div>
									<div class="col-md-8"><input type="password" class="form-control" v-model="i_new_pw"></div>
									
							</div><br/>
							<div class="row"> 
									<div class="col-md-2" style="width:100px;margin-left:-12px;">确认密码:</div>
									<div class="col-md-8"><input type="password" class="form-control" v-model="i_check_new_pw"></div>
									<div class="col-md-2" v-show="check_new_pw">
											<span><i class="fa fa-check"></i></span>
											<span><i class="fa fa-error"></i></span>
									</div>
							</div>

							  <span slot="footer" class="dialog-footer">
							    <el-button @click="dialogVisible = false">取 消</el-button>
							    <el-button type="primary" @click="UpdatePW">确 定</el-button>
							  </span>
			</el-dialog>

       </div>
</template>

<script type="text/javascript">
import qs from 'qs'
		export default{
				name: 'PersonerCenter',
				data () {
					return {
						dialogVisible: false,
						show_old_pw: false,
						check_new_pw: false,
						i_new_pw: '',
						i_check_new_pw: '',
						old_pw: '',


						last_login: '',
						show_list_num: 0,
						show_list_msg: [],

						//基本信息
						userName: '',
						userNum: '',
						authority: '',
						connectWay: '',
						userWorkTime: '',
						userCollegeName: '',
						userClassName: ''
					}
				},
				mounted(){
					// 判断是否已登陆
					this.axios.post('/WustVolunteer/college/checkLogin.do')
							.then((data) => {
								// 转跳登陆页面
								if(data.data.status == 1){
									this.$router.push({path: '/'});
								}

								if(data.data.data.roll == 1){
									this.authority = "院队管理员"
								}else if(data.data.data.roll == 4){
									this.authority = "工时管理员"
								}
								this.last_login = data.data.data.lastLogin;

								var sendmsg = {
									msg: data.data.data.stuNum
								}

								// 获取该用户的详细信息
								this.axios.post('/WustVolunteer/college/searchStudent.do', qs.stringify(sendmsg), {
									headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
								}).then((data) => {
									this.userName = data.data.data[0].name;
									this.connectWay = data.data.data[0].phone;
									this.userNum = data.data.data[0].studentNum;
									this.userWorkTime = data.data.data[0].volunteerTime;
									this.userCollegeName = data.data.data[0].collegeName;
									this.userClassName = data.data.data[0].className;
								})

								// 获取用户的操作记录情况
								var sendmsgRecord = {
									pageNum: 1,
									pageSize: 100
								}
								this.axios.post('/WustVolunteer/college/getOperationRecord.do', qs.stringify(sendmsgRecord),{
									headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
								}).then((data) => {
									for(var i = 0; i < data.data.data.list.length; i++){
										if(data.data.data.list[i].stuNum == this.userNum){
											this.show_list_num += 1;
											var obj = data.data.data.list[i];
											obj.id = i;
											this.show_list_msg.push(obj);
										}
										if(this.show_list_num >= 7){
											break ;
										}
									}
								})
					})

				},

				methods:{
						// -----修改密码-----
						UpdatePW: function(){
							// 判断三个输入框是否填写完整
							if(this.old_pw == '' || this.i_new_pw == '' || this.i_check_new_pw == ''){
								this.dialogVisible = false;    // 将操作面板隐藏
								this.$message({
						            type: 'info',
						            message: '请将信息填写完整！'
						        }); 
								return ;
							}
							// 核对原密码是否正确     （接口暂未提供）
							// this.axios.post('/WustVolunteer/college/checkLogin.do')
							// .then((data) => {
							// 	console.log(data);
							// })

							// 判断两次输入的新密码是否相同  (时间有限判断新密码是否正确的小图标提示未实现 @9月7号)
							if(this.i_check_new_pw != this.i_new_pw){
								this.dialogVisible = false;    // 将操作面板隐藏
								this.$message({
						            type: 'error',
						            message: '两次输入的密码不同！！'
						        }); 
								return ;
							}

							// 确认框，确认是否删除？
							this.$confirm('确认修改此密码？', '提示', {
					          confirmButtonText: '确定',
					          cancelButtonText: '取消',
					          type: 'warning'
					        }).then(() => {					//确认删除的回调
						        	this.dialogVisible = false;    // 将操作面板隐藏
						        	// 将更新后的密码传给后台
						        	var data = {
						        		passwordNew: this.i_new_pw
						        	}
						        	this.axios.post('/WustVolunteer/college/resetPassword.do',qs.stringify(data),{
						        		headers:{	
											'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
										}
						        	}).then((data) =>{
						        		if(data.data.status == 0){
						        			this.$message({
									            type: 'success',
									            message: '删除成功!'
									        });
						        		}else{
						        			this.$message({
									            type: 'error',
									            message: '修改失败!'
									        });
						        		}
						        	})
					          	
					        }).catch(() => {				//取消的回调
					        	this.dialogVisible = false;
						        this.$message({
						            type: 'info',
						            message: '已取消修改'
						        });          
					        });
						},
				}
		}
</script>

<style type="text/css">
.content-wrapper{
background: #f1f4f6;
padding: 15px 20px;
}

#form_group_btn{
	text-align:right;
}

.col-md-2{
	text-align: right;
	line-height: 35px;
}

#personerCenterTable{
	text-align: center;
}

#personBox{
	background: white;
	border-top: 2.5px solid #00a65a;
	border-radius: 4px;
}

#show_recent_record{
	font-size: 14px;
}

#last_login{
	float:right;
	margin-right: 0px;
	font-size: 13px;
}
</style>