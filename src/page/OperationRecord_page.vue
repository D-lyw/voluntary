<!-- operationRecord Part -->
<template>
	<div>
        <MainHeader></MainHeader>
        <MainSidebar></MainSidebar>
        <OperationRecord></OperationRecord>
        <!-- <MainFooter></MainFooter> -->
    </div> 
</template>

<script>
import MainHeader from '@/components/MainHeader'
import MainSidebar from '@/components/MainSidebar'
import MainFooter from '@/components/MainFooter'
import OperationRecord from '@/components/OperationRecord'

export default {
	name: 'OperationRecord_page',
	components: {
		"MainHeader":MainHeader,
		"MainSidebar":MainSidebar,
		"MainFooter":MainFooter,
		"OperationRecord":OperationRecord
	},
	data () {
		return {
			
		}
	}
}
</script>

<style type="text/css">
	
</style>