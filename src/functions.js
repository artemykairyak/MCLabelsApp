export const parseTracklist = (tracklist) => {
    let splittedTracks = []
    let resArr = []

    if (tracklist) {
        splittedTracks = tracklist.trim().split('\n')
        let isNumbered = 0
        let isWord = 0
        for (let i = 0; i < Math.round(splittedTracks.length / 2); i++) {
            if (isNaN(parseInt(splittedTracks[i].slice(0, 1)))) {
                isWord++
            } else {
                isNumbered++
            }
        }

        splittedTracks.forEach(item => {
            if (item) {
                if (isNumbered > isWord) {
                    resArr.push(item.replaceAll(/^(\d*\s*[-.]*\s*)|\d*\s{2,}|([0-1]?[0-9]|2[0-3]):[0-5][0-9]|\t/g, ' ').trim())
                } else {
                    resArr.push(item.replaceAll(/([0-1]?[0-9]|2[0-3]):[0-5][0-9]|\t/g, ' ').trim())
                }
            }
        })
    }

    return resArr
}
