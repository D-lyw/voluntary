<template>
	<div class="content-wrapper" style="background-color: white;border:1.5px solid #ffd; padding:0 20px;height:auto;" id="main">
		  <br>
		<div style="padding: 20px; background-color: #F2F2F2; ">
		  <div class="layui-row layui-col-space15">
		    <div class="layui-col-md8">
		      <div class="layui-card">
		        <div class="layui-card-header" ><i class="fa fa-free-code-camp" style="color:red;">&nbsp;</i>最新活动 / 通知公告</div>
		        <div class="layui-card-body">
					<el-collapse v-model="activeName" accordion>
						<el-collapse-item v-for="(item,index) in annoucementList" :key="item.id" :name="index" :title="item.title">
							<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</div>
						</el-collapse-item>
					</el-collapse>
		        </div>
		      </div>
		    </div>
		    <div class="layui-col-md4" >
				<div class="layui-card animated bounceInRight"  id="right_card" >
					<div class="layui-card-header card_right_header" >
						<i class="fa fa-university" aria-hidden="true"></i>
						<span style="font-size:16px;">&nbsp;青年志愿者总队</span> -- 志愿活动概览
					</div>	
					<div class="layui-card-body" id="right_part">
						<table class="table table-hover ">
							<tbody>
								<tr >
									<td width="60%"><span style=" display:inline-block; margin-top: 5px;">#总队当前届别#</span></td>
									<td>
											<el-select v-model="selectLevel" placeholder="请选择届别" size="mini" style="border:1px solid #fff;" >
													<el-option
														v-for="(item,index) in levelInfo"
														:key="item.id"
														:label="item.level"
														:value="index">
													</el-option>
											</el-select>
									</td>
								</tr>
								<tr>
												<td>本届总队活动数</td>
												<td>{{msginfo.teamActivityNum}}</td>
											</tr>
								<tr>
												<td>本届总队工时总数</td>
												<td>{{msginfo.teamActivityVolunteerTime}}</td>
											</tr>
								<tr>
												<td>本届组织数</td>
												<td>{{msginfo.organizationNum}}</td>
											</tr>
								<tr>
												<td>组织活动数</td>
												<td>{{msginfo.activityNum}}</td>
											</tr>
								<tr>
												<td>组织工时数</td>
												<td>{{msginfo.volunteerTime}}</td>
											</tr>
								<tr><td></td><td>	</td></tr>
							</tbody>
						</table>
					</div>
				</div>
		    </div>
		  </div>
		</div> 
		 
	</div>
</template>

<script type="text/javascript">
import qs from 'qs';

	export default {
		name:'Index',
		data () {
			return {
				activeName: '0',
				userLevel: '',

				levelInfo: [],
				selectLevel: '',

				msginfo: {},

				annoucementList: []
			}
		},
		mounted(){
			console.log("欢迎进入志愿管理平台-总队模块！\n\n如有任何问题，请联系Mail：liuyuanwang4321@gmail.com");
			// 获取该用户所在学院的基本信息
			this.checkLogin();
			this.getOrganizationInfo();
			this.getAnnoucementList();
		},
	  	watch:{
			selectLevel:function(){
					this.msginfo = this.levelInfo[this.selectLevel];
			}
		},
		methods: {
		
			doChange: function(){
				this.departS = !this.departS;
				this.generalS = !this.generalS;
			},

			/**
			 * [checkLogin 核对是否登陆]
			 * @return {[type]} [description]
			 */
			checkLogin: function(){
					this.axios.post('/WustVolunteer/general/checkLogin.do',{
								headers:{
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
					}).then((data) => {
						if(data.data.status == 1){
							this.$router.push({path: '/login'});			// 未登陆则调到登陆页面
						}
					}).catch((err) => {
						console.log(err);
					})
			},
			
			/** 
			 * 获取公告列表
			 * @param pageNum
			 * @param pageSize
			 */
			getAnnoucementList: function(){
					let data = {
						pageNum: 1,
						pageSize: 4
					}
					this.axios.post('/WustVolunteer/general/getAnnoucementList.do',qs.stringify(data),{
						headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(data => {
						this.annoucementList = data.data.data.list;
						this.activeName = '1';
					}).catch(err => {
						console.log(err);
					})
			},


			/**
			 * [getGeneralInfo 获取组织信息接口]
			 * @enum 		{5}
			 * @return {[type]} [null]
			 * @url  url+getGeneralInfo.do
			 */
			getOrganizationInfo: function(){
					this.axios.post('/WustVolunteer/general/getGeneralInfo.do',{
											headers:{
												'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
											}
					}).then((data) => {
						this.levelInfo = data.data.data;
						this.selectLevel = 0;
					}).catch((err) => {
							console.log(err);
					})
			},
		}
	}
</script>

<style >
	@import '../../static/css/index.css';
</style>