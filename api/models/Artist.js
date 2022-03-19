const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    info: String,
    image: String,
    is_published: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;