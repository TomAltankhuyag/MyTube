import { YOUTUBE_API_CODES, MAX_PLAYLIST_ITEMS } from '../constants/constants'
import { YOUTUBE_API_KEY } from "../constants/api-key"

export function fetchVideoInformation(id = 'lxF31-mHLz0') {
  return new Promise((resolve) => {
    const videoID = id
    const request = new XMLHttpRequest()

    request.open('GET', 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id='
                 + videoID + '&key=' + YOUTUBE_API_KEY, true)

    request.onreadystatechange = () => {
      if (request.readyState === request.DONE) {
        const payload = onRequestReady(request)
        resolve(payload)
      }
    }

    request.send()
  })
}

export function fetchPlaylistInformation(id) {
  return new Promise((resolve) => {
    const playlistId = id
    const request = new XMLHttpRequest()

    request.open('GET', 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId='
                  + playlistId + '&key=' + YOUTUBE_API_KEY + '&maxResults=' + MAX_PLAYLIST_ITEMS, true)

    request.onreadystatechange = () => {
      if (request.readyState === request.DONE) {
        const payload = onRequestReady(request)
        resolve(payload)
      }
    }

    request.send()
  })
}

function onRequestReady(request) {
  if (!request || request.status < 200 || request.status >= 500) {
    return YOUTUBE_API_CODES.GOOGLE_ERROR
  }else if (request.status === 400) {
    return YOUTUBE_API_CODES.INVALID
  }

  const responseText = JSON.parse(request.responseText)

  if (responseText.items && responseText.items.length) {
    const payload = {
      status: YOUTUBE_API_CODES.VALID,
      items: responseText.items
    }
    return payload
  } else {
    return { status: YOUTUBE_API_CODES.INVALID }
  }
}
