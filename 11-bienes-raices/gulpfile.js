import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { optimize } from 'svgo';

import * as sass from 'sass';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import sourcemaps from 'gulp-sourcemaps';
import { dest, src, watch, series, parallel } from 'gulp';

import { paths } from './gulp-help.js';

const { img, js, scss } = paths;

export async function imagesOptimize(done) {
  const inputFolder = 'src/img';
  const outputFolder = 'build/img/';
  const width = 250;
  const height = 180;

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const images = fs.readdirSync(inputFolder).filter((file) => {
    return /\.(jpg|jpeg|png)$/i.test(path.extname(file));
  });

  const svg = fs.readdirSync(inputFolder).filter((file) => {
    return /\.(svg)$/i.test(path.extname(file));
  });

  try {
    for (const file of images) {
      const inputFile = path.join(inputFolder, file);
      const outputFile = path.join(outputFolder, file);
      console.log(`Procesando ${file}...`);
      await sharp(inputFile).resize(width, height, { position: 'centre' }).toFile(outputFile);
    }

    svg.forEach((file) => {
      const inputFile = path.join(inputFolder, file);
      const outputFile = path.join(outputFolder, file);
      const svgData = fs.readFileSync(inputFile, 'utf-8');
      const result = optimize(svgData, { path: inputFile });
      fs.writeFileSync(outputFile, result.data);
      console.log(`Optimizado ${file}`);
    });

    console.log('Proceso completado.');

    done();
  } catch (error) {
    console.error('Error al procesar las imágenes:', error);
    done(error);
  }
}

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

export default series(imagesOptimize, buildCss, buildJs, parallel(watchTask));
