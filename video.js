
    $(function() {
        var once = false
        var CBARheight
        var video = $('#video')[0]

        function init() {
            $('.title').hide()
            $('#choices').hide()
            $('#play').hide()
            CBARheight = 40
        }
        init()

        var struct = $.ajax({url:'https://namestory.github.io/struct.txt',async:false}).responseText
        line1end = struct.search('\n')
        var firstnode = struct.slice(0, line1end)
        struct = struct.slice(line1end + 1)
        var story = $.ajax({url:'https://namestory.github.io/story.txt',async:false}).responseText

        setInterval(function() {
            if(video.readyState >= 3 && !once) {
                once = true
                vheight = $('#video').height()
                $('#video').css('height', vheight + 2 * CBARheight)
                $('#video').css('margin-top', - CBARheight)
                $('.title').css('top', vheight / 2 + CBARheight)
                $('#play').css('top', vheight / 2)
                $('#choices').css('top', vheight - 2 * CBARheight)
            }
            if(video.currentTime > 2 && $('.title').is(':hidden')) {
                $('.title').fadeIn(2000)
            }
            if(video.currentTime == video.duration) {
                if(!video.paused) {video.pause()}
                if(videolist.length > 0) {
                    videolist = videolist.slice(1)
                    $('#video').attr('src', videolist[0])
                    if(videolist.length > 0) {video.play()}
                    return
                }
                $('#choices').fadeIn()
            }
            // wp = video[0].currentTime * 100 / video[0].duration
            // $('#prog').attr('style', 'width:' + wp + '%')
        }, 100)

        $('#video').bind('play', function(){
    		 $('#play').fadeOut()
    	})

        function changeVideo(title) {
            idx = struct.search('#' + title)
            if(idx > 0 && struct[idx - 1] == '+') {$('.title').text(title)}
            else {$('.title').text('')}
            if(idx < 0) {return}
            data = struct.substring(idx).split('\n')[0].split('\t')
            videolist = data[1].split(',')
            $('#video').attr('src', videolist[0])
            if(title != firstnode) {$('#play').fadeIn()}
            $('#choices tr').html('')
            for(let choice of data.slice(2)) {
                $('#choices tr').append('<td><a href="javascript:;" id="' + choice + '"><div class="choice">' + choice + '</div></a></td>')
            }
            $('#choices tr td a').click(function() {
                init()
                changeVideo($(this).attr('id'))
                $('#play').fadeOut()
                video.play()
            })
        }
        changeVideo(firstnode)
    })
