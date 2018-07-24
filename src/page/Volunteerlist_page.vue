<template>
		<div>
				<MainHeader></MainHeader>
		        <MainSidebar></MainSidebar>
		        <Volunteerlist></Volunteerlist>
	    </div>
</template>

<script type="text/javascript">

import MainHeader from '@/components/MainHeader'
import MainSidebar from '@/components/MainSidebar'
import MainFooter from '@/components/MainFooter'
import Volunteerlist from '@/components/Volunteerlist'

		export default{
			 name: 'Volunteerlist_page',
			 components:{
			 	'MainHeader': MainHeader,
			 	'MainSidebar': MainSidebar,
			 	'MainFooter': MainFooter,
			 	'Volunteerlist': Volunteerlist
			 }
		}
</script>

<style type="text/css">
	
</style>