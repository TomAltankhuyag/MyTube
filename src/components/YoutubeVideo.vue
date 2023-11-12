<template lang="pug">
.youtube-player(tabindex="-1")
	#player(tabindex="-1")
</template>

<script>
import { mapState } from 'pinia'
import { useSettingStore } from '../store/settings'
import {videoController} from '../utility/video-controller'
import {controllerOptions } from '../constants/constants'
const DEFAULT_VIDEO = 'yox2Yz4Ni2o'

export default {
	name: 'YoutubeVideo',
	data() {
		return {
			player: null
		}
	},
	computed: {
		...mapState(useSettingStore, ['autopause']),

		isYoutubePlayerInstalled() {
			return window.YT && window.YT.loaded
		}
	},
	props: {
		videoId: {
			type: String,
			default: ''
		}
	},
	mounted() {
		this.loadYoutubePlayer()
		addEventListener('resize', () => {
				this.player.setSize(self.innerWidth * 0.75, self.innerHeight * 0.75)
		})
	},
	methods: {
		loadYouTubeAPI() {
			const tag = document.createElement('script')
			tag.src = "https://www.youtube.com/iframe_api"
			const firstScriptTag = document.getElementsByTagName('script')[0]
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
		},
		loadYoutubePlayer() {
			if (!this.isYoutubePlayerInstalled) {
				this.loadYouTubeAPI()
			}
			const videoId = this.videoId || DEFAULT_VIDEO
			window.onYouTubeIframeAPIReady = () => {
				const playerOptions = {
					height: self.innerHeight * 0.75,
					width: self.innerWidth * 0.75,
					videoId,
					playerVars: {
						'controls': 1,
						'rel': 0,
						'autoplay': this.autopause ? 0 : 1,
						'origin': 'https://www.youtube.com'
					},
					events: {
						'onReady': this.onPlayerReady,
						'onStateChange': this.onPlayerStateChange,
						'onApiChange': this.onApiChange
					}
				}
				this.player = new YT.Player('player', playerOptions)
			}
		},
		onPlayerStateChange(event) {
			if (event.data === 0) {
				console.warn('Video Ended')
				videoController[controllerOptions.PLAY_NEXT]()
			}
		},
		onPlayerReady() {
			console.log('Player Ready')
		},
		onVideoIdChange() {
			if (!this.player) {
				this.loadYoutubePlayer()
			}
			if (this.autopause) {
				this.player.cueVideoById(this.videoId)
			} else {
				this.player.loadVideoById(this.videoId)
			}
		},
	},
	watch: {
		videoId() {
			this.onVideoIdChange()
		}
	}
}
</script>
<style scoped lang="scss">
@import 'src/styles/flex';

.youtube-player {
	@include flex-center();

	.info {
		@include flex-column();
		color: white;
	}
}
</style>
