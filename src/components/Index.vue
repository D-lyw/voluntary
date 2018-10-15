<template>
	<div class="content-wrapper" style="background-color: white;border:1.5px solid #ffd; padding:0 20px;height:800px;" id="main">
		  <br>
		<div style="padding: 20px; background-color: #F2F2F2; ">
		  <div class="layui-row layui-col-space15">
		    <div class="layui-col-md8">
		      <div class="layui-card">
		        <div class="layui-card-header" ><i class="fa fa-free-code-camp" style="color:red;">&nbsp;</i>最新活动 / 通知公告</div>
		        <div class="layui-card-body">
		   
					<el-collapse v-model="activeName" accordion>
						<el-collapse-item v-for="(item,index) in annoucementList" :key="item.id" :name="index+1" :title="item.title">
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
								<span style="font-size:16px;">&nbsp;{{userCollege}}</span> -- 志愿活动概览
							</div>	

							<div class="layui-card-body" id="right_part">
								<table class="table table-hover " style="text-align:left;">
									<tbody>
										<tr >
											<td width="60%"><span style=" display:inline-block; margin-top: 5px;">#院队当前届别#</span></td>
											<td>
													<el-select v-model="selectLevel" placeholder="请选择届别" size="mini" style="border:1px solid #fff;" >
															<el-option
																v-for="(item,index) in organizationInfoList"
																:key="item.id"
																:label="item.level"
																:value="index">
															</el-option>
													</el-select>
											</td>
										</tr>
										<tr>
											<td>本届名称</td>
											<td>{{msginfo.name}}</td>
										</tr>
										<tr>
											<td>本届负责人</td>
											<td>{{msginfo.admin}}</td>
										</tr>	
										<tr>
											<td>本届活动数</td>
											<td>{{msginfo.activityNum}}</td>
										</tr>
										<tr>
											<td>本届工时数</td>
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

	export default {
		name:'Index',
		data () {
			return {
				activeName: '',
				organizationInfoList: [],
				msginfo: {},
				selectLevel: '',

				userCollege: '',

				annoucementList: [],
			}
		},
		mounted(){															
			console.log("欢迎来到志愿管理平台院队管理模块!\n\n如发现任何BUG,请联系\n\nMail: liuyuanwang4321@gmail.com");
			this.checkLogin();
			this.getOrganizationInfo();
			this.getAnnoucement();
		},
		watch: {
			selectLevel: function(){
					this.msginfo = this.organizationInfoList[this.selectLevel];
			} 
		},
		methods: {
		
			/**
			 * [checkLogin 核对是否登陆]
			 * 
			 */
		    checkLogin: function(){
		      		this.axios.post('/WustVolunteer/college/checkLogin.do',{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      		}).then((data) => {
		      			if(data.data.status == 1){
		      				this.$router.push({path: '/'});			// 未登陆则调到登陆页面
								}
								this.userCollege = data.data.data.organizationName;
		      		}).catch((err) => {
								console.log(err);
							})
		    },
			
			/**
			 * 获取公告
			 * 只返回最新的4个公告
			 */
			getAnnoucement: function(){
					this.axios.post('/WustVolunteer/college/getAnnoucement.do',{
							headers:{
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
					}).then(data => {
							this.annoucementList = data.data.data;
							setTimeout(function(){
								this.activeName = 1;
							},200);
							
					}).catch(err => {
							console.log(err);
					})
			},


			/**
			 * [getOrganizationInfo 获取组织信息接口]
			 * @return {[type]} [null]
			 * @url  url+getOrganizationInfo.do
			 */
			getOrganizationInfo: function(){
						this.axios.post('/WustVolunteer/college/getOrganizationInfo.do',{
								headers:{
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
						}).then((data) => {
							this.organizationInfoList = data.data.data;
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