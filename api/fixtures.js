const mongoose = require('mongoose');
const config = require("./config");
const Artist = require("./models/Artist");
const Album = require("./models/Album");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [drake, theWeeknd] = await Artist.create({
        name: 'Drake',
        info: 'Самый успешный рэпер за всю историю хип-хопа, Дрейк начал свою карьеру с выпуска микстейпов. Всего за несколько лет обычный канадский парень стал рэп-идолом, собрал ворох престижных наград и вошёл в топ самых влиятельных музыкантов мира.',
        image: 'drake.jpg'
    }, {
        name: 'The Weeknd',
        info: 'The Weeknd без преувеличений можно назвать звездой современной эпохи, ведь он точно знает, как привлечь внимание к своему творчеству. Его песни становятся хитами, выступления — обсуждаемыми событиями, а выход нового альбома превращается в целое шоу, продуманное до мелочей. Все это принесло артисту любовь и уважение слушателей, которые с интересом следят за новостями его биографии.',
        image: 'theWeeknd.jpg'
    });

    await Album.create({
        title: 'Scorpion',
        artist: drake,
        release: '2018',
        image: 'scorpion.jpeg'
    }, {
        title: 'Nothing Was the Same',
        artist: drake,
        release: '2013',
        image: 'nothingWastheSame.jpeg'
    }, {
        title: 'Starboy',
        artist: theWeeknd,
        release: '2016',
        image: 'starboy.jpeg'
    }, {
        title: 'After Hours',
        artist: theWeeknd,
        release: '2020',
        image: 'afterHours.jpeg'
    }, {
        title: 'Dawn FM',
        artist: theWeeknd,
        release: '20222',
        image: 'dawnFM.jpeg'
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));