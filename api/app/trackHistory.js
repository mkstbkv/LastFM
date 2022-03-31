const express = require('express');
const auth = require("../middleware/auth");
const TrackHistory = require("../models/TrackHistory");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
    try {
        const tracksHistory = await TrackHistory
            .find({user: req.user._id})
            .sort({_id: -1})
            .populate({
                path:  "track"  ,
                select: 'name',
                populate: {
                    path:  'album',
                    select: 'artist',
                    populate: {
                        path: 'artist',
                        select: 'name',
                    }
                }
            })
        return res.send(tracksHistory);
    } catch(e) {
        next(e);
    }
});

router.post('/', auth, async (req, res, next) => {
    try {
        try {
            if (!req.body.track) {
                return res.status(400).send({message: 'TrackID is required'});
            }

            const trackHistoryData = {
                user: req.user._id,
                track: req.body.track,
            };

            const trackHistory = new TrackHistory(trackHistoryData);
            trackHistory.generateDatetime();
            await trackHistory.save();

            return res.send(trackHistory);
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(error);
            }
            return next(error);
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
