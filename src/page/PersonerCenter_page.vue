<template>
		<div>
				<MainHeader></MainHeader>
				<MainSidebar></MainSidebar>
				<PersonerCenter></PersonerCenter>
		</div>
</template>

<script type="text/javascript">

import MainHeader from '@/components/MainHeader'
import MainSidebar from '@/components/MainSidebar'
import MainFooter from '@/components/MainFooter'
import PersonerCenter from '@/components/PersonerCenter'

		export default{
			 name: 'PersonerCenter_page',
			 components: {
			 		"MainHeader":MainHeader,
					"MainSidebar":MainSidebar,
					"MainFooter":MainFooter,
					"PersonerCenter":PersonerCenter
			 },
			 data () {
			 		return {

			 		}
			 },
			 methods: {

			 }
		}
</script>

<style type="text/css">
	
</style>