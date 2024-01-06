import { defineStore } from "pinia"
import getters from './getters'
import { actions } from './actions'
const state = {
  // set 'devMode' to true inside settings/index.js to utilize 'playlists'
  playlists: [
    {
      name: 'Welcome',
      playlist: [
        {
          videoId: 'KSbxm6wMcDI',
          name: 'My Way'
        },
        {
          videoId: 'G3qQtf7jahE',
          name: 'Comedy'
        },
        {
          videoId: 'yox2Yz4Ni2o',
          name: 'If I Am With You'
        },
        {
          videoId: 'nQJEp-k-ogs',
          name: 'pov'
        },
        {
          videoId: 'djc0YkawULk',
          name: 'Let You Go'
        },
        {
          videoId: 'AANdt8yJYck',
          name: 'Worry'
        },
        {
          videoId: 'WOcQiDaBodw',
          name: 'Daisies'
        }
      ]
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

