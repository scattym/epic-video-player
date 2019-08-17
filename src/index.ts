import { IPlayerConfig } from './models';
import { PlayerDash } from './player-dash';
import { PlayerHls } from './player-hls';
import { PlayerNative } from './player-native';

export * from './models';
export * from './player';
export * from './player-hls';
export * from './player-dash';

export function newPlayer(url: string, laUrl: string, htmlVideo: HTMLVideoElement, config?: IPlayerConfig) {
  if (config && config.type) {
    if (config.type === 'application/dash+xml') {
      console.log("Using dash");
      return new PlayerDash(url, laUrl, htmlVideo, config);
    } else if (config.type === 'application/x-mpegURL') {
      return new PlayerHls(url, laUrl, htmlVideo, config);
    } else {
      return new PlayerNative(url, laUrl, htmlVideo, config);
    }
  } else {
    const filename = url.substr(url.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();

    if (extension === 'm3u8') {
      return new PlayerHls(url, laUrl, htmlVideo, config);
    } else if (extension === 'mpd') {
      console.log("Using dash");
      return new PlayerDash(url, laUrl, htmlVideo, config);
    } else {
      return new PlayerNative(url, laUrl, htmlVideo, config);
    }
  }
}
