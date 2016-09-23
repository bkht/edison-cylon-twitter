var Cylon = require('cylon');

Cylon.robot({
    connections: {
        edison: { adaptor: 'intel-iot' }
    },

    devices: {
        led: { driver: 'led', pin: 13 }
    },

    work: function(my) {
        every((0.5).second(), my.led.toggle);
    }
}).start();
