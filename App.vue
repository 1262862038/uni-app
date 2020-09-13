<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$api.get_user({
				user_id: '5f43ca43dbc28f000114b282'
			}).then((res) => {
				console.log('userRes', res)
				this.$store.dispatch('set_userinfo', res.data)
				
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'components/gaoyia-parse/parse.css';
</style>
