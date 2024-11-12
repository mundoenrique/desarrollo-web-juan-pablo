import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import terser from 'gulp-terser';
import sharp from 'sharp';

const sass = gulpSass(dartSass);
const paths = {
  js: 'src/js/**/*.js',
  scss: 'src/scss/**/*.scss',
  img: 'src/img/**/*.{png,jpg}',
};

export function js(done) {
  src('src/js/app.js').pipe(terser()).pipe(dest('build/js'));

  done();
}

export function css(done) {
  // const result = dartSass.compile('src/scss/app.scss', { style: 'compressed' });
  // console.log(result.css);
  src('src/scss/app.scss', { sourcemaps: true })
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    // .pipe(dest('build/css', { sourcemaps: true }));
    .pipe(dest('build/css', { sourcemaps: '.' }));
  done();
}

export async function crop(done) {
  const inputFolder = 'src/img/gallery/full';
  const outputFolder = 'src/img/gallery/thumb';
  const width = 250;
  const height = 180;

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const images = fs.readdirSync(inputFolder).filter((file) => {
    return /\.(jpg)$/i.test(path.extname(file));
  });

  try {
    await Promise.all(
      images.map((file) => {
        const inputFile = path.join(inputFolder, file);
        const outputFile = path.join(outputFolder, file);
        return sharp(inputFile).resize(width, height, { position: 'centre' }).toFile(outputFile);
      })
    );
    done();
  } catch (error) {
    console.error(error);
    done(error);
  }
}

export async function imagenes(done) {
  const srcDir = './src/img';
  const buildDir = './build/img';
  const images = await glob(`./${paths.img}`);

  try {
    await Promise.all(
      images.map((file) => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        return procesarImagenes(file, outputSubDir);
      })
    );
    done();
  } catch (error) {
    console.error(error);
    done(error);
  }
}

async function procesarImagenes(file, outputSubDir) {
  if (!fs.existsSync(outputSubDir)) {
    fs.mkdirSync(outputSubDir, { recursive: true });
  }
  const baseName = path.basename(file, path.extname(file));
  const extName = path.extname(file);
  const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
  const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);
  const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);

  const options = { quality: 80 };
  await Promise.all([
    sharp(file).jpeg(options).toFile(outputFile),
    sharp(file).webp(options).toFile(outputFileWebp),
    sharp(file).avif().toFile(outputFileAvif),
  ]);
}

export function dev() {
  watch(paths.scss, css);
  watch(paths.js, js);
  watch(paths.img, imagenes);
}

export default series(crop, js, css, imagenes, dev);
