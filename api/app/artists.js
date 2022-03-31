const express = require('express');
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Track = require('../models/Track');
const TrackHistory = require('../models/TrackHistory');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get("/", async (req, res, next) => {
    try {
        const role = req.get('Role');
        const query = {};
        if (role === 'user') {
            query.is_published = true
        }

        const artists = await Artist.find(query);
        return res.send(artists);
    } catch(e) {
        next(e);
    }
});


router.post('/:id/publish', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);
        artist.is_published = true;
        artist.save();
        return res.send({message: 'OK!'});
    } catch (e) {
        next(e);
    }
});

router.post("/", auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({message: 'Name is required'});
        }

        const artistData = {
            name: req.body.name,
            info: req.body.info,
            image: null,
            is_published: false
        };

        if (req.file) {
            artistData.image = req.file.filename;
        }

        if (req.user.role === 'admin') {
            artistData.is_published = true
        }

        const artist = new Artist(artistData);
        await artist.save();
        return res.send(artist);
    } catch(e) {
        next(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const albums = await Album.find({artist : req.params.id});
        await Artist.deleteOne({_id : req.params.id});
        await Album.deleteMany({artist : req.params.id});
        const tracks = await Track.find({album: {$in : albums}});
        await Track.deleteMany({album: {$in : albums}});
        await TrackHistory.deleteMany({track: {$in : tracks}});

        return res.send({message: 'OK!'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
