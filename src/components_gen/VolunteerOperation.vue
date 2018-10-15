<template>
		<div class="content-wrapper" style="">

				<div id="navigoto_div" >
					<el-breadcrumb separator-class="el-icon-arrow-right">
						 <el-breadcrumb-item :to="{ path: '/general/index' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
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
                    <el-form-item label="年级">
                        <el-select v-model="stuMsg.level" placeholder="请选择所属届别" style="width:100%;" @change="getClassInfo(0, parseInt(stuMsg.level), parseInt(stuMsg.collegeName))">
                            <el-option v-for="item in levelList" :key = "item.id" :value="item.level" :label='item.level' ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属学院">
                        <!-- <el-input v-model="stuMsg.collegeName" placeholder="选择所属学院" ></el-input> -->
                      <el-select v-model="stuMsg.collegeName" placeholder="请选择所属学院" style="width:100%;" @change="getClassInfo(0, parseInt(stuMsg.level), parseInt(stuMsg.collegeName))" >
                            <el-option v-for="item in collegeList" :key = "item.id" :value="item.id" :label='item.name' ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属班级">
                        <el-select v-model="stuMsg.className" placeholder="请选择所属班级" style="width:100%;">
                            <el-option v-for="(item,index) in classLists" :key="index" :value="item" :label="item" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学号" >
                        <el-input v-model="stuMsg.studentNum" placeholder="学号不可更改" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="stuMsg.name"></el-input>
                    </el-form-item>
                    <el-form-item label="职务" >
                        <el-select v-model="stuMsg.roll" placeholder="志愿者的职务" style="width:100%;">
                            <el-option  label="志愿者" value="0" key="0"></el-option>
                            <el-option  label="班级小助手" value="1" key="1"></el-option>
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

				    <el-tab-pane label="学院信息" name="second">

              <!-- addClass 输入框 -->
              <el-input placeholder="请输入新建学院名称" v-model="add_class_input" class="input-with-select">
                  <el-select v-model="select_add_level" slot="prepend" placeholder="选择新建学院届别" style="width:200px;">
                    <el-option  :label="collapse_levellist[0].level" :value="collapse_levellist[0].level" ></el-option>
                  </el-select>
                  <el-button slot="append" @click="addCollege(add_class_input)" icon="el-icon-plus" style="width:150px;">添加学院</el-button>
              </el-input> 
              <!-- 折叠面板 -->

				    	<el-collapse v-model="selectCollapse" accordion id="el_collapse" style="width:97%;margin:auto;margin-top:20px;">
							 
							  <el-collapse-item v-for="(item, index) in collapse_levellist" :title="item.level + '届 学院列表'" :name="index" :key="index" >
								  		 <el-table
									      :data="selectCollegeList[index]"
									      style="width: 100%; height:auto;max-height:480px;overflow:auto;" 
									      size="small" 
									      :stripe="true"
									      :default-sort = "{prop: 'id',  order: 'descending'}" >
									      <el-table-column
									        prop="collegeId"
									        label="ID"
									        sortable
									        width="100" >
									      </el-table-column>
									      <el-table-column
									        prop="collegeName"
									        label="学院名称"
									        width="180">
									      </el-table-column>
									      <el-table-column
									        prop="classNum"
									        sortable
									        label="班级数">
									      </el-table-column>
									      <el-table-column
									        prop="volunteerNum"
									        sortable
									        label="学院志愿者数">
									      </el-table-column>
                         <el-table-column
									        prop="volunteerTime"
									        sortable
									        label="学院工时数">
									      </el-table-column>
									    </el-table>
							  </el-collapse-item>
					  	</el-collapse>

				    </el-tab-pane>

				    <el-tab-pane label="批量导入" name="third">
                <el-alert
                  title="导入文件须知:"
                  type="info"
                  description="导入的.xlsx文件中,表头包含 ## 学号  姓名  班级  联系方式  权限 ## 五个字段 ,填写的班级必须是系统中已经存在的班级名，权限一栏，填写0或1， 0 代表 志愿者， 1 代表 班级小助手; 如果导入学号重复，导入的班级名称不存在或系统已存在相同学号的志愿者信息，将报错；报错后，检查导入文件是否符合要求，更正后重试！"
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
import qs from "qs";
import xlsx from "xlsx";

export default {
    neme: "VolunteerOperation",

    data() {
        return {
          labelPosition: "right",
          activeName: "first",
          // 要编辑的学生信息
          stuMsg: {
            collegeName: "",
            className: "",
            studentNum: "",
            name: "",
            level: "",
            roll: "",
            phone: "",
            volunteerTime: 0
          },

          search_stuNum: "",
          select: "",


          classLists: ["选择所属班级"],
          levelList: ["选择所属届别"],
          collegeList: ["选择所属学院"],

          // part 2
          selectCollapse: "0",
          collapse_levellist: [],
          levelClassList: [],

          select_add_level: "",
          add_class_input: "",

          selected_dept: "",
          options_selected_dept: [],

          selectCollegeList: [],

          level_college: '',
          pageNum_college: 1,
          pageSize_college: 1000,
          // part 3
          inputdataLength: 0,
          successNum: 0
        };
    },

    mounted() {
        this.clearStuMsg();
        this.getLevelList();
        this.getCollegeList();
    },
    methods: {
      handleClick(tab, event) {
        // 切换tab时，清除tab0 输入框中的内容
        this.clearStuMsg();
      },

      saveStuMsg: function() {
            // 确认更新
            this.$confirm("此操作将更新此志愿者信息, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                if (this.stuMsg.roll == "志愿者") {
                  this.stuMsg.roll = 0;
                } else if (this.stuMsg.roll == "班级小助手") {
                  this.stuMsg.roll = 1;
                }
                // 更新志愿者信息
                this.alterVolunteer(
                  this.stuMsg.studentNum,
                  this.stuMsg.name,
                  this.stuMsg.className,
                  this.stuMsg.phone,
                  this.stuMsg.roll
                );
              })
              .catch(error => {
                console.log(error);
                this.$message({
                  type: "info",
                  message: "已取消更新",
                  offset: "35px",
                  customClass: "user_sytle_for_volunteerlist",
                  duration: 2000
                });
                this.clearStuMsg();
              });
      },

      clearStuMsg: function() {
            this.stuMsg.collegeName = "";
            this.stuMsg.className = "";
            this.stuMsg.studentNum = "";
            this.stuMsg.name = "";
            this.stuMsg.level = "";
            this.stuMsg.roll = "";
            this.stuMsg.phone = "";
            this.stuMsg.volunteerTime = "";

            this.classLists = ["选择所属班级"];
            this.levelList = ["选择所属届别"];
            this.collegeList = ["选择所属学院"];
      },

      /**
       * [searchStudent 模糊查询志愿者]
       * @enum {[type]}  【29】
       * @param  {[type]} msg [查询字段(学号或姓名)只可查询本学院志愿者]
       * @return {[type]}     [description]
       */
      searchStudent: function() {
            // 判断是否为空
            if (this.search_stuNum == "") {
              this.$message({
                type: "info",
                message: "请输入查询学号后，点击查询信息",
                offset: "35px",
                customClass: "user_sytle_for_volunteerlist",
                duration: 2000
              });
              this.clearStuMsg();
              return;
            }

            let data = {
              msg: this.search_stuNum
            };

            this.axios
              .post("/WustVolunteer/general/searchStudent.do", qs.stringify(data), {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
              }).then(data => {
                this.clearStuMsg();
                if (data.data.data.length == 1) {
                  // 查询的结果不为空
                  this.$message({
                    type: "success",
                    message: "成功查找志愿者信息",
                    offset: "35px",
                    customClass: "user_sytle_for_volunteerlist",
                    duration: 2000
                  });
                  // 获取届别列表
                  this.getLevelList();
                  // 获取学院列表
                  this.getCollegeList();

                  this.stuMsg.collegeName = data.data.data[0].collegeName;
                  this.stuMsg.className = data.data.data[0].className;
                  this.stuMsg.studentNum = data.data.data[0].studentNum;
                  this.stuMsg.name = data.data.data[0].name;
                  this.stuMsg.level = data.data.data[0].level;
                  if (data.data.data[0].roll == 0) {
                    this.stuMsg.roll = "志愿者";
                  } else if (data.data.data[0].roll == 1) {
                    this.stuMsg.roll = "班级小助手";
                  }
                  this.stuMsg.phone = data.data.data[0].phone;
                  this.stuMsg.volunteerTime = data.data.data[0].volunteerTime;
                } else {
                  this.$message({
                    type: "info",
                    message: "未找到该学号的学生具体信息，请核对搜索条件",
                    offset: "35px",
                    customClass: "user_sytle_for_volunteerlist",
                    duration: 2000
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });

            this.search_stuNum = "";
      },

      /**
       * [getLevelList 获届别列表接口]
       * @enum [6]
       * @return {[type]} [description]
       */
      getLevelList: function() {
          this.axios.post("/WustVolunteer/general/getLevelList.do", {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
          }).then(data => {
              this.levelList = data.data.data;
              this.collapse_levellist = data.data.data.reverse();
              for(var i = 0; i < this.levelList.length; i++){
                this.getCollegeInfoList(this.levelList[i].level, i);
              }
          }).catch(err => {
              console.log(err);
          });
      },

      /**
       * @description 获取学院列表
       */
      getCollegeList: function() {
          this.axios.post("/WustVolunteer/general/getCollegeList.do", {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
              }
            }).then(data => {
                this.collegeList = data.data.data;

                this.options_selected_dept = data.data.data;

                for (var i = 0; i < data.data.data.length; i++) {
                  if (data.data.data[i].name == this.stuMsg.collegeName) {
                    this.stuMsg.collegeName = data.data.data[i].id;
                    break;
                  }
                }
                // 获取班级列表
                this.getClassInfo(1,parseInt(this.stuMsg.level),parseInt(this.stuMsg.collegeName));
            })
            .catch(err => {
              console.log(err);
            });
      },

      /**
         * [getClassInfo 获取学院班级信息列表]
         * @enum {[type]}		[13]
         * @param  {[type]} level [届别]
         * @return {[type]}       [description]
         */
      getClassInfo: function(Tip, level, collegeId){
              let data = {
                level: level,
                collegeId, collegeId
              };
              this.axios.post('/WustVolunteer/general/getClassList.do',qs.stringify(data),{
                  headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                      }
                }).then((data) => {
                  this.classLists = data.data.data;
                }).catch((err) => {
                  console.log(err);
                })
      },

      /**
       * 获取学院信息列表
       * @param {int} level 届别
       * @param {number} pageNum
       * @param {number} pageSize
       */
      getCollegeInfoList: function(level, index){
          let data = {
              level: level,
              pageNum: this.pageNum_college,
              pageSize: this.pageSize_college,
          };
          this.axios.post("/WustVolunteer/general/getCollegeInfoList.do", qs.stringify(data),{
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
          }).then(data => {
              this.selectCollegeList[index] = data.data.data.list;
          })
      },

      /**
       * 添加学院
       * @param {string} collegeName
       */
      addCollege: function(name){
          if(name == ''){
              return ;
          }
          let data = {
            collegeName: name
          };
          this.axios.post("/WustVolunteer/general/addCollege.do", qs.stringify(data),{
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
          }).then(data => {
              if(data.data.status == 0){
                  this.$message({
                        message: '添加学院成功!',
                        type: "success",
                        duration: 2000,
                        showClose: true,
                        customClass: 'user_sytle_for_volunteerlist',
                  });
                  this.getLevelList();
              }else{
                  this.$message({
                        message: '添加学院失败!',
                        type: "error",
                        duration: 2000,
                        showClose: true,
                        customClass: 'user_sytle_for_volunteerlist',
                  });
              }
          }).catch(err => {
              console.log(err);
              this.$message({
                        message: '添加学院出错!',
                        type: "info",
                        duration: 2000,
                        showClose: true,
                        customClass: 'user_sytle_for_volunteerlist',
                  });
          })
          this.add_class_input = '';
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
      alterVolunteer: function(stuNum, stuName, className, phone, roll) {
        var data = {
          stuNum: stuNum,
          stuName: stuName,
          className: className,
          phone: phone,
          roll: roll
        };

        this.axios.post("/WustVolunteer/general/alterVolunteer.do", qs.stringify(data), {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
              }
          }).then(data => {
            if (data.data.status == 0) {
              this.$notify.success({
                title: "更新成功",
                message: "成功更新该志愿者的信息",
                offset: 45,
                duration: 2000
              });
            } else {
              this.$notify.error({
                title: "更新失败",
                message: "更新该志愿者的信息失败",
                offset: 45,
                duration: 2000
              });
            }
            this.clearStuMsg();
          })
          .catch(err => {
            console.log(err);
            this.$notify.error({
              title: "更新失败",
              message: "更新该志愿者的信息出错",
              offset: 45,
              duration: 2000
            });
            this.clearStuMsg();
          });
      },

      /**
       * [importFile 导入文件]
       * @param  {[type]} event [description]
       * @return {[type]}       [description]
       */
      importFile: function(event) {
        this.inputdataLength = 0;
        this.successNum = 0;

        if (!event.target.files) {
          return;
        }
        var f = event.target.files[0];
        var that = this;
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          if (this.rABS) {
            this.wb = xlsx.read(btoa(fixdata(data)), {
              type: "base64"
            });
          } else {
            this.wb = xlsx.read(data, {
              type: "binary"
            });
          }
          // wb.SheetNames[0] 是获取sheets中第一个sheet的名字
          // wb.Sheets[Sheet名]获取第一个Sheet的数据
          // console.log(JSON.stringify(xlsx.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]])));//转化为字符串
          // console.log(event.target.files);

          // console.log(xlsx.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]));
          var inputData = xlsx.utils.sheet_to_json(
            this.wb.Sheets[this.wb.SheetNames[0]]
          );
          // console.log(this.inputdataLength)
          // this.inputdataLength = inputData.length;
          for (var i = 0; i < inputData.length; i++) {
            that.addVolunteer(
              inputData[i].姓名,
              inputData[i].学号,
              inputData[i].班级,
              inputData[i].联系方式,
              inputData[i].权限
            );
            // console.log(inputData[i].姓名,inputData[i].学号, inputData[i].班级, inputData[i].联系方式, inputData[i].权限)
          }
        };
        if (this.rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },

      fixdata: function(data) {
        var o = "",
          l = 0,
          w = 10240;
        for (; l < data.byteLength / w; ++l)
          o += String.fromCharCode.apply(
            null,
            new Uint8Array(data.slice(l * w, l * w + w))
          );
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
      addVolunteer: function(stuNum, stuName, className, phone, roll) {
        this.inputdataLength++;
        let data = {
          stuNum: stuNum,
          stuName: stuName,
          className: className,
          phone: phone,
          roll: roll
        };

        this.axios
          .post("/WustVolunteer/general/addVolunteer.do", qs.stringify(data), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          })
          .then(data => {
            if (data.data.status == 0) {
              this.$notify.success({
                title: "添加成功！",
                message: "成功添加一条志愿者信息",
                offset: 45,
                duration: 2000
              });
              this.successNum++;
            } else if (data.data.status == 1) {
              alert("学号：" + stuNum + " 导入失败， 原因：" + data.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
            this.$notify.error({
              message: "导入文件内容格式，不符合要求！添加失败 : (",
              offset: "35px",
              customClass: "user_sytle_for_volunteerlist",
              duration: 2000
            });
          });
      }
    }
};
</script>

<style type="text/css">
@import "../../static/css/volunteeroperation.css";
</style>