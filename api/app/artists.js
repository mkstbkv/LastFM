const express = require('express');
const Artist = require('../models/Artist');
const Album = require("../models/Album");

const router = express.Router();

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
