import { EMPTY, VIDEO_ID_SIZE, WWW, HTTPS } from "../constants/constants"

/**
 * @param {String} chosenString - Can be a URL or just the video Id itself
 * @returns - returns the videoId if its a youtube url,
 *          - returns the string if its a non-url and matches 11 characters,
 *          - returns '' otherwise
 */
export function videoIdParser(chosenString) {
  if (hasNonYoutubeTopLevelDomain(chosenString)) {
    return EMPTY
  }
  if (!hasYoutubeTopLevelDomain(chosenString)) {
    return chosenString.length === VIDEO_ID_SIZE ? chosenString : EMPTY
  }

  const isValid = isValidYoutubeUrl(chosenString).then(isValid => { return isValid }).catch(e => {
    console.error(e)
  })

  if (!isValid) {
    return EMPTY
  }

  const videoId = getVideoIdParam(chosenString)
  return videoId
}

export function playlistIdParser(chosenString) {
  if (hasNonYoutubeTopLevelDomain(chosenString)) {
    return EMPTY
  }
  if (!hasYoutubeTopLevelDomain(chosenString)) {
    return chosenString.length > 25 ? chosenString : EMPTY
  }
  const isValid = isValidYoutubeUrl(chosenString).then(isValid => { return isValid }).catch(e => {
    console.error(e)
  })

  if (!isValid) {
    return EMPTY
  }

  const playlistId = getListIdParam(chosenString)
  return playlistId
}
function getListIdParam(urlString) {
  let url = urlString
  if (!url.includes(WWW)) {
    url = WWW + url
  }
  if (!url.includes(HTTPS)) {
    url = HTTPS + url
  }
  const params = new URL(url).searchParams

  const playlistId = params.get('list')
  return playlistId
}

function getVideoIdParam(urlString) {
  let url = urlString
  if (!url.includes(WWW)) {
    url = WWW + url
  }
  if (!url.includes(HTTPS)) {
    url = HTTPS + url
  }
  const params = new URL(url).searchParams

  const videoId = params.get('v')
  return videoId
}

async function isValidYoutubeUrl(urlString) {
  try {
    const shift = urlString.includes(WWW) ? urlString.indexOf(WWW) + WWW.length : 0
    let youtubeUrl = urlString.substring(shift, urlString.indexOf('/', shift))

    const filterStrings = ['youtube.com', 'm.youtube.com', 'youtu.be']

    if (!youtubeUrl.includes(HTTPS)) {
      youtubeUrl = HTTPS + youtubeUrl
    }

    const youtubeURLObject = new URL(youtubeUrl)
    const hostname = youtubeURLObject.hostname
    let isValidUrl = false

    filterStrings.every((domainName) => {
      if (hostname === domainName) {
        isValidUrl = true
        return false
      }
    })
    return isValidUrl
  } catch (e) {
    return false
  }
}

function hasNonYoutubeTopLevelDomain(string) {
  return string.includes('.ca') || string.includes('.net') || string.includes('.gg')
  || string.includes('.txt') || string.includes('.gov') || string.includes('.io') || string.includes('.org')
  || string.includes('.us')
}

function hasYoutubeTopLevelDomain(string) {
  return string.includes('.com') || string.includes('.be')
}
