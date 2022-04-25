import { src, dest, watch, parallel, series } from 'gulp';
import del from 'del';
import path from 'path';
import fs from 'fs';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import notify from 'gulp-notify';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import include from 'gulp-include';
import plumber from 'gulp-plumber';
import sassGlob from 'gulp-sass-glob';
import livereload from 'gulp-livereload';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import rollupStream from '@rollup/stream';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

const sass = gulpSass(dartSass);

const folders = [];

const isFile = (pathItem) => {
  return !!path.extname(pathItem);
}

/** Set default theme base */
export const getFolders = done => {
  ['public_html/app/themes'].map(children => {
    return fs.readdirSync(children).forEach(child => {
      if (!isFile(child)) {
        return folders.push(`${children}/${child}/`)
      }
    });
  });
  done();
};

/** Directories */
const dirs = {
  styleSrc: 'assets/scss/',
  styleDest: '',

  scriptSrc: [
    'assets/lib/src/',
  ],

  scriptWatch: [
    'assets/lib/src/**/*',
  ],

  scriptDest: 'assets/lib/'
};

/** Sources */
const sources = {
  styles: '**/*.scss',
  scripts: '*.js'
};

let cache;

export const buildStyles = done => {
  return folders.map(folder => {
    const inputDir = `${folder}${dirs.styleSrc}${sources.styles}`;

    return src(inputDir)
      .pipe(plumber({
        errorHandler: notify.onError('Sass Error: <%= error.message %>')}
      ))
      .pipe(sassGlob())
      .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: false,
        includePaths: ['node_modules', inputDir],
        errLogToConsole: true
      }))
      .pipe(autoprefixer())
      .pipe(rename({ extname: '.css' }))
      .pipe(dest(`${folder}${dirs.styleDest}`))
      .pipe(livereload())
      .on('end', done);
  });
};

/** Compile front end scripts */
export const buildScripts = done => {
  return folders.map(folder => {
    const directories = dirs.scriptSrc.map(dir => `${folder}${dir}app.js`);
    const outputDir = `${folder}${dirs.scriptDest}`;

    return rollupStream({
      // Point to the entry file
      input: directories,

      // Apply plugins
      plugins: [
        babel({
          exclude: '**/node_modules/**',
          babelHelpers: 'runtime',
          plugins: [
            ['@babel/plugin-transform-runtime'],
          ]
        }),
        commonjs(),
        nodeResolve(),
        terser()
      ],

      // Use cache for better performance
      cache: cache,

      // Note: these options are placed at the root level in older versions of Rollup
      output: {
        // Output bundle is intended for use in browsers
        // (iife = "Immediately Invoked Function Expression")
        format: 'iife',

        // Show source code when debugging in browser
        sourcemap: true
      }
    })
      .on('bundle', function(bundle) {
        // Update cache data after every bundle is created
        cache = bundle;
      })
      // Name of the output file.
      .pipe(source('app.min.js'))
      .pipe(buffer())

      // The use of sourcemaps here might not be necessary, 
      // Gulp 4 has some native sourcemap support built in
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))

      // Where to send the output file
      .pipe(dest(outputDir))
      .pipe(livereload())
      .on('end', done);
  });
}

/** Clean */
export const clean = () => del(['build']);

/** Watch Task */
export const devWatch = done => {
  return folders.map(folder => {
    const styles = `${folder}${dirs.styleSrc}${sources.styles}`;
    const scripts = dirs.scriptWatch.map(dir => `${folder}${dir}${sources.scripts}`);

    livereload.listen();

    /**
     * Watch files:
     *
     * Example: `watch(filesToWatch, scriptToRun)`
     */
    watch(styles, buildStyles);
    watch(scripts, buildScripts);
    done();
  });
};

/** Development Task */
export const dev = series(clean, getFolders, parallel(buildStyles, buildScripts), devWatch);

/** Serve Task */
export const build = series(clean, getFolders, parallel(buildStyles, buildScripts));

/** Default task */
export default dev;
