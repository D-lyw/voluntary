<template>
	 	<div class="content-wrapper" style="height:900px;overflow-y:auto;overflow-x:hidden;">
	 			<div>
	 			<span class="layui-breadcrumb navigoto " >
					  <i class="fa fa-home" style="opacity:0.8;color:#333;font-size:16px;"></i>&nbsp;
					  <router-link to="/">&nbsp;&nbsp;主页</router-link>
					  <router-link to="">志愿者管理</router-link>
					  <router-link to=""><cite>志愿者信息</cite></router-link>
				</span>
				</div>
				
				<div>
				<!-- 级联选择 -->
				<el-cascader :options="options" v-model="selectedOptions" style="width: 250px;" @change="changeClass">				
				</el-cascader>

				<button class="layui-btn layui-btn-sm" style="float:right;">
						<span class="glyphicon glyphicon-export" aria-hidden="true">导出</span>
				</button>

				<el-input
					    placeholder="按学号查找"
					    v-model="search_content_header" style="display:inline-block;width:200px;float:right;margin-right:10px;" size="small">
					    <i slot="suffix" class="el-input__icon el-icon-search"  id="head_activity_search" @click="clickSearch"></i>
				</el-input>
					
				</div>
				<!-- Volunteer List table -->
				<table class="table">
						<thead>
								<tr>
										<th>学号</th>
										<th>姓名</th>
										<th>学院</th>
										<th>班级</th>
										<th>年级</th>
										<th>联系方式</th>
										<th>工时</th>
										<th>职位</th>
										<th>操作</th>
								</tr>
						</thead>
						<tbody>
								<!-- <tr>
										<th>201613136023</th>
										<th>D-lyw</th>
										<th>计算机科学与技术学院</th>
										<th>网络工程1601</th>
										<th>2016</th>
										<th>15272058782</th>
										<th>15</th>
										<th>志愿者</th>
										<th><button @click="Delete_one_volunteer">delete</button></th>
								</tr> -->
						</tbody>
				</table>
				
				<!-- Pegination -->
				 <el-pagination
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPage"
					      :page-size="10"
					      layout="slot, prev, pager, next, jumper"
					      :total="100">
					      <slot ><span style='font-weight: 400;'># 本班级共46条数据，当前展示1到10条数据</span></slot>
			    </el-pagination>




	 	</div>
</template>

<script type="text/javascript">
import qs from 'qs';
		export default{
				name: 'Volunteerlist',
				data () {
					return {
						options: [],
						// selectedOptions: [2018, '计科1801'],
						selectedOptions: [],
						search_content_header: '',


						currentPage: 1,
						 // {
						 // 	value: 2018,
						 // 	label: 2018,
						 // 	children: [{
						 // 		value: 0,
						 // 		label: '计算机1801'
						 // 	},{
						 // 		value: 1,
						 // 		label: '计算机1802'
						 // 	},{
						 // 		value: 2,
						 // 		label: '计算机1803'
						 // 	}]
						 // },{
						 // 	value: 2017,
						 // 	label: 2017,
						 // 	children:[{
						 // 		value: 0,
						 // 		label: '计算机1701'
						 // 	},{
						 // 		value: 1,
						 // 		label: '计算机1702'
						 // 	},{
						 // 		value: 2,
						 // 		label: '计算机1703'
						 // 	}]
						 // },{
						 // 	value: 2016,
						 // 	label: 2016,
						 // 	children:[{
						 // 		value: 0,
						 // 		label: '计算机1601'
						 // 	},{
						 // 		value: 1,
						 // 		label: '计算机1602'
						 // 	},{
						 // 		value: 2,
						 // 		label: '计算机1603'
						 // 	}]
						 // }],
						 
				      };
					},

					mounted(){
						this.getLevelList();
						
					},

					methods:{
						  handleSizeChange(val) {
					        console.log(`每页 ${val} 条`);
					      },
					      handleCurrentChange(val) {
					        console.log(`当前页: ${val}`);
					      },

					      clickSearch(){

					      },

					      changeClass(){
					      		console.log(this.selectedOptions);
					      },

					      Delete_one_volunteer(){
					      		//1 judge authority

					      		this.$notify.error({
					      				title: '权限不足',
					      				message: '本帐号无权进行删除操作 : (',
					      				offset: 35
					      		});

					      		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
							           confirmButtonText: '确定',
							           cancelButtonText: '取消',
							           type: 'warning'
							        }).then(() => {
							            this.$message({
							            type: 'success',
							            message: '删除成功!',
							            customClass: 'user_sytle_for_volunteerlist'
							          });
							        }).catch(() => {
							            this.$message({
							            type: 'info',
							             message: '已取消删除',
							             offset: '35px',
							             customClass: 'user_sytle_for_volunteerlist'
							          });          
							        });
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
					      			for(let i = 0; i < data.data.data.length; i++){
					      				var pushobj = {
					      						value: '',
					      						label: '',
					      						children: []
					      				};
					      				pushobj.value = data.data.data[i].level;
					      				pushobj.label = data.data.data[i].level;
					      				this.options.push(pushobj);
					      				// 获取该届的所有班级列表
					      				this.getClassesBylevel(data.data.data[i].level, i);
					      			}
					      			// console.log(this.options[data.data.data.length - 1].children);
					      			var temp = this.options[data.data.data.length - 1];
					      			var i = 0;
					      			console.log(temp.children[i])
					      			this.selectedOptions = [this.options[data.data.data.length - 1].label, this.options[data.data.data.length - 1].children[0].label ];

					      		}).catch(err => {
									console.log(err);
								})
					    },


					    /**
					       * [getClassesBylevel 获取学院组织班级列表]
					       * @enum 		{7}
					       * @param  {[type]} level [届别]
					       * @param {[type]} [id] [标记届别]
					       * @return {[type]}       [null]
					       */
					    getClassesBylevel: function(level, id){
					      	   let data = {
					      	   		level: level
					      	   };

					      	   this.axios.post('/WustVolunteer/college/getClassesBylevel.do',qs.stringify(data),{
					      			headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
					      		}).then((data) => {
					      			// console.log(data);
					      			var pushclass = [];
					      			for(let i = 0; i < data.data.data.length; i++){
					      				let child = {};
					      				child.value = data.data.data[i];
					      				child.label = data.data.data[i];
					      				pushclass.push(child);
					      			}
					      			this.options[id].children = pushclass;
					      			// console.log(this.options);
					      			
					      		}).catch((err) => {
									console.log(err);
								})
		      			},


		      			/**
					       * [getVolunteerByClassName 获取班级志愿者]
					       * @enum {[type]}  [8]
					       * @param  {[type]} className [班级名称]
					       * @param  {[type]} pageSize  [页面行数 default 15]
					       * @param  {[type]} pageNum   [页数]
					       * @return {[type]}           [null]
					       */
					    getVolunteerByClassName: function(className, pageSize, pageNum){
					      		let data = {
					      			className: className,
					      			pageSize: pageSize,
					      			pageNum: pageNum
					      		}
					      		
					      		this.axios.post('/WustVolunteer/college/getVolunteerByClassName.do',qs.stringify(data),{
					      			headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
					      		}).then((data) => {
					      			console.log(data);
					      		}).catch((err) => {
									console.log(err);
								})

					      		return ;
					    },

					}
				}

</script>

<style type="text/css">
		@import '../../static/css/volunteerlist.css'
</style>
