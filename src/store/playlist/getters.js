export default {
  getPlaylists: (state) => {
    return state.playlists
  },
  getFirstPlaylist: (state) => {
    return state.playlists[0].playlist
  },
  getCurrentVideo: (state) => {
    return state.currentVideo
  },
  getVideoById: (state) => {
    return (videoId) => {
      if (state.currentPlaylist.length === 0) {
        return {}
      }
      return state.currentPlaylist.find((video) => video.videoId === videoId)
    }
  },
  getCurrentIndex: (state) => {
    return  state.currentPlaylist.indexOf(state.currentVideo)
  },
  getVideoByIndex: (state) => {
    return (index) => {
      return state.currentPlaylist[index]
    }
  }

}
