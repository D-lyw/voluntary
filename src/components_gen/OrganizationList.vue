<template>
    <div class="content-wrapper" style="height:100%;overflow:scoll;">

				<div id="navigoto_div" >
					<el-breadcrumb separator-class="el-icon-arrow-right">
						 <el-breadcrumb-item :to="{ path: '/general/index' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
						 <el-breadcrumb-item>组织概览</el-breadcrumb-item>
						 <el-breadcrumb-item>组织管理</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				
				<div style="margin-top:15px;">

					<!-- <button class="layui-btn layui-btn-sm" style="float:right;margin-top:6px;">
							<span class="glyphicon glyphicon-export" aria-hidden="true">导出</span>
					</button> -->
					<el-select v-model="selectLevel" placeholder="请选择届别" @change="getOrganizationList()" size="small" style="width: 150px;">
						<el-option
						v-for="item in levellist"
						:key="item.value"
						:label="item.level"
						:value="item.level">
						</el-option>
					</el-select>
					<el-input
						    placeholder="按学号或姓名模糊查找"
						    v-model="search_content_header" style="display:inline-block;width:280px;float:right;margin-right:10px;margin-top:5px;" size="small">
						    <i slot="suffix" class="el-input__icon el-icon-search"  id="head_activity_search" @click="searchStudent(search_content_header)"></i>
					</el-input>
					<el-button type="info" plain size="small" @click="dialogVisible_add = true">添加组织</el-button>
					<!-- 添加组织 -->
					<el-dialog
								title="# 新建组织基本信息"
								:visible.sync="dialogVisible_add"
								width="40%"
								:before-close="beforeAddCloseDo">
									<el-form label-width="80px" style="width:80%;">
										<el-form-item label="组织名称">
											<el-input v-model="selectAddObj.name" size="small" placeholder="请输入一个合适的组织名称"></el-input>
										</el-form-item>
										<el-form-item label="负责人">
											<el-input v-model="selectAddObj.admin" size="small" placeholder="请填入有效的 负责人名称"></el-input>
											<span></span>
										</el-form-item>
										<el-form-item label="所属学院">
											<el-select v-model="selectAddObj.collegeId" placeholder="请选择组织所属学院，默认无所属学院" size="small" style="width:100%;">
												<el-option label=" 青年志愿者总队 (默认) " value="0"></el-option>
												<el-option v-for="item in collegeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
											</el-select>
										</el-form-item>
									</el-form>
							
									<span slot="footer" class="dialog-footer">
										<el-button @click="dialogVisible_add = false; selectAddObj = {};">取 消</el-button>
										<el-button type="primary" @click="addOrganization" >确 定</el-button>
									</span>
					</el-dialog>
					<!-- 搜索框展示搜索的结果 -->
					<el-dialog
						  title="搜索结果"
						  :visible.sync="dialogVisible"
						  width="40%"
						  :before-close="handleClose">
						  <table class="table" style="text-align:center;">
						  		<thead>
						  			<tr>
						  				<td>ID</td>
						  				<td>学号</td>
						  				<td>姓名</td>
										<td>工时</td>
						  				<td>班级</td>
						  				<td>学院</td>
						  			</tr>
						  		</thead>
						  		<tbody v-if="is_search_result">
						  			<tr v-for="(item, index) in search_result_list" :key="index">
						  				<td>{{index+1}}</td>
						  				<td><el-tag type="success" size="mini">{{item.studentNum}}</el-tag></td>
						  				<td>{{item.name}}</td>
										<td>{{item.volunteerTime}}</td>
						  				<td>{{item.className}}</td>
						  				<td>{{item.collegeName}}</td>
						  			</tr>
						  		</tbody>
						  		<tbody v-if="no_search_result">
						  			<tr> 没有找到相关志愿者信息 : ( </tr>
						  		</tbody>
						  </table>
						  
						  <span slot="footer" class="dialog-footer">
						    <!-- <el-button @click="dialogVisible = false" size="small">取 消</el-button> -->
						    <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
						  </span>
					</el-dialog>

				</div>

				<table class="table table-hover table-bordered" style="border-top:1.5px solid red;margin-top:15px;">
						<thead>
							<tr>
								<td>ID</td>
								<td>届别</td>
								<td>名称</td>
								<td>负责人</td>
								<td>所属学院</td>
								<td>总活动数</td>
								<td>总工时数</td>
								<td style="width: 14%;">操作</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in organizationList" :key="index">
								<td>{{item.organizationId}}</td>
								<td>{{item.level}}</td>
								<td>{{item.name}}</td>
								<td>{{item.admin}}</td>
								<td>{{item.collegeName}}</td>
								<td>{{item.activityNum}}</td>
								<td>{{item.volunteerTime}}</td>
								<td>
									<button class="layui-btn layui-btn-success layui-btn-xs" @click="dialogVisible_edit = true;selectObj = item;" ><i class="el-icon-edit"></i> &nbsp;编辑</button>
									<button class="layui-btn layui-btn-warm layui-btn-xs" @click="deleteOrganization(item.organizationId, item.level)" ><i class="el-icon-delete"></i>&nbsp;删除</button>
								</td>
							</tr>
							
						</tbody>
					</table>

					<el-dialog
						title="# 修改组织基本信息"
						:visible.sync="dialogVisible_edit"
						width="40%"
						:before-close="beforeCloseDo">
							<el-form label-width="80px" style="width:80%;">
								<el-form-item label="组织名称">
									<el-input v-model="selectObj.name" size="small"></el-input>
								</el-form-item>
								<el-form-item label="负责人">
									<el-input v-model="selectObj.admin" size="small"></el-input>
								</el-form-item>
								<el-form-item label="所属学院">
									<el-select v-model="selectObj.collegeId" placeholder="请选择组织所属学院，默认无所属学院" size="small" style="width:100%;">
										<el-option label=" 青年志愿者总队 (默认) " value="0"></el-option>
										<el-option v-for="item in collegeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="总活动数">
									<el-input v-model="selectObj.activityNum" size="small" disabled></el-input>
								</el-form-item>
								<el-form-item label="总工时数">
									<el-input v-model="selectObj.volunteerTime" size="small" disabled></el-input>
								</el-form-item>
							</el-form>
					
							<span slot="footer" class="dialog-footer">
								<el-button @click="dialogVisible_edit = false" size="mini">取 消</el-button>
								<el-button type="primary" @click="alterOrganization" size="mini">确 定</el-button>
							</span>
					</el-dialog>

				
				
				<!-- Pegination -->
				 <el-pagination
					      @current-change="getOrganizationList"
					      :current-page.sync="currentPage"
					      :page-size="pageSize"
					      layout="slot, prev, pager, next, jumper"
					      :total="TotalNum">
					      <slot ><span style='font-weight: 400;'># 共有 {{TotalNum}} 条组织信息，当前展示 {{startRow}} 到 {{endRow}} 条信息</span></slot>
			    </el-pagination>

	 	</div>
</template>

<script>
import qs from 'qs';

    export default{
        name: 'OrganizationList',
        data () {
            return {
				levellist: [],
				selectLevel: '',

				pageSize: 10,
				currentPage: 1,
				TotalNum: 0,
				startRow: 0,
				endRow: 0,

				search_content_header: '',

				organizationList: [],
				
				collegeList: [],

				// dialog 相关
				dialogVisible: false,
				search_result_list: [],

				is_search_result: false,
				no_search_result: false,

				// dialogVisible_edit相关
				dialogVisible_edit: false,
				selectObj: {},

				// dialogVisible_add相关
				dialogVisible_add: false,
				selectAddObj: {},
            }
        },
        mounted(){
			this.getLevelList();
			this.getCollegeList();
        },
        methods: {
			/**
			 * [getLevelList 获届别列表接口]
			 * @enum [6]
			 * @return {[type]} [description]
			 */
			getLevelList:function(){
					this.axios.post('/WustVolunteer/general/getLevelList.do',{
						headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then((data) => {
						this.levellist = data.data.data;
						this.selectLevel = data.data.data[data.data.data.length - 1].level;
						this.getOrganizationList();
					}).catch(err => {
						console.log(err);
					})
			},

			/**
			 * [获取组织列表]
			 * @param level
			 */
			getOrganizationList:function(){
					let data = {
						level: this.selectLevel,
						pageNum: this.currentPage,
						pageSize: this.pageSize
					}
					this.axios.post('/WustVolunteer/general/getOrganizationList.do',qs.stringify(data),{
						headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then((data) => {
						this.organizationList = data.data.data.list;
						this.startRow = data.data.data.startRow;
						this.endRow = data.data.data.endRow;
						this.TotalNum = data.data.data.total;
					}).catch(err => {
						console.log(err);
					})
			},
			
			/**	
			 * (修改组织信息)
			 */
			alterOrganization: function(){
				this.dialogVisible_edit = false;
				let data = {
					organizationId: this.selectObj.organizationId,
					name: this.selectObj.name,
					admin: this.selectObj.admin,
					collegeId: this.selectObj.collegeId,
					level: this.selectObj.level
				};
				this.axios.post('/WustVolunteer/general/alterOrganization.do',qs.stringify(data),{
						headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then((data) => {
						if(data.data.status == 0){
							this.$message({
								message: '修改组织信息成功!',
								type: "success",
								duration: 2000,
								showClose: true,
								customClass: 'user_sytle_for_volunteerlist',
							});
							this.getOrganizationList();
						}else{
							this.$message({
								message: data.data.msg,
								type: "error",
								duration: 2000,
								showClose: true,
								customClass: 'user_sytle_for_volunteerlist',
							});
						}
						this.selectObj = {};
					}).catch(err => {
						console.log(err);
						this.$message({
								message: '修改接口出错!',
								type: "error",
								duration: 2000,
								showClose: true,
								customClass: 'user_sytle_for_volunteerlist',
						});
						this.selectObj = {};
					})
			},

			/**		
			 * (删除组织)
			 * @description
			 * @param organiztionId
			 * @param level 
			 */
			deleteOrganization: function(organizationId, level){
				let data = {
					organizationId: organizationId,
					level: level
				};
				this.$confirm('此操作将删除该组织, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.axios.post('/WustVolunteer/general/deleteOrganization.do',qs.stringify(data),{
								headers:{
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then((data) => {
							if(data.data.status == 0){
								this.$message({
									message: '删除组织信息成功!',
									type: "success",
									duration: 2000,
									showClose: true,
									customClass: 'user_sytle_for_volunteerlist',
								});
								this.getOrganizationList();
							}else{
								this.$message({
									message: '删除组织信息失败!',
									type: "error",
									duration: 2000,
									showClose: true,
									customClass: 'user_sytle_for_volunteerlist',
								});
							}
						}).catch(err => {
							this.$message({
								type: 'info',
									message: '删除出错',
									offset: '35px',
									customClass: 'user_sytle_for_volunteerlist',
									duration: 2000
							});
						})	
							
				}).catch(() => {
					this.$message({
							type: 'info',
							message: '已取消删除',
							offset: '35px',
							customClass: 'user_sytle_for_volunteerlist',
							duration: 2000
					});          
				});
			},

			/**
			 * (添加组织信息)
			 */
			addOrganization: function(){
				this.dialogVisible_add = false;
				if(this.selectAddObj.admin == undefined || this.selectAddObj.name == undefined){
					this.$message({
							message: '请将信息填写完整!',
							type: "info",
							duration: 2000,
							showClose: true,
							customClass: 'user_sytle_for_volunteerlist',
						});
					return ;
				}
				if((typeof this.selectAddObj.collegeId).toString() == "number"){
				}else{
					this.selectAddObj.collegeId = 0;
				}
				let data = {
					name: this.selectAddObj.name,
					admin: this.selectAddObj.admin,
					collegeId: this.selectAddObj.collegeId
				};

				this.axios.post('/WustVolunteer/general/addOrganization.do',qs.stringify(data), {
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(data => {
					if(data.data.status == 0){
						this.$message({
							message: '添加组织信息成功!',
							type: "success",
							duration: 2000,
							showClose: true,
							customClass: 'user_sytle_for_volunteerlist',
						});
						this.getOrganizationList();
					}else{
						this.$message({
							message: data.data.msg,
							type: "error",
							duration: 2000,
							showClose: true,
							customClass: 'user_sytle_for_volunteerlist',
						});
					}
				}).catch(err => {
					this.$message({
							message: '添加组织信息出错!',
							type: "error",
							duration: 2000,
							showClose: true,
							customClass: 'user_sytle_for_volunteerlist',
						});
					console.log(err);
				})
				this.selectAddObj = {};
			},

			/**
			 * @description 获取学院列表
			 */
			getCollegeList: function(){
				this.axios.post('/WustVolunteer/general/getCollegeList.do',{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(data => {
					// console.log(data);
					this.collegeList = data.data.data;
				}).catch(err => {
					console.log(err);
				})
			},

			/**
			 * [searchStudent 模糊查询志愿者]
			 * @enum {[type]}  【29】
			 * @param  {[type]} msg [查询字段(学号或姓名)只可查询本学院志愿者]
			 * @return {[type]}     [description]
			 */
			searchStudent: function(msg){
					if(msg == ''){
						return ;
					}
					this.dialogVisible = true;
					let data = { 
						msg: msg
					};

					this.axios.post('/WustVolunteer/general/searchStudent.do',qs.stringify(data),{
						headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then((data) => {
						if(data.data.data.length >= 1){  					// 查询的结果不为空
							this.is_search_result = true;
							this.no_search_result = false;
							this.search_result_list = data.data.data;
						}else{
							this.is_search_result = false;
							this.no_search_result = true;
						}
						
					}).catch((err) => {
						console.log(err);
					})
					this.search_content_header = '';
			},

			handleClose(){
					    	this.is_search_result = false;
					    	this.no_search_result = false;
					    	this.search_content_header = '';
					    	this.dialogVisible = false;
						},
			beforeCloseDo(){
				this.selectObj = {};
			},

			beforeAddCloseDo(){
				this.selectAddObj = {};
			}
        }
    }
</script>

<style>
	.content-wrapper{
		padding:15px 20px;
		background: #f1f4f6;
		background: #ffffff;
	}
	.user_sytle_for_volunteerlist{
		margin-top:30px;
	}
	#head_activity_search:hover{
		cursor: pointer;
	}
</style>
