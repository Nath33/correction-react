import React, { Component } from 'react'
import { api } from './api/api'
import { AlbumList } from './album-list'
import { PhotoList } from './photo-list'
import { Paginate } from './pagination'

export class Albums extends Component {
    state = {
        albums: null,
        start: 0,
        startPhoto: 1,
        photos: null,
        currentAlbum: 1,
        currentPhoto: 1,
        currentPhotoId: null
    }


    async componentDidMount() {
        const { start } = this.state 
        const albums = await this.makerRequest('album', start)

        this.setState({ albums })
    }


    onSelectAlbum = async (id) => {
        const { startPhoto } = this.state
        const photos = await this.makerRequest('photos', startPhoto, id)

        this.setState({ photos, currentPhotoId: id })
    }

    makerRequest = async (type, start = 0, id = null) => {
        if (type === 'album') {
            const response = await api.getAlbums(start + 5, 5)
            return await response.json()
        } 
        const response = await api.getPhotoByAlbumID(id, start)
        return await response.json()
    }

    handleNext = async (type) => {
        const { start, startPhoto, id } = this.state
        if (type === 'album'){
            const albums = await this.makerRequest('album', start + 5)
            return this.setState((prevState) => {
                return { albums: albums, start: prevState.start + 5, currentAlbum: prevState.currentAlbum + 1, photos: null } 
            })
        }
        const photos = await this.makerRequest('photo', startPhoto + 5, id)
        return this.setState((prevState) => {
            return { photos: photos, startPhoto: prevState.startPhoto + 5, currentPhoto: prevState.currentPhoto + 1 } 
        })
    }

    handlePrev = async (type) => {
        const { start, startPhoto, id } = this.state
        if (type === 'album'){
            const albums = await this.makerRequest('album', start - 5)
            return this.setState((prevState) => {
                return { albums: albums, start: prevState.start - 5, currentAlbum: prevState.currentAlbum - 1, photos: null } 
            })
        }
        const photos = await this.makerRequest('photo', startPhoto - 5, id)
        return this.setState((prevState) => {
            return { photos: photos, startPhoto: prevState.startPhoto - 5, currentPhoto: prevState.currentPhoto - 1 } 
        })
    }


    render(){
        const { onSelectAlbum, photos, albums, currentAlbum, currentPhoto } = this.state
        console.log(photos)
        return (
            <div>
                {albums ?
                    <div>
                        <AlbumList albums={albums} onSelectAlbum={this.onSelectAlbum}/>
                        <Paginate type={'album'} handleNext={this.handleNext} handlePrev={this.handlePrev} current={currentAlbum}/>
                    </div> : null}
                {photos ? 
                    <div>
                        <PhotoList photos={photos}/>
                        <Paginate type={'photo'} handleNext={this.handleNext} handlePrev={this.handlePrev} current={currentPhoto}/>
                    </div> : null}
            </div>
        )
    }
}

















class App extends Component {

    render(){
        return(
            <Route path='/tata' user={user} component={User}></Route>
        )
    }
}

const User = ({props}) => {
    props.user
}
