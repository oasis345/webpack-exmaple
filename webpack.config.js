const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: './app.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        assetModuleFilename: 'static/[name][ext]' //asset/resouce 폴더 위치지정 혹은 각 rules별로 generator로 위치생성가능
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    path.resolve('./my-webpack.loader.js')
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader' // 로더는 use시 뒤에부터 앞으로 처리됨
                ]
            },
            {
                test: /\.gif$/,
                type: 'asset/resource' // 파일을 별도의 폴더에 관리'
                // generator: {
                //     filename: 'static/[name][ext]', 
                // },
            },
            {
                test: /\.png$/,
                type: 'asset/inline'  //파일을 ata URI 형태로 번들(main.js)에 삽임됨
            },
            {
                test: /\.jpg$/,
                type: 'asset', //용량 크기가 1mb(default) 보다 작으면 inline 모듈로 처리되고(번들에 삽입), 그렇지 않으면 resource 모듈로 처리된다.
                parser: {
                    dataUrlCondition: {
                        maxSize: 1024 ** 2,
                    },
                }
            }
        ]
    }
}