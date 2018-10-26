
    $(function() {
        $('.title').hide()
        $('#choices').hide()
        $('#video').attr('autoplay')
        $('#video').attr('src', 'long.mp4')
        var video = $('#video')[0]
        setInterval(function() {
            // if(video[0].readyState >= 3 && !once) {
            //     once = true;
            //     $('#video').attr('style', 'margin-top: ' + ($('#videocrop').height() - $('#video').height()) / 2);
            //     // $('#prog').attr('style', 'margin-top: ' + $('#video').height() / 2);
            // }
            if(video.currentTime > 2 && $('.title').is(':hidden')) {
                $('.title').fadeIn(2000)
            }
            if(video.currentTime == video.duration) {
                if(!video.paused) {video.pause()}
                $('#choices').fadeIn()
            }
            // wp = video[0].currentTime * 100 / video[0].duration
            // $('#prog').attr('style', 'width:' + wp + '%')
        }, 100)
    })
