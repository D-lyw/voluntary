<!-- PeopleAuthority_page -->
<template>
	<div>
		<MainHeader></MainHeader>
		<MainSidebar></MainSidebar>
		<PeopleAuthority></PeopleAuthority>
		<MainFooter></MainFooter>
	</div>
</template>

<script type="text/javascript">
import MainHeader from '@/components/MainHeader'
import MainSidebar from '@/components/MainSidebar'
import MainFooter from '@/components/MainFooter'
import PeopleAuthority from '@/components/PeopleAuthority'

	export default{
		name: 'PeopleAuthority_page',
		data(){
			return{

			}
		},
		components:{
			"MainHeader":MainHeader,
			"MainSidebar":MainSidebar,
			"MainFooter":MainFooter,
			"PeopleAuthority":PeopleAuthority
		},
		methods:{

		}
	}
</script>

<style type="text/css">
	
</style>