<template>
	<div class="content-wrapper" style="overflow: scoll;">
		
		<div >
			<el-breadcrumb separator-class="el-icon-arrow-right">
				 <el-breadcrumb-item :to="{ path: '/general/index' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
				 <el-breadcrumb-item>志愿活动</el-breadcrumb-item>
				 <el-breadcrumb-item>活动列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="panel panel-default" style=" height:auto;margin-top:18px;margin-bottom:50px;">
			<div class="panel-heading">
				<br>
				<div class="btn-group" style="width:100%;">
					<button class="layui-btn layui-btn-sm" style="background:#2c3e50;" title="刷新" @click="refresh" >
						<i class="fa fa-refresh" aria-hidden="true" style="color:white;"></i> 
					</button>
					<button class="layui-btn layui-btn-sm" style="background:#18bc9c; color:white;margin-left:-1px;" @click="createNewAct" >
						<i class="fa fa-plus" aria-hidden="true" ></i> 
						添加活动
					</button>
					<button class="layui-btn layui-btn-sm" @click="dialogVisible = true" :disabled="addPersonBtn">
						<i class="fa fa-plus" aria-hidden="true"></i> 
						添加人员
					</button>					
					
					<el-tooltip content="文件批量导入活动人员信息" placement="top">
					  <button class="layui-btn layui-btn-sm" style="background-color:#e74c3c" >
						<i class="fa fa-upload"></i> 
						导入
						</button>
					</el-tooltip>
					<el-input
					    placeholder="请输入关键字"
					    v-model="search_content_header" style="display:inline-block;width:200px;float:right;margin-right:10px;" size="small">
					    <i slot="suffix" class="el-input__icon el-icon-search"  id="head_activity_search" @click="clickSearch"></i>
					</el-input>
					
				</div>
			</div>

			<div class="panel-body">
					<el-tabs :tab-position="tabPosition" style="height: auto;min-height: 600px;" v-model="activiTab">

						<!-- 已认证活动 Part -->
					    <el-tab-pane label="已认证活动" name="first">
					    		<table class="table table-hover table-bordered" style="border-top:1.5px solid red;">
									<thead>
										<tr>
											<td>ID</td>
											<td>名称</td>
											<td>时间</td>
											<td>地点</td>
											<td>总工时</td>
											<td >人数</td>
											<td>所属组织</td>
											<td> 
												<el-dropdown>
												<span class="el-dropdown-link">
												    选择届别<i class="el-icon-arrow-down el-icon--right"></i>
												  </span>
												  <el-dropdown-menu slot="dropdown">
													    <el-dropdown-item 
													    	v-for = '(item, index) in levellist' :key = 'index'>
													    	<span style="padding:10px 20px;" 
													    	@click="Done_level=item.level">{{item.level}}</span>
													    </el-dropdown-item>					    
												  </el-dropdown-menu>
												  </el-dropdown>
											</td>
											<td>发起人</td>
											<td>认证人</td>
											<td>操作</td>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in AuActivitylist" :key="index">
											<!-- <td><input type="checkbox" name=""></td> -->
											<td>{{item.id}}</td>
											<td>{{item.name}}</td>
											<td>{{item.time}}</td>
											<td>{{item.address}}</td>
											<td>{{item.vulunteerTime}}</td>
											<td>{{item.nums}}</td>
											<td>{{item.organization}}</td>
											<td>{{item.level}}届</td>
											<td>{{item.creater}}</td>
											<td>{{item.authenticator}}</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="showLocked" v-if="!item.statu">&nbsp;<i class="el-icon-goods" ></i>&nbsp;</button><button class="layui-btn layui-btn-xs" @click="getAuActivityMember(item.id)">详情</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="deleteAuActivity(item.id)" v-if="item.statu">&nbsp;<i class="el-icon-delete"></i>&nbsp;</button>
											</td>
										</tr>
										
									</tbody>
									
								</table>
								
								 <el-pagination
							      :current-page.sync="Done_currentPage"
							      @current-change="getAuActivity"
							      :page-size="pageSize"
							      layout="total, prev, pager, next, jumper"
							      :total="Done_totalNum">
							    </el-pagination>

								<!-- 展示所哟参加此活动的志愿者 -->
								<el-dialog
									title="# 所有参加此活动的志愿者"
									:visible.sync="dialogVisible_act"
									width="45%">
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

					    </el-tab-pane>

						<!-- 未认证活动 Part  -->
					    <el-tab-pane  name="second" style="height: 550px; overflow-y:scroll;"  class="demo">	
					    		<el-badge :is-dot="show_dot" class="item" slot="label" style="height:30px;line-height:30px;">未认证活动</el-badge>
								
								<table class="table table-hover table-bordered" style="border-top:1.5px solid #009688;">
									<thead>
										<tr>
											<td>ID</td>
											<td>名称</td>
											<td>时间</td>
											<td>地点</td>
											<td>总工时</td>
											<td>人数</td>
											<td>所属组织</td>
											<td>所属届别</td>
											<td>发起人</td>
											<td>类别</td>
											<td>操作</td>
										</tr>
									</thead>
									<tbody>
										<tr v-for='item in UnauActivitylist' :key="item.id">
											<td>{{item.id}}</td>
											<td>{{item.name}}   </td>
											<td>{{item.time}}</td>
											<td>{{item.address}}</td>
											<td>{{item.volunteerTime}}</td>
											<td>{{item.nums}}</td>
											<td>{{item.organization}}</td>
											<td>{{item.level}}届</td>
											<td>{{item.creater}}</td>
											<td>{{item.category}}</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="AddActivityPerson(item.id, item.name, item.time, item.address,item.category)">详情</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="deleteActivity(item.id)">删除</button>
											</td>
										</tr>
										<!-- 待处理的活动 -->
										<tr v-for='item in WaitingActivitylist' :key="item.id">
											<td>{{item.id}}</td>
											<td>{{item.name}}   </td>
											<td>{{item.time}}</td>
											<td>{{item.address}}</td>
											<td>{{item.volunteerTime}}</td>
											<td>{{item.nums}}</td>
											<td>{{item.organization}}</td>
											<td>{{item.level}}届</td>
											<td>{{item.creater}}</td>
											<td>{{item.category}}</td>
											<td>
												<span class="layui-badge">认证中..</span>
												<el-button type="text" @click="cancelSubmit(item.id)">取消</el-button>
											</td>
										</tr>
										<!-- 认证驳回的活动 -->
										<tr v-for='item in RejectedActList' :key="item.id">
											<td>{{item.id}}</td>
											<td>{{item.name}}<el-badge class="item" value="驳回" /></td>
											<td>{{item.time}}</td>
											<td>{{item.address}}</td>
											<td>{{item.volunteerTime}}</td>
											<td>{{item.nums}}</td>
											<td>{{item.organization}}</td>
											<td>{{item.level}}届</td>
											<td>{{item.creater}}</td>
											<td>{{item.category}}</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="AddActivityPerson(item.id, item.name, item.time, item.address,item.category)">详情</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="deleteActivity(item.id)">删除</button>
											</td>
										</tr>
									</tbody>
								</table>
								
					    </el-tab-pane>

					    <!-- 待处理 Part -->
					    <el-tab-pane style="margin-top:10px;margin-left: 10px;" name="third" >
						    	<el-badge :value="waitToDealCountNum" :max="9" :hidden="show_Count_num" class="item" slot="label" style="padding-right:7px;margin-right:10px;">
								 	 待处理
								</el-badge>

								<ul class="layui-timeline" id="Need_do_thinglist" style="width:80%;">
									
									 <li class="layui-timeline-item" style="width:100%;" v-show="show_Count_num" >
											<i class="fa fa-gg"></i>
										    <div class="layui-timeline-content layui-text" style="border-radius: 10px;" >
										     		
										     		<fieldset class="layui-elem-field layui-field-title" style="width: 95%;border:1px solid #e8e8e8;" >
													  	<legend style=" display: inline-block;padding: 0px 5px;width: auto;">
													  		<span ><em>现没有待处理的活动哟！</em><span style="font-size: 12px;">可以待会再来看下哟！</span><i class="layui-icon layui-icon-face-smile"></i></span>
													  	</legend>
													  	<div class="layui-field-box" >
													   			<div style="margin-top:1px;text-align: center;"></div>
													  </div>
													</fieldset>

										    </div>
									  </li>

									 <li class="layui-timeline-item" v-show="show_one_msg" v-for="(item,index) in getUnauActivityList" :key="index">
											<i class="fa fa-gg"></i>
										    <div class="layui-timeline-content layui-text" style="border-radius: 10px;" >
										     		<h3 class="layui-timeline-title">{{item.name}}</h3>
										     		
										     		<fieldset class="layui-elem-field layui-field-title" style="width: 95%;border:1px solid #e8e8e8;">
													  <legend style=" display: inline-block;padding: 0px 5px;width: auto;">
													  		<span ><em>活动认证失败通知 : (</em></span>
													  	</legend>
													  <div class="layui-field-box" >
													   			<div style="margin-top:1px;text-align: center;">
													   			{{item.msg}}！</div>
													   			<div style="margin-top: 0px;padding-bottom: 1px;">    
													   					<el-tooltip class="item" effect="dark" content="点击按钮，则表示已阅读该消息"  placement="right">
													   						<button class="layui-btn  layui-btn-xs" @click="hide_one_msg" style="float: right;"><i class="fa fa-check-square-o" ></i>已查看</button>
													   					</el-tooltip>
																</div>
													  </div>
													</fieldset>

										    </div>
									  </li>
									</ul>  
					    </el-tab-pane>
									

						<el-tab-pane label="添加活动人员" v-if="show_add_activityperson_page" id="Node_add_act_person"  name="four">
								<div style="padding: 20px; background-color: #F2F2F2;">
									  	<div class="layui-row layui-col-space15">

											    <div class="layui-col-md12">
													     <div class="layui-card">

														        <div class="layui-card-header" @mouseover="showAnimateHeader">
														        			<i class="fa fa-free-code-camp" style="font-size: 18px;" id="header_icon_color"></i>
														        			&nbsp;&nbsp;
														        			<em style="font-size: 18px;" id="header_activity_name">{{this.currentEditActName}}</em>	
														        			&nbsp;&nbsp;
					
																			 <el-tooltip class="item" effect="dark" content="编辑该活动" placement="right">
																		     <i class="el-icon-edit" id="EditChoosedAct" @click="activityMsg"></i>
																		    </el-tooltip>
																			<el-button type="success" plain style="display:inline-block;float:right;margin-top:5px;margin-right:-5px;" size="small" @click="submitAuth(currentEditActId)">认证活动</el-button>
														        </div>
																 
														        <!-- 尚未添加人员时的提示框内容  -->
														        <div class="layui-card-body" v-if="tip_show_none_list">
														        		<span style="display: block;padding-left: 35%;">本活动尚未添加活动成员呢 : (<br>
																        		<span style="padding-left: 10%;">点击上方
																        		<button class="layui-btn layui-btn-xs">
																        				<i class="fa fa-plus" aria-hidden="true"></i> 
																						添加人员
																				</button>			
																				或
																				<button class="layui-btn layui-btn-xs" style="background-color:#e74c3c" >
																				<i class="fa fa-upload"></i> 
																				导入
																				</button>
																				进行批量导入添加吧 ：）</span>
																		</span>
														        </div>

														        <div class="layui-card-body" v-if="tip_show_person_list">
														          			<table class="table" style="text-align: center;">
														          				 	<thead>
														          				 			<tr>
															          				 				<td><input type="checkbox" name=""></td>
															          				 				<td>ID</td>
															          				 				<td>学号</td>
															          				 				<td>姓名</td>
															          				 				<td>本次工时</td>
															          				 				<td>班级</td>
															          				 				<td>操作</td>
														          				 			</tr>
														          				 	</thead>
														          				 	<tbody>
														          				 			<tr v-for='(item, index) in getActivityMemberList' :key="index">
															          				 				<td><input type="checkbox" name=""></td>
															          				 				<td>{{item.activityId}}</td>
															          				 				<td>{{item.stuNum}}</td>
															          				 				<td>{{item.name}}</td>
															          				 				<td>{{item.volunteerTime}}</td>
															          				 				<td>{{item.className}}</td>
															          				 				<td> <button class="layui-btn layui-btn-danger layui-btn-xs" @click="deleteActivityMember(item.activityId, item.stuNum)">删除</button></td>
														          				 			</tr>
														          				 	</tbody>
														          			</table>

																		  <el-pagination
																	      @current-change="getActivityMember(currentEditActId,currentEditPage,addActStu_pageSize)"
																	      :current-page.sync="currentEditPage"
																	      :page-size="addActStu_pageSize"
																	      layout="slot, prev, pager, next,jumper"
																	      :total="currentEditActNumCount">
																	      		<slot >
																	      			<span style="font-weight: 400;">
																	      			# 本活动共 {{currentEditActNumCount}} 人参与，现显示 {{currentEditActStartRow}} 到 {{currentEditActEndRow}} 条数据</span></slot>
																	    </el-pagination>	
																	    <div style="display: inline-block;float: right;width: 13%;margin-top:-25px;" >
												        					<span style="font-size:13px;">活动时间:</span>
														        			<span>
														        			<em>
														        			{{currentEditActTime}}
														        			</em>
														        			</span>&nbsp;&nbsp;&nbsp;
												        				</div>													          			
														        </div>
													     </div>
											    </div>
									    </div>
								 </div> 

								<!-- 添加活动人员对话框 -->
								 <el-dialog
										  title="添加活动人员"
										  :visible.sync="dialogVisible"
										  width="50%"
										  @close="handleClose">
   										 <el-input placeholder="请根据学号进行添加" v-model="add_person_search_id">
										   		 <template slot="append" ><i class="fa fa-search" id="add_search_id"  @click="btn_search_add_act_number" style="padding: 10px;" ></i></template>
										  </el-input>

										 <div v-show="show_search_error_result" >搜索的学号不存在或已加入表中 : (</div>
										
										 <div v-show="show_search_success_result" style="margin-top:10px;">
												<span style="font-size: 15px;">匹配结果如下:</span>

												<table class="table table-bordered">
														<tbody>
																<tr>
																	<td>学号</td>
																	<td>姓名</td>
																	<td>工时</td>
																	<td>班级</td>
																	<td>学院</td>
																	<td>年级</td>
																	<td>状态</td>
																</tr>
																<tr v-for="(item,index) in result_search_act_num" :key="index">
																	<td>{{item.studentNum}}</td>
																	<td>{{item.name}}</td>
																	<td>{{item.volunteerTime}}</td>
																	<td>{{item.className}}</td>
																	<td>{{item.collegeName}}</td>
																	<td>{{item.level}}</td>
																	<td><span class="layui-badge">可添加</span></td>
																</tr>
														</tbody>
												</table>
										</div>

										<el-input placeholder="请输入工时" v-model="add_person_work_time" style="margin-top: 5px;"></el-input>

										  <span slot="footer" class="dialog-footer">
											    <el-button @click="dialogVisible = false">取 消</el-button>
											    <el-button type="primary" @click="add_person_to_act">确 定</el-button>
										  </span>
								</el-dialog>
						</el-tab-pane>	
					</el-tabs>

			</div>		
		</div>
</div>


</template>

<script type="text/javascript" >
import qs from 'qs';		// 将穿给后台的数据拼成url字符串

	export default {
		name: "ActivityList",
		data () {
			return {
				tabPosition:'left',
				search_content_header:'',
				Edit_act_name: '',
				
				show_add_activityperson_page: false,
				activiTab: 'first',
				tip_show_person_list: true,
				tip_show_none_list:  false,
				
				dialogVisible: false,
				
				
				show_search_error_result: false,
				show_search_success_result: false,

				show_one_msg: true,

				show_when_no_msg: false,

				// 添加参与活动人员的查找学号
				add_person_search_id: '',
				// 添加参与活动人员的活动工时
				add_person_work_time: '',

				// 添加人员按钮
				addPersonBtn: true,

				// 分页参数
				Done_currentPage: 1,
				Done_totalNum: 0,

				pageSize: 12,

				levellist: '',   	// 届别列表
				Done_level: '',	// 当前被选中的届别


				//已认证的活动信息列表
				AuActivitylist: [],
				//已认证活动成员展示框
				dialogVisible_act: false,
				//已认证活动成员列表
				actJoinStuList: [],

				//未认证的活动信息表
				UnauActivitylist: [],
				show_dot: false,
				show_Count_num: false,

				//认证中的活动信息列表
				WaitingActivitylist: [],

				RejectedActList: [],

				// 添加活动所需信息
				addActMsg:{
					name: '',
					address: '',
					time: '',
					creater: '',
					category: ''
				},

				// 存储某一待处理活动的已参与人员
				getActivityMemberList:[

				],
				addActStu_pageSize: 10,    // 添加活动成员部分
				addActStu_pageNum: 1,
				isNone: false,

				currentEditPage: 1,
				// 当前正在被编辑的活动的id
				currentEditActId:'',
				currentEditActTime: '',
				currentEditActName: '',

				currentEditActNumCount: 0,
				currentEditActStartRow: 0,
				currentEditActEndRow: 0,
				currentEditActAddress: '',
				currentEditActCategory: '',

				currentPage1: 1,

				// 模糊查询结果
				result_search_act_num: '',

				// part3
				getUnauActivityList: [],
				getUnMsgReasonList: [],
				waitToDealCountNum: 0,
      		}
		},
		watch: {
			activiTab: function (val, oldval){
					// console.log(val+oldval);
					if(val != "four"){
							this.show_add_activityperson_page = false;
							this.addPersonBtn = true;
					}
			},
			Edit_act_name (val, oldval){
				if(V_If_Show[0] != true){
					V_If_Show[0] = true;
				}
				if(this.Edit_act_name != ''){
					V_edit_tips[0] = true;
				}else{
					V_edit_tips[0] = false;
				}
				console.log(this.V_If_Show);
				console.log(this.Edit_act_name);
				console.log(val);
			},
			Done_level(){
				// 获取已认证活动列表
				this.getAuActivity();
			},
			getActivityMemberList(){
				if(this.getActivityMemberList.length === 0){
					this.tip_show_none_list = true;
					this.tip_show_person_list = false;
				}else{
					this.tip_show_none_list = false;
					this.tip_show_person_list = true;
				}
			}
		},
		mounted(){		
			// 获取待处理的消息列表
			this.getUnauActivity(3, 1, 15);
			// 获取届别类别
			this.getLevelList();
			
			// 获取未认证的活动(获取最新一届的未认证的活动)（状态，页数，行数）
			this.getUnauActivity(2, 1, 15);
			this.getUnauActivity(1, 1, 15);
		},
		methods:{
			tests: function (id) {
			
			},
			/**
			 * [refresh 刷新页面，获取更新后的数据]
			 * @return {[type]} [description]
			 */
			refresh: function(){											
					location.reload();
			},
			

			/**
			 * [clickSearch 活动搜索函数]
			 * @param {[type]} [key] [搜索的关键字]
			 * @return {[type]} [description]
			 */
			clickSearch: function(key){										// 点击按钮触发 搜索事件

			},

			showLocked: function(){
				this.$notify({      			
		          type: 'error',
		          title: '删除失败',
		          message: '已认证且已冻结的活动，无权删除！',
		          duration: 2000,
		          offset:40
		        });
			},

			/**
			 * @description 编辑该活动具体信息
			 */
			activityMsg: function(){
				var that = this;
				setTimeout(function(){
					$("#Edit_input_name").val(that.currentEditActName);
					$("#Edit_input_address").val(that.currentEditActAddress);
					$("#Edit_input_time").val(that.currentEditActTime);
					if(that.currentEditActCategory == "学院活动"){
						that.currentEditActCategory = 0;
					}else{
						that.currentEditActCategory = 1;
					}
				},500);

				layer.open({
				  	type: 1,
				  	skin: 'layui-layer-molv', //样式类名
				  	closeBtn: 0, //不显示关闭按钮		
			  		anim: 2,
			  		shadeClose: false, //开启遮罩关闭
			  		btn: ['确定&保存', "取消"],
			  		title: '[ 编辑 ] - 志愿活动',
			  		content: '<div style="padding:20px;">\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动名称:</div>\
										<div class="col-md-6"><input class=" form-control input_edit_name" placeholder="请输入活动名称" id="Edit_input_name" ></input></div>\
										<div class="col-md-3 col-tips" id="node_edit_name_ok" style="display:none;"><i class="glyphicon glyphicon-ok"></i>&nbsp;输入OK</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动地点:</div>\
										<div class="col-md-6"><input type="text" id="Edit_input_address" class="form-control" placeholder="请输入活动地点"/></div>\
									</div>\
									<div class="row">						\
										<div class="col-md-3" style="text-align:right;">活动时间:</div>\
										<div class="col-md-6" id="">\
											  	<div class="layui-input-inline">\
										        <input type="text" class="layui-input" id="Edit_input_time" placeholder="YYYY-MM-DD" size="small">\
										      	</div>\
										</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动类别:</div>\
										<div class="col-md-6">\
												<select class="form-control" placeholder="请选择活动类型" id="Edit_input_category">\
													<option value="0">学院活动</option>\
													<option value="1" disabled>班级活动</option>\
												</select>\
										</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动总工时:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="系统自动识别" disabled /></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动人数:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="系统自动识别" disabled/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动发起人:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="系统自动识别" disabled/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动认证人:</div>\
										<div class="col-md-6"><input type="text" disabled class="form-control" placeholder="系统自动识别" disabled/></div>\
									</div>\
							</div>',
			  		area: ['800px','600px'],
			  		yes: function(index, layero){
			  			layer.close(index);
			  			that.alterActivity(that.currentEditActId ,$("#Edit_input_name").val(), $("#Edit_input_time").val(), $("#Edit_input_address").val(), $("#Edit_input_category").val());
			  		},
			  		btn2: function(index, layero){
			  			// 取消按钮回调
			  			console.log("error callback!");
			  		}
				});
				window.layui.laydate.render({
			   	 		elem: '#test1'
			  	});

				
			},


			/**
			 * [createNewAct 创建新志愿活动]
			 * @return {[type]} [description]
			 */
			createNewAct: function(){								
				var that = this;
				layer.open({
				  	type: 1,
				  	skin: 'layui-layer-molv', //样式类名
				  	closeBtn: 0, //不显示关闭按钮		
			  		anim: 2,
			  		shadeClose: false, //开启遮罩关闭
			  		btn: ['确定&保存', "取消"],
			  		title: '[ 新建 ] - 志愿活动',
			  		content: '<div style="padding:20px;">\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动名称:</div>\
										<div class="col-md-6"><input class=" form-control input_edit_name" placeholder="请输入活动名称" id="input_act_name"></input></div>\
										<div class="col-md-3 col-tips" id="node_edit_name_ok" style="display:none;"><i class="glyphicon glyphicon-ok"></i>&nbsp;输入OK</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动地点:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动地点" id="input_act_place"/></div>\
									</div>\
									<div class="row">						\
										<div class="col-md-3" style="text-align:right;">活动时间:</div>\
										<div class="col-md-6" id="">\
											  	<div class="layui-input-inline">\
										        <input type="text" class="layui-input" id="createNew_date" placeholder="YYYY-MM-DD" size="small">\
										      	</div>\
										</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动类型:</div>\
										<div class="col-md-6">\
												<select class="form-control" placeholder="请选择活动类型" id="selectActType">\
													<option value="0">学院活动</option>\
												</select>\
										</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动总工时:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="新建活动时,暂不需输入" disabled/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动人数:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="新建活动时,暂不需输入" disabled/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动发起人:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="系统自动识别" disabled/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动认证人:</div>\
										<div class="col-md-6"><input type="text" disabled class="form-control" placeholder="系统自动识别"/></div>\
									</div>\
							</div>',
			  		area: ['800px','600px'],
			  		yes: function(index, layero){

			  			//判断是否填写完整
			  			if($("#input_act_name").val() == '' || $("#input_act_place").val() == '' || $("#selectActType").val() == ''){


			  				that.$message({
			  					type: 'error',
			  					message: '填写活动信息不完整！',
			  					customClass: 'user_sytle_for_volunteerlist',
								duration: 2000
			  				})
			  				layer.close(index);	
			  				return ;
			  			}

			  			//获取值 (因为上方使用的都是字符串形式，v-model等方式无法识别，暂不知如何解决)
			  			that.addActMsg.name = $("#input_act_name").val();
			  			that.addActMsg.address = $("#input_act_place").val();
			  			that.addActMsg.time = $("#createNew_date").val();
			  			that.addActMsg.category = $("#selectActType").val();


			  			// 关闭弹出框
			  			layer.close(index);				

			  			// 将数据传给后台（addNewact）
			  			that.addActivity(that.addActMsg.name, that.addActMsg.time, that.addActMsg.address, that.addActMsg.category);

			  			
			  		},
			  		btn2: function(index, layero){
			  			// 取消按钮回调
			  			console.log("error callback!");
			  		}
				});
				window.layui.laydate.render({
			   	 		elem: '#createNew_date'
			  	});
			},

			
			/**
			 * [AddActivityPerson 当点击  去添加 时，跳转到活动添加人员页面]
			 * @param {[type]} actId [活动id]
			 * @param {[type]} actName [活动name]
			 * @param {[type]} actTime [活动id]
			 */
			AddActivityPerson: function(actId, actName , actTime, actAddress, actCategory){
					
					// 将当前的正在被编辑的活动id保存
					this.currentEditActId = actId;
					this.currentEditActName = actName;
					this.currentEditActTime = actTime;
					this.currentEditActAddress = actAddress;
					this.currentEditActCategory = actCategory;
					// console.log(this.currentEditActName, this.currentEditActAddress, this.currentEditActTime ,this.currentEditActCategory)
					// 将tab标签切换到 添加活动人员部分
					this.show_add_activityperson_page = true;
					this.activiTab = "four";
					// 使得添加人员按钮能够点击
					this.addPersonBtn = false; 
					// 获取该活动参与人员
					this.getActivityMember(actId, this.addActStu_pageNum, this.addActStu_pageSize);
			},


			/**
		       * [btn_search_add_act_number 在添加活动人员时，判断该学号是否存在，以及是否已经在该活动人员表中]
		       * @return {[type]} [description]
		       */
	      	btn_search_add_act_number(){
	      			// 对该学号进行模糊查询
	      			this.searchStudent(this.add_person_search_id);
	      			//判断result_search_act_num数组的值是否为空，不为空，则说明查找到了值
	      			if(this.result_search_act_num.length >= 1){
	      					this.show_search_success_result = true;
	      					this.show_search_error_result = false;
	      			}else if(this.result_search_act_num.length == 0){
	      					this.show_search_error_result = true;
	      					this.show_search_success_result = false;
	      			}
	      	},


	      	/**
	      	 * [add_person_to_act 将添加的数据人员添加到该活动]
	      	 */
	      	add_person_to_act: function(){
	      			// 首相关闭弹出框
	      			this.dialogVisible = false
	      			// 判断是否获取到值以及是否已经填写工时值
	      			if(this.show_search_success_result == true && this.add_person_work_time != ''){
	      					this.addActivityMember(this.currentEditActId,this.add_person_search_id, this.add_person_work_time);
	      			}else{
	      				this.show_search_error_result = false;
	      				this.show_search_success_result = false;
	      				this.$message({
	      					type:'error',
							message: '添加失败',
							customClass: 'user_sytle_for_volunteerlist',
							duration: 2000
	      				})
	      			}
	      	},

			showAnimateHeader: function () {
					$("#header_activity_name").addClass("animated lightSpeedIn");
			},


		    handleCurrentChange(val) {
		        	console.log(`当前页: ${val}`);
		    },

		    /**
		     * [handleClose 添加人员对哈话框关闭之后的回调函数]
		     * @return {[type]} [description]
		     */
		    handleClose(){									
		      		// 关闭对话框后，将一切回归原样
		      		this.add_person_work_time = '';
		      		this.add_person_search_id = '';
		      		this.show_search_success_result = false;
		      		this.show_search_error_result = false;
		      		
		    },

		    hide_one_msg: function(){
		      		this.activiTab = 'second';
		    },



		      // ----------交互JavaScript部分---------------
		      // 
		     
		      
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
						this.Done_level = data.data.data[data.data.data.length - 1].level;
					}).catch(err => {
						console.log(err);
					})
			},


			/**
			 * [getUnauActivity 获取未认证活动列表]
			 * @enum {[type]}		[10]
			 * @param  {[type]} statu    [活动状态]	<1-未认证   2- 认证中   3-认证驳回>
			 * @param  {[type]} pageNum  [当前页数]
			 * @param  {[type]} pageSize [当前行数]
			 * @return {[type]}          [description]
			 */
			getUnauActivity: function(statu, pageNum, pageSize){
				let data = {
					statu: statu,
					pageNum: pageNum,
					pageSize: pageSize
				};

				this.axios.post('/WustVolunteer/general/getUnauActivity.do',qs.stringify(data),{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(data => {	
					for(var i = 0; i < data.data.data.list.length; i++){
						if(data.data.data.list[i].category == 0){
							data.data.data.list[i].category = "院级活动";
						}
					}
					if(statu == 1){                  // 未认证状态
						this.UnauActivitylist = data.data.data.list;
						if(data.data.data.list.length > 0){
							this.show_dot = true;
						}
					}else if(statu == 2){            // 待处理状态
						this.WaitingActivitylist = data.data.data.list;
						if(data.data.data.list.length > 0){
							this.show_dot = true;
						}
					}else if(statu == 3){
						this.RejectedActList = data.data.data.list;
						this.getUnauActivityList = data.data.data.list;
						this.waitToDealCountNum = data.data.data.list.length;
						if(this.waitToDealCountNum == 0){
							this.show_Count_num = true;
						}
						for(var i = 0; i < data.data.data.list.length; i++){
							this.getUnMsg(data.data.data.list[i].id,i);
						}
					}
				}).catch((err) => {
					console.log(err);
				})

				return ;
			},

			/**
			 * [getAuActivity 获取已认证的活动列表]
			 * @enum { }		[11]
			 * @param  {[type]} level    [届别]
			 * @param  {[type]} pageSize [页面行数]
			 * @param  {[type]} pageNum  [当前页数]
			 * @return {[type]}          [null]
			 */
			getAuActivity: function(){
				let data = {
					level: this.Done_level,
					pageSize: this.pageSize,
					pageNum: this.Done_currentPage
				};

				this.axios.post('/WustVolunteer/general/getAuActivity.do',qs.stringify(data),{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then((data) => {
					this.AuActivitylist = data.data.data.list;
					this.Done_totalNum = data.data.data.total;
				}).catch((err) => {
					console.log(err);
				})
				

			},


			/**
			 * [getActivityMember 获取活动参与人员]
			 * @enum {[type]}		[12]
			 * @param  {[type]} activityId [活动id]
			 * @param  {[type]} pageNum    [当前页数]
			 * @param  {[type]} pageSize   [页面行数]
			 * @return {[type]}            [description]
			 */
			getActivityMember: function(activityId, pageNum, pageSize){
				let data = {
					activityId: activityId,
					pageNum: pageNum,
					pageSize: pageSize
				}

				this.axios.post('/WustVolunteer/general/getActivityMember.do',qs.stringify(data),{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then((data) => {
					this.getActivityMemberList = data.data.data.list;
					this.currentEditActNumCount = data.data.data.total;
					this.currentEditActStartRow = data.data.data.startRow;
					this.currentEditActEndRow = data.data.data.endRow;
				}).catch((err) => {
					console.log(err);
				})	      		

				return ;
			},
			
			/**
			 * 获取已认证活动成员列表
			 */
			getAuActivityMember: function(id){
				this.dialogVisible_act = true;
				let data = {
					activityId: id,
					pageNum: 1,
					pageSize: 1000
				};
				this.axios.post('/WustVolunteer/general/getActivityMember.do',qs.stringify(data),{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then((data) => {
					this.actJoinStuList = data.data.data.list;				
				}).catch((err) => {
					console.log(err);
				})	
			},

			/**
			 * [addActivity 创建新活动]
			 * @enum [23]
			 * @param {[type]} name     [活动名称]
			 * @param {[type]} time     [时间]
			 * @param {[type]} address  [地点]
			 * @param {[type]} category [类别]
			 */
			addActivity: function(name, time, address, category){
				let data = {
					name: name,
					time: time,
					address:address,
					category: category
				};

				this.axios.post('/WustVolunteer/general/addActivity.do',qs.stringify(data),{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then((data) => {
					if(data.data.status == 0){
						// 成功信息提示
						this.$message({
							message: '添加新活动成功',
							type: "success",
							duration: 2000,
							showClose: true,
							customClass: 'user_sytle_for_volunteerlist',
						})

						// 刷新数据
						this.getUnauActivity(2, 1, 15);
						this.getUnauActivity(1, 1, 15);
						this.getUnauActivity(3, 1, 10);
					}
				}).catch((err) => {
					console.log(err);
				})

			},

			/**
			 * [deleteActivity 删除未认证活动]
			 * @enum {[type]} 【24】
			 * @param  {[type]} activityId [活动ID]
			 * @return {[type]}            [description]
			 */
			deleteActivity: function(activityId){

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
							this.axios.post('/WustVolunteer/general/deleteActivity.do',qs.stringify(data),{
								headers:{
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then((data) => {
								// 删除成功提示
								if(data.data.status == 0){
										this.$message({
										type: 'success',
										message: '删除成功!',
										duration: 2000,
										customClass: 'user_sytle_for_volunteerlist',
										});
										this.getUnauActivity(1, 1, 15);  // 重新获取数据
								}else{
										alert("删除失败");
										this.getUnauActivity(1, 1, 15);  // 重新获取数据
								}
							}).catch((err) => {
								alert("删除程序出错！");
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
								// 删除成功提示
								if(data.data.status == 0){
										this.$message({
										type: 'success',
										message: '删除成功!',
										duration: 2000,
										customClass: 'user_sytle_for_volunteerlist',
										});
										this.getAuActivity();  // 重新获取数据
								}else{
										alert("删除失败");
										this.getUnauActigetAuActivityvity();  // 重新获取数据
								}
							}).catch((err) => {
								alert("删除程序出错！");
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
			 * [alterActivity 修改未认证或认证驳回的活动]
			 * @enum {[type]} 25
			 * @param  {[type]} activityId [活动ID]
			 * @param  {[type]} name       [活动名称]
			 * @param  {[type]} time       [活动时间]
			 * @param  {[type]} address    [活动地点]
			 * @param  {[type]} category   [活动类别]
			 * @return {[type]}            [null]
			 */
			alterActivity: function(activityId, name, time, address, category){
				let data = {
					activityId: activityId,
					name: name,
					time: time,
					address: address,
					category: category
				};

				this.axios.post('/WustVolunteer/general/alterActivity.do',qs.stringify(data),{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then((data) => {
					if(data.data.status == 0){
						this.$message({
							type: 'success',
							message: '修改活动信息成功！',
							duration: 2000,
							customClass: 'user_sytle_for_volunteerlist',
						}); 
						this.getUnauActivity(1, 1, 15);
						this.currentEditActName = name;
					}else{
						this.$message({
							type: 'error',
							message: '修改活动信息失败！',
							duration: 2000,
							customClass: 'user_sytle_for_volunteerlist',
						}); 
					}
				}).catch((err) => {
					console.log(err);
					alert("修改失败！")
				})

				return ;
			},


			/**
			 * [addActivityMember 添加活动人员]
			 * @enum {[type]}  【26】
			 * @param {[type]} activityId    [活动ID]
			 * @param {[type]} stuNum        [学号]
			 * @param {[type]} volunteerTime [工时数]
			 */
			addActivityMember: function(activityId, stuNum, volunteerTime){
				let data = {
					activityId: activityId,
					stuNum: stuNum,
					volunteerTime: volunteerTime
				};

				this.axios.post('/WustVolunteer/college/addActivityMember.do',qs.stringify(data),{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then((data) => {
					if(data.data.status == 0){
						this.$message({					// 成功提示
							message: ' 添加成功',
							type: "success",
							// dangerouslyUseHTMLString: true,
							customClass: "user_sytle_for_volunteerlist",
							iconClass: 'fa fa-check',
							showClose: true,
							duration: 2000
						});
						this.getActivityMember(activityId, this.addActStu_pageNum, this.addActStu_pageSize);
					}else {
						this.$message({					// 成功提示
							message: data.data.msg,
							type: "error",
							customClass: "user_sytle_for_volunteerlist",
							iconClass: 'fa fa-error',
							showClose: true,
							duration: 2000,
						});
					}
				}).catch((err) => {
					console.log(err);
				})


				return ;
			},

			/**
			 * [deleteActivityMember 删除活动参与人员]
			 * @enum {[type]}  [27]
			 * @param  {[type]} activityId [活动id]
			 * @param  {[type]} stuNum     [学号]
			 * @return {[type]}            [description]
			 */
			deleteActivityMember: function(activityId, stuNum){
					this.$confirm('此操作将删除该成员, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
					}).then(() => {

						let data = {
							activityId: activityId,
							stuNum: stuNum
						};

						this.axios.post('/WustVolunteer/general/deleteActivityMember.do',qs.stringify(data),{
							headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
						}).then((data) => {
							if(data.data.status == 0){
								this.$message({
									message: '删除活动成员成功！',
									type: "success",
									duration: 2000,
									showClose: true,
									customClass: 'user_sytle_for_volunteerlist',
								})
								this.getActivityMember(activityId, 1, 10);
							}else{
								this.$message({
									message: '删除失败',
									type: "error",
									duration: 2000,
									showClose: true,
									customClass: 'user_sytle_for_volunteerlist',
								})
							}
						}).catch((err) => {
							console.log(err);
							alert("删除失败!");
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
			 * @description 认证活动接口
			 * @param 活动id
			 */
			submitAuth: function(activityId){
					this.$confirm('是否一切就绪，准备认证活动?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '我再想想',
							type: 'warning'
					}).then(() => {

						let data = {
							activityId: activityId,
						};

						this.axios.post('/WustVolunteer/general/submitAuth.do',qs.stringify(data),{
							headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
						}).then((data) => {
							if(data.data.status == 0){
								this.$message({
									message: '成功请求活动认证',
									type: "success",
									duration: 2000,
									showClose: true,
									customClass: 'user_sytle_for_volunteerlist',
								})
								// 将tab标签切换到 添加活动人员部分
								this.activiTab = "second";
								this.show_add_activityperson_page = false;
								this.getUnauActivity(1, 1, 15);
								this.getUnauActivity(2, 1, 15);
								this.getUnauActivity(3, 1, 15);
							}else{
								this.$message({
									message: '请求认证活动失败',
									type: "error",
									duration: 2000,
									showClose: true,
									customClass: 'user_sytle_for_volunteerlist',
								})
							}
						}).catch((err) => {
							console.log(err);
							alert("该操作出错!");
						})
					}).catch(() => {
							this.$message({
							type: 'info',
							message: '已取消请求认证活动',
							duration: 2000,
							customClass: 'user_sytle_for_volunteerlist',
							});          
					});
			},

			/**
			 * [cancelSubmit 取消活动认证]
			 * @enum   [28]
			 * @param  {[type]} activityId [活动id]
			 * @return {[type]}            [description]
			 */
			cancelSubmit: function(activityId){
				// 确认删除框
				this.$confirm('此操作将取消该认证活动, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
					}).then(() => {

							let data = {
								activityId: activityId
							};

							this.axios.post('/WustVolunteer/general/cancelSubmit.do',qs.stringify(data),{
								headers:{
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then((data) => {
								// 删除成功提示
								if(data.data.status == 0){
										this.$message({
										type: 'success',
										message: '取消活动认证成功!',
										duration: 2000,
										customClass: 'user_sytle_for_volunteerlist',
										});
										this.getUnauActivity(2, 1, 15);  // 重新获取数据
										this.getUnauActivity(1, 1, 15);
										this.getUnauActivity(3, 1, 15);
								}else{
										alert("取消活动认证失败");
										this.getUnauActivity(2, 1, 15);  // 重新获取数据
								}
							}).catch((err) => {
								console.log(err);
							})
							
					}).catch(() => {
							this.$message({
							type: 'info',
							message: '操作已取消',
							duration: 2000,
							customClass: 'user_sytle_for_volunteerlist',
							});          
					});

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
					this.show_search_error_result = false;
	      			this.show_search_success_result = false;
					if(data.data.data.length >= 1){  					// 查询的结果不为空
						this.result_search_act_num = '' ;      			// 先将变量清空，防止上次的搜索结果的干扰
						this.result_search_act_num = data.data.data;
						// this.show_search_error_result = false;
	      				this.show_search_success_result = true;
					}else{
						this.result_search_act_num = '';
						this.show_search_error_result = true;
	      				this.show_search_success_result = false;
					}
					
				}).catch((err) => {
					console.log(err);
				})

			},

			/**
			 * [getUnMsg 获取活动驳回原因]
			 * @enum [30]
			 * @param  {[type]} activityId [活动id]
			 * @return {[type]}            [description]
			 */
			getUnMsg: function(activityId, index){
				let data = {
					activityId: activityId
				};

				this.axios.post('/WustVolunteer/general/getUnMsg.do',qs.stringify(data),{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then((data) => {
					this.getUnauActivityList[index].msg = data.data.data[0].msg
				}).catch((err) => {
					console.log(err);
				})
			},
		},
		
	}


</script>

<style type="text/css" >
	@import '../../static/css/activitylist.css';
	/* 设置垂直滚动条的宽度和水平滚动条的高度 */
	.demo::-webkit-scrollbar{
		width: 4px;
		height: 4px;
	}

	/* 设置滚动条的滑轨 */
	.demo::-webkit-scrollbar-track {
		background-color: #ddd;
	}

	/* 滑块 */
	.demo::-webkit-scrollbar-thumb {
		background-color: rgba(150, 146, 146, 0.6);
		border-radius: 2px;
	}

	/* 滑轨两头的监听按钮 */
	.demo::-webkit-scrollbar-button {
		background-color: #888;
		display: none;
	}


</style>