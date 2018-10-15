<template>
        <div class="content-wrapper" >
			<div style="margin-bottom:20px;">
				<el-breadcrumb separator-class="el-icon-arrow-right" style="display:inline-block;">
					 <el-breadcrumb-item :to="{ path: '/general/index' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
					 <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                     <el-breadcrumb-item>组织管理</el-breadcrumb-item>
				</el-breadcrumb>          
			</div>
             <!-- Pegination -->
            <div>
                <el-pagination
                        @current-change="getInChargeList"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="slot, prev, pager, next, jumper"
                        :total="totalNum" style="margin-top:15px;">
                        <slot ><span style='font-weight: 400;'># 本班级共 {{totalNum}} 条数据，当前展示 {{startRow}} 到 {{endRow}} 条数据</span></slot>
                </el-pagination>

                <div style="float:right;margin-top:-30px;" @click="dialogVisible = true;" id="add_charge" ><el-button type="success" plain size="small"><i class="el-icon-edit"></i> 添加分管关系</el-button></div>
            </div>
            <!-- dialog添加公告 -->
            <el-dialog
                title="添加分管关系"
                :visible.sync="dialogVisible"
                width="45%">
                    <span style="font-size:10px; opacity:0.6;display:inline-block;margin-bottom: 3px;margin-top:-10px;"># 仅能为总队工时管理员，添加此分管关系！</span>
               	    <div style="display:inline-block; width:100%;">
					    <el-input placeholder="请根据姓名或学号查询" v-model="input_key" class="input-with-select" >
						    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:130px;">
						      <el-option label="学号" value="1"></el-option>
						    </el-select>
						    <el-button slot="append" icon="el-icon-search" @click="searchStudent">查询</el-button>
						</el-input>
					</div>
					<table class="find_person_msg table table-condensed table-hover ">
						<tbody v-if="show_search_result">
							<tr>
								<td>学号</td>
								<td>姓名</td>
								<td>届别</td>
								<td>上次登陆时间</td>
								<td>组织</td>
							</tr>
							<tr>
								<td>
									<el-tag
									  type="success" size="mini" color="#f1f4f5" >
									  {{result_obj.stuNum}}
									</el-tag>
								</td>
								<td>{{result_obj.stuName}}</td>
								<td>{{result_obj.level}}</td>
								<td>{{result_obj.lastLogin}}</td>
								<td>{{result_obj.organizationName}}</td>
							</tr>
						</tbody>
						<tbody v-if="show_search_error_result">
							<span>没有找到符合条件的志愿者信息 : (</span>
						</tbody>
					</table>
                    负责组织：

                    <el-select v-model="select_organizatoin_id" placeholder="请选择负责的组织" style="width:240px;">
                        <el-option
                        v-for="item in organizationList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id" style="width:100%;">
                        </el-option>
                    </el-select>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false;result_obj = {};  input_key = '';show_search_result = false;show_search_error_result = false;this.select_organizatoin_id='';" size="small">取 消</el-button>
                    <el-button type="primary" @click="addInCharge()" size="small">确 定</el-button>
                </span>
            </el-dialog>

            <br>
            <el-table
                ref="singleTable"
                :data="chargeList"
                highlight-current-row
                stripe
                @current-change="getInChargeList"
                style="width: 100%" 
                size="small">
                <el-table-column
                type="index"
                width="50"
                align="center">
                </el-table-column>
                <el-table-column
                property="stuNum"
                label="学号"
                sortable
                width="140">
                </el-table-column>
                <el-table-column
                property="stuName"
                label="姓名"
                sortable
                width="140">
                </el-table-column>
                <el-table-column
                property="organizationName"
                label="负责学院"
                sortable
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="deleteInCharge(scope.row.adminId, scope.row.organizationId)">删除该关系</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
</template>

<script>
import qs from 'qs';

    export default {
        name: 'ChargeList',
        data () {
            return {
                add_adminId: '',
                add_organizationid: '',

                chargeList: [],

                currentPage: 1,
                pageSize: 10,
                totalNum: 0,
                endRow: 0,
                startRow: 0,
                
                dialogVisible: false,
                select:"",
				input_key:'',

				show_search_result:false,
				result_obj: {},
                show_search_error_result: false,
                
                organizationList: [],
                select_organizatoin_id: '',

                adminlist: [],
            }
        },
        mounted(){
            this.getInChargeList();
            this.getAmdinList();
            this.getOrganization();
        },
        methods:{
            /**
             * 获取分管关系列表
             */
            getInChargeList: function(){
                let data = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                }
                this.axios.post('/WustVolunteer/general/getInChargeList.do',qs.stringify(data),{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(data => {          
                    this.chargeList = data.data.data.list;
                    this.totalNum = data.data.data.total;
                    this.endRow = data.data.data.endRow;
                    this.startRow = data.data.data.startRow;
                }).catch(err => {
                    console.log(err);
                })
            },

            /** 
             * 删除分管关系
             */
            deleteInCharge: function(adminId, organizationId){

                this.$confirm('此操作将删除该分管关系, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
					}).then(() => {

							let data = {
                                adminId: adminId,
                                organizationId: organizationId
							};

							this.axios.post('/WustVolunteer/general/deleteInCharge.do',qs.stringify(data),{
								headers:{
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then((data) => {
								// 删除成功提示
								if(data.data.status == 0){
										this.$message({
										type: 'success',
										message: '成功删除该分管关系!',
										duration: 2000,
										customClass: 'user_sytle_for_volunteerlist',
                                        });
                                        this.getInChargeList();
								}else{
                                        this.$message({
										type: 'success',
										message: '删除该分管关系失败!',
										duration: 2000,
										customClass: 'user_sytle_for_volunteerlist',
										});
								}
							}).catch((err) => {
                                console.log(err);
                                alert("删除该分管关系出错!");
							})
							
					}).catch(() => {
							this.$message({
							type: 'info',
							message: '操作已取消',
							duration: 2000,
							customClass: 'user_sytle_for_volunteerlist',
							});          
					});
            },

            /**
             * 添加分管关系
             */
            addInCharge: function(){
                this.dialogVisible = false;
                if(this.result_obj.id == undefined || this.select_organizatoin_id == ''){
                     this.$message({
                            type: 'info',
                            message: '请将信息填写完整!',
                            duration: 2000,
                            customClass: 'user_sytle_for_volunteerlist',
                    });
                    return ;
                }
                let data = {
                    adminId: this.result_obj.id,
                    organizationId: this.select_organizatoin_id,
                };

                this.axios.post('/WustVolunteer/general/addInCharge.do',qs.stringify(data),{
								headers:{
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
			    }).then((data) => {
                    if(data.data.status == 0){
                            this.$message({
                            type: 'success',
                            message: '成功添加该分管关系!',
                            duration: 2000,
                            customClass: 'user_sytle_for_volunteerlist',
                            });
                            this.getInChargeList();
                    }else{
                            this.$message({
                            type: 'errror',
                            message: data.data.msg,
                            duration: 2000,
                            customClass: 'user_sytle_for_volunteerlist',
                            });
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                            type: 'errror',
                            message: '添加该分管关系出错!',
                            duration: 2000,
                            customClass: 'user_sytle_for_volunteerlist',
                    });
                })
                this.result_obj = {};
                this.input_key = '';
                this.show_search_result = false;
                this.show_search_error_result = false;
                this.select_organizatoin_id = '';
            },

            /**
		       * [getAmdinList 获取总队管理员列表]
		       * @enum {[type]}   
		       * @return {[type]}
		       */
		    getAmdinList: function(){
					let data = {
						pageNum: 1,
						pageSize: 1000
					} ;

		      		this.axios.post('/WustVolunteer/general/getAdminList.do',qs.stringify(data),{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      		}).then((data) => {
						this.adminlist = data.data.data.list;
		      		}).catch((err) => {
						this.$message({
				            type: 'error',
				            message: '获取管理员列表失败!',
				            customClass: 'user_sytle_for_volunteerlist',
				        });
					})
            },
            
             /**
		       * [searchStudent 模糊查询志愿者]
		       * @enum {[type]}  【29】
		       * @param  {[type]} msg [查询字段(学号或姓名)只可查询本学院志愿者]
		       * @return {[type]}     [description]
		       */
		    searchStudent: function(){
		      		for(var i = 0 ; i < this.adminlist.length; i++){
                        if(this.input_key == this.adminlist[i].stuNum){
                            this.show_search_result = true;
		      				this.show_search_error_result = false;
                            this.result_obj = this.adminlist[i];
                            return ;  
                        }
                    } 
		      	    this.show_search_error_result = true;
		      		this.show_search_result = false;
		    },

            /**
			 * @description 获取本届所有组织id和名称 & 将其数据传入option数组中
			 * 
			 */
			getOrganization: function(){
				this.axios.post('/WustVolunteer/general/getOrganization.do',{
		      			headers:{
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
		      	}).then((data) => {
					 this.organizationList = data.data.data;
				}).catch(err => {
					console.log(err);
				})
			}

        }
    }
</script>

<style>
.user_sytle_for_volunteerlist{
    margin-top: 30px;
}
.content-wrapper{
	background: #f1f4f6;
    padding: 15px 20px;
    
}
#add_charge:hover{
    cursor: pointer;
    color: #ff8040;
    font-size: 15.5px;
}
</style>

