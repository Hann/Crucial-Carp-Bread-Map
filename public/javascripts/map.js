var map;
var marker;
var initialize = function() {
    var latlng = new google.maps.LatLng(
        37.4979496, 127.0276409 // gangnam station.
    );
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latlng = new google.maps.LatLng(
                position.coords.latitude, position.coords.longitude
            );
            map.setCenter(latlng);
            marker = new google.maps.Marker({
                position : latlng,
                map : map,
                draggable : false
            });
        })
    }
    var options = {
        zoom : 17,
        center : latlng,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), options);
};

var setMarker = function(info) {
    var data = info.data;
    for (var i = 0 ; i < data.length ; i++) {
        var m = new google.maps.Marker({
            position : new google.maps.LatLng(data[i].lat, data[i].lng),
            icon : '/images/boong-er.png',
            map : map
        });
        m.objid = data[i]._id;
        google.maps.event.addListener(m, 'click', function() {
            $.ajax({
                url : '/api/comment/' + this.objid,
                method : 'get',
                dataType : 'JSON',
                success : function(markerInfo) {
                    content( { 'name' : markerInfo.name, 'place' : markerInfo.place, 'id' : markerInfo.id });
                    comment( markerInfo.comment);
                    $('#comment-input').show();
                }

            });
        });
    }
};


// template
var content = function(info){
    $('#name').text(info.name).attr('data-id', info.id);
    $('#place').text(info.place);
}

var comment = function(info){
    $('#comment-wrap').html('');
    for (var i = 0 ; i < info.length ; i++){
        var template = '<li class="comment" >' +
            '<div class ="comment-content">' + info[i].comment + '</div>' +
            '<a class ="comment-delete"><i class="icon-remove"></i></a>'
            + '</li>';
        $('#comment-wrap').append(template);
    }
};


// load contents
$.ajax({
    url : '/api/coordinates/',
    type : 'get',
    success : setMarker,
    dataType : 'JSON'
});

