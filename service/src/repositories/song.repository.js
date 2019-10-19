import Song from './../models/song.model';

const songRepository = {
    getSong: sid => {
        return Song.findOne({ sid: sid });
    },
    getSongs: () => {
        return Song.find({});
    },
    upsertSong(songToUpsert) {
        return Song.findOneAndUpdate(
            { sid: songToUpsert.sid },
            { $set: songToUpsert },
            { upsert: true, new: true },
            (error, result) => {
                if (error)
                    console.log('Error occured while saving the song.');
            }
        );
    }
};

export default songRepository;