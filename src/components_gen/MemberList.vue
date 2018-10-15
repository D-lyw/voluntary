<template>
	 	<div class="content-wrapper" style="">

				<div id="navigoto_div" >
					<el-breadcrumb separator-class="el-icon-arrow-right">
						 <el-breadcrumb-item :to="{ path: '/general/memberlist' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
						 <el-breadcrumb-item>系统记录</el-breadcrumb-item>
						 <el-breadcrumb-item>委员列表</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				
				<div style="margin-top:15px;margin-bottom: 5px;">
					<el-select v-model="select_value"  placeholder="请选择" size="small" @change="getMemberList(select_value)">
					    <el-option
					      v-for="item in options_level"
					      :key="item.level"
					      :label="item.level"
					      :value="item.level"
						  >
					    </el-option>
					</el-select>
					&nbsp;&nbsp;
					<el-button type="success" size="small"  icon="el-icon-plus" @click="dialogVisible_add = true">添加委员</el-button>

					<!-- 添加委员对话框 -->
					<el-dialog
							title="#添加委员#"
							:visible.sync="dialogVisible_add"
							width="40%"
							>

							<div class="row">
								<div class="col-md-2" style="text-align:right;line-height:200%;">学号:</div>
								<div class="col-md-6"><el-input size="small" clearbale @change="searchStudent(add_search_stu)" v-model="add_search_stu"></el-input></div>
								<div class="col-md-2">{{stuMsg_show}}</div>
							</div>
							<br>
							<div class="row">
								<div class="col-md-2" style="text-align:right;line-height:200%;">备注:</div>
								<div class="col-md-6"><el-input size="small" clearbale v-model="add_stu_do"></el-input></div>
							</div>

							<span slot="footer" class="dialog-footer">
								<el-button @click="dialogVisible_add = false" size="small">取 消</el-button>
								<el-button type="primary" @click="addCommittee" size="small">确 定</el-button>
							</span>
					</el-dialog>

					<el-input
						    placeholder="按学号或姓名模糊查找"
						    v-model="search_content_header" style="display:inline-block;width:280px;float:right;margin-right:10px;margin-top:0px;	" size="small">
						    <i slot="suffix" class="el-input__icon el-icon-search"  id="head_activity_search" @click="clickSearch"></i>
					</el-input>
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
						  				<td>班级</td>
										<td>工时</td>
						  				<td>学院</td>
						  			</tr>
						  		</thead>
						  		<tbody v-if="is_search_result">
						  			<tr v-for="(item, index) in search_result_list" :key="index">
						  				<td>{{index+1}}</td>
						  				<td><el-tag type="success" size="mini">{{item.studentNum}}</el-tag></td>
						  				<td>{{item.name}}</td>
						  				<td>{{item.className}}</td>
										<td>{{item.volunteerTime}}</td>
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
				<!-- Volunteer List table -->
				<table class="table table-hover" id="table_style">
						<thead>
								<tr class="success">
										<td>学号</td>
										<td>姓名</td>
										<td>学院</td>
										<td>班级</td>
										<td>年级</td>
										<td>联系方式</td>
										<td>工时</td>
										<td>备注</td>
										<td>操作</td>
								</tr>
						</thead>
						<tbody>
								<tr v-for="(item,index) in classStudentList" :key="index">
										<td>{{item.stuNum}}</td>
										<td>{{item.stuName}}</td>
										<td>{{item.collegeName}}</td>
										<td>{{item.className}}</td>
										<td>{{item.level}}</td>
										<td>{{item.phone}}</td>
										<td>{{item.volunteerTime}}</td>
										<td>{{item.msg}}</td>
										<td>
											<!-- <button class="layui-btn layui-btn-xs" >编辑</button>
											<button @click="Delete_one_volunteer(index)" class="layui-btn layui-btn-warm layui-btn-xs">删除</button> -->
											<el-button type="text" size="mini" @click="deleteCommittee(item.stuNum)">删除</el-button>
										</td>
								</tr>
						</tbody>
				</table>
				
				<!-- Pegination -->
				 <el-pagination
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPage"
					      :page-size="pageSize"
					      layout="slot, prev, pager, next, jumper"
					      :total="classTotalNum">
					      <slot ><span style='font-weight: 400;'># 共 {{classTotalNum}} 条数据，当前展示 {{startRow}} 到 {{endRow}} 条数据</span></slot>
			    </el-pagination>
	 	</div>
</template>

<script type="text/javascript">
import qs from 'qs';
		export default{
				name: 'MemberList',
				data () {
					return {
						select_value: 2018,
						options_level: [],

						currentPage: 1,
						pageSize: 12,
						classTotalNum: 0,
						startRow:0,
						endRow: 0,

						classStudentList: [],
						search_content_header: '',

						// 搜索dialog 相关
						dialogVisible: false,
						search_result_list: [],

						is_search_result: false,
						no_search_result: false,

						// 添加委员dialog对话框 相关
						dialogVisible_add: false,
						add_search_stu: '',
						stuMsg_show: '',
						add_stu_do: '',
					}
				},
				mounted(){
					this.getLevelList();
				},
				methods:{
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
					      			this.options_level = data.data.data;
									this.select_value = data.data.data[0].level;
									this.getMemberList(data.data.data[0].level);
					      		}).catch(err => {
									console.log(err);
								})
					    },


						handleCurrentChange(val) {
					        // this.getVolunteerByClassName(this.currentClass, this.pageSize, this.currentPage);
					    },

					    handleClose(){
					    	this.is_search_result = false;
					    	this.no_search_result = false;
					    	this.search_content_header = '';
					    	this.dialogVisible = false;
					    },

					    clickSearch(){
							// 展示对话框
							if(this.search_content_header == ''){
								return ;
							}
					    	this.dialogVisible = true;
					    	this.searchStudent(this.search_content_header);
					    	this.search_content_header = '';
					    },

					    /**
					       * [searchStudent 模糊查询志愿者]
					       * @enum {[type]}  【29】
					       * @param  {[type]} msg [查询字段(学号或姓名)只可查询本学院志愿者]
					       * @return {[type]}     [description]
					       */
					    searchStudent: function(msg){
					      		let data = { 
					      			msg: msg
					      		};

					      		this.axios.post('/WustVolunteer/general/searchStudent.do',qs.stringify(data),{
					      			headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
					      		}).then((data) => {
					      			console.log(data.data.data);
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

						},
						
						/**
						 * @description 获取委员列表
						 * @param level 
						 * @param pageNum
						 * @param pageSize
						 */
						getMemberList: function(level){
								let data = { 
									   level:parseInt(level),
									   pageNum: this.currentPage,
									   pageSize: this.pageSize
					      		};
					      		this.axios.post('/WustVolunteer/general/getCommitteeList.do',qs.stringify(data),{
					      			headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
					      		}).then((data) => {
									  this.classStudentList = data.data.data.list;
									  this.classTotalNum = data.data.data.total;
									  this.startRow = data.data.data.startRow;
									  this.endRow = data.data.data.endRow;
							})
						},

						/**
						 * @description 添加委员接口
						 * @param stuNum
						 * @param msg
						 */
						addCommittee: function(){
							let data = {
								stuNum: this.add_search_stu,
								msg: this.add_stu_do
							};
							this.dialogVisible_add = false;
							this.axios.post('/WustVolunteer/general/addCommittee.do',qs.stringify(data),{
					      			headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
							}).then((data) => {
								if(data.data.status == 0){
									this.$message({
										message: '添加委员成功!',
										type: "success",
										duration: 2000,
										showClose: true,
										customClass: 'user_sytle_for_volunteerlist',
									})
									this.getMemberList(this.select_value);
								}else{
									this.$message({
										message: data.data.msg,
										type: 'error',
										duration: 3000,
										showClose: true,
										customClass: 'user_sytle_for_volunteerlist'
									})
								}
							}).catch(err => {
								this.$message({
										message: '出错，添加失败！',
										type: 'error',
										duration: 3000,
										showClose: true,
										customClass: 'user_sytle_for_volunteerlist'
									})
							})
						},

						/**
						 * @description 删除委员接口
						 * @param stuNum
						 */
						deleteCommittee: function(stuNum){
							let data = {
								stuNum: stuNum
							};
							this.$confirm('此操作将删除该委员, 是否继续?', '提示', {
								           confirmButtonText: '确定',
								           cancelButtonText: '取消',
								           type: 'warning'
							}).then(() => {
											
									this.axios.post('/WustVolunteer/general/deleteCommittee.do',qs.stringify(data),{
											headers:{
												'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
											}
									}).then((data) => {
										if(data.data.status == 0){
											this.$message({
												message: '删除委员成功!',
												type: "success",
												duration: 2000,
												showClose: true,
												customClass: 'user_sytle_for_volunteerlist',
											})
											this.getMemberList(this.select_value);
										}else{
											this.$message({
												message: '删除失败',
												type: "error",
												duration: 2000,
												showClose: true,
												customClass: 'user_sytle_for_volunteerlist',
											})
										}
									}).catch((err) =>{
										console.log(err);
										this.$message({
												message: '删除委员失败!',
												type: "error",
												duration: 2000,
												showClose: true,
												customClass: 'user_sytle_for_volunteerlist',
											})
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
							
						}
				}
		}

</script>

<style type="text/css">
	.content-wrapper{
		padding: 15px 20px;
		background: #fff;
	}
	.user_sytle_for_volunteerlist{
		margin-top:30px;
	}
</style>
