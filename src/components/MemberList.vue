<template>
	 	<div class="content-wrapper" style="">

				<div id="navigoto_div" >
					<el-breadcrumb separator-class="el-icon-arrow-right">
						 <el-breadcrumb-item :to="{ path: '/home/memberlist' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
						 <el-breadcrumb-item>系统记录</el-breadcrumb-item>
						 <el-breadcrumb-item>委员列表</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				
				<div style="margin-top:15px;">
					<!-- 级联选择 -->
					<!-- <el-cascader :options="options" v-model="selectedOptions" style="width: 280px;" @change="changeClass">				
					</el-cascader> -->
					<el-select v-model="select_value" clearable placeholder="请选择">
					    <el-option
					      v-for="item in options_level"
					      :key="item.level"
					      :label="item.level"
					      :value="item.level">
					    </el-option>
					</el-select>

					<button class="layui-btn layui-btn-sm" style="float:right;margin-top:6px;">
							<span class="glyphicon glyphicon-export" aria-hidden="true">导出</span>
					</button>

					<el-input
						    placeholder="按学号或姓名模糊查找"
						    v-model="search_content_header" style="display:inline-block;width:280px;float:right;margin-right:10px;margin-top:5px;" size="small">
						    <i slot="suffix" class="el-input__icon el-icon-search"  id="head_activity_search" @click="clickSearch"></i>
					</el-input>
					
					<!-- 搜索框展示搜索的结果 -->
					<el-dialog
						  title="搜索结果"
						  :visible.sync="dialogVisible"
						  width="40%"
						  :before-close="handleClose">

						  <table class="table" style="text-align:center;">
						  		<thead>
						  			<tr>
						  				<td>ID</td>
						  				<td>学号</td>
						  				<td>姓名</td>
						  				<td>班级</td>
						  				<td>学院</td>
						  			</tr>
						  		</thead>
						  		<tbody v-if="is_search_result">
						  			<tr v-for="(item, index) in search_result_list">
						  				<td>{{index+1}}</td>
						  				<td><el-tag type="success" size="mini">{{item.studentNum}}</el-tag></td>
						  				<td>{{item.name}}</td>
						  				<td>{{item.className}}</td>
						  				<td>{{item.collegeName}}</td>
						  			</tr>
						  		</tbody>
						  		<tbody v-if="no_search_result">
						  			<tr> 没有找到相关志愿者信息 : ( </tr>
						  		</tbody>
						  </table>
						  
						  <span slot="footer" class="dialog-footer">
						    <!-- <el-button @click="dialogVisible = false" size="small">取 消</el-button> -->
						    <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
						  </span>
					</el-dialog>

				</div>
				<!-- Volunteer List table -->
				<table class="table table-hover" id="table_style">
						<thead>
								<tr class="success">
										<td>学号</td>
										<td>姓名</td>
										<td>学院</td>
										<td>班级</td>
										<td>年级</td>
										<td>联系方式</td>
										<td>工时</td>
										<td>职位</td>
										<td>操作</td>
								</tr>
						</thead>
						<tbody>
								<tr v-for="(item,index) in classStudentList">
										<td>{{item.studentNum}}</td>
										<td>{{item.name}}</td>
										<td>{{item.collegeName}}</td>
										<td>{{item.className}}</td>
										<td>{{item.level}}</td>
										<td>{{item.phone}}</td>
										<td>{{item.volunteerTime}}</td>
										<td>{{item.roll}}</td>
										<td>
											<!-- <button class="layui-btn layui-btn-xs" >编辑</button>
											<button @click="Delete_one_volunteer(index)" class="layui-btn layui-btn-warm layui-btn-xs">删除</button> -->
											<el-button type="text" size="mini">无权操作</el-button>
										</td>
								</tr>
						</tbody>
				</table>
				
				<!-- Pegination -->
				 <el-pagination
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPage"
					      :page-size="pageSize"
					      layout="slot, prev, pager, next, jumper"
					      :total="classTotalNum">
					      <slot ><span style='font-weight: 400;'># 本班级共 {{classTotalNum}} 条数据，当前展示 {{startRow}} 到 {{endRow}} 条数据</span></slot>
			    </el-pagination>




	 	</div>
</template>

<script type="text/javascript">
import qs from 'qs';
		export default{
				name: 'MemberList',
				data () {
					return {
						select_value: '',
						options_level: [],

						currentPage: 1,
						pageSize: 12,
						classTotalNum: 0,
						startRow:0,
						endRow: 0,

						classStudentList: [],
						search_content_header: '',

						// dialog 相关
						dialogVisible: false,
						search_result_list: [],

						is_search_result: false,
						no_search_result: false,
					}
				},
				mounted(){
					this.getLevelList();
				},

				methods:{
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
					      			console.log(data);
					      			this.options_level = data.data.data;
					      			console.log(this.options_level);
					      		}).catch(err => {
									console.log(err);
								})
					    },


						handleCurrentChange(val) {
					        // this.getVolunteerByClassName(this.currentClass, this.pageSize, this.currentPage);
					    },

					    handleClose(){
					    	this.is_search_result = false;
					    	this.no_search_result = false;
					    	this.search_content_header = '';
					    	this.dialogVisible = false;
					    },

					    clickSearch(){
					    	// 展示对话框
					    	this.dialogVisible = true;
					    	this.searchStudent(this.search_content_header);
					    	this.search_content_header = '';
					    },

					    /**
					       * [searchStudent 模糊查询志愿者]
					       * @enum {[type]}  【29】
					       * @param  {[type]} msg [查询字段(学号或姓名)只可查询本学院志愿者]
					       * @return {[type]}     [description]
					       */
					    searchStudent: function(msg){
					      		let data = { 
					      			msg: msg
					      		};

					      		this.axios.post('/WustVolunteer/college/searchStudent.do',qs.stringify(data),{
					      			headers:{
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
					      		}).then((data) => {
					      			console.log(data.data.data);
					      			if(data.data.data.length >= 1){  					// 查询的结果不为空
					      				this.is_search_result = true;
					      				this.no_search_result = false;
					      				this.search_result_list = data.data.data;
					      			}else{
					      				this.is_search_result = false;
					      				this.no_search_result = true;
					      			}
					      			
					      		}).catch((err) => {
									console.log(err);
								})
					    },
				}
		}

</script>

<style type="text/css">
	.content-wrapper{
		padding: 15px 20px;
		background: #fff;
	}
</style>
