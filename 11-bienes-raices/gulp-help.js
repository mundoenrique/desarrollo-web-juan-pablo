export const paths = {
  img: {
    src: 'src/img/**/*',
    dest: 'build/img',
  },
  scss: {
    dest: './build/css',
    file: 'src/scss/app.scss',
    src: 'src/scss/**/*.scss',
  },
  js: {
    src: 'src/js/**/*.js',
    dest: './build/js',
  },
};

function css(done) {
  // const result = dartSass.compile('src/scss/app.scss', { style: 'compressed' });
  // console.log(result.css);
  src(paths.scss.src, { sourcemaps: true })
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest(paths.scss.dest, { sourcemaps: true }));
  // .pipe(dest('build/css', { sourcemaps: '.' }));
  done();
}
