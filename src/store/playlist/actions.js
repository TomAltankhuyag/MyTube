export const actions = {
  // set 'devMode' to true inside settings/index.js to use syncPlaylist
  syncPlaylist(index = 0) {
    if (this.playlists.length === 0) {
      console.warn('no playlists ):')
      return
    }
    // Initialize both user and hidden playlist
    this.currentPlaylist = [...this.playlists[index].playlist]

    if (!this.currentVideo.videoId) {
      const songIndex = getRandomInt(0, this.currentPlaylist.length)
      this.changeVideoByIndex(songIndex)
    }
  },
  setCurrentPlaylist(playlist) {
    this.currentPlaylist = playlist
  },
  clearPlaylist() {
    this.currentPlaylist = []
  },
  shuffleCurrentPlaylist() {
    this.currentPlaylist = shuffleArray(this.currentPlaylist)
  },
  changeVideoByIndex(index = 0) {
    let video
    if (this.currentPlaylist.length === 0) {
      console.warn('out of songs!')
      return
    }

    if (index < this.currentPlaylist.length) {
      video = this.currentPlaylist[index]
      this.currentIndex = index
    } else {
      video = this.currentPlaylist[0]
      this.currentIndex = 0
    }
    this.currentVideo = video
  },
  changeCurrentVideoByVideo(video) {
    if (!video || Object.keys(video).length === 0) {
      console.warn('no video provided')
    }
    this.currentVideo = video
  },
  removeVideoByVideoId(videoId) {
    const video = this.currentPlaylist.find(video => video.videoId === videoId)
    const index = this.currentPlaylist.indexOf(video)
    // Index is returned as -1 if no matching video is found
    if (index >= 0) {
      this.currentPlaylist.splice(index, 1)
    }
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
      const isDuplicateVideo = this.currentPlaylist.some((video) => {
        if (video.videoId === item.contentDetails.videoId) {
          return true
        }
      })
      if (!isDuplicateVideo) {
        const video = {}
        video.videoId = item.contentDetails.videoId
        video.name = item.snippet.title
        this.addVideoToEnd(video)
      }
    })
  }
}
// Helpers - thx chatgpt <3
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


