import type { Configuration as WebpackConfig } from 'webpack';

const config = {
    webpack: {
        configure: (webpackConfig: WebpackConfig) => {
            webpackConfig.resolve = {
                ...(webpackConfig.resolve || {}),
                fallback: {
                    ...(webpackConfig.resolve?.fallback || {}),
                    crypto: false,
                },
            };
            return webpackConfig;
        },
    },
};

export default config;
