<template>
	<div class="content-wrapper" style="height:400px;overflow-y:auto;overflow-x:hidden;">	
		<span class="layui-breadcrumb navigoto "  style="">
		  <i class="fa fa-home" style="opacity:0.8;color:#333;font-size:16px;"></i>&nbsp;
		  <router-link to="/">&nbsp;&nbsp;主页</router-link>
		  <router-link to="">系统操作</router-link>
		  <router-link to=""><cite>人员权限</cite></router-link>
		</span>

		<div class="contenter panel panel-default">
			<div class="panel-heading" style="background:#e8edf0;bordre:1px solid #e8edf0;">
				<em>计算机学院 院队负责人</em>
				<p>dkj dskfajidsajfdsjfkdjs dsfaj;d</p>     
			</div>
			<div class="panel-body">
				<div class="btn_group">
					<button class="btn btn-sm" >
						<i class="fa fa-refresh" aria-hidden="true"></i> 
					</button>
					<button class="btn btn-sm">
						<i class="fa fa-plus" aria-hidden="true"></i> 
						添加
					</button>
					<button class="btn btn-sm">
						<i class="fa fa-trash" aria-hidden="true"></i> 
						删除
					</button>

					<el-input v-model="input_search" placeholder="请输入内容" size="small" clearable style="width:25%;display:inline-block;border-radius:0px;" class="input-with-select">
					</el-input>

					<button>search</button>
					<button>导出</button>

				</div>
				<table>
					<thead>
						<tr>
							<td></td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'PeopleAuthority',
		data () {
			return {
				input_search:''
			}
		},
		methods:{
			
		}
	}
</script>

<style type="text/css">
	@import '../../static/css/peopleauthority.css'
</style>