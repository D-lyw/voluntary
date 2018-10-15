<!-- 首页 -->
<template>
      <div>
          <MainHeader></MainHeader>
          <MainSidebar></MainSidebar>
          <router-view></router-view>
          <!-- <MainFooter></MainFooter> -->
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
