<template>
	<div>
		<MainHeader></MainHeader>
        <MainSidebar></MainSidebar>
        <ActivityList></ActivityList>
    </div>
</template>

<script type="text/javascript">

import MainHeader from '@/components/MainHeader'
import MainSidebar from '@/components/MainSidebar'
import MainFooter from '@/components/MainFooter'
import ActivityList from '@/components/ActivityList'

	export default{
		name: "ActivityList_page",
		components:{
			"MainHeader": MainHeader,
			"MainSidebar": MainSidebar,
			"MainFooter": MainFooter,
			"ActivityList": ActivityList
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