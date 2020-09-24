$(document).ready(function() {
    $('#ann_added_frame').on('click', '#icon_liuyan', function(e) {
		e.preventDefault();
		$('#myModal').show();
    });

    // var msg_arr = ['#mb1', '#mb2', '#mb3', '#mb4', '#mb5'];

    $('.modal-footer').on('click', '#msg_sbm', function(e) {
        e.preventDefault();
        let data = $('#msg_data').val();
        let update_url = '/api/liuyan';
        $.post(update_url, {"msg": data}, function(resp) {
            // do nothing
        });
        $('#myModal').hide();
        let fresh_url = '/api/getallmessage';
        $.get(fresh_url, function(resp) {
            fillMsg(resp);
        });
    });

    $('.modal-footer').on('click', '.btn-default', function(e){
	e.preventDefault();
	$('#myModal').hide();
	});

    var fillMsg = function(arr) {
        let l = arr.length;
        let $b = $('#message_borad');
	$b.html('');
        for(let i=0;i<l;i++) {
            let $div = $('<div></div>');
            $div.html(arr[i]);
            $b.append($div);
        }
    };

    var getMsg = function() {
        let url = '/api/getallmessage';
        $.get(url, function(resp) {
            fillMsg(resp);
        });
    };

    getMsg();
});
