# MyTube
 This is a video player for YouTube videos.
 You can play, queue or add videos to the built-in playlist.

 Videos can be loaded by inputting the YouTube video's URL or video id.

 Additionally, youtube playlists can be loaded by inputting the Youtube playlist's URL or list id.
## App setup
*Note:* Ensure that the *node version* is between v9 and v18.

After cloning the repository, inside the directory you can run:
```
npm install
```
To avoid node-sass dependancy error, please run:
```
npm rebuild node-sass
```
Finally, the app can be ran by:
```
npm run app
```
By default you should be able to see a JJK video.

If you run into node-sass problems, try clearing your npm cache:
```
npm cache clean --force
```
Then run `npm install`, `npm rebuild node-sass` and run the app `npm run app`.
