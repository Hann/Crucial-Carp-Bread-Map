var resize = function () {
    var $mapCanvas = $('#map-canvas');
    var width = $('.row-fluid>.span9').width();
    var height = width;
    if (window.innerWidth > 766){
        height = window.innerHeight - 100;
    }
    $mapCanvas.width(width);
    $mapCanvas.height(height);
};
window.onresize = resize;

$(document).ready(function() {
    initialize();
    resize();
    $('#comment-input').hide();
    $('#regist').click(function() {
        var comment = $('#write').val();
        var password = $('#password').val();
        var template = '<li class="comment" >' +
            '<div class ="comment-content">' + comment + '</div>' +
            '<a class ="comment-delete"><i class="icon-remove"></i></a>'+
            '</li>';
        $('#comment-wrap').append(template);
        var id = $('#name').attr('data-id');
        $.ajax({
            url : '/api/comment/' + id,
            data : {
                comment : comment,
                password : password
            },
            type : 'POST',
            success : function() {
                alert('등록이 완료되었습니다.');
            },
            error : function(err) {
                console.log(err);
                alert('실패했네요ㅠㅠ 다시해주세요ㅠㅠ');
            }
        });
    });
});


