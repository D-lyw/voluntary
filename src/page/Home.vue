<!-- 首页 -->
<template>
      <div>
          <MainHeader></MainHeader>
          <MainSidebar></MainSidebar>
          <router-view></router-view>
          <MainFooter></MainFooter>
      </div>   
</template>


<script>
import Mainheader from '@/components/MainHeader'
import MainSidebar from '@/components/MainSidebar'
import MainFooter from '@/components/MainFooter'


export default {   
  name: 'Home',
  components:{
    'MainHeader':Mainheader,
    'MainSidebar':MainSidebar,
    'MainFooter': MainFooter
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import '../../static/bootstrap-3.3.7/css/bootstrap.min.css';
    @import '../../static/font-awesome-4.7.0/css/font-awesome.min.css';
    @import '../../static/layui/css/layui.css';
    @import '../../static/css/all_skins.css';
    @import '../../static/css/AdminLTE.css';
</style>