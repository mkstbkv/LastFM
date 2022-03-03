const express = require('express');
const Track = require("../models/Track");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const query = {};

        if (req.query.album) {
            query.album = req.query.album;
        }
        const tracks = await Track.find(query).populate("album", "title artist");
        return res.send(tracks);
    } catch(e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const trackData = req.body;
        const track = new Track(trackData);
        await track.save();
        return res.send(track);
    } catch(e) {
        next(e);
    }
});

module.exports = router;