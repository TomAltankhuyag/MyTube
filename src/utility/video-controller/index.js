/**
 *  Ideally the name 'utility' should be changed to 'controller'
 *  and migrate the youtube-video-validation.js to a differrnt folder
 */

import { playVideoByInput, queueSong, playNextVideo, playPreviousVideo } from "./video-controller"
import {controllerOptions } from "../../constants/constants"

export const videoController = {
  [controllerOptions.PLAY_NOW]: playVideoByInput,
  [controllerOptions.PLAY_NEXT]: playNextVideo,
  [controllerOptions.PLAY_PREVIOUS]: playPreviousVideo,
  [controllerOptions.QUEUE]: queueSong
}
