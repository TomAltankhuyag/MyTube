<template lang="pug">
.song-list
  .songs(v-for="(playlist, playlistIndex) in playlists")
    .song
      v-divider(v-if="playlistIndex !== 0")
      h3.name {{ playlist.name }}
    .controls
      v-chip(@click="onEdit(playlistIndex)" color="red") Edit
      v-btn(@click="onLoad(playlistIndex)") Load
  playlist-editor(:showModal="showEditModal"
                  :editMode="true"
                  :playlistId="selectedPlaylistId"
                  @on-close-modal="onCloseModal")
</template>
<script>
import { mapState } from 'pinia'
import { usePlaylistStore } from '../store/playlist'
import { VDivider, VBtn, VChip } from 'vuetify/components'
import PlaylistEditor from './PlaylistEditor.vue'
export default {
  components: {
    VDivider,
    VBtn,
    VChip,
    PlaylistEditor
  },
  data() {
    return {
      showEditModal: false,
      selectedPlaylistId: null
    }
  },
  computed: {
    ...mapState(usePlaylistStore, ['playlists'])
  },
  methods: {
    onEdit(playlistIndex) {
      this.selectedPlaylistId = playlistIndex
      this.showEditModal = true
    },
    onLoad(playlistIndex) {

      this.$store.playlist.loadPlaylist(playlistIndex)
    },
    onCloseModal(){
      this.showEditModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/flex';

.song-list {
  .songs {
    @include flex-row();
    font-size: 1rem;
    .song {
      width: 250px;
      min-height: 50px;
      .videoId {
        &.current {
          color: pink;
        }
      }

      .name {
        vertical-align: middle;
        // padding-top: 10px;
        &.current {
          color: pink;
        }
      }

      .controls {
        @include flex-row();
      }
    }
  }
}</style>
