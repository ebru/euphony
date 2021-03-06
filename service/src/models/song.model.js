import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const songSchema = new Schema({
    sid: {
        type: String,
        unique: true
    },
    name: String,
    artistName: String,
    previewUrl: String,
    coverImage: String
});

export default mongoose.model(
    'Song',
    songSchema
);