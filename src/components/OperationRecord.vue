<template>
	<div class="content-wrapper" style="background-color: #f1f4f6;border:1.5px solid #ffd; padding:0 20px;border:1px solid red;" id="operationR">
		<span class="layui-breadcrumb navigoto " lay-separator=">" >
		  <i class="fa fa-home" style="opacity:0.8;color:#333;font-size:16px;"></i>&nbsp;
		  <router-link to="/">主页</router-link>
		  <router-link to="">系统操作</router-link>
		  <router-link to=""><cite>操作日志</cite></router-link>
		</span>
		
		<div id="OC_main">
			<div class="OC_header_introduce"></div>
			<div class="OC_content">
				<div class="btn_group">
					<input type="file"  @change="importFile($event)" class="inportFILE">
					<button></button>
				</div>
				<table class="table">
					<thead>
						<tr>
							<td><input type="checkbox"></td>
							<td>操作人</td>
							<td>学号</td>
							<td>权限</td>
							<td>操作时间</td>
							<td>操作类型</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>




 	</div>
</template>

<script type="text/javascript">
	let xlsx = require('xlsx');    	//引入xlsx插件

	export default{
		name:'OperationRecord',
		data(){
			return{
				wb:'',				// 读取完成的数据
				rABS: false,		// 是否将文件读取为二进制字符串
			}
		},
		methods:{
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
			}
		}
	}
</script>

<style type="text/css">
	.navigoto{
		margin-top: 10px;
		display: inline-block;
		/*background-color: red;*/
		margin-bottom: 5px;
	}
	#OC_main{
		width: 100%;
		height: auto;
		min-height: 60%;
		/*border:1px solid black;*/
	}
	.OC_header_introduce{
		width: 100%;
		height: 60px;
		background: #E8edf0;
	}
	.OC_content{
		width: 100%;
		height: auto;
		min-height: 550px;
		border: 1px solid #ffd;
		background-color: white;
		padding: 8px;
	}
	.btn_group{
		width: 100%;
		height: 35px;
		border:1px solid orange;
	}
</style>