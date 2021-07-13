import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import license from 'rollup-plugin-license'

const pkg = require('./package.json')

const bannerContent = `
  Parvus

  @author ${pkg.author}
  @version ${pkg.version}
  @url ${pkg.homepage}

  ${pkg.license} license`

let rollupBuilds

/**
 * Build JavaScript
 *
 */
if (process.env.BUILDJS) {
  rollupBuilds = [{
    input: './src/js/parvus.js',
    output: [
      {
        format: 'umd',
        file: './dist/js/parvus.js',
        name: 'Parvus'
      },
      {
        format: 'es',
        file: './dist/js/parvus.esm.js',
        name: 'Parvus'
      },
      {
        format: 'umd',
        file: './dist/js/parvus.min.js',
        name: 'Parvus',
        plugins: [
          terser()
        ]
      },
      {
        format: 'es',
        file: './dist/js/parvus.esm.min.js',
        name: 'Parvus',
        plugins: [
          terser()
        ]
      }
    ],
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', {
            corejs: 3.15,
            useBuiltIns: 'usage'
          }]
        ]
      }),
      license({
        banner: {
          content: bannerContent
        }
      })
    ],
    watch: {
      clearScreen: false
    }
  }]
}

/**
 * Build CSS
 *
 */
if (process.env.BUILDCSS) {
  rollupBuilds = [{
    input: './src/scss/parvus.scss',
    output: [
      {
        file: './dist/css/parvus.css'
      }
    ],
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      postcss({
        extract: true
      }),
      license({
        banner: {
          content: bannerContent
        }
      })
    ],
    watch: {
      clearScreen: false
    }
  },
  {
    input: './src/scss/parvus.scss',
    output: [
      {
        file: './dist/css/parvus.min.css'
      }
    ],
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      postcss({
        extract: true,
        minimize: true
      }),
      license({
        banner: {
          content: bannerContent
        }
      })
    ],
    watch: {
      clearScreen: false
    }
  }]
}

export default rollupBuilds
