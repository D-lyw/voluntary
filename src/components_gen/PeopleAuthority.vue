<template>
	<div class="content-wrapper" style="height:100%;overflow-y:auto;overflow-x:hidden;">	
		<div  >
			<el-breadcrumb separator-class="el-icon-arrow-right">
				 <el-breadcrumb-item :to="{ path: '/general/index' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
				 <el-breadcrumb-item>系统操作</el-breadcrumb-item>
				 <el-breadcrumb-item>人员权限</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="contenter panel panel-default">
			<div class="panel-heading" style="background:#e8edf0;bordre:1px solid #e8edf0;height:45px;line-height:25px;">
				 # 总 / 院队管理负责人 概览
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
						<el-input v-model="input_search" placeholder="请输入内容" size="small" clearable style="width:80%;display:inline-block;border-radius:0px;" class="input-with-select">
						</el-input>

						<el-button type="info" size="small"><i class="fa fa-search" title="搜索"></i></el-button>
					</div>
				</div>
				
				<!-- 添加管理员对话框 -->
				<el-dialog title="添加用户角色" :visible.sync="dialogFormVisible" style="width:80%;margin:auto;"  >
				  <el-form :model="form">
					<div style="display:inline-block; width:100%;">
					    <el-input placeholder="请根据姓名或学号查询" v-model="input_key" class="input-with-select" >
						    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:130px;">
						      <el-option label="学号" value="1"></el-option>
						      <el-option label="姓名" value="2" disabled></el-option>
						    </el-select>
						    <el-button slot="append" icon="el-icon-search" @click="searchStudent">查询</el-button>
						</el-input>
					</div>
					<table class="find_person_msg table table-condensed table-hover ">
						<tbody v-if="show_search_result">
							<tr>
								<td>学号</td>
								<td>姓名</td>
								<td>班级</td>
								<td>工时</td>
								<td>学院</td>
							</tr>
							<tr>
								<td>
									<el-tag
									  type="success" size="mini" color="#f1f4f5" >
									  {{result_obj.studentNum}}
									</el-tag>
								</td>
								<td>{{result_obj.name}}</td>
								<td>{{result_obj.className}}</td>
								<td>{{result_obj.volunteerTime}}</td>
								<td>{{result_obj.collegeName}}</td>
							</tr>
						</tbody>
						<tbody v-if="show_search_error_result">
							<span>没有找到符合条件的志愿者信息 : (</span>
						</tbody>
					</table>

				    授予权限：
					<el-cascader
					    expand-trigger="hover"
					    :options="options"
					    v-model="selectedOptions"
					    style="width:300px;"
					    >
					</el-cascader>

				  </el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false;input_key = '';adminlist = []; result_obj = {}">取 消</el-button>
				    <el-button type="primary" @click="addAdmin(result_obj.studentNum)" >确 定</el-button>
				  </div>
				</el-dialog>


				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<td>ID</td>
							<td>姓名</td>
							<td>学号</td>
							<td>届别</td>
							<td>权限</td>
							<td>负责组织</td>
							<td>上次登陆</td>
							<td>状态</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in adminlist" :key="item.id">
							<td>{{item.id}}</td>
							<td>{{item.stuName}}</td>
							<td>{{item.stuNum}}</td>
							<td>{{item.level}}</td>
							<td>{{item.roll}}</td>
							<td>{{item.organizationName}}</td>
							<td>{{item.lastLogin}} </td>										
							<td><span class="layui-badge-dot layui-bg-green" size="big"></span><span style="color:green;">&nbsp;正常</span></td>
							<td>
								<span class="layui-badge layiui-bg-red btn_del" @click='deleteAdmin(item.id)' >
									<i class="el-icon-delete"></i>
								</span>
							</td>
						</tr>
						
					</tbody>
				</table>

				<!-- Pegination -->
				 <el-pagination
					      @current-change="getAdminList()"
					      :current-page.sync="pageNum"
					      :page-size="pageSize"
					      layout="slot, prev, pager, next, jumper"
					      :total="count_list">
					      <slot ><span style='font-weight: 400;'># 共 {{count_list}} 条数据，当前展示 {{startRow}} 到 {{endRow}} 条数据</span></slot>
			    </el-pagination>
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
				startRow: 0,
				endRow: 0,

				pageNum: 1,
				pageSize: 10,

				checkone: [],

				collegeAdmim: '',
				collegeAdmimId: '',
				organizationName: '',
				collegeAdmimlevel: '',

				//级联 添加志愿者
				options: [
					{
						value: '2',
						label: '总队管理员',
						children: [{
							value: '0',
							label: '青年志愿者总队'
						}]
					},{
						value: '3',
						label: '总队工时管理员',
						children: [{
							value: '0',
							label: '青年志愿者总队',
						}]
					},{
						value: '1',
						label: '院队管理员',
						children: [
							
						]
					}
				],
				selectedOptions: [],
			}
		},
		mounted(){
			this.getAdminList();
			this.getOrganization();
		},
		methods:{
			/**
			 * @description 刷新提示框
			 */
			refresh: function(){
				this.getAdminList();
				this.$notify({      			
		          type: 'success',
		          message: '刷新成功！',
		          duration: 2000,
		          customClass:'el-notification',
		          offset:40
		        });
			},
   
			/**
		       * [getAdminList 获取总队管理员列表]
		       * @enum {[type]}   
		       * @return {[type]}
		       */
		    getAdminList: function(){
					let data = {
						pageNum: this.pageNum,
						pageSize: this.pageSize
					} ;

		      		this.axios.post('/WustVolunteer/general/getAdminList.do',qs.stringify(data),{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      		}).then((data) => {
						this.startRow = data.data.data.startRow;
						this.endRow = data.data.data.endRow;
						this.adminlist = data.data.data.list;
						this.count_list = data.data.data.total;
		      			for(var i = 0; i < data.data.data.list.length; i++){
							switch(data.data.data.list[i].roll) {
								case 0: this.adminlist[i].roll = '超级管理员'; break;
								case 1: this.adminlist[i].roll = '院队管理员'; break;
								case 2: this.adminlist[i].roll = '总队管理员'; break;
								case 3: this.adminlist[i].roll = '总队工时管理员'; break;
							}
								
		      			}
		      		}).catch((err) => {
						this.$message({
				            type: 'error',
				            message: '获取管理员列表失败!',
				            customClass: 'user_sytle_for_volunteerlist',
				        });
					})
		    },

		    /**
		       * [deleteAdmin 删除管理员]
		       * ＠enum  [19]
		       * @param  {[type]} adminId [管理员ID]
		       * @return {[type]}         [description]
		       */
		    deleteAdmin: function(adminId){
		    	if(adminId == this.collegeAdmimId){
		    		this.$message({
				            type: 'error',
				            message: '删除失败!,无权限删除管理员信息',
				            customClass: 'user_sytle_for_volunteerlist',
				            duration: 2000
				        });
		    		return ;
		    	}
		    	this.$confirm('此操作将删除该人员的权限, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
		        }).then(() => {
		        		let data = {
		      				adminId: adminId
			      		};
			      		this.axios.post('/WustVolunteer/general/deleteAdmin.do',qs.stringify(data),{
			      			headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
			      		}).then((data) => {
			      			if (data.data.status == 0) {
			      				this.$message({
						            type: 'success',
						            message: '删除成功!',
						            customClass: 'user_sytle_for_volunteerlist',
						            duration: 2000
						        });
						        this.getAdminList();
			      			}else if(data.data.status == 1){
			      				this.$message({
						            type: 'error',
						            message: '删除失败!,无权限进行此操作',
						            customClass: 'user_sytle_for_volunteerlist',
						            duration: 2000
						        });
			      			}
			      		}).catch((err) => {
							console.log(err);
							this.$message({
						            type: 'error',
						            message: '删除失败!',
						            customClass: 'user_sytle_for_volunteerlist',
						            duration: 2000
						    });
						})
		        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除',
			            customClass: 'user_sytle_for_volunteerlist',
			            duration: 2000
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
		      		this.axios.post('/WustVolunteer/general/searchStudent.do',qs.stringify(data),{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      		}).then((data) => {
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
		       * [addAdmin 添加总队管理员]
		       * @param roll 	权限级别
			   * @param organizationId 组织ID
		       * @param {[type]} stuNum [description]
		       */
		    addAdmin: function(stuNum){
		    		// 关闭对话框
		    		this.dialogFormVisible = false;
		    		if(stuNum == undefined){
		    			return ;
		    		}
		      		let data = {
						  stuNum: stuNum,
						  roll: this.selectedOptions[0],
						  organizationId: this.selectedOptions[1]
		      		};

		      		this.axios.post('/WustVolunteer/general/addAdmin.do',qs.stringify(data),{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      		}).then((data) => {
		      			if(data.data.status == 0){
		      				this.$message({
								message: '<i class="fa fa-check"></i>&nbsp;添加管理员操作成功！',
								dangerouslyUseHTMLString: true,
								iconClass: 'fa fa-right',
								duration: 2000,
								showClose: true,
								customClass: 'user_style_savePerson'
							});
		      				this.getAdminList();
		      			}else {
		      				this.$message({
					            type: 'error',
					            message: '添加失败!无权限进行此操作或该账户已存在',
					            customClass: 'user_sytle_for_volunteerlist',
					            duration: 2000,
				        	});
		      			}
		      		}).catch((err) => {
						console.log(err);
						this.$message({
				            type: 'error',
				            message: '添加失败!',
				            customClass: 'user_sytle_for_volunteerlist',
				            duration: 2000,
				        });
					})

		      		this.input_key = '';
		      		this.result_obj = {};
		      		this.show_search_result = false;
		      		this.show_search_error_result = false;
		    },
			
			/**
			 * @description 获取本届所有组织id和名称 & 将其数据传入option数组中
			 * 
			 */
			getOrganization: function(){
				this.axios.post('/WustVolunteer/general/getOrganization.do',{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      	}).then((data) => {
					  var data_length = data.data.data.length;
					  for(let i=0; i < data_length; i++){
						  let opt = {};
						  opt.label = data.data.data[i].name;
						  opt.value = data.data.data[i].id;
						  this.options[2].children.push(opt);
					  }
				}).catch(err => {
					console.log(err);
				})
			}

		}
	}
</script>
<style>
	@import '../../static/css/peopleauthority.css';
</style>