const mongoose = require('mongoose');
const config = require("./config");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");
const User = require("./models/User");
const TrackHistory = require("./models/TrackHistory");

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

   const [scorpion, nothingWasTheSame, starboy, afterHours, dawnFM] = await Album.create({
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

    const [survival, holdOnWereGoingHome, starboytrack, blindingLights, gasoline] = await Track.create({
        name: 'Survival',
        album: scorpion,
        duration: '2:16'
    }, {
        name: "Hold On, We're Going Home",
        album: nothingWasTheSame,
        duration: '3:46'
    }, {
        name: 'Starboy',
        album: starboy,
        duration: '3:50'
    }, {
        name: 'Blinding Lights',
        album: afterHours,
        duration: '3:23'
    }, {
        name: 'Gasoline',
        album: dawnFM,
        duration: '3:33'
    });

    const [john, jane] = await User.create({
        email: 'john@gmail.com',
        password: '123',
        displayName: 'John',
        token: '5enDI2paOqusPavVWOnwB'
    }, {
        email: 'jane@gmail.com',
        password: '321',
        displayName: 'Jane',
        token: '6enDI5paOpolPavTUOnwB'
    });

    await TrackHistory.create({
        user: john,
        track: starboytrack,
        datetime: '2022-02-22T17:50:43.775Z'
    }, {
        user: jane,
        track: holdOnWereGoingHome,
        datetime: '2022-03-03T17:50:43.775Z'
    })


    await mongoose.connection.close();
};

run().catch(e => console.error(e));