const express = require('express');
const Artist = require('../models/Artist');

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch(e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const artistData = req.body;
        const artist = new Artist(artistData);
        await artist.save();
        return res.send(artist);
    } catch(e) {
        next(e);
    }
});

module.exports = router;
