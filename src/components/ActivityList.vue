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
				<div class="btn-group">
					<button>refresh</button>
					<button>添加活动</button>
					<button>添加活动人员</button>

					<button>导入活动人员</button>

					<input type="text" placeholder="search">
					<button>导出</button>
				</div>
			</div>

			<div class="panel-body">
				<el-tabs :tab-position="tabPosition" style="height: 200px;">
				    <el-tab-pane label="用户管理">
				    	<table class="table table-hover table-bordered" style="border:1px solid red;">
								<thead>
									<tr>
										<td><input type="checkbox"></td>
										<td>ID</td>
										<td>名称</td>
										<td>时间</td>
										<td>地点</td>
										<td>工时</td>
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
											<button class="layui-btn layui-btn-xs">编辑</button>
											<button class="layui-btn layui-btn-warm layui-btn-xs">删除</button>
										</td>
									</tr>
								</tbody>
								
							</table>
				    </el-tab-pane>
				    <el-tab-pane label="配置管理">
				    	
				    </el-tab-pane>
				    <el-tab-pane label="角色管理">
				    	
				    </el-tab-pane>
				    <el-tab-pane label="定时任务补偿">
				    	
				    </el-tab-pane>
				</el-tabs>


				<!-- 分页 -->
				<div id="Page_bottom"></div>
			</div>		
		</div>
		
		
	

</div>


</template>

<script type="text/javascript">
	export default {
		name: "ActivityList",
		data () {
			return {
				tabPosition:'left'
      		}
		},
		methods:{

		},
		mounted(){
			layui.use(['laypage', 'layer'], function(){
				var laypage = layui.laypage
				   ,layer = layui.layer;

				laypage.render({
				    elem: 'Page_bottom'
				    ,count: 100
				    ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
				    ,jump: function(obj){
				      console.log(obj)
				    }
				});
			})
		}
	}


</script>

<style type="text/css" scoped>
	.content-wrapper{
		padding:10px;
		background: #f1f4f6;
	}
	table{
		text-align: center;
	}
</style>