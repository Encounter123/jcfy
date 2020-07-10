<script>
	import Vue from 'vue'
	
	Vue.mixin({
		computed:{
			FixedBottomHeight(){
				return this.$store.state.isIphoneX? 20:0
			},
			UserIdentity(){
				return this.$store.state.userIdentity
			}
		}
	})
	
	export default {
		methods:{
			getDeviceInfo() {
				let systemInfo = wx.getSystemInfoSync()
				let numberSize = systemInfo.windowHeight-systemInfo.statusBarHeight-systemInfo.safeArea.height
				if ( numberSize<0 ) {
					this.$store.commit('setIphoneX', true)
				}
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			this.getDeviceInfo()
			const updateManager = uni.getUpdateManager()
			updateManager.onUpdateReady(function () {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							updateManager.applyUpdate()
						} else if (res.cancel) {
							updateManager.applyUpdate()
						}
					}
				})
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
</style>
