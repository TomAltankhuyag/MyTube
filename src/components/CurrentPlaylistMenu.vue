<template lang="pug">
v-layout
  v-navigation-drawer(v-model="drawer"
                      location='left'
                      disable-resize-watcher
                      width='380').drawer-style
    v-btn(@click="onClearPlaylist").btn-style Clear
    v-btn(@click="onShufflePlaylist" :disabled="isCurrentPlaylistEmpty").btn-style Shuffle
    v-btn(@click="onSavePlaylist" :disabled="isCurrentPlaylistEmpty").btn-style Save
    song-list
  playlist-editor(:showModal="showAddModal"
                  @on-close-modal="onCloseModal")
</template>

<script>
import { VNavigationDrawer, VLayout, VCard, VBtn} from 'vuetify/components'
import SongList from './SongList.vue'
import PlaylistEditor from './PlaylistEditor.vue'

export default {
  components: {
    VNavigationDrawer,
    VLayout,
    SongList,
    VCard,
    VBtn,
    PlaylistEditor
  },
  data() {
    return {
      drawer: this.isCurrentPlaylistOn,
      showAddModal: false
    }
  },
  props: {
    isCurrentPlaylistOn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isCurrentPlaylistEmpty() {
      return this.$store.playlist.currentPlaylist.length === 0
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
    onSavePlaylist() {
      this.showAddModal = true
    },
    onCloseModal() {
      this.showAddModal = false
    }
  },
  watch: {
    isCurrentPlaylistOn() {
      this.drawer = this.isCurrentPlaylistOn
    }
  }
}
</script>
<style lang="scss" scoped>
.drawer-style{
  background: linear-gradient(0deg, rgba(255,155,249,1) 0%, rgba(0,237,255,1) 100%);

  .btn-style {
    margin-bottom: 10px;
    background-color: white;
    color: blue;
  }

}
</style>
