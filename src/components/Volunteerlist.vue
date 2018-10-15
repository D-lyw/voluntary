<template>
	 	<div class="content-wrapper" style="">

				<div id="navigoto_div" >
					<el-breadcrumb separator-class="el-icon-arrow-right">
						 <el-breadcrumb-item :to="{ path: '/home/introduce' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
						 <el-breadcrumb-item>志愿者概览</el-breadcrumb-item>
						 <el-breadcrumb-item>志愿者信息</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				
				<div style="margin-top:15px;">
					<!-- 级联选择 -->
					<el-cascader :options="options" v-model="selectedOptions" style="width: 280px;" @change="changeClass">				
					</el-cascader>

					<button class="layui-btn layui-btn-sm" style="float:right;margin-top:6px;">
							<span class="glyphicon glyphicon-export" aria-hidden="true">导出</span>
					</button>

					<el-input
						    placeholder="按学号或姓名模糊查找"
						    v-model="search_content_header" style="display:inline-block;width:280px;float:right;margin-right:10px;margin-top:5px;" size="small">
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
						  				<td>学院</td>
						  			</tr>
						  		</thead>
						  		<tbody v-if="is_search_result">
						  			<tr v-for="(item, index) in search_result_list" :key="index">
						  				<td>{{index+1}}</td>
						  				<td><el-tag type="success" size="mini">{{item.studentNum}}</el-tag></td>
						  				<td>{{item.name}}</td>
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
										<td>职位</td>
										<td>操作</td>
								</tr>
						</thead>
						<tbody>
								<tr v-for="(item,index) in classStudentList" :key="index">
										<td>{{item.studentNum}}</td>
										<td>{{item.name}}</td>
										<td>{{item.collegeName}}</td>
										<td>{{item.className}}</td>
										<td>{{item.level}}</td>
										<td>{{item.phone}}</td>
										<td>{{item.volunteerTime}}</td>
										<td>{{item.roll}}</td>
										<td>
											<button @click="Delete_one_volunteer(index)" class="layui-btn layui-btn-danger layui-btn-xs">删除</button> 
											<el-button type="text" size="mini" @click="showJoinedAct(item.studentNum)">活动详情</el-button>
										</td>
								</tr>
						</tbody>
				</table>
				
				<!-- 展示志愿者所参加过的所有活动 -->
				<el-dialog
				  title="志愿者所有活动概览"
				  :visible.sync="dialogVisible_act"
				  width="40%"
				 >

				  <div class="dialog-body">
				  		<table class="table">
				  			<thead>
				  				<tr>
				  					<th>活动ID</th>
				  					<th>名称</th>
				  					<th>地点</th>
				  					<th>时间</th>
				  					<th>组织</th>
				  					<th>工时</th>
				  				</tr>
				  			</thead>
				  			<tbody>
				  				<tr v-for="(item,index) in volunteer_joined_actlist" :key="index">
				  					<td>{{item.activityId}}</td>
				  					<td>{{item.activityName}}</td>
				  					<td>{{item.address}}</td>
				  					<td>{{item.time}}</td>
				  					<td>{{item.organizationName}}</td>
				  					<td>{{item.volunteerTime}}</td>
				  				</tr>
				  			</tbody>
				  		</table>
				  </div>

				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible_act = false" size="small">取 消</el-button>
				    <el-button type="primary" @click="dialogVisible_act = false" size="small">确 定</el-button>
				  </span>
				</el-dialog>

				<!-- Pegination -->
				 <el-pagination
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPage"
					      :page-size="pageSize"
					      layout="slot, prev, pager, next, jumper"
					      :total="classTotalNum">
					      <slot ><span style='font-weight: 400;'># 本班级共 {{classTotalNum}} 条数据，当前展示 {{startRow}} 到 {{endRow}} 条数据</span></slot>
			    </el-pagination>

	 	</div>
</template>

<script type="text/javascript">
import qs from 'qs';
		export default{
				name: 'Volunteerlist',
				data () {
					return {
						options: [],
						selectedOptions: [],
						search_content_header: '',

						currentPage: 1,
						currentClass: '',

						classStudentList: [],
						classTotalNum: 0,

						pageSize: 12,
						startRow: 0,
						endRow: 0,

						// dialog 相关
						dialogVisible: false,
						search_result_list: [],

						is_search_result: false,
						no_search_result: false,

						// dialog 展示volunteer all joined act
						dialogVisible_act: false,
						volunteer_joined_actlist: [],
				    };
				},

					mounted(){
						this.getLevelList();
					},

					methods:{
					    handleCurrentChange(val) {
					        this.getVolunteerByClassName(this.currentClass, this.pageSize, this.currentPage);
					    },

					    clickSearch(){
					    	// 展示对话框
					    	this.dialogVisible = true;
					    	this.searchStudent(this.search_content_header);
					    	this.search_content_header = '';
					    },

					    handleClose(){
					    	this.is_search_result = false;
					    	this.no_search_result = false;
					    	this.search_content_header = '';
					    	this.dialogVisible = false;
					    },

					    /**
					     * [changeClass 选择届别班级，获取相应学生信息]
					     * @return {[type]} [description]
					     */
					    changeClass(){
					      	// console.log(this.selectedOptions);
					      	this.currentClass  = this.selectedOptions[1];
					      	this.currentPage = 1;
					      	this.getVolunteerByClassName(this.currentClass, this.pageSize, this.currentPage);
					    },

					    /**
					     * [Delete_one_volunteer 点击删除按钮，触发删除函数]
					     * @param {[type]} index [description]
					     */
					    Delete_one_volunteer(index){

					      		this.$confirm('此操作将删除该志愿者, 是否继续?', '提示', {
								           confirmButtonText: '确定',
								           cancelButtonText: '取消',
								           type: 'warning'
							        	}).then(() => {
							        		this.deleteVolunteer(this.classStudentList[index].studentNum);								            
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
					       * [getLevelList 获届别列表接口]
					       * @enum [6]
					       * @return {[type]} [description]
					       */
					    getLevelList:function(){
					      		this.axios.post('/WustVolunteer/college/getLevelList.do',{
					      			headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
					      		}).then((data) => {
					      			for(let i = 0; i < data.data.data.length; i++){
					      				var pushobj = {
					      						value: '',
					      						label: '',
					      						children: []
					      				};
					      				pushobj.value = data.data.data[i].level;
					      				pushobj.label = data.data.data[i].level;
					      				this.options.push(pushobj);
					      				// 获取该届的所有班级列表
					      				this.getClassesBylevel(data.data.data[i].level, i);
					      			}
					      			this.selectedOptions = [this.options[data.data.data.length - 1].label];
					      		}).catch(err => {
									console.log(err);
								})
					    },


					    /**
					       * [getClassesBylevel 获取学院组织班级列表]
					       * @enum 		{7}
					       * @param  {[type]} level [届别]
					       * @param {[type]} [id] [标记届别]
					       * @return {[type]}       [null]
					       */
					    getClassesBylevel: function(level, id){
					      	   let data = {
					      	   		level: level
					      	   };

					      	   this.axios.post('/WustVolunteer/college/getClassesBylevel.do',qs.stringify(data),{
					      			headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
					      		}).then((data) => {
					      			var pushclass = [];
					      			for(let i = 0; i < data.data.data.length; i++){
					      				let child = {};
					      				child.value = data.data.data[i];
					      				child.label = data.data.data[i];
					      				pushclass.push(child);
					      				if(i == data.data.data.length -1){
					      					this.selectedOptions.push(child.value);
					      					// 开始第一次获取班级数据
					      					this.currentClass = child.value;
					      					this.getVolunteerByClassName(child.value, this.pageSize, this.currentPage);
					      				}
					      			}
					      			this.options[id].children = pushclass;
					      			
					      		}).catch((err) => {
									console.log(err);
								})
		      			},


		      			/**
					       * [getVolunteerByClassName 获取班级志愿者]
					       * @enum {[type]}  [8]
					       * @param  {[type]} className [班级名称]
					       * @param  {[type]} pageSize  [页面行数 default 15]
					       * @param  {[type]} pageNum   [页数]
					       * @return {[type]}           [null]
					       */
					    getVolunteerByClassName: function(className, pageSize, pageNum){
					      		let data = {
					      			className: className,
					      			pageSize: pageSize,
					      			pageNum: pageNum
					      		}
					      		
					      		this.axios.post('/WustVolunteer/college/getVolunteerByClassName.do',qs.stringify(data),{
					      			headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
					      		}).then((data) => {
					      			// console.log(data);
					      			// 将数据赋给班级学生列表
					      			this.classStudentList = data.data.data.list;
					      			// 记录班级总数
					      			this.classTotalNum = data.data.data.total;

					      			// 当前页启始行,结束行
					      			this.startRow = data.data.data.startRow;
					      			this.endRow = data.data.data.endRow;

					      			for(let i = 0; i < this.classStudentList.length; i++){
					      				if(this.classStudentList[i].roll == 0){
					      					this.classStudentList[i].roll = '志愿者'
					      				}else if(this.classStudentList[i].roll == 1){
					      					this.classStudentList[i].roll = '班级小助手'
					      				}else if(this.classStudentList[i].roll == 2){
					      					this.classStudentList[i].roll = '委员'
					      				}
					      			}
					      		}).catch((err) => {
									console.log(err);
								})
					      		return ;
					    },



					    /**
					       * [deleteVolunteer 删除志愿者]
					       * @enum {[type]} 【22】
					       * @param  {[type]} stuNum [学号]
					       * @return {[type]}        [description]
					       */
					    deleteVolunteer: function(stuNum){
					      		let data = {
					      			stuNum: stuNum
					      		};
					      		this.axios.post('/WustVolunteer/college/deleteVolunteer.do',qs.stringify(data),{
					      			headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
					      		}).then((data) => {
					      			if(data.data.status == 0){
					      				this.$message({
									            type: 'success',
									            message: '删除成功!',
									            customClass: 'user_sytle_for_volunteerlist',
									            duration: 2000
								        });
								        // 刷新页面
								        this.getVolunteerByClassName(this.currentClass, this.pageSize, this.currentPage);
					      			}else {
					      				this.$message({
									            type: 'error',
									            message: '删除失败!',
									            customClass: 'user_sytle_for_volunteerlist',
									            duration: 2000
								        });
					      			}
					      		}).catch((err) => {
									alert("接口错误！");
								})

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

					      		this.axios.post('/WustVolunteer/college/searchStudent.do',qs.stringify(data),{
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

					    },
		      			
		      			showJoinedAct: function(stuNum){
		      				this.dialogVisible_act = true;
		      				this.getActivityDetail(stuNum);
		      			},


		      			/**
						 * [getActivityDetail 获取志愿者参加的所有活动]
						 * @return {[type]} [description] [15]
						 */
						getActivityDetail: function(stuNum){
							let data = {
					      			stuNum: stuNum,
					      			pageSize: this.pageSize,
					      			pageNum: this.currentPage
					      		};

							this.axios.post('/WustVolunteer/college/getActivityDetail.do',qs.stringify(data),{
								headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then((data) => {
								console.log(data);
								this.volunteer_joined_actlist = data.data.data.list;
							}).catch(err => {
								console.log(err);
							})
						},

					}
				}

</script>

<style type="text/css">
		@import '../../static/css/volunteerlist.css';
</style>
