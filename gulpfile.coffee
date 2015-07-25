gulp = require 'gulp'
jasmine = require 'gulp-jasmine'

gulp.task 'default', ->
  gulp.src('specs/*.coffee')
  .pipe do jasmine
