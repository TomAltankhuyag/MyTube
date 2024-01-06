<template lang="pug">
#app.app
  .youtube-app-container
    youtube-controller.controller
    v-switch(v-model="isCurrentPlaylistOn"
             :label="isCurrentPlaylistOn ? 'Current Playlist Display: On' : 'Current Playlist Display: Off'"
             :class="{activated: isCurrentPlaylistOn}").switch-style
    v-switch(v-model="isPlaylistsMenuOn"
             :label="isPlaylistsMenuOn ? 'Saved Playlist Display: On' : 'Saved Playlist Display: Off'"
             :class="{activated: isPlaylistsMenuOn}").switch-style
    h3 Current Video: {{ currentVideo.name }}
    youtube-video(:videoId="videoId").video
    current-playlist-menu(:isCurrentPlaylistOn="isCurrentPlaylistOn")
    playlists-menu(:isPlaylistsMenuOn="isPlaylistsMenuOn")
</template>

<script>
import YoutubeVideo from './components/YoutubeVideo.vue'
import YoutubeController from './components/YoutubeController.vue'
import CurrentPlaylistMenu from './components/CurrentPlaylistMenu.vue'
import PlaylistsMenu from './components/PlaylistsMenu.vue'
import { usePlaylistStore } from './store/playlist'
import { VSwitch } from 'vuetify/components'
import { mapState } from 'pinia'
export default {
  name: 'App',
  components: {
    YoutubeVideo,
    YoutubeController,
    VSwitch,
    CurrentPlaylistMenu,
    PlaylistsMenu
  },
  data() {
    return {
      isDebuggerOn: false,
      isCurrentPlaylistOn: false,
      isPlaylistsMenuOn: false
    }
  },
  computed: {
    ...mapState(usePlaylistStore, ['currentVideo']),
  },
  mounted() {
    const currentPlaylist = JSON.parse(localStorage.getItem('currentPlaylist'))
    if (currentPlaylist) {
      this.$store.playlist.setCurrentPlaylist(currentPlaylist)
    }
    const playlists = JSON.parse(localStorage.getItem('playlists'))
    if (playlists) {
      this.$store.playlist.setPlaylists(playlists)
    }
  },
  methods: {
    onSubmit(input) {
      const videoId = videoIdParser(input)
      fetchVideoInformation(videoId).then((status) => {
        if (status === YOUTUBE_API_CODES.VALID) {
          this.onValidIdSubmission()
          this.videoId = videoId
        }
      })
    }
  },
  computed: {
    ...mapState(usePlaylistStore, ['currentVideo']),

    videoId() {
      return this.currentVideo.videoId
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/flex';
#app {
  min-height: 100vh;
  background-image: url('assets/images/pinkStreets.jpg');
  background-size: cover;
  background-position: center;
}
.top-bar {
  margin-bottom: 75px;
  z-index: 1;
}
.side
.youtube-app-container {
  @include flex-column();

  .controller {
    margin-bottom: 30px;
  }

  .video {
    margin: 15px 15px 100px 15px;
  }
}

.switch-style {
  color: red;
  font-family: copperplate;

  &.activated {
    color: green;
  }
}

.youtube-app-container {
  box-sizing: border-box;
  @include flex-column();
  padding: 50px 0;
}
</style>
