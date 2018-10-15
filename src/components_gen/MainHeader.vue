<!-- 头部导航模块  -->

<template>

	<header class="main-header">
    <a href="#" class="logo">
      <span class="logo-mini"><b>Wust</b></span>
      <span class="logo-lg animated jello"  style="font-family: 楷体;"><b>志愿活动管理平台</b></span>
    </a>
    <!-- 标题使用animate 样式 jello jackInTheBox  -->
    <nav class="navbar navbar-static-top" role="navigation">

      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

        <div class="navbar-custom-menu">

            <ul class="nav navbar-nav" >

                <!-- Messages: style can be found in dropdown.less-->
                <li class="user user-menu" id="li_Dept">
                     <!-- 登陆用户所属学院 -->
                     <span id="userDept" >{{collegeName}}</span>
                </li>

                <li class="dropdown user user-menu">
                   
                    <!-- Menu Toggle Button -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <!-- The user image in the navbar-->
                        <img src="../../static/img/avator.jpg" height="128" width="128" class="user-image" alt="User Image">
                        <!-- hidden-xs hides the username on small devices so only the image appears. -->
                        <span class="hidden-xs" id="LoginName">{{collegeUserName}}</span>
                    </a>
                    <div class="dropdown-menu" style="width: 60px;" id="logOut" @click="userlogout">
                        &nbsp;&nbsp;&nbsp;<span class="btn  btn-flat"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>&nbsp;&nbsp;退出/切换账号</span>
                    </div>


                </li>
                <!-- Control Sidebar Toggle Button -->
            </ul>

        </div>
    </nav>
  </header>
</template>

<script type="text/javascript">
	export default {
		name: 'Mainheader',
    data(){
      return{
        collegeName: '',
        collegeUserName: '',
      }
    },
    methods:{
        userlogout: function(){
            this.axios.post('/WustVolunteer/general/logout.do',{
                 headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then((data) => {
                  if(data.data.status == 0){
                    this.$router.push({path: '/'})
                  }
              }
            )
        },

         /**
           * [checkLogin 核对是否登陆]
           * @return {[type]} [description]
           */
        checkLogin: function(){
              this.axios.post('/WustVolunteer/general/checkLogin.do',{
                          headers:{
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                          }
              }).then((data) => {
                if(data.data.status == 1){
                  this.$router.push({path: '/'});      // 未登陆则调到登陆页面
                }else{
                  this.collegeName = data.data.data.organizationName;
                  this.collegeUserName = data.data.data.stuName;
                }
              }).catch((err) => {
                  console.log(err);
              })
        },
    },
    mounted(){
        this.checkLogin();
    }
	}
</script>

<style type="text/css">
    #li_Dept{
      margin: 0px;
      padding:18px 20px;
      height: 100%;
      /*border:1px solid #eee;*/
    }
    #userDept{
      display: block;
      height: 100%;
      line-height: 100%;
      color: white;
      /*color: red;*/
    }
</style>