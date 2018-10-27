
// alert($.ajax({url:'/struct.txt',async:false}).responseText)
var struct = $.ajax({url:'/struct.txt',async:false}).responseText
// var struct = "\
// +#黑洞 videos/Blackhole.mp4 点击开始>>\n\
// #点击开始>> videos/Blackhole.mp4 一节点 二节点 三节点 四节点\n\
// #一节点 videos/Blackhole.mp4,videos/long.mp4 结束\n\
// "
var current = '黑洞'
