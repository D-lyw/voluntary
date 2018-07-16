<template>
	 	<div class="layui-card animated bounceInRight"  id="right_card" v-show='generalShow' >
	        <div class="layui-card-header card_right_header" >
	        	<i class="fa fa-university" aria-hidden="true"></i>
	        	<span style="font-size:16px;">&nbsp;志愿者总队</span> -- 志愿活动概览
	        	<span id="general_team_view" @click="$emit('hasChange')"> <router-link to="">学院概览 >></router-link></span>
	        </div>	

	        <div class="layui-card-body" id="right_part">
	          <table class="table table-striped ">
	          	<tbody>
	          		<tr><td>本月志愿活动</td><td>9</td></tr>
	          		<tr><td>本届青队志愿活动</td><td>137</td></tr>
	          		<tr><td>青队志愿活动总数</td><td>1520</td></tr>
	          		<tr><td>志愿活动班级</td><td>25</td></tr>
	          		<tr><td>现阶段志愿者总数</td><td>1125</td></tr>
	          		<tr><td></td></tr>
	          	</tbody>
	          </table>
	       	</div>
		</div>
</template>

<script type="text/javascript">
	export default {
		name:'General',
		props:['generalShow'],
		data () {
			return {
				
			}
		},
		methods:{
			linktoDepart: function(){
				
			}
		}
	}
	
</script>

<style type="text/css">
	
</style>