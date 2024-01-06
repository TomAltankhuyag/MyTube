<template lang="pug">
.playlist-editor
  v-dialog(width='500' v-model="isActive")
    v-card(title='Edit Playlist')
      v-text-field(label='Name' v-model="name")
      v-card-actions
        v-btn(v-if="editMode"
              text='Delete'
              color='red'
              @click="onDelete")
        v-btn(:text="confirmString"
              color='blue'
              @click="onUpdate"
              :disabled="isEmptyString")
        v-btn(text='Close'
              @click="onClose")
  v-dialog(width='500' v-model="showConfirmDelete")
    v-card(title='Confirm Delete')
      v-card-text Are you sure you want to delete this playlist?
      v-card-actions
        v-btn(text='Delete'
              @click="onConfirmDelete"
              color='red')
        v-btn(text='Cancel'
              @click="onCancelDelete")
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
      name: '',
      showConfirmDelete: false
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
    },
    isEmptyString(){
      return this.name.length === 0
    }
  },
  methods: {
    onClose() {
      this.$emit('on-close-modal')
    },
    onDelete(){
      this.showConfirmDelete = true
    },
    onConfirmDelete(){
      this.showConfirmDelete = false
      this.$store.playlist.removePlaylistById(this.playlistId)
      this.$emit('on-close-modal')
    },
    onCancelDelete(){
      this.showConfirmDelete = false
    },
    onUpdate(){
      if (this.isEmptyString) {
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
