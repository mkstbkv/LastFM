const express = require('express');
const Track = require("../models/Track");
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const role = req.get('Role');
        const query = {};

        if (role === 'user') {
            query.is_published = true
        }

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
        const album = await Album.findById(req.params.albumID);
        const artist = await Artist.findById(album.artist._id);

        const allTracks = await Track.find().populate(
            {
                path:  "album"  ,
                match: {
                    'artist':  album.artist._id
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

        return res.send({
            artist: artist,
            album: album,
            tracks: tracks
        });

    } catch(e) {
        next(e);
    }
});


router.post('/:id/publish', auth, async (req, res, next) => {
    try {
        const track = await Track.findById(req.params.id);
        const query = {album: track.album._id};
        if (req.user.role === 'admin') {
            track.is_published = true;
            track.save();
            if (req.user.role === 'user') {
                query.is_published = true
            }
            const tracks = await Track.find(query);
            return res.send(tracks);
        }

        return res.status(403).send({message: 'No access!'});
    } catch (e) {
        next(e);
    }
});


router.post("/",  auth, async (req, res, next) => {
    try {
        const trackData = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
            is_published: false
        };

        if (req.user.role === 'admin') {
            trackData.is_published = true
        }

        const track = new Track(trackData);
        await track.save();
        return res.send(track);
    } catch(e) {
        next(e);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    try {
        const track = await Track.findById(req.params.id);
        const query = {album: track.album._id};
        if (req.user.role === 'admin') {
            await Track.deleteOne(track);
            if (req.user.role === 'user') {
                query.is_published = true
            }
            const tracks = await Track.find(query);
            return res.send(tracks);
        }

        return res.status(403).send({message: 'No access!'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;