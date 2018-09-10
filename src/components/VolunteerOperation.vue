<template>
		<div class="content-wrapper" style="height:900px;overflow-y:auto;overflow-x:hidden;">

				<div id="navigoto_div" >
					<el-breadcrumb separator-class="el-icon-arrow-right">
						 <el-breadcrumb-item :to="{ path: '/home/introduce' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
						 <el-breadcrumb-item>志愿者管理</el-breadcrumb-item>
						 <el-breadcrumb-item>志愿者操作</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				

				<el-tabs v-model="activeName" @tab-click="handleClick" id="tabs_body">

				    <el-tab-pane label="信息编辑" name="first">
						
						<el-input placeholder="请输入学号查找学生信息" v-model="search_stuNum" class="input-with-select" style="width:50%;margin-left:16%;">
						    <el-select  v-model="select" slot="prepend" placeholder="请选择" style="width:120px;">
						      <el-option label="学号" value="1"></el-option>
						    </el-select>
						    <el-button slot="append" icon="el-icon-search" @click='searchStudent'></el-button>
						</el-input>

						<el-form :label-position="labelPosition" label-width="200px" :model="stuMsg" size="small" id="msg_edit">
							  <el-form-item label="所属学院">
							    	<el-input v-model="stuMsg.collegeName" placeholder="暂不支持修改所属学院" :disabled="true"></el-input>
							  </el-form-item>
							  <el-form-item label="所属班级">
							    	<el-select v-model="stuMsg.className" placeholder="请选择所属班级" style="width:100%;">
									      <el-option v-for="item in classLists" :key="item.id" :value="item.name" :label="item.name" ></el-option>
								    </el-select>
							  </el-form-item>
							  <el-form-item label="学号" >
							    	<el-input v-model="stuMsg.studentNum" placeholder="学号不可更改" :disabled="true"></el-input>
							  </el-form-item>
							  <el-form-item label="姓名">
							    	<el-input v-model="stuMsg.name"></el-input>
							  </el-form-item>
							  <el-form-item label="年级">
							    	<el-select v-model="stuMsg.level" placeholder="请输入所属届别" style="width:100%;">
							    		  <el-option v-for="item in levelList" :key = "item.id" :value="item.level" :label='item.level'></el-option>
							    	</el-select>
							  </el-form-item>
							  <el-form-item label="职务" >
							    	<!-- <el-input v-model="stuMsg.roll" placeholder="志愿者的职务"></el-input> -->
							    	<el-select v-model="stuMsg.roll" placeholder="志愿者的职务" style="width:100%;">
							    		  <el-option  label="志愿者" value="0"></el-option>
							    		  <el-option  label="班级小助手" value="1"></el-option>
							    	</el-select>
							  </el-form-item>
							  <el-form-item label="联系方式" >
							    	<el-input v-model="stuMsg.phone" placeholder="电话或邮箱均可"></el-input>
							  </el-form-item>
							  <el-form-item label="工时" >
							    	<el-input v-model="stuMsg.volunteerTime" placeholder="工时不可修改" :disabled="true"></el-input>
							  </el-form-item>

							  <el-form-item size="small">
							    	<el-button type="primary" @click="saveStuMsg">立即修改</el-button>
							    	<el-button>取消</el-button>
							  </el-form-item>
						</el-form>

				    </el-tab-pane>

				    <el-tab-pane label="班级列表" name="second">
				    	班级列表
				    </el-tab-pane>

				    <el-tab-pane label="批量导入" name="third">
				    	批量导入
				    </el-tab-pane>

				    <el-tab-pane label="定时任务补偿" name="fourth">
				    	定fdgsfdgfds时任务补偿
				    </el-tab-pane>
				</el-tabs>
		</div>
</template>

<script type="text/javascript">
import qs from 'qs';
		export default{
			 neme: 'VolunteerOperation',

			 data(){
			 	return{
			 		labelPosition: 'right',
			 		activeName: 'first',
			 		// 要编辑的学生信息
			 		stuMsg: {
			 			collegeName: '',
			 			className: '',
			 			studentNum: '',
			 			name: '',
			 			level: '',
			 			roll: '',
			 			phone: '',
			 			volunteerTime: 0,
			 		},

			 		search_stuNum: '',
			 		select: '',

			 		classLists: ['选择所属班级'],
			 		levelList: ['选择所属届别'],

 				}
  			},

  			mounted(){
  				 this.clearStuMsg();
  				 // this.alterVolunteer('201613136023', '刘元旺', '网络1601', '1826789310', 0);
  			},

  			methods: {

  				handleClick: function(){
  					 this.clearStuMsg();
  				},

  				saveStuMsg: function(){
  					// 确认更新
  					this.$confirm('此操作将更新此志愿者信息, 是否继续?', '提示', {
					           confirmButtonText: '确定',
					           cancelButtonText: '取消',
					           type: 'warning'
				        	}).then(() => {
				        		// 更新志愿者信息
				        		// console.log(this);
				        		console.log(this.stuMsg);
				        		this.alterVolunteer(this.stuMsg.studentNum, this.stuMsg.name, this.stuMsg.className, this.stuMsg.phone, this.stuMsg.roll);
					            
				        	}).catch(() => {

					            this.$message({
						            type: 'info',
						             message: '已取消删除',
						             offset: '35px',
						             customClass: 'user_sytle_for_volunteerlist',
						             duration: 2000
					          	});        
					          	this.clearStuMsg();  
							});
  				},

  				clearStuMsg: function(){
  					 this.stuMsg.collegeName = ''
					 this.stuMsg.className = ''
					 this.stuMsg.studentNum = '';
					 this.stuMsg.name = '';
					 this.stuMsg.level = '';
					 this.stuMsg.roll = '';
					 this.stuMsg.phone = '';
					 this.stuMsg.volunteerTime = '';

					 this.classLists = ['选择所属班级'];
					 this.levelList = ['选择所属届别'];
  				},

  				/**
			       * [searchStudent 模糊查询志愿者]
			       * @enum {[type]}  【29】
			       * @param  {[type]} msg [查询字段(学号或姓名)只可查询本学院志愿者]
			       * @return {[type]}     [description]
			       */
			    searchStudent: function(){
			    		// 判断是否为空
			    		if(this.search_stuNum == ''){
			    			this.$message({
					             type: 'info',
					             message: '请输入查询学号后，点击查询信息',
					             offset: '35px',
					             customClass: 'user_sytle_for_volunteerlist',
					             duration: 2000
							});
							this.clearStuMsg();
							return ;
			    		}

			      		let data = { 
			      			msg: this.search_stuNum
			      		};

			      		this.axios.post('/WustVolunteer/college/searchStudent.do',qs.stringify(data),{
			      			headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
			      		}).then((data) => {
			      			this.clearStuMsg();

			      			if(data.data.data.length == 1){  					// 查询的结果不为空
			      				 this.stuMsg.collegeName = data.data.data[0].collegeName;
			      				 this.stuMsg.className = data.data.data[0].className;
			      				 this.stuMsg.studentNum = data.data.data[0].studentNum;
			      				 this.stuMsg.name = data.data.data[0].name;
			      				 this.stuMsg.level = data.data.data[0].level;
			      				 this.stuMsg.roll = data.data.data[0].roll;
			      				 this.stuMsg.phone = data.data.data[0].phone;
			      				 this.stuMsg.volunteerTime = data.data.data[0].volunteerTime;

			      				this.$message({
							             type: 'success',
							             message: '成功查找志愿者信息',
							             offset: '35px',
							             customClass: 'user_sytle_for_volunteerlist',
							             duration: 2000
								});

			      				// 获取班级列表
			      				this.getClassInfo(this.stuMsg.level);
			      				// 获取届别列表
			      				this.getLevelList();
			      			}else{
			      				this.$message({
							             type: 'info',
							             message: '未找到该学号的学生具体信息，请核对搜索条件',
							             offset: '35px',
							             customClass: 'user_sytle_for_volunteerlist',
							             duration: 2000
								});
			      			}
			      			
			      		}).catch((err) => {
							console.log(err);
						})

			      		this.search_stuNum = '';
			    },

			    /**
			       * [getClassInfo 获取学院班级信息列表]
			       * @enum {[type]}		[13]
			       * @param  {[type]} level [届别]
			       * @return {[type]}       [description]
			       */
			    getClassInfo: function(level){
			      	   let data = {
			      	   		level: level
			      	   };

			      	   this.axios.post('/WustVolunteer/college/getClassInfo.do',qs.stringify(data),{
			      			headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
			      		}).then((data) => {
			      			console.log(data);
			      			// for(var i = 0; i < data.data.data.list.length; i++){
			      			// 	this.classLists.push(data.data.data.list[i].name);
			      			// }
			      			this.classLists = data.data.data.list;
			      		}).catch((err) => {
							console.log(err);
						})
			    },


			     /**
			       * [getLevelList 获届别列表接口]
			       * @enum [6]
			       * @return {[type]} [description]
			       */
			    getLevelList:function(){
			      		this.axios.post('/WustVolunteer/college/getLevelList.do',{
			      			headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
			      		}).then((data) => {
			      			// console.log(data);
			      			this.levelList = data.data.data;
			      		}).catch(err => {
							console.log(err);
						})
			    },


			    /**
			       * [alterVolunteer 修改志愿者信息]
			       * @enum { }		[21]
			       * @param  {[type]} stu       [学号]
			       * @param  {[type]} stuName   [姓名]
			       * @param  {[type]} className [班级]
			       * @param  {[type]} phone     [手机号]
			       * @param  {[type]} roll      [权限级别]
			       * @return {[type]}           [description]
			       */
			    alterVolunteer: function(stuNum, stuName, className, phone, roll){
			      		var data = {
			      			stuNum: stuNum,
			      			stuName: stuName,
			      			className: className,
			      			phone: phone,
			      			roll:roll
			      		};

			      		this.axios.post('/WustVolunteer/college/alterVolunteer.do',qs.stringify(data),{
			      			headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
			      		}).then((data) => {
			      			console.log(data);
			      			if(data.data.status == 0){
			      				this.$notify.success({
					      				title: '更新成功',
					      				message: '成功更新该志愿者的信息',
					      				offset: 45,
					      				duration: 2000
					      		});
			      			}else{
			      				this.$notify.error({
					      				title: '更新失败',
					      				message: '更新该志愿者的信息失败',
					      				offset: 45,
					      				duration: 2000
					      		});
			      			}
			      			this.clearStuMsg();
			      		}).catch((err) => {
							console.log(err);
							this.$notify.error({
					      				title: '更新失败',
					      				message: '更新该志愿者的信息失败',
					      				offset: 45,
					      				duration: 2000
					      		});
							this.clearStuMsg();
						})
			    },

  			}
   		}
</script>

<style type="text/css">
		@import '../../static/css/volunteeroperation.css'
</style>