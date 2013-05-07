require.config({
    paths: {
        "jquerymobile": "http://code.jquery.com/mobile/latest/jquery.mobile.min.js",
        "jquery": "http://code.jquery.com/jquery-1.7.2.min.js",
    }
});

requirejs(['jquery', 'canvas', 'app/sub'],
function ($, canvas, sub) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});