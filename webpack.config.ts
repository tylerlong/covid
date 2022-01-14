/* eslint-disable node/no-unpublished-import */
import {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: './src/index.ts',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'COVID-19',
    }),
  ],
};

export default [config];
