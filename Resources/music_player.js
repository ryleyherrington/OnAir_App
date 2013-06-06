(function() {

    var musicPlayer = {};

    musicPlayer.player = Titanium.Media.systemMusicPlayer;
   // Ti.API.debug("music player " +musicPlayer.player);

    // SETTING UP EVENT LISTENERS FOR THE AUDIO PLAYER
    /** ---------------------------------------------------------------------------
     *  handlePlayerPlaying
     * --------------------------------------------------------------------------- */
    musicPlayer.handlePlayerPlaying = function() {
        if (musicPlayer.player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
            //var infoText = musicPlayer.player.nowPlaying.artist + ' - ' + musicPlayer.player.nowPlaying.albumTitle;
            var infoText = musicPlayer.player.nowPlaying.title + ' by ' + musicPlayer.player.nowPlaying.artist;
            var titleText = musicPlayer.player.nowPlaying.title;

            // tell window to update UI with new music information
            Ti.App.fireEvent("app.updateNowPlaying", {
                "info" : infoText,
                "artist": musicPlayer.player.nowPlaying.artist,
                "title" : titleText
            });
        }
    };
    //
    //
    if ( musicPlayer.player != null ) {
        musicPlayer.player.addEventListener('stateChange', function() {
            if (musicPlayer.player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_STOPPED) {
                var infoText = '';
                var titleText = '';

                Ti.App.fireEvent("app.updateNowPlaying", {
                    "info" : infoText,
                    "title" : titleText
                });
            }
            musicPlayer.handlePlayerPlaying();

        });
        musicPlayer.player.addEventListener('playingChange', musicPlayer.handlePlayerPlaying);

        musicPlayer.player.addEventListener('volumeChange', function() {
            Ti.API.log('Volume change: '+musicPlayer.player.volume);
        });
    };
    /** ---------------------------------------------------------------------------
     *  plays the song
     * --------------------------------------------------------------------------- */
    musicPlayer.playMusic = function() {
       // musicPlayer.player.repeatMode = Titanium.Media.MUSIC_PLAYER_REPEAT_NONE;
        musicPlayer.player.play();
    };

    /** ---------------------------------------------------------------------------
     *  pauses the song
     * --------------------------------------------------------------------------- */
    musicPlayer.pauseMusic = function() {
        musicPlayer.player.pause();
    };

    /** ---------------------------------------------------------------------------
     *  skips to previous the song
     * --------------------------------------------------------------------------- */
    musicPlayer.skipBackMusic = function() {
        musicPlayer.player.skipToPrevious();
    };

    /** ---------------------------------------------------------------------------
     *  skips to next from the song
     * --------------------------------------------------------------------------- */
    musicPlayer.skipForwardMusic = function() {
        musicPlayer.player.skipToNext();
    };

    /** ---------------------------------------------------------------------------
     *  called to open picker and select music, will start playing when completed
     * --------------------------------------------------------------------------- */
    musicPlayer.selectMusicFromDevice = function() {
        var settings = {
            success: function(picked) {
                if (!settings.autohide) {
                    //Ti.API.log("You didn't autohide me!");
                    Ti.Media.hideMusicLibrary();
                }
                musicPlayer.player.setQueue(picked);
                musicPlayer.player.play();
            },
            error: function(error) {
                // create alert
                var a = Titanium.UI.createAlertDialog({
                    title:'Music Picker'
                });

                // set message
                if (error.code == Titanium.Media.NO_MUSIC_PLAYER) {
                    a.setMessage('Please run this test on device');
                } else {
                    a.setMessage('Unexpected error: ' + error.code);
                }

                // show alert
                a.show();
            },
            mediaTypes:[Ti.Media.MUSIC_MEDIA_TYPE_ALL],
            autohide:true
        };

        Ti.Media.openMusicLibrary(settings);
    };
    // SET in GLOBALNAMESPACE
    Ti.App.musicPlayer = musicPlayer;
})();

