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
        image: 'drake.jpg',
        is_published: false
    }, {
        name: 'The Weeknd',
        info: 'The Weeknd без преувеличений можно назвать звездой современной эпохи, ведь он точно знает, как привлечь внимание к своему творчеству. Его песни становятся хитами, выступления — обсуждаемыми событиями, а выход нового альбома превращается в целое шоу, продуманное до мелочей. Все это принесло артисту любовь и уважение слушателей, которые с интересом следят за новостями его биографии.',
        image: 'theWeeknd.jpg',
        is_published: true
    });

   const [scorpion, nothingWasTheSame, starboy, afterHours, dawnFM] = await Album.create({
        title: 'Scorpion',
        artist: drake,
        release: '2018',
        image: 'scorpion.jpeg',
       is_published: false
   }, {
        title: 'Nothing Was the Same',
        artist: drake,
        release: '2013',
        image: 'nothingWastheSame.jpeg',
       is_published: true
   }, {
        title: 'Starboy',
        artist: theWeeknd,
        release: '2016',
        image: 'starboy.jpeg',
       is_published: true
   }, {
        title: 'After Hours',
        artist: theWeeknd,
        release: '2020',
        image: 'afterHours.jpeg',
       is_published: true
   }, {
        title: 'Dawn FM',
        artist: theWeeknd,
        release: '2022',
        image: 'dawnFM.jpeg',
       is_published: false
   });

    await Track.create({
        name: 'Survival',
        album: scorpion,
        duration: '2:16',
        is_published: false
    }, {
        name: 'God’s Plan',
        album: scorpion,
        duration: '3:19',
        is_published: true
    }, {
        name: 'Elevate',
        album: scorpion,
        duration: '3:05',
        is_published: false
    }, {
        name: 'Nonstop',
        album: scorpion,
        duration: '3:59',
        is_published: false
    }, {
        name: 'Emotionless',
        album: scorpion,
        duration: '5:02',
        is_published: false
    }, {
        name: "Hold On, We're Going Home",
        album: nothingWasTheSame,
        duration: '3:46',
        is_published: true
    }, {
        name: "Tuscan Leather",
        album: nothingWasTheSame,
        duration: '3:46',
        is_published: false
    }, {
        name: "Too Much",
        album: nothingWasTheSame,
        duration: '6:06',
        is_published: false
    }, {
        name: "Own It",
        album: nothingWasTheSame,
        duration: '4:12',
        is_published: false
    }, {
        name: "Come Thru",
        album: nothingWasTheSame,
        duration: '3:46',
        is_published: false
    }, {
        name: 'Starboy',
        album: starboy,
        duration: '3:50',
        is_published: true
    }, {
        name: 'False Alarm',
        album: starboy,
        duration: '3:40',
        is_published: false
    }, {
        name: "Rockin'",
        album: starboy,
        duration: '3:52',
        is_published: false
    }, {
        name: 'Reminder',
        album: starboy,
        duration: '3:38',
        is_published: false
    }, {
        name: 'Secrets',
        album: starboy,
        duration: '4:25',
        is_published: true
    }, {
        name: 'Blinding Lights',
        album: afterHours,
        duration: '3:23',
        is_published: true
    }, {
        name: 'Alone again',
        album: afterHours,
        duration: '4:10',
        is_published: false
    }, {
        name: 'Snowchild',
        album: afterHours,
        duration: '4:07',
        is_published: false
    }, {
        name: 'Too Late',
        album: afterHours,
        duration: '4:00',
        is_published: false
    }, {
        name: 'Save Your Tears',
        album: afterHours,
        duration: '3:36',
        is_published: true
    }, {
        name: 'Dawn FM',
        album: dawnFM,
        duration: '1:37',
        is_published: false
    }, {
        name: 'Gasoline',
        album: dawnFM,
        duration: '3:33',
        is_published: false
    }, {
        name: 'Sacrifice',
        album: dawnFM,
        duration: '3:09',
        is_published: true
    }, {
        name: 'Out Of Time',
        album: dawnFM,
        duration: '3:35',
        is_published: false
    }, {
        name: 'Take My Breath',
        album: dawnFM,
        duration: '3:33',
        is_published: true
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