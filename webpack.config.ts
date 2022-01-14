/* eslint-disable node/no-unpublished-import */
import {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const config: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.join(__dirname, 'docs'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'COVID-19',
    }),
  ],
};

export default [config];
