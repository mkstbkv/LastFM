const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const auth = require("../middleware/auth");
const Album = require("../models/Album");
const Track = require("../models/Track");
const permit = require("../middleware/permit");
const TrackHistory = require("../models/TrackHistory");

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

router.get('/', async (req, res, next) => {
    try {
        const role = req.get('Role');
        const query = {};

        if (role === 'user') {
            query.is_published = true
        }

        if (req.query.artist) {
            query.artist = req.query.artist;
        }

        const albums = await Album.find(query).populate("artist", "name info image");

        return res.send(albums);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const role = req.get('Role');
        const query = {_id: req.params.id};
        if (role === 'user') {
            query.is_published = true
        }
        const album = await Album.find(query).populate("artist", "name info image");

        if (!album) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(album);
    } catch (e) {
        next(e);
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);
        album.is_published = true;
        album.save();

        return res.send({message: 'OK!'});
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.release) {
            return res.status(400).send({message: 'Title and release are required'});
        }

        const albumData = {
            title: req.body.title,
            artist: req.body.artist,
            release: req.body.release,
            image: null,
            is_published: false
        };

        if (req.file) {
            albumData.image = req.file.filename;
        }

        if (req.user.role === 'admin') {
            albumData.is_published = true
        }

        const album = new Album(albumData);

        await album.save();

        return res.send({message: 'Created new album', id: album._id});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);
        await Album.deleteOne(album);
        const tracks = await Track.find({album: req.params.id});
        await Track.deleteMany({album: req.params.id});
        await TrackHistory.deleteMany({track: {$in : tracks}});
        return res.send({message: 'OK!'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;