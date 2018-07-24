<template>
	<div class="content-wrapper" style="height:700px;overflow-y:auto;overflow-x:hidden;">
		
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }"><i class="fa fa-home" style="opacity:0.8;color:#333;font-size:16px;"></i>&nbsp;首页</el-breadcrumb-item>
		  <el-breadcrumb-item><a href="/">志愿活动</a></el-breadcrumb-item>
		  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="panel panel-default">
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
					<button class="layui-btn layui-btn-sm" @click="dialogVisible = true">
						<i class="fa fa-plus" aria-hidden="true"></i> 
						添加人员
					</button>					
					
					<el-tooltip content="文件批量导入活动人员信息" placement="top">
					  <button class="layui-btn layui-btn-sm" style="background-color:#e74c3c" >
						<i class="fa fa-upload"></i> 
						导入
						</button>
					</el-tooltip>

					<button class="layui-btn layui-btn-sm" style="float:right;">
						<span class="glyphicon glyphicon-export" aria-hidden="true">导出</span>
					</button>

					<el-input
					    placeholder="请输入关键字"
					    v-model="search_content_header" style="display:inline-block;width:200px;float:right;margin-right:10px;" size="small">
					    <i slot="suffix" class="el-input__icon el-icon-search"  id="head_activity_search" @click="clickSearch"></i>
					</el-input>
					
				</div>
			</div>

			<div class="panel-body">
					<el-tabs :tab-position="tabPosition" style="height: auto;min-height: 800px;" v-model="activiTab">

						<!-- 已认证活动 Part -->
					    <el-tab-pane label="已认证活动" name="first">
					    		<table class="table table-hover table-bordered" style="border-top:1.5px solid red;">
									<thead>
										<tr>
											<td><input type="checkbox"></td>
											<td>ID</td>
											<td>名称</td>
											<td>时间</td>
											<td>地点</td>
											<td>总工时</td>
											<td>人数</td>
											<td>所属组织</td>
											<td>所属届别</td>
											<td>发起人</td>
											<td>认证人</td>
											<td>操作</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>

										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>校园自行车整治</td>
											<td>2018-07-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="activityMsg">编辑</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="btn_Delete">删除</button>
											</td>
										</tr>
									</tbody>
									
								</table>
					    </el-tab-pane>

						<!-- 未认证活动 Part  -->
					    <el-tab-pane  name="second">	
					    		<el-badge is-dot class="item" slot="label" style="height:30px;line-height:30px;">未认证活动</el-badge>
								
								<table class="table table-hover table-bordered" style="border-top:1.5px solid #009688;">
									<thead>
										<tr>
											<td><input type="checkbox"></td>
											<td>ID</td>
											<td>名称</td>
											<td>时间</td>
											<td>地点</td>
											<td>总工时</td>
											<td>人数</td>
											<td>所属组织</td>
											<td>所属届别</td>
											<td>发起人</td>
											<td>认证人</td>
											<td>操作</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>志愿迎新活动   <span class="layui-badge ">New</span></td>
											<td>2018-08-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="AddActivityPerson">去添加</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" >删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>志愿迎新活动   </td>
											<td>2018-08-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="">去添加</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="">删除</button>
											</td>
										</tr>
										<tr>
											<td><input type="checkbox" name=""></td>
											<td>7</td>
											<td>志愿迎新活动</td>
											<td>2018-08-30</td>
											<td>武科大黄家湖校区</td>
											<td>3</td>
											<td>30</td>
											<td>计算机院队</td>
											<td>2018届</td>
											<td>王五</td>
											<td>赵六</td>
											<td>
												<button class="layui-btn layui-btn-xs" @click="">去添加</button>
												<button class="layui-btn layui-btn-warm layui-btn-xs" @click="">删除</button>
											</td>
										</tr>
									</tbody>
								</table>
								
					    </el-tab-pane>

					    <!-- 待处理 Part -->
					    <el-tab-pane style="margin-top:10px;margin-left: 10px;" name="third" >
						    	<el-badge :value="100" :max="10" class="item" slot="label" style="padding-right:7px;margin-right:10px;">
								 	 待处理
								</el-badge>

								<ul class="layui-timeline" id="Need_do_thinglist">
									  <li class="layui-timeline-item" v-show="this.show_one_msg"  >
											<i class="fa fa-gg"></i>
										    <div class="layui-timeline-content layui-text" >
										     		<h3 class="layui-timeline-title">2018/09/27 11:23:41</h3>
										     		
										     		<fieldset class="layui-elem-field layui-field-title" style="width: 80%;border:1px solid #e8e8e8;" >
													  <legend style=" display: inline-block;padding: 0px 5px;width: auto;">
													  		<span ><em>活动认证成功通知</em><i class="layui-icon layui-icon-face-smile"></i></span>
													  	</legend>
													  <div class="layui-field-box" >
													   			<div style="margin-top:1px;text-align: center;">你学院申请对 志愿迎新活动 的认证，经总队审核，符合流程要求，已认证成功，祝活动举办圆满成功！</div>
													   			<div style="margin-top: 0px;padding-bottom: 1px;">    
													   					<el-tooltip class="item" effect="dark" content="点击按钮，则表示已阅读该消息"  placement="right">
													   						<button class="layui-btn  layui-btn-xs"  style="float: right;"><i class="fa fa-check-square-o" @click="hide_one_msg"></i>已查看</button>
													   					</el-tooltip>
																</div>
													  </div>
													</fieldset>

										    </div>
									  </li>

									  <li class="layui-timeline-item">
											<i class="layui-icon layui-icon-fire"></i>   
										    <div class="layui-timeline-content layui-text">
											      <h3 class="layui-timeline-title">8月16日</h3>
											      <p>杜甫的思想核心是儒家的仁政思想，他有<em>“致君尧舜上，再使风俗淳”</em>的宏伟抱负。个人最爱的名篇有：</p>
											      <ul>
											        <li>《登高》</li>
											        <li>《茅屋为秋风所破歌》</li>
											      </ul>
										    </div>
									  </li>

									  <li class="layui-timeline-item">
										    <i class="fa fa-commenting-o"></i>
										    <div class="layui-timeline-content layui-text">
											     	 <h3 class="layui-timeline-title">2018/09/12 15:03:24</h3>
											     	<fieldset class="layui-elem-field layui-field-title" style="width: 80%;border:1px solid #e8e8e8;" >
													  <legend style=" display: inline-block;padding: 0px 5px;width: auto;">
													  		<span ><em>活动认证成功通知</em><i class="layui-icon layui-icon-face-smile"></i></span>
													  	</legend>
													  <div class="layui-field-box" >
													   			<div style="margin-top:1px;text-align: center;">你学院申请对 志愿迎新活动 的认证，经总队审核，符合流程要求，已认证成功，祝活动举办圆满成功！</div>
													   			<div style="margin-top: 0px;padding-bottom: 1px;">    
													   					<el-tooltip class="item" effect="dark" content="点击按钮，则表示已阅读该消息"  placement="right">
													   						<button class="layui-btn  layui-btn-xs"  style="float: right;"><i class="fa fa-check-square-o" @click="hide_one_msg"></i>已查看</button>
													   					</el-tooltip>
																</div>
													  </div>
													</fieldset>
										    </div>
									  </li>

									  <li class="layui-timeline-item">
										    <i class="layui-icon layui-timeline-axis"></i>
										    <div class="layui-timeline-content layui-text">
										      <div class="layui-timeline-title">过去</div>
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
														        			<em style="font-size: 18px;" id="header_activity_name">志愿迎新活动</em>
														        			<div style="display: inline-block;float: right;width: 30%;" >
														        					<span style="margin-left: 20%;">活动时间:</span>
																        			<span><em>2018年8月30日</em></span>&nbsp;&nbsp;&nbsp;
																        			<span>发起组织:</span>
																        			<span><em>计算机学院青队</em></span>
														        			</div>
	       			
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
															          				 				<td>工时</td>
															          				 				<td>班级</td>
															          				 				<td>职位</td>
															          				 				<td>操作</td>
														          				 			</tr>
														          				 	</thead>
														          				 	<tbody>
														          				 			<tr>
														          				 					<td><input type="checkbox" name=""></td>
														          				 					<td>2</td>
															          				 				<td>201613136023</td>
															          				 				<td>田七</td>
															          				 				<td>2.5</td>
															          				 				<td>网络1801</td>
															          				 				<td>志愿者</td>
															          				 				<td><button>删除</button></td>
														          				 			</tr>
														          				 	</tbody>
														          			</table>

																		  <el-pagination
																	      @size-change="handleSizeChange"
																	      @current-change="handleCurrentChange"
																	      :current-page.sync="currentPage1"
																	      :page-size="100"
																	      layout="slot, prev, pager, next"
																	      :total="1000">
																	      		<slot >
																	      			<span style="font-weight: 400;">
																	      			# 本活动共42人参与，现显示1到10条数据</span></slot>
																	    </el-pagination>														          			
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
   										 <el-input placeholder="请输入内容" v-model="add_person_search_id">
										   		 <template slot="append" ><i class="fa fa-search"  @click="btn_search_add_id" style="padding: 10px;" ></i></template>
										  </el-input>

										 <div v-if="show_search_error_result">搜索的学号不存在或已加入表中 : (</div>
										
										<div v-if="show_search_success_result">
												<span style="font-size: 15px;"><em>匹配结果如下:</em></span>

												<table class="table table-bordered">
														<tbody>
																<tr>
																	<td>201613136023</td>
																	<td>张三</td>
																	<td>网络1801</td>
																	<td>志愿者</td>
																	<td>15272058782</td>
																</tr>
														</tbody>
												</table>

										</div>
										
										
										<el-input placeholder="请输入工时" v-model="add_person_work_time" style="margin-top: 10px;"></el-input>

										  <span slot="footer" class="dialog-footer">
											    <el-button @click="dialogVisible = false">取 消</el-button>
											    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
										  </span>

								</el-dialog>

						</el-tab-pane>


					</el-tabs>

					<!-- 分页 -->
					<div id="Page_bottom"></div>
				
			</div>		
		</div>
</div>


</template>

<script type="text/javascript" >
	export default {
		name: "ActivityList",
		data () {
			return {
				tabPosition:'left',
				search_content_header:'',
				Edit_act_name: '',
				V_If_Show: [],
				V_edit_tips: [],
				show_add_activityperson_page: false,
				activiTab: 'first',
				tip_show_person_list: true,
				tip_show_none_list: false,
				currentPage1: 1,
				dialogVisible: false,
				add_person_search_id: '',
				add_person_work_time: '',
				show_search_error_result: false,
				show_search_success_result: false,

				show_one_msg: true,
      		}
		},
		watch: {
			activiTab: function (val, oldval){
					// console.log(val+oldval);
					if(val != "four"){
							this.show_add_activityperson_page = false;
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
			}
		},
		methods:{
			refresh: function(){

			},
			clickSearch: function(){

			},
			// Edit_act_name: function(){

			// 	if($('.input_edit_name').val() != ''){
			// 		V_edit_tips[0] = true;
			// 		$("#node_edit_name_ok").css('display','block');
			// 	}else{
			// 		V_edit_tips[0] = false;
			// 	}
			// },
			btn_Delete: function(){
				// 判断是否是已经认证的活动
				this.$notify({      			//刷新提示框
		          type: 'error',
		          title: '禁止删除',
		          message: '已认证的活动，该账户无权限删除',
		          duration: 2000,
		          customClass:'user_style_Warm_no_power',
		          offset:40
		        });
			},
			laypageINIT: function(){
			
			},
			activityMsg: function(){
				var that = this;
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
										<div class="col-md-6"><input class=" form-control input_edit_name" placeholder="请输入活动名称" ></input></div>\
										<div class="col-md-3 col-tips" id="node_edit_name_ok" style="display:none;"><i class="glyphicon glyphicon-ok"></i>&nbsp;输入OK</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动地点:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动地点"/></div>\
									</div>\
									<div class="row">						\
										<div class="col-md-3" style="text-align:right;">活动时间:</div>\
										<div class="col-md-6" id="">\
											  	<div class="layui-input-inline">\
										        <input type="text" class="layui-input" id="test1" placeholder="YYYY-MM-DD" size="small">\
										      	</div>\
										</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动所属组织:</div>\
										<div class="col-md-6">\
												<select class="form-control">\
													<option>请选择所属组织</option>\
													<option>计算机科学与技术学院</option>\
													<option>........</option>\
												</select>\
										</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动总工时:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动总工时"/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动人数:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动人数"/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动发起人:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动发起人"/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动认证人:</div>\
										<div class="col-md-6"><input type="text" disabled class="form-control" placeholder="请输入活动认证人"/></div>\
									</div>\
							</div>',
			  		area: ['800px','600px'],
			  		yes: function(index, layero){
			  			layer.close(index);

			  			setTimeout(function(){					//延迟弹出保存成功提示框
			  				that.$message({
			  					message: 'Edit Save Successful!',
			  					type: "success",
			  					duration: 2000,
			  					offset: 50,
			  					showClose: true
			  			})
			  			},  1000);
			  			
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
			createNewAct: function(){
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
										<div class="col-md-6"><input class=" form-control input_edit_name" placeholder="请输入活动名称" ></input></div>\
										<div class="col-md-3 col-tips" id="node_edit_name_ok" style="display:none;"><i class="glyphicon glyphicon-ok"></i>&nbsp;输入OK</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动地点:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动地点"/></div>\
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
										<div class="col-md-3" style="text-align:right;">活动所属组织:</div>\
										<div class="col-md-6">\
												<select class="form-control">\
													<option>请选择所属组织</option>\
													<option>计算机科学与技术学院</option>\
													<option>........</option>\
												</select>\
										</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动总工时:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动总工时"/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动人数:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动人数"/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动发起人:</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动发起人"/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动认证人:</div>\
										<div class="col-md-6"><input type="text" disabled class="form-control" placeholder="请输入活动认证人"/></div>\
									</div>\
							</div>',
			  		area: ['800px','600px'],
			  		yes: function(index, layero){
			  			layer.close(index);

			  			setTimeout(function(){					//延迟弹出保存成功提示框
			  				that.$message({
			  					message: 'Edit Save Successful!',
			  					type: "success",
			  					duration: 2000,
			  					offset: 50,
			  					showClose: true
			  			})
			  			},  1000);
			  			
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

			AddActivityPerson: function(){
					this.show_add_activityperson_page = true;
					this.activiTab = "four";
			},

			showAnimateHeader: function () {
					// alert("dsfsdfdsf");
					$("#header_activity_name").addClass("animated lightSpeedIn");
			},

			 handleSizeChange(val) {
		        	console.log(`每页 ${val} 条`);
		      },

		      handleCurrentChange(val) {
		        	console.log(`当前页: ${val}`);
		      },

		      handleClose(){											//添加人员对哈话框关闭之后的回调函数
		      		console.log("test OK");
		      		// console.log(this.add_person_search_id + " " + this.add_person_work_time);
		      		this.add_person_work_time = '';
		      		this.add_person_search_id = '';

		      		this.$message({
		      				message: '&nbsp;&nbsp;添加成功',
		      				dangerouslyUseHTMLString: true,
		      				customClass: "user_style_for_ok_add",
		      				iconClass: 'fa fa-check',
		      				showClose: true
		      		});
		      },

		      btn_search_add_id(){
		      		this.show_search_error_result = true;
		      },

		      hide_one_msg: function(){
		      		this.show_one_msg = false;
		      		console.log(this.show_one_msg);
		      }
		},
		mounted(){			
			window.layui.use(['laypage', 'layer', 'laydate'], function(){
				var laypage = layui.laypage
				   ,layer = layui.layer
				   ,laydate = layui.laydate;

					laypage.render({
					    elem: 'Page_bottom'
					    ,count: 100
					    ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
					    ,jump: function(obj){
					      // console.log(obj)
					    }
					});
				});
		}
	}


</script>

<style type="text/css" >
	@import '../../static/css/activitylist.css'
</style>