// player-handler.js
module.exports = async (data) => {
    if (data.type === 'playback-track-changed') {
        if (data.nextTrack) {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        TrackStore.title = track.title;
        TrackStore.artist = track.artist;
        TrackStore.artwork = track.artwork;
        }
    } else if(data.type == 'remote-play') {
        TrackPlayer.play()
    } else if(data.type == 'remote-pause') {
        TrackPlayer.pause()
    } else if(data.type == 'remote-next') {
        TrackPlayer.skipToNext()
    } else if(data.type == 'remote-previous') {
        TrackPlayer.skipToPrevious()
    } else if (data.type === 'playback-state') {
        PlayerStore.playbackState = data.state;
    }
      
};