const mongoose = require('mongoose');
const config = require("./config");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");
const User = require("./models/User");
const {nanoid} = require("nanoid");


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
        release: '2022',
        image: 'dawnFM.jpeg'
    });

    await Track.create({
        name: 'Survival',
        album: scorpion,
        duration: '2:16'
    }, {
        name: 'God’s Plan',
        album: scorpion,
        duration: '3:19'
    }, {
        name: 'Elevate',
        album: scorpion,
        duration: '3:05'
    }, {
        name: 'Nonstop',
        album: scorpion,
        duration: '3:59'
    }, {
        name: 'Emotionless',
        album: scorpion,
        duration: '5:02'
    }, {
        name: "Hold On, We're Going Home",
        album: nothingWasTheSame,
        duration: '3:46'
    }, {
        name: "Tuscan Leather",
        album: nothingWasTheSame,
        duration: '3:46'
    }, {
        name: "Too Much",
        album: nothingWasTheSame,
        duration: '6:06'
    }, {
        name: "Own It",
        album: nothingWasTheSame,
        duration: '4:12'
    }, {
        name: "Come Thru",
        album: nothingWasTheSame,
        duration: '3:46'
    }, {
        name: 'Starboy',
        album: starboy,
        duration: '3:50'
    }, {
        name: 'False Alarm',
        album: starboy,
        duration: '3:40'
    }, {
        name: "Rockin'",
        album: starboy,
        duration: '3:52'
    }, {
        name: 'Reminder',
        album: starboy,
        duration: '3:38'
    }, {
        name: 'Secrets',
        album: starboy,
        duration: '4:25'
    }, {
        name: 'Blinding Lights',
        album: afterHours,
        duration: '3:23'
    }, {
        name: 'Alone again',
        album: afterHours,
        duration: '4:10'
    }, {
        name: 'Snowchild',
        album: afterHours,
        duration: '4:07'
    }, {
        name: 'Too Late',
        album: afterHours,
        duration: '4:00'
    }, {
        name: 'Save Your Tears',
        album: afterHours,
        duration: '3:36'
    }, {
        name: 'Dawn FM',
        album: dawnFM,
        duration: '1:37'
    }, {
        name: 'Gasoline',
        album: dawnFM,
        duration: '3:33'
    }, {
        name: 'Sacrifice',
        album: dawnFM,
        duration: '3:09'
    }, {
        name: 'Out Of Time',
        album: dawnFM,
        duration: '3:35'
    }, {
        name: 'Take My Breath',
        album: dawnFM,
        duration: '3:33'
    }, );

    await User.create({
        email: 'tugol@gmail.com',
        password: '123',
        displayName: 'John',
        token: nanoid(),
        role: 'user'
    }, {
        email: 'admin@gmail.com',
        password: '321',
        displayName: 'Admin',
        token: nanoid(),
        role: 'admin'
    });


    await mongoose.connection.close();
};

run().catch(e => console.error(e));