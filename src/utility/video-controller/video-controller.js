import {store} from '../../main'
// Use index


// This does NOT WORK below
// const store = app.config.globalProperties.$store.playlist.currentVideo

// payload - items
export function playVideoByInput(payload) {
  console.log(payload)
  const video = {
    name: payload.items[0].snippet.title,
    videoId: payload.items[0].id
  }

  store.playlist.changeCurrentVideoByVideo(video)
}

export function loadPlaylist(payload) {
  // TODO
}

export function queueSong(payload) {
  const videoId = payload.items[0].id
  const video = {
    name: payload.items[0].snippet.title,
    videoId: videoId
  }
  const duplicateVideo = store.playlist.getVideoById(videoId)

  if (duplicateVideo && Object.keys(duplicateVideo).length) {
    console.warn('Duplicate video!')
    return
  }
  store.playlist.addVideoToEnd(video)
}

export function removeSong(videoId) {
  // TODO
}

export function playNextVideo() {
  if (!store.playlist.currentPlaylist.length) {
    console.warn('empty playlist')
    return
  }

  const currentIndex = store.playlist.getCurrentIndex
  const currentVid = store.playlist.getCurrentVideo
  const newVid = store.playlist.getVideoByIndex(currentIndex)

  if (currentVid.videoId !== newVid.videoId) {
    store.playlist.changeVideoByIndex(currentIndex)
  } else {
    store.playlist.changeVideoByIndex(currentIndex + 1)

  }
}

