<template>
	<div class="content-wrapper" style="height:800px;overflow-y:auto;overflow-x:hidden;">	
		<!-- <span class="layui-breadcrumb navigoto " >
		  <i class="fa fa-home" style="opacity:0.8;color:#333;font-size:16px;"></i>&nbsp;
		  <router-link to="/">&nbsp;&nbsp;主页</router-link>
		  <router-link to=""></router-link>
		  <router-link to=""><cite>人员权限</cite></router-link>
		</span>
		 -->
		<div  >
			<el-breadcrumb separator-class="el-icon-arrow-right">
				 <el-breadcrumb-item :to="{ path: '/home/introduce' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
				 <el-breadcrumb-item>系统操作</el-breadcrumb-item>
				 <el-breadcrumb-item>人员权限</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="contenter panel panel-default">
			<div class="panel-heading" style="background:#e8edf0;bordre:1px solid #e8edf0;">
				<em>计算机科学与技术学院 </em><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:13px;">院队负责人 - 某某某</span>
				<!-- <p>dkj dskfajidsajfdsjfkdjs dsfaj;d</p>      -->
			</div>
			<div class="panel-body">
				<div class="btn_group">
					<button class="btn btn-sm btn_refresh" style="background:#1a242f;" title="刷新" @click="refresh" >
						<i class="fa fa-refresh" aria-hidden="true" style="color:white;"></i> 
					</button>
					<button class="btn btn-sm" style="background:#18bc9c; color:white;" @click="dialogFormVisible = true">
						<i class="fa fa-plus" aria-hidden="true"></i> 
						添加
					</button>
					<button class="btn btn-sm" style="background:#ef8b81; color:white;">
						<i class="fa fa-trash" aria-hidden="true"></i> 
						删除
					</button>
					<div style="display:inline-block;float:right;">
						<el-input v-model="input_search" placeholder="请输入内容" size="small" clearable style="width:50%;display:inline-block;border-radius:0px;" class="input-with-select">
						</el-input>

						<el-button type="info" size="small"><i class="fa fa-search" title="搜索"></i></el-button>
						&nbsp;&nbsp;
						&nbsp;&nbsp;	

						<!-- Split button -->
						<div class="btn-group" style="display:inline-block;margin-top:-1px;">
						  <button type="button" class="btn btn-sm" ><i class="glyphicon glyphicon-export icon-share"></i>&nbsp;&nbsp;导出</button>
						  <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						    <span class="caret"></span>
						    <span class="sr-only">Toggle Dropdown</span>
						  </button>
						  <ul class="dropdown-menu dropdown-menu-right" style="width:70%;padding:3px 10px;">
						    <li><a href="#">JSON格式</a></li>
						    <li><a href="#">XLSX格式</a></li>
						    <li><a href="#">TXT格式</a></li>
						  </ul>
						</div>
					</div>
				</div>
				
				<!-- 添加管理员对话框 -->
				<el-dialog title="添加用户角色" :visible.sync="dialogFormVisible" style="width:80%;margin:auto;" >
				  <el-form :model="form">
					<div style="display:inline-block; width:100%;">
					    <el-input placeholder="请根据姓名或学号查询" v-model="input_key" class="input-with-select" >
						    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:100px;">
						      <el-option label="学号" value="1"></el-option>
						      <el-option label="姓名" value="2" disabled></el-option>
						    </el-select>
						    <el-button slot="append" icon="el-icon-search" @click="searchStudent"></el-button>
						</el-input>
					</div>
					<table class="find_person_msg table table-condensed table-hover ">
						<tbody v-if="show_search_result">
							<tr>
								<td>
									<el-tag
									  type="success" size="mini" color="#f1f4f5" >
									  {{result_obj.studentNum}}
									</el-tag>
								</td>
								<td>{{result_obj.name}}</td>
								<td>{{result_obj.className}}</td>
								<td>{{result_obj.collegeName}}</td>
							</tr>
						</tbody>
						<tbody v-if="show_search_error_result">
							<span>没有找到符合条件的志愿者信息 : (</span>
						</tbody>
					</table>
				    <el-form-item label="授予权限" :label-width="formLabelWidth">
				      <el-select v-model="form.region" placeholder="请选择授予权限类别">
				        <el-option label="学院管理员" value="1" disabled></el-option>
				        <el-option label="工时管理员" value="2"></el-option>
				      </el-select>
				    </el-form-item>

				  </el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false;input_key = '';adminlist = []">取 消</el-button>
				    <el-button type="primary" @click="addAdmin(result_obj.studentNum)" >确 定</el-button>
				  </div>
				</el-dialog>

				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<td><el-checkbox ></el-checkbox></td>
							<td>ID</td>
							<td>姓名</td>
							<td>学号</td>
							<td>年级</td>
							<td>权限</td>
							<td>上次登陆</td>
							<td>状态</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in adminlist">
							<td><el-checkbox v-model="checkone"	> </el-checkbox></td>
							<td>{{item.id}}</td>
							<td>{{item.stuName}}</td>
							<td>{{item.stuNum}}</td>
							<td>{{item.level}}</td>
							<td>{{item.roll}}</td>
							<td>{{item.lastLogin}} </td>
							
							
							<td><span class="layui-badge-dot layui-bg-green" size="big"></span><span style="color:green;">&nbsp;正常</span></td>
							<td>
								<span class="layui-badge layui-bg-green" >
									<i class="el-icon-edit"></i>
								</span>

								<span class="layui-badge layiui-bg-red btn_del" @click='deleteAdmin(item.id)' >
									<i class="el-icon-delete"></i>
								</span>
							</td>
						</tr>
						
					</tbody>
				</table>

				<span class="table_buttom_msg">
					# 共显示 {{count_list}} 条管理人员信息
				</span>

			</div>
		</div>
		
	</div>
</template>

<script type="text/javascript">
import qs from 'qs'
	export default{
		name: 'PeopleAuthority',
		data () {
			return {
				input_search:'',
				dialogTableVisible: false,
		        dialogFormVisible: false,
		        form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
				},
				select:"",
				input_key:'',


				formLabelWidth:'14%',


				show_search_result:false,
				result_obj: {},
				show_search_error_result: false,

				// adminlist
				adminlist: [],
				count_list: 0,

				checkone: []
			}
		},
		mounted(){
			this.axios.post('/WustVolunteer/college/checkLogin.do')
			.then((data) => {
				// 转跳登陆页面
				if(data.data.status == 1){
					this.$router.push({path: '/login'});
				}
			});

			this.getAmdinList();


		},
		methods:{
			addManager: function(){
				alert("show");
			},
			refresh: function(){
				this.$notify({      			//刷新提示框
		          type: 'success',
		          message: '刷新成功！',
		          duration: 2000,
		          customClass:'el-notification',
		          offset:40
		        });
			},
			savePerson: function(){			 // 在赋予人员权限，点击确实后触发
				this.$message({
		          message: '<i class="fa fa-check"></i>&nbsp;添加管理员操作成功！',
		          dangerouslyUseHTMLString: true,
		          iconClass: 'fa fa-right',
		          duration: 2000,
		          showClose: true,
		          customClass: 'user_style_savePerson'
		        });
			},
 

			/**
		       * [getAmdinList 获取管理员列表]
		       * @enum {[type]}   【9】
		       * @return {[type]} [null]
		       */
		    getAmdinList: function(){
		      		this.axios.post('/WustVolunteer/college/getAmdinList.do',{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      		}).then((data) => {
		      			console.log(data);
		      			this.adminlist = data.data.data;
		      			this.count_list = data.data.data.length;
		      		}).catch((err) => {
						console.log(err);
					})
		      		return ;
		    },

		    /**
		       * [deleteAdmin 删除管理员]
		       * ＠enum  [19]
		       * @param  {[type]} adminId [管理员ID]
		       * @return {[type]}         [description]
		       */
		    deleteAdmin: function(adminId){
		    	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
		        }).then(() => {
		        		let data = {
		      				adminId: adminId
			      		};

			      		this.axios.post('/WustVolunteer/college/deleteAdmin.do',qs.stringify(data),{
			      			headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
			      		}).then((data) => {
			      			console.log(data);
			      		}).catch((err) => {
							console.log(err);
						})

				        this.$message({
				            type: 'success',
				            message: '删除成功!'
				        });
		        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
		        });
		      		
		    },

		    /**
		       * [searchStudent 模糊查询志愿者]
		       * @enum {[type]}  【29】
		       * @param  {[type]} msg [查询字段(学号或姓名)只可查询本学院志愿者]
		       * @return {[type]}     [description]
		       */
		    searchStudent: function(){
		      		let data = {
		      			msg: this.input_key
		      		};

		      		this.axios.post('/WustVolunteer/college/searchStudent.do',qs.stringify(data),{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      		}).then((data) => {
		      			console.log(data);
		      			if(data.data.data.length == 1){  					// 查询的结果不为空
		      				this.show_search_result = true;
		      				this.show_search_error_result = false;
		      				this.result_obj = data.data.data[0];
		      			}else {
		      				this.show_search_error_result = true;
		      				this.show_search_result = false;
		      			}
		      			
		      		}).catch((err) => {
						console.log(err);
					})
		    },

		    /**
		       * [addAdmin 添加管理员]
		       * @enum {[type]} 	【18】
		       * @param {[type]} stuNum [description]
		       */
		    addAdmin: function(stuNum){
		    		// 关闭对话框
		    		this.dialogFormVisible = false;
		    		if(stuNum == undefined){
		    			return ;
		    		}
		      		let data = {
		      			stuNum: stuNum
		      		};

		      		this.axios.post('/WustVolunteer/college/addAdmin.do',qs.stringify(data),{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      		}).then((data) => {
		      			console.log(data);
		      			if(data.data.status == 0){
		      				this.savePerson();
		      			}else {
		      				alert("添加失败！");
		      			}
		      		}).catch((err) => {
						console.log(err);
					})

		      		this.input_key = '';
		      		this.adminlist = [];
		    },
		    
		}
	}
</script>
<style>
	@import '../../static/css/peopleauthority.css'
</style>