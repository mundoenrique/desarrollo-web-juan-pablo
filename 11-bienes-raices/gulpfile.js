import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import * as sass from 'sass';
import { optimize } from 'svgo';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import sourcemaps from 'gulp-sourcemaps';
import { dest, src, watch, series, parallel } from 'gulp';

import { paths } from './gulp-help.js';

const { img, js, scss } = paths;

async function resizeImages(done) {
  const srcDir = 'src/img';

  const images = fs.readdirSync(srcDir, { recursive: true }).filter((file) => {
    return /\.(jpg|jpeg|png|svg)$/i.test(path.extname(file));
  });

  try {
    const promises = images.map(async (file) => {
      const extName = path.extname(file);
      const baseName = path.basename(file, extName);
      const inputFile = path.join(srcDir, file);
      const relativePath = path.relative(srcDir, path.dirname(inputFile));
      const outputSubDir = path.join(img.dest, relativePath);
      const outputFile = path.join(img.dest, file);
      const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);
      const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);

      if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true });
      }

      if (extName === '.svg') {
        const svgData = fs.readFileSync(inputFile, 'utf-8');
        const result = optimize(svgData, {
          path: inputFile,
          multipass: true,
          plugins: [
            { name: 'preset-default' },
            { name: 'removeDimensions' },
            // { name: 'removeAttrs', params: { attrs: '(stroke|fill)' } },
          ],
        });
        fs.writeFileSync(outputFile, result.data);
      } else {
        const options = { quality: 80, progressive: true, compressionLevel: 9 };
        await sharp(inputFile).jpeg(options).toFile(outputFile);
        await sharp(inputFile).webp(options).toFile(outputFileWebp);
        await sharp(inputFile).avif().toFile(outputFileAvif);
      }
    });

    await Promise.all(promises);
    console.log('Proceso completado.');
  } catch (error) {
    console.error(`Error al procesar la imagen ${file}:`, error);
    done(error);
  }

  done();
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

export function watchTask() {
  watch(scss.src, buildCss);
  watch(js.src, buildJs);
  watch(img.src, resizeImages);
}

export default series(resizeImages, parallel(buildCss, buildJs, watchTask));
