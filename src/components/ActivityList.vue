<template>
	<div class="content-wrapper" style="height:700px;overflow-y:auto;overflow-x:hidden;">
		
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }"><i class="fa fa-home" style="opacity:0.8;color:#333;font-size:16px;"></i>&nbsp;首页</el-breadcrumb-item>
		  <el-breadcrumb-item><a href="/">志愿活动</a></el-breadcrumb-item>
		  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		
		<!-- <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
		    <el-radio-button label="top">top</el-radio-button>
		    <el-radio-button label="right">right</el-radio-button>
		    <el-radio-button label="bottom">bottom</el-radio-button>
		    <el-radio-button label="left">left</el-radio-button>
		</el-radio-group> -->
		<div class="panel panel-default">
			<div class="panel-heading">
				<div class="btn-group" style="width:100%;">
					<button class="layui-btn layui-btn-sm" style="background:#2c3e50;" title="刷新" @click="refresh" >
						<i class="fa fa-refresh" aria-hidden="true" style="color:white;"></i> 
					</button>
					<button class="layui-btn layui-btn-sm" style="background:#18bc9c; color:white;margin-left:-1px;" @click="dialogFormVisible = true" >
						<i class="fa fa-plus" aria-hidden="true"></i> 
						添加活动
					</button>
					<button class="layui-btn layui-btn-sm">
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
				<el-tabs :tab-position="tabPosition" style="height: auto;min-height: 600px;">
				    <el-tab-pane label="已认证活动">
				    	<table class="table table-hover table-bordered" style="border:1px solid red;">
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
				    <el-tab-pane >	
				    	<el-badge is-dot style="border:1px solid red; padding:0px;" class="item" slot="label">未认证活动</el-badge>
				    </el-tab-pane>
				    <el-tab-pane>
				    	<span slot="label">待处理活动</span>
				    </el-tab-pane>
					    <!-- <el-tab-pane label="定时任务补偿">
					    	
					    </el-tab-pane> -->
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
				activity_Edit_name: '',

      		}
		},
		methods:{
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
				layer.open({
				  	type: 1,
				  	skin: 'layui-layer-molv', //样式类名
				  	closeBtn: 0, //不显示关闭按钮		
			  		anim: 2,
			  		shadeClose: false, //开启遮罩关闭
			  		btn: ['确定&保存', "取消"],
			  		title: '[ 编辑 ] - 志愿活动',
			  		content: '<div style="border:1px solid red;padding:20px;">\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动名称</div>\
										<div class="col-md-6"><input class="form-control" v-model="activity_Edit_name" placeholder="请输入活动名称" clearable></input></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动名称</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动地点"/></div>\
									</div>\
									<div class="row">						\
										<div class="col-md-3" style="text-align:right;">活动时间</div>\
										<div class="col-md-6" id="">\
											  	<div class="layui-input-inline">\
										        <input type="text" class="layui-input" id="test1" placeholder="YYYY-MM-DD" size="small">\
										      	</div>\
										</div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动所属组织</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入所属组织"/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动人数</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动人数"/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动发起人</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动发起人"/></div>\
									</div>\
									<div class="row" >\
										<div class="col-md-3" style="text-align:right;">活动认证人</div>\
										<div class="col-md-6"><input type="text" class="form-control" placeholder="请输入活动认证人"/></div>\
									</div>\
							</div>',
			  		area: ['800px','600px'],
				});
				window.layui.laydate.render({
			   	 		elem: '#test1'
			  	});
			}

		},
		mounted(){			
			console.log(this.tabPosition);
			layui.use(['laypage', 'layer', 'laydate'], function(){
				var laypage = layui.laypage
				   ,layer = layui.layer
				   ,laydate = layui.laydate;

					laypage.render({
					    elem: 'Page_bottom'
					    ,count: 100
					    ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
					    ,jump: function(obj){
					      console.log(obj)
					    }
					});
				});
		}
	}


</script>

<style type="text/css" >
	@import '../../static/css/activitylist.css'
</style>