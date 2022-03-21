const express = require('express');
const Artist = require('../models/Artist');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const auth = require("../middleware/auth");

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


router.post('/:id/publish', auth, async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (req.user.role === 'admin') {
            artist.is_published = true;
            artist.save();

            const query = {};
            if (req.user.role === 'user') {
                query.is_published = true
            }

            const artists = await Artist.find(query);
            return res.send(artists);
        }
        return res.status(403).send({message: 'No access!'});
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

router.delete('/:id', auth, async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            await Artist.deleteOne({_id : req.params.id});
            const query = {};
            if (req.user.role === 'user') {
                query.is_published = true
            }

            const artists = await Artist.find(query);
            return res.send(artists);
        }
        return res.status(403).send({message: 'No access!'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
