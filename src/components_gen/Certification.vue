<template>
    <div class="content-wrapper" >
			<div style="margin-bottom:20px;">
				<el-breadcrumb separator-class="el-icon-arrow-right" style="display:inline-block;">
					 <el-breadcrumb-item :to="{ path: '/general/index' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
					 <el-breadcrumb-item>志愿活动</el-breadcrumb-item>
                     <el-breadcrumb-item>认证活动</el-breadcrumb-item>
				</el-breadcrumb>          
			</div>

            <el-tabs v-model="activeName" >
                <el-tab-pane label="待认证活动(院级)" name="first">

                    <el-table
                        :data="submitActivityList_1"
                        border
                        style="width: 100%" size="mini" class="demo" stripe>
                        <el-table-column
                        prop="id"
                        fixed="left"
                        label="#"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="活动名称"
                         sortable
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="time"
                        label="活动时间"
                         sortable
                        width="130">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="活动地点"
                        width="140">
                        </el-table-column>
                        <el-table-column
                        prop="organization"
                        label="所属组织"
                        sortable
                        width="260">
                        </el-table-column>
                        <el-table-column
                        prop="creater"
                        label="申请认证人"
                        sortable
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="statu"
                        label="状态"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="volunteerTime"
                        label="工时"
                        sortable
                        width="110">
                        </el-table-column>
                        <el-table-column
                        prop="nums"
                        label="人数"
                        sortable
                        width="110">
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                        <template slot-scope="scope">
                            <el-button @click="approveActivity(scope.row.id)" type="text" size="small">认证</el-button>
                            <el-button type="text" size="small" @click="select_id = scope.row.id;dialogVisible = true;">驳回</el-button>
                            <el-button type="text" size="small" @click="getActivityMember(scope.row.id)">详情</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            :current-page.sync="pageNum_1"
                            @current-change="getSubmitActivityList(0)"
                            :page-size="pageSize"
                            layout="slot, prev, pager, next, jumper"
                            :total="total_1">
                            <slot ><span style='font-weight: 400;'># 共有 {{total_1}} 条待认证信息，当前展示 {{startRow_1}} 到 {{endRow_1}} 条信息</span></slot>
                    </el-pagination>

                </el-tab-pane>

                <el-tab-pane label="待认证活动(班级)" name="second">
                      <el-table
                        :data="submitActivityList_0"
                        border
                        style="width: 100%" size="mini" class="demo" stripe>
                        <el-table-column
                        prop="id"
                        label="#"
                        fixed="left"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="活动名称"
                        sortable
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="time"
                        label="活动时间"
                        sortable
                        width="130">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="活动地点"
                        width="140">
                        </el-table-column>
                        <el-table-column
                        prop="organization"
                        label="所属组织"
                        sortable
                        width="260">
                        </el-table-column>
                        <el-table-column
                        prop="creater"
                        label="申请认证人"
                        sortable
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="statu"
                        label="状态"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="volunteerTime"
                        label="工时"
                        sortable
                        width="110">
                        </el-table-column>
                        <el-table-column
                        prop="nums"
                        label="人数"
                        sortable
                        width="110">
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                        <template slot-scope="scope">
                            <el-button @click="approveActivity(scope.row.id)" type="text" size="small">认证</el-button>
                            <el-button type="text" size="small" @click="select_id = scope.row.id;dialogVisible = true;">驳回</el-button>
                            <el-button type="text" size="small" @click="getActivityMember(scope.row.id)">详情</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            :current-page.sync="pageNum_0"
                            @current-change="getSubmitActivityList(1)"
                            :page-size="pageSize"
                            layout="slot, prev, pager, next, jumper"
                            :total="total_0">
                            <slot ><span style='font-weight: 400;'># 共有 {{total_0}} 条待认证信息，当前展示 {{startRow_0}} 到 {{endRow_0}} 条信息</span></slot>
                    </el-pagination>

                </el-tab-pane>
                
                <el-tab-pane label="活动详情" name="third" v-if="showDetail">
                        <table class="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <td>活动ID</td>
                                    <td>姓名</td>
                                    <td>学号</td>
                                    <td>班级</td>
                                    <td>学院</td>
                                    <td>工时</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in actJoinStuList" :key="index" >
                                    <td>{{item.activityId}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.stuNum}}</td>
                                    <td>{{item.className}}</td>
                                    <td>{{item.collegeName}}</td>
                                    <td>{{item.volunteerTime}}</td>
                                </tr>
                            </tbody>
                        </table>
                         <el-pagination
                            :current-page.sync="pageNum_detail"
                            @current-change="getActivityMember(this.select_act_id)"
                            :page-size="pageSize_detail"
                            layout="total, prev, pager, next, jumper"
                            :total="detail_total">
                        </el-pagination>
                </el-tab-pane>
            </el-tabs>

            <el-dialog
                    title="# 驳回该认证活动"
                    :visible.sync="dialogVisible"
                    width="30%"
                   >
                    <label for="dealy_result">驳回原因 : <i class="el-icon-edit"></i></label>
                    <el-input id="dealy_result" v-model="reason_out" placeholder="请输入内容" style="margin-top: 5px;"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="rejectActivity()">确 定</el-button>
                    </span>
            </el-dialog>
    </div>
</template>

<script>
import qs from 'qs';
    export default {
        name: 'Certification',
        data (){
            return {
                select_category: '',
                pageNum_1: 1,
                pageNum_0: 1,
                pageSize: 10,
                total_1: 0,
                total_0: 0,

                startRow_0: 0,
                endRow_0: 0,
                startRow_1: 0,
                endRow_1: 0,

                submitActivityList_1: [],
                submitActivityList_0: [],

                activeName: 'first',

                dialogVisible: false,
                select_id: '',
                reason_out: '',

                //detail_table
                pageNum_detail: 1,
                pageSize_detail: 12,
                actJoinStuList: [],
                detail_startRow: 0,
                detail_endRow: 0,
                detail_total: 0,
                select_act_id: '',

                showDetail: false,
            }
        },
        mounted(){
            this.getSubmitActivityList(0);
            this.getSubmitActivityList(1);
        },
        watch: {
            activeName:function(){
                if(this.activeName != 'third'){
                    this.showDetail = false;
                }
            }
        },
        methods:{
            /** 
             * 获取提交认证的活动
             * @param category
             * @param pageNum
             * @param pageSize
             */
            getSubmitActivityList: function(tip){
                let data = {
                    category: tip,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };
                this.axios.post('/WustVolunteer/general/getSubmitActivityList.do',qs.stringify(data),{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(data => {
                    if(tip){
                        // 班级活动
                        this.submitActivityList_0 = data.data.data.list;
                        this.total_0 = data.data.data.total;
                        this.startRow_0 = data.data.data.startRow;
                        this.endRow_0 = data.data.data.endRow;
                        for(var i = 0; i < this.submitActivityList_0.length; i++){
                            this.submitActivityList_0[i].organization = this.submitActivityList_0[i].organization || '青年志愿者总队';
                        }
                    }else{
                        // 院级活动
                        this.submitActivityList_1 = data.data.data.list;
                        this.total_1 = data.data.data.total;
                        this.startRow_1 = data.data.data.startRow;
                        this.endRow_1 = data.data.data.endRow;
                         for(var i = 0; i < this.submitActivityList_1.length; i++){
                            this.submitActivityList_1[i].organization = this.submitActivityList_1[i].organization || '青年志愿者总队';
                        }
                    }
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '获取认证列表失败!',
                        duration: 2000,
                        customClass: 'user_sytle_for_volunteerlist',
                    });
                })
            },

            /** 
             * 对活动进行认证
             * @param activityId
             */
            approveActivity: function(id){
                
                this.$confirm('此操作将认证该活动, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                }).then(() => {

                        let data = {
                            activityId: id
                        };
                        this.axios.post('/WustVolunteer/general/approveActivity.do',qs.stringify(data),{
                            headers:{
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(data => {
                            if(data.data.status == 0){
                                this.$message({
                                    type: 'success',
                                    message: '成功认证该活动!',
                                    duration: 2000,
                                    customClass: 'user_sytle_for_volunteerlist',
                                });
                                this.getSubmitActivityList(0);
                                this.getSubmitActivityList(1);
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '认证该活动失败!',
                                    duration: 2000,
                                    customClass: 'user_sytle_for_volunteerlist',
                                });
                            }
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '认证活动出错!',
                                duration: 2000,
                                customClass: 'user_sytle_for_volunteerlist',
                            });
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
             * 驳回该认证活动
             * @param activityId
             * @param msg
             */
            rejectActivity: function(){
                this.dialogVisible = false;
                if(this.select_id == '' || this.reason_out == ''){
                    this.$message({
                        type: 'info',
                        message: '请输入驳回原因!',
                        duration: 2000,
                        customClass: 'user_sytle_for_volunteerlist',
                    });
                    return ;
                }
                let data = {
                    activityId: this.select_id, 
                    msg: this.reason_out
                };
                this.axios.post('/WustVolunteer/general/rejectActivity.do',qs.stringify(data),{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(data => {
                    if(data.data.status == 0){
                        this.$message({
                            type: 'success',
                            message: '成功驳回该活动!',
                            duration: 2000,
                            customClass: 'user_sytle_for_volunteerlist',
                        });
                        this.getSubmitActivityList(0);
                        this.getSubmitActivityList(1);
                    }else{
                         this.$message({
                            type: 'error',
                            message: '驳回该活动失败!',
                            duration: 2000,
                            customClass: 'user_sytle_for_volunteerlist',
                        });
                    }
                }).catch(err => {
                     this.$message({
                        type: 'info',
                        message: '驳回该认证活动出错!',
                        duration: 2000,
                        customClass: 'user_sytle_for_volunteerlist',
                    });
                })
            },

            /** 
             * 获取活动参与人员
             */
            getActivityMember: function(id){
                // 转跳活动详情页面
                this.showDetail = true;
                this.activeName = 'third';
                this.select_act_id = id;

                let data = {
                    activityId: id,
                    pageNum:this.pageNum_detail,
                    pageSize: this.pageSize_detail
                };

                this.axios.post('/WustVolunteer/general/getActivityMember.do',qs.stringify(data),{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(data => {
                    this.actJoinStuList = data.data.data.list;
                    this.detail_startRow = data.data.data.startRow;
                    this.detail_endRow = data.data.data.endRow;
                    this.detail_total = data.data.data.total;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '获取活动人员详情接口出错!',
                        duration: 2000,
                        customClass: 'user_sytle_for_volunteerlist',
                    });
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
	background: #ffffff;
    padding: 15px 20px;
    
}
/* 设置垂直滚动条的宽度和水平滚动条的高度 */
.demo::-webkit-scrollbar{
    width: 8px;
    height: 8px;
}

/* 设置滚动条的滑轨 */
.demo::-webkit-scrollbar-track {
      background-color: #ddd;
}

/* 滑块 */
.demo::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
}

 /* 滑轨两头的监听按钮 */
.demo::-webkit-scrollbar-button {
    background-color: #888;
    display: none;
}
</style>

