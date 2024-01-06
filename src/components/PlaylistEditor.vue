<template lang="pug">
v-dialog(width="500" v-model="isActive")
  v-card(title="Edit Playlist")
    v-text-field(label="Name" v-model="name")
    v-card-actions
      v-btn(v-if="editMode" text="Delete"
        @click="onDelete")
      v-btn(:text="confirmString"
      @click="onUpdate")
      v-btn(text="Close"
        @click="onClose")
</template>
<script>
import { VDialog, VBtn, VCard, VCardText, VCardActions, VTextField } from 'vuetify/components'

export default {
  emits: ['on-close-modal'],
  components: {
    VDialog,
    VCard,
    VBtn,
    VCardText,
    VCardActions,
    VTextField
  },
  data() {
    return {
      isActive: this.showModal,
      name: ''
    }
  },
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    playlistId: {
      type: Number,
      default: null
    }
  },
  computed: {
    selectedPlaylist() {
      return this.$store.playlist.playlists[this.playlistId]
    },
    confirmString() {
      return this.editMode ? 'Update' : 'Add'
    }
  },
  methods: {
    onClose() {
      this.$emit('on-close-modal')
    },
    onDelete(){

    },
    onUpdate(){
      if (this.name.length === 0) {
        return
      }
      if(this.editMode) {
        this.$store.playlist.updatePlaylistInfo(this.playlistId,this.name)
      } else {
        this.$store.playlist.addPlaylist(this.name)
      }
      this.name = ''
      this.$emit('on-close-modal')
    }
  },
  watch: {
    showModal() {
      this.isActive = this.showModal
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
