# Memory leak bare bones expo app example

This project aims to show how memory seems to never be freed after posting a file to an API as form data.

## How to run

- Clone this repo and install modules
- Go to `App.tsx` and change `VIDEO_ASSET_URI` constant to point to your folder with this file. The goal here is to point to `./assets/video-test.MOV` so it can be posted
  - note 1: This is necessary because I couldn't figure out how to get `__dirname` to work
  - note 2: We need a "big" file for this example to work, the video asset here is literally a 15s video of my carpet (so please disregard it) just so we have a 15mb file to use
- Run app `npm run ios`
- Shake the device and click "Show Performance Monitor" (so we can see the RAM usage)
- Click on "Post video" (the post itself fails, as it simply posts to localhost)
  - note 1: Behavior is the same if `fetch` is used
  - note 2: Behavior is the same if the post is successful (with a proper backend, not included in this project)
- Notice how RAM usage increases by the size of the video file (15mb) each time it is clicked. It'll increase until the app crashes, memory is never freed, even if `gc` is called

## Example

![Example gif](./simulator-example.gif)

## Expected behavior

Memory is freed after post happens.
