<template>
		 	<div class="content-wrapper" style="height:900px;overflow-y:auto;overflow-x:hidden;">
			<div style=" margin-bottom: 10px;">
				<span class="layui-breadcrumb navigoto " >
					  <i class="fa fa-home" style="opacity:0.8;color:#333;font-size:16px;"></i>&nbsp;
					  <router-link to="/">&nbsp;&nbsp;主页</router-link>
					  <router-link to=""><cite>个人中心</cite></router-link>
				</span>
			</div>
			<br>
			<div class="row animated fadeInRight">
						<div class="col-md-1"></div>
						<div class="box box-success col-md-4" >
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
					                        
					                        <h3 class="profile-username text-center"><span>张三</span>&nbsp;--&nbsp;<span>志愿者</span></h3>

					                        <p class="text-muted text-center">liuyuanwang4321@gmail.com</p>
					                        <br>
					                        <div class="row form-group ">
					                        		<div class="col-md-6">
					                        				<label for="username" class="control-label">学号:</label>
					                           				<input type="text" class="form-control" value="201613136023" readonly style="text-align: center; background: transparent;">
					                        		</div>
					                        		<div class="col-md-6">
					                        				<label for="username" class="control-label">工时:</label>
					                            			<input type="text" class="form-control"  value="13"  style="text-align: center;background: transparent;" readonly>
					                        		</div>
					                        </div>
					                        <div class="form-group has-success">
					                            <label for="username" class="control-label">姓名:</label>
					                            <input type="text" class="form-control" value="张三">
					                        </div>
					                        <div class="form-group has-success">
					                            <label for="email" class="control-label">联系方式:</label>
					                            <input type="text" class="form-control" name="row[email]" value="liuyuanwang4321@gmail.com">
					                        </div>
					                        <div class="form-group has-success">
					                            <label for="nickname" class="control-label">所属学院:</label>
					                            <input type="text" class="form-control" value="计算机科学与技术学院">
					                        </div>
					                        <div class="form-group has-success">
					                            <label for="password" class="control-label">所属班级:</label>
					                            <input type="text" class="form-control" value="计科1801班">
					                        </div>
					                        <div class="form-group" id="form_group_btn">
						                            <button  class="btn btn-success" @click="EditPassW">修改密码</button>
						                            <el-popover
														  placement="buttom-start"
														  width="500"
														  trigger="click"
														  content="如遇转专业、留级等需要 修改学院、班级的情况，需院队管理员进行操作">
														    <el-button slot="reference" size="small" >更多</el-button>
						                        	</el-popover>
					                        </div>

											
					                    </div>
					                </div>
           						 </div>
        				</div>
						
						

        				<div class="col-md-6" style="padding: 10px 20px;background: white;margin-left: 30px;">
						        
						            	 <el-tabs  >
											    <el-tab-pane label="最近操作记录" name="first" style="background: white;">
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
											    						<tr>
											    							<td>7</td>
											    							<td>张三</td>
											    							<td>2018-10-12 19:34:09</td>
											    							<td>活动认证申请</td>
											    						</tr>
											    				</tbody>
											    		</table>

											    		<span># 共展示最近7条操作记录</span>
											    </el-tab-pane>
										  </el-tabs>
						        
						</div>
						
						

			</div>

			<el-dialog title="修改密码"  :visible.sync="dialogVisible"  width="30%"  :before-close="handleClose">
							  
							<div class="row"> 
									<div class="col-md-2">原密码:</div>
									<div class="col-md-8"><input text="text" class="form-control"></div>
									<div class="col-md-2">
											<span><i class="fa fa-check"></i></span>
											<span><i class="fa fa-error"></i></span>
									</div>
							</div><br/>
							<div class="row"> 
									<div class="col-md-2">原密码:</div>
									<div class="col-md-8"><input text="text" class="form-control"></div>
									<div class="col-md-2" style="text-align:left;">牢记密码</div>
							</div><br/>
							<div class="row"> 
									<div class="col-md-2">确认密码:</div>
									<div class="col-md-8"><input text="text" class="form-control"></div>
									<div class="col-md-2">
											<span><i class="fa fa-check"></i></span>
											<span><i class="fa fa-error"></i></span>
									</div>
							</div>

							  <span slot="footer" class="dialog-footer">
							    <el-button @click="dialogVisible = false">取 消</el-button>
							    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
							  </span>
			</el-dialog>

       </div>
</template>

<script type="text/javascript">
		export default{
				name: 'PersonerCenter',
				data () {
						return {
								dialogVisible: false,
						}
				},
				methods:{
						EditPassW: function () {
								this.dialogVisible = true;
						},

						 handleClose(done) {
					        this.$confirm('确认修改？')
					          .then(_ => {
					            done();
					          })
					          .catch(_ => {});
					    }
				}
		}
</script>

<style type="text/css">
		@import '../../static/css/personercenter.css'
</style>