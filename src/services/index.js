const axios = require('axios');
class Service{
getAlbums = (searchBy="album") => {
    return new Promise( (resovle,reject) => {
        axios.get('/api/library')
    .then(function (albums) {
        let albumIndex = [];
        let collections = [];
        let index = -1;
        let header;
        albums.data.forEach(({album,duration,title,artist,id}) => {
            header = (searchBy == "album") ? album:artist;

               index = albumIndex.indexOf(header);

            if(index == -1){
                collections.push({header,details:[{album,duration,title,artist,id}]})
                albumIndex.push(header)
            } else {
                collections[index].details.push({album,duration,title,artist,id});
            }
        });
        resovle( {collections,org:albums.data});
    })
})
}
getPlaylist = () => {
    return new Promise( (resovle,reject) => {
        axios.get('/api/playlist')
        .then(function (res) {
            resovle(res.data)
        })
    })
}
}
export default Service