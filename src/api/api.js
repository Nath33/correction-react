class placeHolder {
    async getAlbums(start, limit = 5) {
        return await fetch(`https://jsonplaceholder.typicode.com/albums?_start=${start}&_limit=${limit}`)
    }

    async getPhotoByAlbumID(start, id) {
        return await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}&_limit=5&_start=${start}`)
    }
}

export const api = new placeHolder();