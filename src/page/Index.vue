<!-- 首页 -->
<template>
      <div>
          <MainHeader></MainHeader>
          <MainSidebar></MainSidebar>
          <Index-cont></Index-cont>
          <MainFooter></MainFooter>
      </div>   
</template>


<script>
import Mainheader from '@/components/MainHeader'
import MainSidebar from '@/components/MainSidebar'
import MainFooter from '@/components/MainFooter'
import Index_cont from '@/components/Index'


export default {   
  name: 'Index',
  components:{
    'MainHeader':Mainheader,
    'MainSidebar':MainSidebar,
    'MainFooter': MainFooter,
    'Index-cont': Index_cont
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