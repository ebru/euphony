import Song from './../models/song.model';

const songResolver = {
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

export default songResolver;