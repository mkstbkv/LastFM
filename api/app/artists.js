const express = require('express');
const Artist = require('../models/Artist');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");

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
        const artists = await Artist.find();
        return res.send(artists);
    } catch(e) {
        next(e);
    }
});

router.post("/", upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({message: 'Name is required'});
        }

        const artistData = {
            name: req.body.name,
            info: req.body.info,
            image: null,
        };

        if (req.file) {
            artistData.image = req.file.filename;
        }


        const artist = new Artist(artistData);
        await artist.save();
        return res.send(artist);
    } catch(e) {
        next(e);
    }
});

module.exports = router;
