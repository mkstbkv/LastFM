const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    info: String,
    image: String
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;