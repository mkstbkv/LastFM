const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const auth = require("../middleware/auth");
const Album = require("../models/Album");

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

router.get('/', auth, async (req, res, next) => {
    try {
        const query = {};

        if (req.query.artist) {
            query.artist = req.query.artist;
        }

        if (req.user.role === 'user') {
            query.is_published = true
        }

        const albums = await Album.find(query).populate("artist", "name info image");

        return res.send(albums);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', auth, async (req, res, next) => {
    try {
        const query = {
            _id: req.params.id
        }
        if (req.user.role === 'user') {
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

module.exports = router;