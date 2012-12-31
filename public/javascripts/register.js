// map
var clickedMarker = null;
var placeMarker = function(location){
    console.log(clickedMarker);
    console.log(location);
    if (clickedMarker) {
        clickedMarker.setPosition(location);
    }
    else{
        clickedMarker = new google.maps.Marker({
            position : location,
            map : map
        });
    }
}


// others
var resize = function () {
    var $mapCanvas = $('#map-canvas');
    var width = $('.row-fluid>.span9').width();
    var height = width;
    if (window.innerWidth > 766){
        height = window.innerHeight - 160;
    }
    $mapCanvas.width(width);
    $mapCanvas.height(height);


};

window.onresize = resize;

$(document).ready(function() {
    initialize();
    resize();
    $('#register').addClass('active');
    google.maps.event.addListener(map, 'click', function(event){
        placeMarker(event.latLng);
    });

})

$('#regist').click(function() {
    var nameValid = $('#name').val() !== "";
    var placeValid = $('#place').val() !== "";

    if (confirm("확인해주세요. \n\n" +
        "1. 지도에 마커는 올바르게 표시했는지. \n" +
        "2. 이름은 잘 작성했는지. \n" +
        "3. 설명은 누가봐도 이해하도록 작성했는지. \n\n" +
        "모두 다 맞게 쓰셨다면 확인을 눌러주세요 :)")){
        if (!clickedMarker && nameValid && placeValid){
            var position = clickedMarker.getPosition();
            var lat = position.Ya;
            var lng = position.Za;

            $('#lat').val(lat);
            $('#lng').val(lng);
            $('form').submit();
        }
        else {
            alert("거짓말쟁이...");
            return false;
        }
    }
    else {
        return false;
    }
});
