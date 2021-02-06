import {baseURL} from "../constants";
import * as axios from 'axios';
import {MusicBrainzApi} from 'musicbrainz-api';

const mbApi = new MusicBrainzApi({});

export const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
};

const instance = axios.create({
    baseURL: baseURL,
    ...config,
});

instance.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

instance.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
});

export const searchAPI = {
    async getAlbum(artist, album) {
        try {
            let res = await mbApi.search('release', {artist, release: album, type: 'album', format: 'CD'});
            let release;

            if (res.releases.length) {
                for (let i = 0; i < res.releases.length; i++) {
                    if (res.releases[i].status === 'Official') {
                        release = res.releases[i];
                        break;
                    }
                }

                let res2 = await mbApi.getRelease(release.id, ['artists', 'recordings']);

                let tracks = res2.media[0].tracks.map(item => item.title);
                let tracks2 = [];
                if (res2.media[1]) {
                    tracks2 = res2.media[1].tracks.map(item => item.title);
                }

                return {
                    id: Date.now(),
                    artist: release['artist-credit'][0].name,
                    title: release.title,
                    year: release.date ? (release.date).slice(0, 4) : '',
                    tracks: tracks.concat(tracks2)
                };
            } else {
                return null;
            }
        } catch {
            return 'error';
        }
    }
}
