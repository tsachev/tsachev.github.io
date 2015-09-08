'use strict';

var gulp = require('gulp');
require('gulp-poole')(gulp);
var git = require('gulp-git');


gulp.task('publish', ['build'], function () {
    git.clone('https://' + proecess.env.GH_TOKEN + '@github.com/tsachev/tsachev.github.io.git', {args: '.master'});
    gulp.src(['_site/**/*']).pipe(gulp.dest('.master'));
    git.exec({args: 'config user.email "tsachev@gmail.com"', log: true, cwd: '.master'});
    git.exec({args: 'config user.name "Vladimir Tsanev"', log: true, cwd: '.master'});


    //git add -A .
    //gulp.src(['.master/*']).pipe(git.add({cwd: '.master'}));
    git.exec({args: 'add -A .', log: true, cwd: '.master'});

    //git commit -a -m "Travis #$TRAVIS_BUILD_NUMBER"
    //git.commit('Travis $TRAVIS_BUILD_NUMBER', {cwd: '.master'});
    git.revParse({args: '--short HEAD'}, function (error, hash) {
        git.exec({args: 'commit -a -m "Travis #' + process.env.TRAVIS_BUILD_NUMBER + '('+hash+')"', log: true, cwd: '.master/'});
    });


    //git push --quiet origin master > /dev/null 2>&1

    git.push("origin", "master", {log:true, cwd: '.master/'});

});

gulp.task('default', [process.env.TRAVIS_PULL_REQUEST === 'true' ? 'build' : 'publish'], function () {

});