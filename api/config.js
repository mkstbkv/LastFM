const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/musics',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '1096804630896531',
        appSecret: '02abfa66728f46a1a630f356337885b7'
    }
};