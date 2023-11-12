<template lang="pug">
.youtube-configurator
  .input-container
    v-text-field(v-model="userInput"
                 label='Enter a URL or video ID'
                 @keyup.enter="processAction(controllerOptions.PLAY_NOW)"
                 color="purple"
                 clearable
                 hide-details="auto").input-style
    .controller-buttons
      v-btn.add-style(@click="onLoadPlaylist").btn-style Play now
      v-btn.add-style(@click="onLoadPlaylist").btn-style Load Playlist
      v-btn.add-style(@click="processAction(controllerOptions.QUEUE)").btn-style Queue Song
  v-switch(v-model="autopause"
           :label="autopause ? 'Autopause On' : 'Autopause Off'"
           :class="{activated: autopause}"
           @click="onSwitchClick").switch-style
  v-btn(v-if="devMode" @click="onSyncPlaylist").btn-style Sync Playlist
  v-btn(@click="onPlayNext" :disabled="isCurrentPlaylistEmpty").btn-style Play Next

</template>

<script>
import { mapState } from 'pinia'
import { VTextField, VSwitch, VBtn } from 'vuetify/components'
import { usePlaylistStore } from '../store/playlist'
import { useSettingStore } from '../store/settings'
import { videoIdParser, playlistIdParser } from '../utility/youtube-id-parser'
import { fetchVideoInformation, fetchPlaylistInformation } from '../utility/youtube-video-validation'
import { YOUTUBE_API_CODES, controllerOptions } from '../constants/constants'
import {videoController} from '../utility/video-controller'

export default {
  components: {
    VTextField,
    VSwitch,
    VBtn
  },
  emits: ['toggle-switch', 'mouseleave'],
  data() {
    return {
      key: 0,
      userInput: '',
      controllerOptions
    }
  },
  computed: {
    ...mapState(useSettingStore, ['autopause', 'devMode']),
    ...mapState(usePlaylistStore, ['currentPlaylist']),
    hasInput() {
      return this.userInput && this.userInput.replace(/\s/g, '').length
    },
    isCurrentPlaylistEmpty() {
      return this.currentPlaylist.length === 0
    }
  },
  methods: {
    async processAction(ACTION) {
      const userInput = this.userInput
      this.userInput = ''
      const payload = await this.processVideoInput(userInput)
      if (payload && payload.status === YOUTUBE_API_CODES.VALID) {
        videoController[ACTION](payload)
      }
    },
    async onLoadPlaylist() {
      if (!this.hasInput) {
        console.warn('no input')
        return
      }
      const userInput = this.userInput
      this.userInput = ''
      const playlistId = this.processPlaylistInput(userInput)
      const payload = await fetchPlaylistInformation(playlistId)
      if (payload.status === YOUTUBE_API_CODES.VALID) {
        this.$store.playlist.loadPlaylistWithPayload(payload)
      }
    },
    onSyncPlaylist() {
      this.$store.playlist.syncPlaylist()
    },
    onPlayNext() {
      videoController[controllerOptions.PLAY_NEXT]()
    },
     processPlaylistInput(userInput) {
      const playlistId = playlistIdParser(userInput)
      if (!playlistId) {
        console.warn('INVALID INPUT')
        return null
      }
      return playlistId
    },
    async processVideoInput(userInput) {
      const videoId = videoIdParser(userInput)
      if (!videoId) {
        console.warn('improper videoId')
        return null
      }
      const payload = await fetchVideoInformation(videoId)
      return payload
    },
    onSwitchClick(){
      this.$store.setting.toggleAutopause()
    }
  }
}
</script>
<style></style>
<style lang="scss" scoped>
@import 'src/styles/flex';

$input-height : 50px;

.youtube-configurator {
  @include flex-column();
  justify-content: space-between;
  padding: 25px;


  .input-container {
    @include flex-column();
    box-sizing: border-box;
    margin: 50px 0;
    padding: 10px;
    @media screen and (min-width: 650px) {
      @include flex-row();
    }
    .input-style {
      width: 200px;
      margin: 0 5px;
      color: pink;
      @media screen and (min-width: 650px) {
        width: 350px;
      }
    }

    .add-style {
      height: $input-height;
      width: 140px;
    }


  }
  .switch-style {
    color: green;
    &.activated {
      color: red;
    }
  }
  .controller-buttons  {
    @include flex-column();

  }
  .btn-style {
    margin-bottom: 10px;
    background-color: pink;
    color: white;
  }

  // .activated {
  //   color: red;
  // }

}
</style>
