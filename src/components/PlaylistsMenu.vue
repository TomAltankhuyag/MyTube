<template lang="pug">
v-layout
  v-navigation-drawer(v-model="drawer"
                      location="right"
                      disable-resize-watcher
                      width="380").drawer-style
    playlist-list
</template>

<script>
import { VNavigationDrawer, VLayout, VCard, VBtn} from 'vuetify/components'
import PlaylistList from './PlaylistList.vue'
export default {
  components: {
    VNavigationDrawer,
    VLayout,
    VCard,
    VBtn,
    PlaylistList
  },
  data() {
    return {
      drawer: this.isPlaylistsMenuOn
    }
  },
  props: {
    isPlaylistsMenuOn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  },
  watch: {
    isPlaylistsMenuOn() {
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
