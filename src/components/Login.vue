<template>
	<div id="container">
		<label>用户名：</label>
		<input type="text" name="username" placeholder="请输入用户名..." value="">
		<label>密码：</label>
		<input type="password" name="password">
		<button onclick="alert('Login.....')">登陆</button>
	</div>

</template>

<script type="text/javascript">
	export default {
		name: "Login",
		data () {
			return {

			}
		}
	}
</script>

<style type="text/css">
	#container{
		width: 500px;
		height: 500px;
		background: #ccc;
	}
</style>