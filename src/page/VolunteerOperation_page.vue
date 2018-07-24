<template>
		<div>
			 	<MainHeader></MainHeader>
			 	<MainSidebar></MainSidebar>
			 	<VolunteerOperation></VolunteerOperation>
		</div>
</template>

<script type="text/javascript">

import MainHeader from '@/components/MainHeader'
import MainSidebar from '@/components/MainSidebar'
import MainFooter from '@/components/MainFooter'
import VolunteerOperation from '@/components/VolunteerOperation'

		export default{
			 name: 'VolunteerOperation_page',
			 components: {
			 	'MainHeader': MainHeader,
			 	'MainSidebar': MainSidebar,
			 	'MainFooter': MainFooter,
			 	'VolunteerOperation': VolunteerOperation
			 },
			 data(){
			 		return{

			 		}
			 }
		}
</script>

<style type="text/css">
	
</style>