
    $(function() {
        var struct = "\
        +#黑洞 videos/Blackhole.mp4 点击开始>>\n\
        #点击开始>> videos/Blackhole.mp4 一节点 二节点 三节点 四节点\n\
        #一节点 videos/Blackhole.mp4,videos/long.mp4 结束\n\
        "
        var current = '黑洞'
        var once = false
        var CBARheight
        var video = $('#video')[0]

        function init() {
            $('.title').hide()
            $('#choices').hide()
            CBARheight = 40
        }
        init()

        setInterval(function() {
            if(video.readyState >= 3 && !once) {
                once = true
                vheight = $('#video').height()
                $('#video').css('height', vheight + 2 * CBARheight)
                $('#video').css('margin-top', - CBARheight)
                $('.title').css('top', vheight / 2 + CBARheight)
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

        function changeVideo(title) {
            idx = struct.search('#' + title)
            if(idx > 0 && struct[idx - 1] == '+') {$('.title').text(title)}
            else {$('.title').text('')}
            data = struct.substring(idx).split('\n')[0].split(' ')
            videolist = data[1].split(',')
            $('#video').attr('src', videolist[0])
            $('#choices tr').html('')
            for(let choice of data.slice(2)) {
                $('#choices tr').append('<td><a href="javascript:;" id="' + choice + '"><div class="choice">' + choice + '</div></a></td>')
            }
            $('#choices tr td a').click(function() {
                changeVideo($(this).attr('id'))
                init()
            })
        }
        changeVideo(current)
    })
