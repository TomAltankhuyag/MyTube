<template lang="pug">
v-layout
  v-navigation-drawer(v-model="drawer"
                      location="left"
                      disable-resize-watcher
                      width="380").drawer-style
    v-btn(@click="onClearPlaylist").btn-style Clear Playlist
    v-btn(@click="onShufflePlaylist").btn-style Shuffle Playlist
    song-list
</template>

<script>
import { VNavigationDrawer, VLayout, VCard, VBtn} from 'vuetify/components'
import SongList from './SongList.vue'

export default {
  components: {
    VNavigationDrawer,
    VLayout,
    SongList,
    VCard,
    VBtn
  },
  data() {
    return {
      drawer: this.isCurrentPlaylistOn
    }
  },
  props: {
    isCurrentPlaylistOn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClearPlaylist() {
      this.$store.playlist.clearPlaylist()
      sessionStorage.removeItem('currentPlaylist')
    },
    onShufflePlaylist() {
      this.$store.playlist.shuffleCurrentPlaylist()
    },
  },
  watch: {
    isCurrentPlaylistOn() {
      this.drawer = !this.drawer
    }
  }
}
</script>
<style lang="scss" scoped>
.drawer-style{
  background-color: lightblue;
  .btn-style {
      margin-bottom: 10px;
      background-color: pink;
      color: white;
    }

}
</style>
