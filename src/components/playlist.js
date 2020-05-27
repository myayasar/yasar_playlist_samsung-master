import React from 'react';

const Playlist = props => {
console.log(props)
return (
<React.Fragment>
<div className="navigation__list__header" 
role="button" 
data-toggle="collapse" 
href="#playlists" 
aria-expanded="true" 
aria-controls="playlists">
Playlists
</div>

<div className="collapse in" id="playlists">

{props.playlist.map(({name,songs}) => (
<a onClick={()=>{props.getSongs(songs)}} className="navigation__list__item">
<i className="ion-ios-musical-notes"></i>
<span>{name}</span>
</a>))
}


</div>
</React.Fragment>)
}
export default Playlist;