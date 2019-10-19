import Song from './../models/song.model';

const songRepository = {
    getSong: songId => {
        return Song.findById(songId);
    },
    upsertSong(songToUpsert) {
        const upsertedSong = Song.findOneAndUpdate(
            { sid: songToUpsert.sid },
            { $set: songToUpsert },
            { new: true, upsert: true }
        );

        return upsertedSong;
    }
};

export default songRepository;