/**
 *
 * HTML5 Audio player with playlist
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.script-tutorials.com/html5-audio-player-with-playlist/
 * Copyright 2012, Script Tutorials
 * http://www.script-tutorials.com/
 */

//jQuery(document).ready(function() {

    // inner variables
    var tracker = $('.tracker');
    var volume = $('.volume');
    var song;
    var songDuration;

    function initAudio(elem) {
        var url = elem.attr('audiourl');
        var title = elem.text();
        var cover = elem.attr('cover');
        var artist = elem.attr('artist');

        $('.player .title').text(title);
        $('.player .artist').text(artist);
        $('.player .cover').css('background-image', 'url(./public/images/' + cover + ')');

        song = new Audio('./public/mp3/' + url);

        song.addEventListener('ended', function() {
            $('.fwd').click();
        });

        // timeupdate event listener
        song.addEventListener('timeupdate', function() {
            var curtime = parseInt(song.currentTime, 10);
            tracker.slider('value', curtime);
        });

        $('.playlist li').removeClass('active');
        elem.addClass('active');
    }

    function playAudio() {
        song.play();
        tracker.slider("option", "max", song.duration);
        $('.play').addClass('hidden');
        $('.pause').addClass('visible');
    }

    function stopAudio() {
        song.pause();

        $('.play').removeClass('hidden');
        $('.pause').removeClass('visible');
    }

    // play click
    // $('.play').click(function(e) {
    //     e.preventDefault();
    //     playAudio();
    // });

    $('.play').on('click', function(e) {
        e.preventDefault();
        playAudio();
    })

    // pause click
    $('.pause').click(function(e) {
        e.preventDefault();
        stopAudio();
    });

    // forward click
    $('.fwd').click(function(e) {
        e.preventDefault();
        stopAudio();
        var next = $('.playlist li.active').next();
        if (next.length == 0) {
            next = $('.playlist li:first-child');
        }
        songDuration = song.duration;
        initAudio(next);
        playAudio();
        resetSlider();
    });

    // rewind click
    $('.rew').click(function(e) {
        e.preventDefault();
        stopAudio();
        var prev = $('.playlist li.active').prev();
        if (prev.length == 0) {
            prev = $('.playlist li:last-child');
        }
        songDuration = song.duration;
        initAudio(prev);
        playAudio();
        resetSlider();
    });
    
    function resetSlider(){
        setTimeout(function(){
            resetTimeout(songDuration);
        },500);
    }
    
    function resetTimeout(duration){
        if(duration!=song.duration && duration!='NaN' && duration!='undefined'){
            tracker.slider("option", "max", song.duration);
            return;
        }
        resetSlider();
    }
    var resetSlider = setInterval(function(){
        tracker.slider("option", "max", song.duration);
    },5000);


    // show playlist
    $('.pl').click(function(e) {
        e.preventDefault();
        $('.playlist').toggleClass('playlist_show');
    });

    // playlist elements - click
    $('.playlist li').click(function() {
        stopAudio();
        initAudio($(this));
        playAudio();
    });

    // initialization - first element in playlist
    initAudio($('.playlist li:first-child'));

    // set volume
    song.volume = 1;

    // initialize the volume slider
    volume.slider({
        range: 'min',
        min: 1,
        max: 100,
        value: 100,
        start: function(event, ui) {},
        slide: function(event, ui) {
            song.volume = ui.value / 100;
        },
        stop: function(event, ui) {}
    });

    // empty tracker slider
    tracker.slider({
        range: 'min',
        min: 0,
        max: 10,
        start: function(event, ui) {},
        slide: function(event, ui) {
            song.currentTime = ui.value;
        },
        stop: function(event, ui) {}
    });
//});

window.onload = function () {
    $('.play').click();
}