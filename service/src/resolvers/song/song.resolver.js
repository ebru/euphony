import Song from './../../models/song';

const SongResolver = {
    getSong: sid => {
        return Song.findOne({ sid: sid });
    },
    getSongs: () => {
        return Song.find({});
    },
    addSong(songToAdd) {
        const song = new Song(songToAdd);
        return song.save();
    }
};

export default SongResolver;