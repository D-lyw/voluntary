<template>
	<div class="content-wrapper" style="height:800px;overflow-y:auto;overflow-x:hidden;" id="operationR">
		<!-- <span class="layui-breadcrumb navigoto" >
		  <i class="fa fa-home" style="opacity:0.8;color:#333;font-size:16px;"></i>&nbsp;
		  <router-link to="/">&nbsp;&nbsp;主页</router-link>
		  <router-link to="">系统操作</router-link>
		  <router-link to=""><cite>操作日志</cite></router-link>
		</span> -->
		<div  >
			<el-breadcrumb separator-class="el-icon-arrow-right">
				 <el-breadcrumb-item :to="{ path: '/home/introduce' }"><i class="fa fa-home" style="opacity:0.8;color:#333;"></i>&nbsp;主页</el-breadcrumb-item>
				 <el-breadcrumb-item>系统操作</el-breadcrumb-item>
				 <el-breadcrumb-item>操作日志</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<br>
		<div id="OC_main">

			<div class="OC_header_introduce">
				
				  <div style="width:60%;display:inline-block;">
				  <el-input placeholder="请选择关键字进行搜索" v-model="input_value" class="input-with-select"  id="input_name_S" size="small">
				    <el-select v-model="select" slot="prepend" placeholder="请选择">
				      <el-option label="姓名" value="1"></el-option>
				      <el-option label="学号" value="2"></el-option>
				      <el-option label="操作类型" value="3"></el-option>
				      <el-option label="用户权限" value="4"></el-option>
				    </el-select>
				    <el-button slot="append" icon="el-icon-search"></el-button>
				  </el-input>
				  </div>
				  <!-- <el-button type="info" plain @click="exportFile()" size='mini'>导出</el-button> -->
				  <el-button-group class="btn_group_three">
					  
					  <el-tooltip class="item" effect="light" content="刷新" placement="bottom-start" >
					      	<el-button type="success" plain icon="el-icon-refresh" size="small" @click="refreshData"></el-button>
					  </el-tooltip>

					  <el-tooltip class="item" effect="light" content="导出数据" placement="bottom" >
					  		<el-button type="info" icon="el-icon-download" plain size="small"></el-button>
					  </el-tooltip>

					  <el-tooltip class="item" effect="light" content="设置，无权限" placement="bottom" >
					  		<el-button type="danger" icon="el-icon-setting" plain size="small"></el-button>
					  </el-tooltip>
				  </el-button-group>
			</div>

			<div class="OC_content">
				<div class="btn_group">
					<div class="block" style="display:inline-block;">
						<!-- 分页 -->
					    <el-pagination 
					      background
					      @current-change="getOperatinoRecord"
					      :current-page.sync="currentPage1"
					      :page-size="pageSize"
					      layout=" jumper,prev, pager, next, total"
					      :total="list_total">
					    </el-pagination>
				  	</div>
				  	
				</div>		
				<table class="table table-bordered table-hover table-condensed ">
					
			
					<thead>
						<tr>
							<td><input type="checkbox"></td>
							<td>操作人员</td>
							<td>学号</td>
							<td>职务权限</td>
							<td>操作时间</td>
							<td>操作类别</td>
						</tr>
					</thead>
					<tbody class="table-condensed">
						<tr v-for="item in record_list">
							<td><input type="checkbox" name=""></td>
							<td>{{item.stuName}}</td>
							<td>{{item.stuNum}}</td>
							<td>未知</td>
							<td>{{item.time}}</td>
							<td>{{item.operation}}</td>
						</tr>
						
					</tbody>
					
				</table>
				<p style="font-size:12px; opacity:1;"># 当前显示 {{startRow}} 到 {{endRow}} 条操作记录</p>
			</div>

		<!-- <input type="file"  @change="importFile($event)" class="inportFILE"> -->

		</div>




		<!-- <MainFooter></MainFooter> -->



 	</div>
</template>

<script type="text/javascript">
	import qs from 'qs';
	
	import xlsx from 'xlsx';				//引入xlsx插件

	// import TableExport from 'tableexport';	// tableexport插件
	// import FileSaver from 'file-saverjs';

	// const xlsx = require('xlsx');    	//引入xlsx插件

	export default{
		name:'OperationRecord',
		data(){
			return{
				wb:'',				// 读取完成的数据
				rABS: false,		// 是否将文件读取为二进制字符串
				currentPage1: 1,
		        input_value:'',
		        select: '',

		        record_list: [],
		        list_total: 0,
		        pageSize: 15,
		        startRow: 0,
		        endRow: 0,
			}
		},
		mounted(){
			// 获取操作记录
			this.getOperatinoRecord();
		},
		methods:{
			/**
			     * [importFile 导入文件]
			     * @param  {[type]} event [description]
			     * @return {[type]}       [description]
			     */
			    importFile: function (event){
				if(!event.target.files){
					return
				}
				var f = event.target.files[0];
				
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
					// console.log(JSON.stringify(xlsx.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]])));
					console.log(xlsx.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]));  							//转化为字符串
					console.log(event.target.files);
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

			// 利用tableexport插件导出文件
			exportFile: function(){
				console.log("我要导出文件了。。。。。。");
				
								// selector
				TableExport.prototype.ignoreCSS = ".tableexport-ignore";

				// selector[]
				TableExport.prototype.ignoreCSS = [".tableexport-ignore", ".other-ignore-class"];


				// selector
				TableExport.prototype.emptyCSS = ".tableexport-empty";

				// selector[]
				TableExport.prototype.emptyCSS = [".tableexport-empty", ".other-empty-class"];

				// OR using jQuery


				TableExport.prototype.charset = "charset=utf-8";

				/* default `filename` property if "id" attribute is unset */
				TableExport.prototype.defaultFilename = "myDownload";

				/* default class to style buttons when not using Bootstrap or the built-in export buttons, i.e. when (`bootstrap: false` & `exportButtons: true`)  */
				TableExport.prototype.defaultButton = "button-default";

				/* Bootstrap classes used to style and position the export button, i.e. when (`bootstrap: true` & `exportButtons: true`) */
				TableExport.prototype.bootstrapConfig = ["btn", "btn-default", "btn-toolbar"];

				/* row delimeter used in all filetypes */
				TableExport.prototype.rowDel = "\r\n";
				/**
				 * Format-specific configuration (default class, content, mimeType, etc.)
				 * @memberof TableExport.prototype
				 */

				var table = TableExport(document.getElementsByTagName("table"),{
					filename: 'Download_save',
					bootstrap: true,
				});
			},


		    handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		        var sendmsg = {
						pageNum: this.currentPage1,
						pageSize: 12
					}

				this.axios.post('/WustVolunteer/college/getOperationRecord.do', qs.stringify(sendmsg),{
						headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
				}).then((data) => {
					console.log(data);
					this.record_list = data.data.data.list;
					this.list_total = data.data.data.total;
				})
			    },


		    getOperatinoRecord: function(){
		    	var sendmsg = {
					pageNum: this.currentPage1,
					pageSize: this.pageSize
				}
				this.axios.post('/WustVolunteer/college/getOperationRecord.do', qs.stringify(sendmsg),{
						headers:{
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
				}).then((data) => {
					console.log(data);
					this.record_list = data.data.data.list;
					this.list_total = data.data.data.total;
					this.startRow = data.data.data.startRow;
					this.endRow = data.data.data.endRow;
				})
		    },

		    refreshData: function(){
		    	this.getOperatinoRecord();
		    	this.$message({
			            type: 'success',
			             message: '刷新成功！',
			             offset: '35px',
			             customClass: 'user_sytle_for_volunteerlist',
			             duration: 2000
		          	});    
		    	}


		}
	}
</script>	

<style type="text/css">

	@import '../../static/css/operationrecord.css';

</style>