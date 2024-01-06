import { defineStore } from "pinia"
import getters from './getters'
import { actions } from './actions'
const state = {
  // set 'devMode' to true inside settings/index.js to utilize 'playlists'
  playlists: [
    {
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
    },
    {
      name: 'second playlist',
      playlist: [
        {
          videoId: '16y1AkoZkmQ',
          name: 'Rasputing'
        },
        {
          videoId: 'Qaar0K5ThcM',
          name: `Let's'nt stay the same`
        }, {
          videoId: 'pnjRMmrGEjU',
          name: 'Younger youuuuuuu'
        },
        {
          videoId: 'lxF31-mHLz0',
          name: 'Questions?'
        }]
    }
  ],
  currentPlaylist: [],
  currentVideo: {
    videoId: '',
    name: ''
  }
}

export const usePlaylistStore = defineStore('playlist', {
  state: () => state,
  getters,
  actions
})

