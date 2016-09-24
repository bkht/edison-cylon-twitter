var gulp = require('gulp');
var Candyman = require('candyman');

var candyman = new Candyman({
    targetDevices: [
        { devicename: 'edison01', hostname: 'edison01.local' }
    ],
    projectName: 'tweetjacksoft',
    user: 'root',
    password: 'Vincent2014',
    startFile: 'app.js'
});

gulp.task('default', function(){
    console.log('running the default gulp task');
});

gulp.task('deploy', function(){
    console.log('running the deploy gulp task');
    return candyman.deploy();
});

gulp.task('watch', function(){
    console.log('running the watch gulp task');
    gulp.watch('./app.js', ['deploy']);
});
