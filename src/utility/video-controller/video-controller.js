import {store} from '../../main'

export function playVideoByInput(payload) {
  const video = {
    name: payload.items[0].snippet.title,
    videoId: payload.items[0].id
  }

  store.playlist.changeCurrentVideoByVideo(video)
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

export function playNextVideo() {
  if (!store.playlist.currentPlaylist.length) {
    console.warn('empty playlist')
    return
  }
  const currentIndex = store.playlist.getCurrentIndex === -1 ? 0 : store.playlist.getCurrentIndex
  const currentVid = store.playlist.getCurrentVideo
  const newVid = store.playlist.getVideoByIndex(currentIndex)

  if (currentVid.videoId !== newVid.videoId) {
    store.playlist.changeVideoByIndex(currentIndex)
  } else {
    store.playlist.changeVideoByIndex(currentIndex + 1)
  }
}

export function playPreviousVideo() {
  if (!store.playlist.currentPlaylist.length) {
    console.warn('empty playlist')
    return
  }
  if (!store.playlist.currentPlaylist.length === 1) {
    console.warn('only one video in playlist')
    return
  }
  const currentIndex = store.playlist.getCurrentIndex
  if (currentIndex !== 0) {
    store.playlist.changeVideoByIndex(currentIndex - 1)
  }
}
