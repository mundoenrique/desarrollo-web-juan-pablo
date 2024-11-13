import fs from 'fs';
import path from 'path';
import * as sass from 'sass';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import terser from 'gulp-terser';
import { dest, src, watch, series, parallel } from 'gulp';

import { paths } from './gulp-help.js';

const { img, js, scss } = paths;

function buildCss(done) {
  try {
    if (!fs.existsSync(scss.dest)) {
      fs.mkdirSync(scss.dest, { recursive: true });
    }

    const result = sass.compile(scss.file, { style: 'compressed', sourceMap: true, sourceMapIncludeSources: true });
    const tempFilePath = path.join(scss.dest, 'app.css');
    fs.writeFileSync(tempFilePath, result.css);
  } catch (error) {
    console.error('Error compiling Sass:', error);
  }
  done();
}

function buildJs(done) {
  src(js.src)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(js.dest));
  done();
}

function imagenes() {
  return src(paths.imagenes)
    .pipe(cache(imagemin({ optimizationLevel: 3 })))
    .pipe(dest('build/img'))
    .pipe(notify('Imagen Completada'));
}

function versionWebp() {
  return src(paths.imagenes)
    .pipe(webp())
    .pipe(dest('build/img'))
    .pipe(notify({ message: 'Imagen Completada' }));
}

export function watchTask() {
  watch(scss.src, buildCss);
  watch(js.src, buildJs);
}

export default series(buildCss, buildJs, parallel(watchTask));
