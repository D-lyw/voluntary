<template>
		<div class="content-wrapper" style="">

				<div id="navigoto_div" >
					<el-breadcrumb separator-class="el-icon-arrow-right">
						 <el-breadcrumb-item :to="{ path: '/home/introduce' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
						 <el-breadcrumb-item>志愿者概览</el-breadcrumb-item>
						 <el-breadcrumb-item>志愿者操作</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				
				<el-tabs v-model="activeName" @tab-click="handleClick" id="tabs_body">
				    <el-tab-pane label="信息编辑" name="first">
						
						<el-input placeholder="请输入学号查找学生信息" v-model="search_stuNum" class="input-with-select" style="width:50%;margin-left:4.5%;margin-top:5px;">
						    <el-select  v-model="select" slot="prepend" placeholder="请选择" style="width:140px;">
						      <el-option label="学号" value="1"></el-option>
						    </el-select>
						    <el-button slot="append" icon="el-icon-search" @click='searchStudent'></el-button>
						</el-input>

						<el-form :label-position="labelPosition" label-width="200px" :model="stuMsg" size="small" id="msg_edit">
							  <el-form-item label="所属学院">
							    	<el-input v-model="stuMsg.collegeName" placeholder="院队无权限修改所属学院"  disabled></el-input>
							  </el-form-item>
							  <el-form-item label="所属班级">
							    	<el-select v-model="stuMsg.className" placeholder="请选择所属班级" style="width:100%;">
									      <el-option v-for="item in classLists" :key="item.id" :value="item.name" :label="item.name" ></el-option>
								    </el-select>
							  </el-form-item>
							  <el-form-item label="学号" >
							    	<el-input v-model="stuMsg.studentNum" placeholder="学号不可更改" disabled></el-input>
							  </el-form-item>
							  <el-form-item label="姓名">
							    	<el-input v-model="stuMsg.name"></el-input>
							  </el-form-item>
							  <el-form-item label="年级">
							    	<el-select v-model="stuMsg.level" placeholder="请输入所属届别" style="width:100%;" @change="getClassInfo(parseInt(stuMsg.level))">
							    		  <el-option v-for="item in levelList" :key="item.level" :value="item.level" :label="item.level"></el-option>
							    	</el-select>
							  </el-form-item>
							  <el-form-item label="职务" >
							    	<el-select v-model="stuMsg.roll" placeholder="志愿者的职务" style="width:100%;">
							    		  <el-option  label="志愿者" :value="0"></el-option>
							    		  <el-option  label="班级小助手" :value="1"></el-option>
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
							    	<el-button @click="clearStuMsg">取消</el-button>
							  </el-form-item>
						</el-form>

				    </el-tab-pane>

				    <el-tab-pane label="班级列表" name="second">
						<!-- addClass 输入框 -->
						<el-input placeholder="请输入新建班级名称" v-model="add_class_input" class="input-with-select">
						    <el-select v-model="select_add_level" slot="prepend" placeholder="选择新建班级届别" style="width:200px;">
						      
						      <el-option v-for="(item,index) in collapse_levellist" :label='item.level' :value="item.level" :key="index" ></el-option>
						    </el-select>
						    <el-button slot="append" @click="addClass()" icon="el-icon-plus" style="width:150px;">添加班级</el-button>
						</el-input> 
						<!-- 折叠面板 -->

				    	<el-collapse v-model="selectCollapse" accordion id="el_collapse" style="width:97%;margin:auto;margin-top:15px;">
							 
							  <el-collapse-item v-for="(item, index) in collapse_levellist" :title="item.level + '届 班级列表'" :name="index" :key="index" >
							  		<!-- <span v-for="i in levelClassList" :key = "index">{{i.name}}</span> -->
								  		 <el-table
									      :data="levelClassList[index]"
									      style="width: 100%; height:auto;max-height:480px;overflow:auto;" 
									      size="small" 
									      :stripe="true"
									      :default-sort = "{prop: 'id',  order: 'descending'}" >
									      <el-table-column
									        prop="id"
									        label="ID"
									        sortable
									        width="100" >
									      </el-table-column>
									      <el-table-column
									        prop="name"
									        label="班级名称"
									        width="180">
									      </el-table-column>
									      <el-table-column
									        prop="volunteerNum"
									        sortable
									        label="班级志愿者总数">
									      </el-table-column>
									      <el-table-column
									        prop="volunteerTime"
									        sortable
									        label="班级志愿者工时">
									      </el-table-column>
									       <el-table-column
										      label="操作"
										      width="150">
										      <template slot-scope="scope">
										        <!-- <el-button  type="text" size="mini">新建班级</el-button> -->
										        <el-button type="danger" size="mini" @click="deleteClass(scope.row.name)">删除</el-button>
										      </template>
										    </el-table-column>
									    </el-table>
							  </el-collapse-item>
						</el-collapse>
				    </el-tab-pane>

				    <el-tab-pane label="批量导入" name="third">
				    	<el-alert
						    title="导入文件须知:"
						    type="info"
						    description="导入的.xlsx文件中,表头包含 ## 学号  姓名  班级  联系方式  权限 ## 五个字段 ,填写的班级必须是系统中已经存在的班级名，权限一栏，填写0,1或2， 0 代表 志愿者， 1 代表 班级小助手, 2 代表 委员; 如果导入学号重复，或系统已存在相同学号的志愿者信息，将报错；报错后，检查导入文件是否符合要求，刷新重试！"
						    show-icon>
						</el-alert>

				
						<el-button type="success" style="width:200px;margin-top:20px;">
							<span style="display:block; margin-bottom:-25px;">批量导入志愿者信息</span> 
							<input type="file"  @change="importFile($event)" id="input_file" style="opacity:0;" >
						</el-button>
						<p style="font-size:12px;margin-top:8px;opacity:0.8;">
						# 该文件共有 {{inputdataLength}} 条数据, 成功导入 {{successNum}} 条志愿者信息</p>
				    </el-tab-pane>
				</el-tabs>
		</div>
</template>

<script type="text/javascript">
import qs from 'qs';
import xlsx from 'xlsx';

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


			 		// part 2
			 		selectCollapse: '0',
			 		collapse_levellist: [],
			 		levelClassList: [],

			 		select_add_level: '',
			 		add_class_input: '',

			 		selected_dept: '',
			 		options_selected_dept: [],

			 		// part 3
			 		inputdataLength: 0,
			 		successNum: 0,

 				}
  			},

  			mounted(){
  				//  this.getLevelList();
  			},

  			methods: {

  				handleClick(tab, event) {
  					// 切换tab时，清除tab0 输入框中的内容
			  		this.clearStuMsg();
			        if(tab.index == 1){
			        	for(var i = 0; i < this.collapse_levellist.length; i++){
			        		this.getClassMsgForCollapse(this.collapse_levellist[i].level, i);
			        	}
			        }
				},
				/**
				 * 更新志愿者信息
				 */
  				saveStuMsg: function(){
  					// 确认更新
  					this.$confirm('此操作将更新此志愿者信息, 是否继续?', '提示', {
					            confirmButtonText: '确定',
					            cancelButtonText: '取消',
					            type: 'warning'
				        	}).then(() => {
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

				/**
				 * 清空信息填写框的内容
				 */
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
			      				// // 获取届别列表
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
			      			this.classLists = data.data.data.list;
			      		}).catch((err) => {
							console.log(err);
						})
			    },

			    /**
			     * [getClassMsgForCollapse 为Collpapse获取班级信息]
			     * @param  {[type]} level [description]
			     * @return {[type]}       [description]
			     */
			    getClassMsgForCollapse: function(level, i){
			      	   var data = {
			      	   		level: level
			      	   };

			      	   this.axios.post('/WustVolunteer/college/getClassInfo.do',qs.stringify(data),{
			      			headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
			      		}).then((data) => {
			      			this.levelClassList[i] = data.data.data.list;
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
			      			this.levelList = data.data.data;
			      			this.collapse_levellist = data.data.data.reverse();
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

			    /**
			       * [addClass 添加志愿班级]
			       * @enum {[type]}   【16】
			       * @param {[type]} level     [届别]
			       * @param {[type]} className [description]
			       */
			    addClass: function(){
			    		if(this.add_class_input == '' || this.select_add_level == ""){
			    			this.add_class_input = '';
			    			this.select_add_level = "";
			    			return ;
			    		}
			      		let data = {
			      			level: this.select_add_level,
			      			className: this.add_class_input
			      		};
			      		this.axios.post('/WustVolunteer/college/addClass.do',qs.stringify(data),{
			      			headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
			      		}).then((data) => {
			      			if(data.data.status == 0){
			      				this.$message({
						            type: 'success',
						            message: '成功添加班级 : )',
						            customClass: 'user_sytle_for_volunteerlist',
						            duration: 2000
								});
								// 更新数据
					        	for(var i = 0; i < this.collapse_levellist.length; i++){
					        		this.getClassMsgForCollapse(this.collapse_levellist[i].level, i);
					        	}
			      			}else{
			      				this.$message({
						            type: 'error',
						            message: '添加班级失败 : (',
						            customClass: 'user_sytle_for_volunteerlist',
						            duration: 2000
						        });
			      			}
			      		}).catch((err) => {
							console.log(err);
							this.$message({
						            type: 'error',
						            message: '添加班级失败 : (',
						            customClass: 'user_sytle_for_volunteerlist',
						            duration: 2000
						    });
						})

						this.add_class_input = '';
			    		this.select_add_level = "";
			    },

			    /**
			       * [deleteClass 删除志愿班级]
			       * @enum {[type]}  [17]
			       * @param  {[type]} className [班级名称]
			       * @return {[type]}           [description]
			       */
			    deleteClass: function(className){
			    	this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
						           confirmButtonText: '确定',
						           cancelButtonText: '取消',
						           type: 'warning'
					        	}).then(() => {
					        		// 删除班级
					        		let data = {
						      			className: className
						      		};

						      		this.axios.post('/WustVolunteer/college/deleteClass.do',qs.stringify(data),{
						      			headers:{
											'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
										}
						      		}).then((data) => {
						      			if(data.data.status == 0){
						      				this.$message({
									            type: 'success',
									             message: '成功删除 : )',
									             offset: '35px',
									             customClass: 'user_sytle_for_volunteerlist',
									             duration: 2000
								        	});
						      				// 更新数据
								        	for(var i = 0; i < this.collapse_levellist.length; i++){
								        		this.getClassMsgForCollapse(this.collapse_levellist[i].level, i);
								        	}
						      			}else{
						      				this.$message({
									            type: 'error',
									             message: '删除失败 : (',
									             offset: '35px',
									             customClass: 'user_sytle_for_volunteerlist',
									             duration: 2000
								        	});    
						      			}			  
						      		}).catch((err) => {
										console.log(err);
										this.$message({
									            type: 'error',
									             message: '删除失败 : (',
									             offset: '35px',
									             customClass: 'user_sytle_for_volunteerlist',
									             duration: 2000
								        	});    
									})	
									            
					        	}).catch(() => {

						            this.$message({
							            type: 'info',
							             message: '已取消删除',
							             offset: '35px',
							             customClass: 'user_sytle_for_volunteerlist',
							             duration: 2000
						        	});          
							});
		      	
			    },

			    /**
			     * [importFile 导入文件]
			     * @param  {[type]} event [description]
			     * @return {[type]}       [description]
			     */
			    importFile: function (event){
			    	this.inputdataLength = 0;
			    	this.successNum = 0;

				if(!event.target.files){
					return
				}
				var f = event.target.files[0];
				var that = this;
				var reader = new FileReader();
				reader.onload = function(e){
					var data = e.target.result;
					if(this.rABS){
						this.wb = xlsx.read(btoa(fixdata(data)),{
							type:'base64'
						});
					}else{
						this.wb = xlsx.read(data, {
							type: 'binary'
						});
					}
					// wb.SheetNames[0] 是获取sheets中第一个sheet的名字
					// wb.Sheets[Sheet名]获取第一个Sheet的数据
					// console.log(JSON.stringify(xlsx.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]])));//转化为字符串
					// console.log(event.target.files);
					
					// console.log(xlsx.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]));  		
					var inputData = xlsx.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]);
					// console.log(this.inputdataLength)
					// this.inputdataLength = inputData.length;
					for(var i = 0; i < inputData.length; i++){
						that.addVolunteer(inputData[i].姓名,inputData[i].学号, inputData[i].班级, inputData[i].联系方式, inputData[i].权限);
						// console.log(inputData[i].姓名,inputData[i].学号, inputData[i].班级, inputData[i].联系方式, inputData[i].权限)
					}
					
				};
				if(this.rABS){
					reader.readAsArrayBuffer(f);
				}else{
					reader.readAsBinaryString(f);
				}
				},

				fixdata: function(data){
					var o = "",
					l = 0,
					w = 10240;
					for(; l < data.byteLength / w; ++l)
						o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
	                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
	                return o;

				},

				/**
			       * [addVolunteer 添加志愿者]
			       * @enum { }	 [20]
			       * @param {[type]} stuNum    [学号]
			       * @param {[type]} stuName   [姓名]
			       * @param {[type]} className [班级名称]
			       * @param {[type]} phone     [手机号]
			       * @param {[type]} roll      [权限级别 ]
			       */
			    addVolunteer: function(stuNum, stuName, className, phone, roll){
			    		this.inputdataLength++;
			      		let data = {
			      			stuNum: stuNum,
			      			stuName: stuName,
			      			className: className,
			      			phone: phone,
			      			roll:roll
			      		};

			      		this.axios.post('/WustVolunteer/college/addVolunteer.do',qs.stringify(data),{
			      			headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
			      		}).then((data) => {
			      			if(data.data.status == 0){
			      				this.$notify.success({
					      				title: '添加成功！',
					      				message: '成功添加一条志愿者信息',
					      				offset: 45,
					      				duration: 2000
					      		});
					      		this.successNum++;
			      			}else if(data.data.status == 1){
			      				alert("学号：" + stuNum + " 导入失败， 原因：" + data.data.msg);
			      			}
			      		}).catch((err) => {
							console.log(err);
							this.$notify.error({
						             message: '导入文件内容格式，不符合要求！添加失败 : (',
						             offset: '35px',
						             customClass: 'user_sytle_for_volunteerlist',
						             duration: 2000
					        	});    
						})
				},
  			}
   		}
</script>

<style type="text/css">
		@import '../../static/css/volunteeroperation.css';
</style>