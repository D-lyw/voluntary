<template>
	<div class="content-wrapper" style="background-color: white;border:1.5px solid #ffd; padding:0 20px;" id="main">
	<!-- 	<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
		  <legend>总览信息</legend>
		</fieldset>   
		  -->
		  <br>
		<div style="padding: 20px; background-color: #F2F2F2; ">
		  <div class="layui-row layui-col-space15">
		    <div class="layui-col-md8">
		      <div class="layui-card">
		        <div class="layui-card-header" ><i class="fa fa-free-code-camp">&nbsp;</i>最新活动 / 通知公告</div>
		        <div class="layui-card-body">
		          <!-- 卡片式面板面板通常用于非白色背景色的主体内<br>
		          从而映衬出边框投影 -->

					<div class="layui-collapse" lay-accordion="">
					  <div class="layui-colla-item">
					    <h2 class="layui-colla-title">layui 更适合哪些开发者？ <span class="layui-badge" >置顶</span></h2>
					    <div class="layui-colla-content layui-show">
					      <p>在前端技术快速变革的今天，layui 仍然坚持语义化的组织模式，甚至于模块理念都是采用类AMD组织形式，并非是有意与时代背道而驰。layui 认为以jQuery为核心的开发方式还没有到完全消亡的时候，而早期市面上基于jQuery的UI都普通做得差强人意，所以需要有一个新的UI去重新为这一领域注入活力，并采用一些更科学的架构方式。
					      <br>
					      因此准确地说，layui 更多是面向那些追求开发简单的前端工程师们，以及所有层次的服务端程序员。</p>
					    </div>
					  </div>
					  <div class="layui-colla-item">
					    <h2 class="layui-colla-title">为什么JS社区大量采用未发布或者未广泛支持的语言特性？<span class="layui-badge" style="border-radius:50%;" >hot</span></h2>
					    <div class="layui-colla-content">
					      <p>有不少其他答案说是因为JS太差。我下面的答案已经说了，这不是根本性的原因。但除此之外，我还要纠正一些对JS具体问题的误解。JS当初是被作为脚本语言设计的，所以某些问题并不是JS设计得差或者是JS设计者的失误。比如var的作用域问题，并不是“错误”，而是当时绝大部分脚本语言都是这样的，如perl/php/sh等。模块的问题也是，脚本语言几乎都没有模块/命名空间功能。弱类型、for-in之类的问题也是，只不过现在用那些老的脚本语言的人比较少，所以很多人都误以为是JS才有的坑。另外有人说JS是半残语言，满足不了开发需求，1999年就该死。半残这个嘛，就夸张了。JS虽然有很多问题，但是设计总体还是优秀的。——来自知乎@贺师俊</p>
					    </div>
					  </div>
					  <div class="layui-colla-item">
					    <h2 class="layui-colla-title">为什么前端工程师多不愿意用 Bootstrap 框架？</h2>
					    <div class="layui-colla-content">
					      <p>因为不适合。如果希望开发长期的项目或者制作产品类网站，那么就需要实现特定的设计，为了在维护项目中可以方便地按设计师要求快速修改样式，肯定会逐步编写出各种业务组件、工具类，相当于为项目自行开发一套框架。——来自知乎@Kayo</p>
					    </div>
					  </div>
					  <div class="layui-colla-item">
					    <h2 class="layui-colla-title">贤心是男是女？</h2>
					    <div class="layui-colla-content">
					      <p>man！ 所以这个问题不要再出现了。。。</p>
					    </div>
					  </div>
					</div>
		        </div>
		      </div>
		    </div>
		    <div class="layui-col-md4" >
					<Depart :departShow='this.departS' @hasChange="doChange"></Depart>
					<General v-bind:generalShow ='generalS' @hasChange = "doChange"></General>
		    </div>
		    <div class="layui-col-md12">
		      <div class="layui-card">
		        <div class="layui-card-header">标题</div>
		        <div class="layui-card-body">
		          内容
		        </div>
		      </div>
		    </div>

		  </div>
		</div> 
		 
	</div>
</template>

<script type="text/javascript">

import Depart from '@/part/depart';
import General from '@/part/general';

	export default {
		name:'Index',
		components:{
			'Depart':Depart,
			'General':General
		},
		data () {
			return {
				mDept:'计算机科学与计算学院',
				departS: true,
				generalS: false,
			}
		},
		mounted(){															// 挂载之后
			console.log("页面加载完成 判断是否已登陆！");


		},
		afterRouteEnter:function(to, from, next){
			console.log("afterRouteEnter");
			
		},
		// beforeRouteEnter:function(to, from, next) {
		// 	console.log("beforeRouteEnter")
		// },
		methods: {
			test: function () {
				layui.use('layer', function(){    //加载layer模块，触发回调函数

				    var layer = layui.layer;		  //实例化一个layer对象

					var index = layer.msg("欢迎登陆！",{time:2800,skin:'layui-layer-molv',area:['100px','80px'],offset:'50px',anim:1});
					layer.style(index,{
						width:'120px',
						height:'40px',
						color:'white',
						background:'#666',
						opacity:0.8,
						'text-align':'center',
						'border-radius':'5px'
					})
				});  
			},
			doChange: function(){
				this.departS = !this.departS;
				this.generalS = !this.generalS;
				console.log("receive change!" );
			}
		
		}
	}
</script>


<style >

#main{
	/*color:red;*/
}
#right_part{
	/*border:1px solid red;*/
	padding: 0px;
}
#right_part tbody{
	margin: 0px;
}
#right_part tbody tr{
	padding-left: 10px;
	/*border:1px solid red;*/
}
#right_part tr td{
	/*border:1px solid red;	*/
	padding-left: 40px;
	text-align: left;
}
#right_part tr td:hover{
	background: #f5f5f5;
}

#right_card{
	/*color:red;*/
}
#right_card .card_right_header{
	border-radius: 3px;
	border-top: 2px solid #3c8dbd;
}

#general_team_view{
	opacity: .8;
	display: inline-block;
	/*border:1px solid grey;*/
	font-size: 12px;
	float: right;
}
</style>