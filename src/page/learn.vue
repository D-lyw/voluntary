<template>
	<div>
		<h2>{{msg}}</h2>
		<input type="text" name="" v-model="input_cont">
		<input type="text" name="">
		<button v-on:click='get'>Submit</button><br>
		<span>{{input_cont}}</span>
	</div>
</template>

<script type="text/javascript">
	const axios = require('axios');
	export default {
		name: "Learn",
		data () {
			return {
				msg:"kkkkkkkkkkkkkkkk",
				input_cont:'',
			}
		},
		methods:{
			dosomething: function(){
				console.log("hello,something")
			},
			get: function() {		
				axios.get('http://111.231.89.81:3000/pages')
				.then(respose=>{
					console.log(respose)
				})
			}
		}

	}
</script>

<style type="text/css">
	#div{
		width: 300px;
		height: 500px;
		margin: 50px auto;
		border:1px solid grey;
	}
</style>