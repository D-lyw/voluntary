<template>
	   <div class="layui-card "  id="right_card" v-show='this.departShow'>
	        <div class="layui-card-header card_right_header" >
	        	<i class="fa fa-university" aria-hidden="true"></i>
	        	<span style="font-size:16px;">&nbsp;计算机青队</span> -- 志愿活动概览
	        	<span id="general_team_view" @click="linktoGeneral" > <router-link to="">总队概览 >></router-link></span>
	        </div>	

	        <div class="layui-card-body" id="right_part">
	          <table class="table table-striped ">
	          	<tbody>
	          		<tr><td>----- 届别 -----</td><td>2018&nbsp;<span class="layui-badge layui-bg-green">进行中</span></td></tr>
	          		<tr><td>本届负责人</td><td>****</td></tr>
	          		<tr><td>本月志愿活动</td><td>9</td></tr>
	          		<tr><td>本届青队志愿活动</td><td>137</td></tr>
	          		
	          		<tr><td>本届累计工时</td><td>25</td></tr>
	          		<tr><td>现阶段志愿者总数</td><td>1125</td></tr>
	          		<tr><td>青队志愿活动总数</td><td>1520</td></tr>
	          		<tr><td></td></tr>
	          	</tbody>
	          </table>
	       	</div>
		</div>
</template>

<script type="text/javascript">
	export default{
		name:"Depart",
		data () {
			return {
				
			}
		},
		props:['departShow'],
		methods:{
			linktoGeneral: function () {				
				console.log(this.departShow);
				$(right_card).addClass('animated fadeOut');
				this.$emit('hasChange');
				
			}
		}
	}

</script>

<style type="text/css">
	
</style>
