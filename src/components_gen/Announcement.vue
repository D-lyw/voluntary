<template>
    <div class="content-wrapper" >
			<div style="margin-bottom:20px;">
				<el-breadcrumb separator-class="el-icon-arrow-right" style="display:inline-block;">
					 <el-breadcrumb-item :to="{ path: '/general/index' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
					 <el-breadcrumb-item>公告管理</el-breadcrumb-item>
				</el-breadcrumb>
                <div style="float:right;margin-right: 25px;"><el-button type="success" size="small" plain id="add_announcement" @click="dialogVisible = true;"><i class="el-icon-edit"></i> 添加公告</el-button></div>           
			</div>
            <!-- dialog添加公告 -->
            <el-dialog
                title="# 添加公告 #"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
                <div class="row">
                    <div class="col-md-2" style="text-align:right;">标题</div>
                    <div class="col-md-8" ><el-input v-model="add_title" placeholder="请输入标题" size="small"></el-input></div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-2" style="text-align:right;">内容</div>
                    <div class="col-md-8"><el-input type="textarea" v-model="add_content"></el-input></div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addAnnouncement()">确 定</el-button>
                </span>
            </el-dialog>

            <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                stripe
                @current-change="handleCurrentChange"
                style="width: 100%">
                <el-table-column
                prop="id"
                width="50"
                label="#" 
                align="center">
                </el-table-column>
                <el-table-column
                property="time"
                label="日期"
                sortable=""
                width="120">
                </el-table-column>
                <el-table-column
                property="title"
                label="标题"
                width="150"
                :show-overflow-tooltip="isShowTip">
                </el-table-column>
                <el-table-column
                property="content"
                label="内容"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="deleteAnnoucement(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- Pegination -->
            <el-pagination
                    @current-change="getAnnoucementList"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="slot, prev, pager, next, jumper"
                    :total="totalNum" style="margin-top:15px;">
                    <slot ><span style='font-weight: 400;'># 本班级共 {{totalNum}} 条数据，当前展示 {{startRow}} 到 {{endRow}} 条数据</span></slot>
            </el-pagination>
    </div>
</template>

<script>
import qs from 'qs';
    export default{
        name: 'Announcement',
        data () {
            return{
                currentPage: 1,
                pageSize: 7,
                totalNum: 0,
                endRow: 0,
                startRow: 0,

                tableData: [],
                currentRow: null,

                dialogVisible: false,
                add_title: '',
                add_content: '',

                isShowTip: true,
            }   
        },
        mounted(){
            this.getAnnoucementList();
        },
        methods: {
            handleCurrentChange(val) {
                this.currentRow = val;
            },

            handleClose: function(){
                this.add_content = '';
                this.add_title = '';
            },
            
            /** 
             * 获取公告列表
             * @param pageNum
             * @param pageSize
             */
            getAnnoucementList: function(){
                let data = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                }
                this.axios.post('/WustVolunteer/general/getAnnoucementList.do',qs.stringify(data),{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(data => {
                    this.tableData = data.data.data.list;
                    this.totalNum = data.data.data.total;
                    this.endRow = data.data.data.endRow;
                    this.startRow = data.data.data.startRow;

                    for(var i = 0; i < this.tableData.length; i++){
                        this.tableData[i].time = this.tableData[i].time.substr(0,10);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            /** 
             * 添加公告
             * @param {string} title
             * @param {string} content
             */
            addAnnouncement: function(){
                this.dialogVisible = false;
                if(this.add_title == '' || this.add_content == ''){
                    this.$message({
                            type: 'info',
                            message: '请将公告信息填写完整!',
                            duration: 2000,
                            customClass: 'user_sytle_for_volunteerlist',
                        });
                    return ;
                }
                let data = {
                    title: this.add_title,
                    content: this.add_content
                };
                this.axios.post('/WustVolunteer/general/addAnnouncement.do',qs.stringify(data),{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(data => {
                    if(data.data.status == 0){
                        this.$message({
                            type: 'success',
                            message: '成功添加公告!',
                            duration: 2000,
                            customClass: 'user_sytle_for_volunteerlist',
                        });
                        this.getAnnoucementList();
                    }else{
                        this.$message({
                            type: 'error',
                            message: '添加公告失败!',
                            duration: 2000,
                            customClass: 'user_sytle_for_volunteerlist',
                        });
                    }
                }).catch(err => {
                    console.log(err);
                    this.$message({
                        type: 'error',
                        message: '添加公告接口出错!',
                        duration: 2000,
                        customClass: 'user_sytle_for_volunteerlist',
                    });
                })
                this.add_title = '';
                this.add_content = '';
            },

            /**
             * 删除公告
             */
            deleteAnnoucement: function(id){
                 this.$confirm('此操作将删除该公告, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
					}).then(() => {
							let data = {
                                annoucementId: parseInt(id)
                            };
							this.axios.post('/WustVolunteer/general/deleteAnnoucement.do',qs.stringify(data),{
								headers:{
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then((data) => {
								// 删除成功提示
								if(data.data.status == 0){
										this.$message({
										type: 'success',
										message: '成功删除该公告!',
										duration: 2000,
										customClass: 'user_sytle_for_volunteerlist',
                                        });
                                        this.getAnnoucementList();
								}else{
                                        this.$message({
										type: 'success',
										message: '删除该公告失败!',
										duration: 2000,
										customClass: 'user_sytle_for_volunteerlist',
										});
								}
							}).catch((err) => {
                                console.log(err);
                                alert("删除该公告出错!");
							})
					}).catch(() => {
							this.$message({
							type: 'info',
							message: '操作已取消',
							duration: 2000,
							customClass: 'user_sytle_for_volunteerlist',
							});          
					});
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
</style>

