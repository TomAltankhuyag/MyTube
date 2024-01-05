<template lang="pug">
v-dialog(width="500" v-model="isActive")
  v-card(title="some title")
    v-card-text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    v-card-actions
      v-btn(text="Close Dialog"
        @click="onClose")
</template>
<script>
import { VDialog, VBtn, VCard, VCardText, VCardActions } from 'vuetify/components'

export default {
  emits: ['on-close-modal'],
  components: {
    VDialog,
    VCard,
    VBtn,
    VCardText,
    VCardActions
  },
  data() {
    return {
      isActive: this.showModal
    }
  },
  props: {
    isEditMode: {
      type: Boolean,
      default: false
    },
    showModal: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    onClose() {
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
