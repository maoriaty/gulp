var gulp = require('gulp'),
concat = require('gulp-concat'),
miniCss = require('gulp-minify-css'),
miniJs = require('gulp-uglify'),
miniImg = require('gulp-imagemin'),
miniHtml = require('gulp-htmlmin'),
rename = require('gulp-rename'),
del = require('del');

//压缩css
gulp.task('miniCss',function(){
	gulp.src('src/*.css').pipe(miniCss()).pipe(rename({suffix:'.min'})).pipe(gulp.dest('dest'));
})
//压缩js
gulp.task('miniJs',function(){
	gulp.src('src/*.js').pipe(miniJs()).pipe(rename({suffix:'.min'})).pipe(gulp.dest('dest'));
})
//压缩图片
gulp.task('miniImgJpg',['clean'],function(){
	gulp.src('src/*.jpg').pipe(miniImg()).pipe(gulp.dest('dest'));
})
gulp.task('miniImgPng',['clean'],function(){
	gulp.src('src/*.png').pipe(miniImg()).pipe(gulp.dest('dest'));
})
gulp.task('miniImgGif',['clean'],function(){
	gulp.src('src/*.gif').pipe(miniImg()).pipe(gulp.dest('dest'));
})
gulp.task('miniImg',['clean'],function(){
	gulp.start('miniImgJpg','miniImgPng','miniImgGif');
})
//压缩html
gulp.task('miniHtml',['clean'],function(){
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
	gulp.src('src/*.html').pipe(miniHtml(options)).pipe(gulp.dest('dest'));
})
//clean
gulp.task('clean',function(){
	del('dest/*');
})
//合并压缩css
gulp.task('concatCss',function(){
	gulp.src('src/*.css').pipe(concat('main.css')).pipe(miniCss()).pipe(rename({suffix:'.min'})).pipe(gulp.dest('dest'));
})
//合并压缩Js
gulp.task('concatJs',function(){
	gulp.src('src/*.js').pipe(concat('main.js')).pipe(miniJs()).pipe(rename({suffix:'.min'})).pipe(gulp.dest('dest'));
})

gulp.task('concat',function(){
	gulp.start('concatCss','concatJs');
})
gulp.task('default',['clean'],function(){
	gulp.start('miniCss','miniJs');
})
