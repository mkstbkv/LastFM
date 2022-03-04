const express = require('express');
const Track = require("../models/Track");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const query = {};

        if (req.query.album) {
            query.album = req.query.album;
        }

        if (req.query.artist) {
            const allTracks = await Track.find().populate(
                {
                    path:  "album"  ,
                    match: {
                        'artist':  req.query.artist
                    } ,
                    populate: {
                        path:  'artist',
                        select: 'name'
                    }
                }
            );

            const tracks = [];

            for (const tracksKey of allTracks) {
                if (tracksKey.album !== null) {
                    tracks.push(tracksKey)
                }
            }

            return res.send(tracks);

        }

        const tracks = await Track.find(query).populate("album", "title artist");
        return res.send(tracks);
    } catch(e) {
        next(e);
    }
});

router.get("/byAlbum/:albumID", async (req, res, next) => {
    try {
        const allTracks = await Track.find().populate(
            {
                path:  "album"  ,
                match: {
                    'artist':  req.query.artist
                } ,
                populate: {
                    path:  'artist',
                    select: 'name'
                }
            }
        );

        const tracks = [];

        for (const tracksKey of allTracks) {
            if (tracksKey.album !== null) {
                tracks.push(tracksKey)
            }
        }
        const album = await Album.findById(req.params.albumID);
        const artist = await Artist.findById(album.artist._id);


        return res.send({
            artist: artist,
            album: album,
            tracks: tracks
        });

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