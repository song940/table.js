gulp    = require 'gulp'
umd     = require 'gulp-umd'
uglify  = require 'gulp-uglify'
rename  = require 'gulp-rename'

# default task
gulp.task 'default', [ 'build', 'watch' ]

# build source file to dest
gulp.task 'build', () ->
  gulp
    .src 'src/*.js'
    .pipe umd()
    .pipe gulp.dest('build/')
    .pipe uglify()
    .pipe rename(suffix: '.min')
    .pipe gulp.dest('build/')

# for development 
gulp.task 'watch', () ->
  gulp.watch 'src/*.js', [ 'build' ]
