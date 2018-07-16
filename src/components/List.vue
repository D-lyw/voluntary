<template>

	<ul>
		<li>{{List[0]}}</li>
		<li>{{List[1]}}</li>
		<li>{{List[2]}}</li>
		<li>{{List[3]}}</li>
		<li>{{List[4]}}</li>
	</ul>

</template>

<script type="text/javascript">
	export default {
		name: 'List',
		data () {
			return{
				List:['111111111','2222222','3333333','44444444444','5555']
			}
		}
	}

</script>