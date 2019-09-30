import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    sid: String,
    name: String,
    artistName: String,
    previewUrl: String,
    coverImage: String
});

export default mongoose.model('Song', SongSchema);