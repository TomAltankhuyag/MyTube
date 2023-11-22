import { usePlaylistStore } from "./playlist"
import { useSettingStore } from "./settings"

export default {
  install: (app, options) => {
    const playlist = usePlaylistStore()
    const setting = useSettingStore()
    const store = {
      playlist,
      setting
    }

    store.playlist.$subscribe((mutation, state) => {
      const currentPlaylist = state.currentPlaylist
      if (currentPlaylist.length !== 0) {
        localStorage.setItem('currentPlaylist', JSON.stringify(currentPlaylist))
      }
     })
    // Global store property
    app.config.globalProperties.$store = store
  }
}
