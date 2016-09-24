var Cylon = require('cylon');
var Twitter = require('twitter');
var config = require('./config');

//configure the Twitter module with our consumer and access keys
//obtain these by going to apps.twitter.com
var twitter = new Twitter({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token_key: config.twitter.accessTokenKey,
    access_token_secret: config.twitter.accessTokenSecret
});

var ON_DURATION = 2000;
var KEY_WORD = 'Jacksoft';

Cylon.robot({
    connections: {
        edison: { adaptor: 'intel-iot' }
    },

    devices: {
        led: { driver: 'led', pin: 13 }
    },

    work: function(my) {
        my.led.turnOff();
        twitter.stream('statuses/filter', { track: KEY_WORD }, function (stream) {
            stream.on('data', function (data) {
                console.log('tweet: ' + KEY_WORD);
                console.log(data.user.screen_name + ': ' + data.text);
                my.led.turnOn();
                setTimeout(function () {
                    my.led.turnOff();
                }, ON_DURATION)
            })
        })
    }
}).start();
