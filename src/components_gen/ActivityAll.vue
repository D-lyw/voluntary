<template>
	 	<div class="content-wrapper" style="">

				<div id="navigoto_div" >
					<el-breadcrumb separator-class="el-icon-arrow-right">
						 <el-breadcrumb-item :to="{ path: '/general/index' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
						 <el-breadcrumb-item>志愿活动</el-breadcrumb-item>
						 <el-breadcrumb-item>全部组织活动</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				
				<div style="margin-top:15px;">
					<!-- 级联选择 -->
					<el-cascader :options="options" v-model="selectedOptions" style="width: 280px;" @change="getAllAuActivityList()">				
					</el-cascader>

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

				<table class="table table-hover table-bordered" style="border-top:1.5px solid #18bc9c; margin-top:10px;">
						<thead>
								<tr >
										<td>ID</td>
										<td>名称</td>
										<td>时间</td>
										<td>地点</td>
										<td>总工时</td>
										<td>人数</td>
										<td>所属组织</td>
										<td>发起人</td>
										<td>认证人</td>
                                        <td style="width:10%;">操作</td>
								</tr>
						</thead>
						<tbody>
								<tr v-for="(item,index) in ActivityLists" :key="index">
										<td>{{item.id}}</td>
										<td>{{item.name}}</td>
										<td>{{item.time}}</td>
										<td>{{item.address}}</td>
										<td>{{item.vulunteerTime}}</td>
										<td>{{item.nums}}</td>
										<td>{{item.organization}}</td>
										<td>{{item.creater}}</td>
                                        <td>{{item.authenticator}}</td>
										<td>
											<el-button  id="detail"  @click="getActivityMember(item.id)" size="mini" >人员详情</el-button>
											<button class="layui-btn layui-btn-xs"  @click="showLocked()" v-if="!item.statu">&nbsp;<i class="el-icon-goods" ></i>&nbsp;</button>
											<button class="layui-btn layui-btn-xs layui-btn-danger"  @click="deleteAuActivity(item.id)" v-if="item.statu">&nbsp;<i class="el-icon-delete" ></i>&nbsp;</button>
										</td>
								</tr>
						</tbody>
				</table>
				
				<!-- 展示所哟参加此活动的志愿者 -->
				<el-dialog
					title="# 所有参加此活动的志愿者"
					:visible.sync="dialogVisible_act"
					width="45%"
				 >
				  <div class="dialog-body  demo" style="max-height: 400px; overflow-y: scroll;">
						<table class="table table-hover table-bordered table-condensed " style="border:1px solid red;">
                            <thead>
                                <tr>
                                    <td>活动ID</td>
                                    <td>姓名</td>
                                    <td>学号</td>
                                    <td>班级</td>
                                    <td>学院</td>
                                    <td>工时</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in actJoinStuList" :key="index" >
                                    <td>{{item.activityId}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.stuNum}}</td>
                                    <td>{{item.className}}</td>
                                    <td>{{item.collegeName}}</td>
                                    <td>{{item.volunteerTime}}</td>
                                </tr>
                            </tbody>
                        </table>
				  </div>

				  <span slot="footer" class="dialog-footer">
				    	<el-button type="primary" @click="dialogVisible_act = false" size="mini">确 定</el-button>
				  </span>
				</el-dialog>

				<!-- Pegination -->
				 <el-pagination
					      @current-change="getAllAuActivityList"
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

						ActivityLists: [],
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
						actJoinStuList: [],
				    };
				},

					mounted(){
						this.getLevelList();
					},

					methods:{             
					    clickSearch(){
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
					      			for(let i = 0; i < data.data.data.length; i++){
					      				var pushobj = {
					      						value: '',
					      						label: '',
					      						children: []
					      				};
					      				pushobj.value = data.data.data[i].level;
					      				pushobj.label = data.data.data[i].level;
										this.options.push(pushobj);
                                        // 获取该届的所有组织
                                        this.getOrganizationList(data.data.data[i].level, i);
					      			}
									  this.selectedOptions.push(data.data.data[0].level);
					      		}).catch(err => {
									console.log(err);
								})
					    },

						/**
						 * @description 获取组织信息列表
						 * 
						 */
						getOrganizationList: function(level, index){
							let data = {
								level: level,
								pageNum: this.currentPage,
								pageSize: this.pageSize
							};
							
							this.axios.post('/WustVolunteer/general/getOrganizationList.do',qs.stringify(data),{
								headers:{
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then(data => {
                                for(let i = 0; i < data.data.data.list.length; i++){
                                    var obj = {};
                                    obj.label = data.data.data.list[i].name;
                                    obj.value = data.data.data.list[i].organizationId;
                                    this.options[index].children.push(obj);
                                }
                                if(index == 0){
									this.selectedOptions[1] = data.data.data.list[0].organizationId;
									this.getAllAuActivityList();
                                }
							})
						},

                        /**
                         * @description 获取全部组织已认证的活动
                         * @param organizationId 
                         * @param level
                         */
                        getAllAuActivityList: function(){
                            let data = {
                                organizationId: this.selectedOptions[1],
                                level: this.selectedOptions[0],
                                pageNum: this.currentPage,
                                pageSize: this.pageSize
                            };

                            this.axios.post('/WustVolunteer/general/getAllAuActivityList.do',qs.stringify(data),{
								headers:{
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then(data => {
								this.ActivityLists = data.data.data.list;
								this.classTotalNum = data.data.data.total;
								this.startRow = data.data.data.startRow;
								this.endRow = data.data.data.endRow;
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

					    },
		      			
						  
						/** 
						 * 获取活动参与人员
						 */
						getActivityMember: function(id){
							this.dialogVisible_act = true;
							let data = {
								activityId: parseInt(id),
								pageNum: 1,
								pageSize: 1000
							};
							this.axios.post('/WustVolunteer/general/getActivityMember.do',qs.stringify(data),{
									headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
							}).then(data => {
								this.actJoinStuList = data.data.data.list;
							}).catch(err => {
								this.$message({
									type: 'info',
									message: '获取活动人员详情接口出错!',
									duration: 2000,
									customClass: 'user_sytle_for_volunteerlist',
								});
							})
						},


						/**
						 * [deleteActivity 删除已认证活动]
						 * @enum {[type]} 【24】
						 * @param  {[type]} activityId [活动ID]
						 * @return {[type]}            [description]
						 */
						deleteAuActivity: function(activityId){
							// 确认删除框
								this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										type: 'warning'
								}).then(() => {
										// 已确认执行删除操作
										let data = {
											activityId: activityId
										};
										this.axios.post('/WustVolunteer/general/deleteAuActivity.do',qs.stringify(data),{
											headers:{
												'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
											}
										}).then((data) => {
											console.log(data);
											// 删除成功提示
											if(data.data.status == 0){
													this.$message({
														type: 'success',
														message: '删除成功!',
														duration: 2000,
														customClass: 'user_sytle_for_volunteerlist',
													});
													this.getAllAuActivityList();
											}else{
													this.$message({
														type: 'error',
														message: data.data.msg,
														duration: 2000,
														customClass: 'user_sytle_for_volunteerlist',
													});
											}
										}).catch((err) => {
											console.log(err);
										})

								}).catch(() => {
										this.$message({
										type: 'info',
										message: '已取消删除',
										duration: 2000,
										customClass: 'user_sytle_for_volunteerlist',
										});          
								});
						},

						/**
						 * 锁定 无法删除
						 */
						showLocked: function(){
							this.$notify({      			
							type: 'error',
							title: '锁定',
							message: '已认证的活动且冻结的活动，无权删除！',
							duration: 2000,
							offset:40
							});
						},
					}
				}

</script>

<style type="text/css">
		@import '../../static/css/volunteerlist.css';
		/* 设置垂直滚动条的宽度和水平滚动条的高度 */
		.demo::-webkit-scrollbar{
			width: 8px;
			height: 8px;
		}

		/* 设置滚动条的滑轨 */
		.demo::-webkit-scrollbar-track {
			background-color: #ddd;
		}

		/* 滑块 */
		.demo::-webkit-scrollbar-thumb {
			background-color: rgba(150, 146, 146, 0.6);
			border-radius: 4px;
		}

		/* 滑轨两头的监听按钮 */
		.demo::-webkit-scrollbar-button {
			background-color: #888;
			display: none;
		}
</style>
