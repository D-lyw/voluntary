<!-- 院队模块 -->
<template>
      <div>
          <MainHeader></MainHeader>
          <MainSidebar></MainSidebar>
          <router-view ></router-view>
      </div>   
</template>

<script>
import Mainheader from '@/components/MainHeader'
import MainSidebar from '@/components/MainSidebar'

export default {   
  name: 'Home',
  components:{
    'MainHeader':Mainheader,
    'MainSidebar':MainSidebar,
  }
}
</script>

