import { defineStore } from "pinia"
import getters from './getters'
import { actions } from './actions'
const state = {
  // set 'devMode' to true inside settings/index.js to utilize 'playlists'
  playlists: [
    {
      id: 1,
      name: 'first playlist',
      playlist: [
        {
          videoId: '16y1AkoZkmQ',
          name: 'Rasputin'
        },
        {
          videoId: 'Qaar0K5ThcM',
          name: `Let's stay the same`
        }, {
          videoId: 'pnjRMmrGEjU',
          name: 'Younger you'
        },
        {
          videoId: 'lxF31-mHLz0',
          name: 'Questions'
        }]
    }
  ],
  currentPlaylist: [],
  currentVideo: {
    videoId: '',
    name: ''
  },
  currentIndex: 0
}

export const usePlaylistStore = defineStore('playlist', {
  state: () => state,
  getters,
  actions
})

