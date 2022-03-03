const express = require('express');
const auth = require("../middleware/auth");
const TrackHistory = require("../models/TrackHistory");
const mongoose = require("mongoose");

const router = express.Router();

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
            trackHistory.generateDatetime()
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
