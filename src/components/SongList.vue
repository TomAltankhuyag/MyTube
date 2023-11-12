<template lang="pug">
.song-list
   .songs(v-for="(song, id) in currentPlaylist")
    .song
      v-divider(v-if="id !== 0")
      .name(:class="{current: currentVideo.videoId === song.videoId}") {{ song.name }}
    .controls
      v-chip(@click="onDelete(song)" color="red").remove-button X
      v-btn(@click="onPlay(song)").play-button Play
</template>
<script>
import { mapState } from 'pinia'
import { usePlaylistStore } from '../store/playlist'
import { VDivider, VBtn, VChip } from 'vuetify/components'
export default {
  components: {
    VDivider,
    VBtn,
    VChip
  },
  computed: {
    ...mapState(usePlaylistStore, ['currentPlaylist', 'currentVideo', 'currentPlaylist'])
  },
  methods: {
    onDelete(song) {
      this.$store.playlist.removeVideoByVideoId(song.videoId)
    },
    onPlay(song) {
      this.$store.playlist.changeCurrentVideoByVideo(song)
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
