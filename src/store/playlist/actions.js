export const actions = {
  setCurrentPlaylist(playlist) {
    this.currentPlaylist = playlist
  },
  setPlaylists(playlists) {
    this.playlists = playlists
  },
  clearPlaylist() {
    this.currentPlaylist = []
  },
  shuffleCurrentPlaylist() {
    const video = this.currentVideo
    this.currentPlaylist = shuffleArray(this.currentPlaylist)
    if (video.name.length === 0) {
      return
    }
    const currentIndex = this.currentPlaylist.indexOf(video)
    if (currentIndex === -1) {
      return
    }
    const temp = this.currentPlaylist[0]
    this.currentPlaylist[0] = this.currentPlaylist[currentIndex]
    this.currentPlaylist[currentIndex] = temp

    this.changeVideoByIndex(0)
  },
  changeVideoByIndex(index) {
    if (this.currentPlaylist.length === 0) {
      console.warn('out of songs!')
      return
    }
    if (index < this.currentPlaylist.length) {
      this.currentVideo = this.currentPlaylist[index]
    } else {
      this.currentVideo = this.currentPlaylist[0]
    }
  },
  changeCurrentVideoByVideo(video) {
    if (!video || Object.keys(video).length === 0) {
      console.warn('no video provided')
    }
    this.currentVideo = video
  },
  removeVideoByVideoId(video) {
    // const video = this.currentPlaylist.find(video => video.videoId === videoId)
    const index = this.currentPlaylist.indexOf(video)
    // Index is returned as -1 if no matching video is found
    if (index >= 0) {
      this.currentPlaylist.splice(index, 1)
    }
  },
  removePlaylistById(playlistId) {
    this.playlists.splice(playlistId, 1)
  },
  addVideoToEnd(video) {
    const newVideo = {
      ...video
    }
    this.currentPlaylist = [...this.currentPlaylist, newVideo]
  },
  addVideoToFirst(video) {
    this.currentPlaylist = [video, ...this.currentPlaylist]
  },
  loadPlaylistWithPayload(payload) {
    payload.items.forEach((item) => {
      const isInvalidVideo = this.currentPlaylist.some(video => (
        video.videoId === item.contentDetails.videoId
      ))
      if (!isInvalidVideo) {
        const video = {
          videoId: item.contentDetails.videoId,
          name: item.snippet.title
        }
        if (video.name !== 'Private video' && video.name !== 'Deleted video') {
          this.addVideoToEnd(video)
        }
      }
    })
  },
  loadPlaylist(playlistIndex) {
    this.currentPlaylist = [...this.playlists[playlistIndex].playlist]
  },
  updatePlaylistInfo(playlistIndex, playlistName) {
    this.playlists[playlistIndex].name = playlistName
  },
  addPlaylist(playlistName) {
    const newPlaylist = {
      name: playlistName,
      playlist: [...this.currentPlaylist]
    }
    this.playlists = [...this.playlists, newPlaylist]
  }
}

//////// Helpers
// min - Inclusive
// max - Exclusive
function getRandomInt(min = 0, max) {
  if (!max) {
    console.warn('max warning')
  }
  return Math.floor(Math.random() * (max - min) + min)
}
function shuffleArray(arr) {
  const shuffledArray = [...arr]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    // Can't use destructuring here because it will cause some weird bug, so used a temp value instead
    // ie: referenceError: can't access j before initialization
    const tempValue = shuffledArray[j]
    shuffledArray[j] = shuffledArray[i]
    shuffledArray[i] = tempValue
  }
  return shuffledArray
}


