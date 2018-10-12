var gulp=require('gulp');
var minifyhtml=require('gulp-minify-html');
var minifycss=require('gulp-minify-css');
var gulpsass=require('gulp-sass');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var rename=require('gulp-rename');
var imagemin=require('gulp-imagemin');
//所有的监听一定是文件已经存在才能实现


//1.复制代码
/*gulp.task('copyhtml',function(){
	gulp.src('src/*.html')
	.pipe(gulp.dest('dist/'));
});


gulp.task('watchhtml',function(){
	gulp.watch('src/*.html',function(){//监听
		gulp.run('copyhtml');
	});
});*/

//2.压缩html--*****
gulp.task('uglifyhtml',function(){
	gulp.src('src/*.html')
	.pipe(minifyhtml())//执行html的压缩
	.pipe(gulp.dest('dist/'));
});



//3.sass的编译
gulp.task('sass',function(){
	gulp.src('src/sass/*.scss')
	.pipe(gulpsass())
	.pipe(gulp.dest('src/css/'));
});

gulp.task('uglifycss',function(){
	gulp.src('src/css/*.css')
	.pipe(minifycss())
	.pipe(gulp.dest('dist/css/'));
});

//4.js合并和压缩

gulp.task('optionjs',function(){
	gulp.src('src/script/js/*.js')
	.pipe(concat('all.js'))//文件的合并
	.pipe(gulp.dest('dist/script/js/'))//输出
	.pipe(rename('all.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/script/js/'));//输出
});


//5.复制第三方js插件


//6.图片压缩插件
gulp.task('runimg',function(){
	gulp.src('iamges/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/'));
});


//监听所有
gulp.task('default',function(){
	gulp.watch(['src/*.html','src/sass/*.scss','src/css/*.css','src/script/js/*.js','iamges/*'],['uglifyhtml','sass','uglifycss','optionjs','runimg']);
});



// gulp.task() : 创建gulp任务
// gulp.src() : 引入文件的目录
// gulp.dest() : 输出文件目录设置
// gulp.watch() : 监听
// gulp.run() : 执行 
// pipe() : 管道（流）