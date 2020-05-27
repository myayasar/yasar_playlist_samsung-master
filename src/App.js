import React, { Component  } from 'react';
import Albums from "./components/albums";
import Songs from "./components/songs"
import Playlist from "./components/playlist";
import Service from "./services"
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.collections=[];
    this.collection=[];
    this.title="Albums";
    this.state={albums:[],playlist:[],title:"Albums"}
    this.service = new Service();
    this.mySearch = React.createRef();
  }
  componentDidMount(){
    this.getAlbums("album")
    this.service.getPlaylist().then(playlist=>{
      this.setState({playlist})
    })
  }
  getAlbums = searchBy => {
    this.title = searchBy == "album" ? "Albums":"Artists" 
    this.service.getAlbums(searchBy).then(({collections,org})=>{
      this.collections=org;
      this.albums = [...collections];
      this.setState({albums:collections,title:this.title})
    })
  }
  getSongs = (list=[]) => {
    this.title = "Songs";
    if(list.length == 0) {
      this.collection = [...this.collections]
      
    } else {
      this.collection = this.collections.filter(({id,...collection})=>{
        if(list.indexOf(id) != -1){
          return {id,...collection}
        }
      })
    }
    this.setState({title:"Songs"})
  }
  filterList = () =>{
    if(this.mySearch.current.value.length > 3) {
      if(this.title != "Songs"){
      let albums = this.albums.filter(album=>{
          let regex= new RegExp(this.mySearch.current.value,"i")
          if(album.header.match(regex) != null ){
            return album;
          }
      })
      
      this.setState({albums})
    } else {
      let collection = this.collections.filter(collection=>{
        let regex= new RegExp(this.mySearch.current.value,"i")
        if(collection.title.match(regex) != null ){
          return collection;
        }
    })
    this.collection = collection;
   this.setState({title:"Songs"})
    }
    } else if(this.mySearch.current.value.length == 0) {
      if(this.title != "Songs"){
      this.setState({albums:this.albums})
      } else {
        this.collection = [...this.collections];
        this.setState({title:"Songs"})
      }
    }
  }
  render() {
    return (
    <React.Fragment>
    <section className="header">

  
  <div className="page-flows">
  
    <span className="flow">
      <i className="ion-chevron-left"></i>
    </span>
    
    <span className="flow">
      <i className="ion-chevron-right disabled"></i>
    </span>
    
  </div>
  
  <div className="search">
  
    <input ref={this.mySearch} type="text" placeholder="Search" onChange={()=>this.filterList()}/>
    
  </div>
  
  <div className="user">
  
    <div className="user__notifications">
    
      <i className="ion-android-notifications"></i>
      
    </div>
    
    <div className="user__inbox">
    
      <i className="ion-archive"></i>
      
    </div>
    
    <div className="user__info">
    
      <span className="user__info__img">
      
        <img src="/msiddik.jpg" alt="Profile Picture" className="img-responsive" />
        
      </span>
      
      <span className="user__info__name">
      
        <span className="first">Mohamed Yasar </span>
        
        <span className="last">Arabath</span>
        
      </span>
      
    </div>
    

    
  </div>
  
</section>

<section className="content">

  <div className="content__left">
  
    <section className="navigation">




  
        <div className="navigation__list">

          <div className="navigation__list__header" 
               role="button" 
               data-toggle="collapse" 
               href="#yourMusic" 
               aria-expanded="true" 
               aria-controls="yourMusic">
            Your Music
          </div>
          
          <div className="collapse in" id="yourMusic">
          
            <a onClick={()=>this.getSongs()} className={this.title == "Songs" ? "navigation__list__item activer" : "navigation__list__item"} >
              <i className="ion-headphone"></i>
              <span>Songs</span>
            </a>

            <a onClick={()=>this.getAlbums("album")} className={this.title == "Albums" ? "navigation__list__item activer" : "navigation__list__item"}>
              <i className="ion-ios-musical-notes"></i>
              <span>Albums</span>
            </a>

            <a onClick={()=>this.getAlbums("artist")}  className={this.title == "Artists" ? "navigation__list__item activer" : "navigation__list__item"}>
              <i className="ion-person"></i>
              <span>Artists</span>
            </a>

            
          </div>

        </div>

        <div className="navigation__list">

         <Playlist getSongs={this.getSongs}  playlist={[...this.state.playlist]}/>

        </div>


      </section>
      
    <section className="playlist">

      <a href="#">

        <i className="ion-ios-plus-outline"></i>

        New Playlist

      </a>

    </section>

    <section className="playing">

      <div className="playing__art">

        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/cputh.jpg" alt="Album Art" />

      </div>

      <div className="playing__song">

        <a className="playing__song__name">Some Type of Love</a>

        <a className="playing__song__artist">Charlie Puth</a>

      </div>

      <div className="playing__add">

        <i className="ion-checkmark"></i>

      </div>

    </section>
    
  </div>
  
  <div className="content__middle">
  
    <div className="artist is-verified">
    

      
      <div className="artist__content">
      
        <div className="tab-content">

          <div role="tabpanel" className="tab-pane active" id="artist-overview">
            
            <div className="overview">
            
          {(this.state.title == "Albums" || this.state.title == "Artists") && this.state.albums.map(album => (
            <Albums title={this.title} {...album} />))
          }
           {(this.state.title == "Songs") && (
            <Songs title={this.title} collection={this.collection} />)
          }
              
            </div>
          
          </div>

          <div role="tabpanel" className="tab-pane" id="related-artists">
          
            <div className="media-cards">
            
              <div className="media-card">
              
                <div className="media-card__image" style={{"background-image": "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/hoodie.jpg);"}}>
                
                  <i className="ion-ios-play"></i>
                  
                </div>
                
                <a className="media-card__footer">Hoodie Allen</a>
                
              </div>
              
              <div className="media-card">
              
                <div className="media-card__image" style={{"background-image": "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/mikestud_large.jpg);"}}>
                
                  <i className="ion-ios-play"></i>
                  
                </div>
                
                <a className="media-card__footer">Mike Stud</a>
                
              </div>
              
              <div className="media-card">
              
                <div className="media-card__image" style={{"background-image":" url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/drake_large.jpg);"}}>
                
                  <i className="ion-ios-play"></i>
                  
                </div>
                
                <a className="media-card__footer">Drake</a>
                
              </div>
              
              <div className="media-card">
              
                <div className="media-card__image" style={{"background-image":" url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/jcole_large.jpg);"}}>
                
                  <i className="ion-ios-play"></i>
                  
                </div>
                
                <a className="media-card__footer">J. Cole</a>
                
              </div>
              
              <div className="media-card">
              
                <div className="media-card__image" style={{"background-image":" url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/bigSean_large.jpg)"}}>
                
                  <i className="ion-ios-play"></i>
                  
                </div>
                
                <a className="media-card__footer">Big Sean</a>
                
              </div>
              
              <div className="media-card">
              
                <div className="media-card__image" style={{"background-image":"url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/wiz.jpeg)"}}>
                
                  <i className="ion-ios-play"></i>
                  
                </div>
                
                <a className="media-card__footer">Wiz Khalifa</a>
                
              </div>
              
              <div className="media-card">
              
                <div className="media-card__image" style={{"background-image": "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/yonas.jpg)"}}>
                
                  <i className="ion-ios-play"></i>
                  
                </div>
                
                <a className="media-card__footer">Yonas</a>
                
              </div>
              
              <div className="media-card">
              
                <div className="media-card__image" style={{"background-image":"url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/childish.jpg)"}}>
                
                  <i className="ion-ios-play"></i>
                  
                </div>
                
                <a className="media-card__footer">Childish Gambino</a>
                
              </div>
              
            </div>
          
          </div>


        </div>
        
      </div>
      
    </div>
    
  </div>
  
  <div className="content__right">
  
    <div className="social">
    
      <div className="friends">
      
        <a href="#" className="friend">
        
          <i className="ion-android-person"></i>
          
          Sam Smith
          
        </a>
        
        <a href="#" className="friend">
        
          <i className="ion-android-person"></i>
          
          Tarah Forsyth
          
        </a>
        
        <a href="#" className="friend">
        
          <i className="ion-android-person"></i>
          
          Ricahrd Tomkins
          
        </a>
        
        <a href="#" className="friend">
        
          <i className="ion-android-person"></i>
          
          Tony Russo
          
        </a>
        
        <a href="#" className="friend">
        
          <i className="ion-android-person"></i>
          
          Alyssa Marist
          
        </a>
        
        <a href="#" className="friend">
        
          <i className="ion-android-person"></i>
          
          Ron Samson
          
        </a>
        
      </div>
      
      <button className="button-light">Find Friends</button>
      
    </div>
    
  </div>
  
</section>

<section className="current-track">

  <div className="current-track__actions">
  
    <a className="ion-ios-skipbackward"></a>
    
    <a className="ion-ios-play play"></a>
    
    <a className="ion-ios-skipforward"></a>
    
  </div>
  
  <div className="current-track__progress">
  
    <div className="current-track__progress__start">0:01</div>
    
    <div className="current-track__progress__bar">
      
      <div id="song-progress"></div>
      
    </div>
    
    <div className="current-track__progress__finish">3:07</div>
    
  </div>
  
  <div className="current-track__options">
  
    <a href="#" className="lyrics">Lyrics</a>
    
    <span className="controls">
    
      <a href="#" className="control">
        <i className="ion-navicon"></i>
      </a>
      
      <a href="#" className="control">
        <i className="ion-shuffle"></i>
      </a>
      
      <a href="#" className="control">
        <i className="fa fa-refresh"></i>
      </a>
      
      <a href="#" className="control devices">
        <i className="ion-iphone"></i>
        <span>Devices Available</span>
      </a>
      
      <a href="#" className="control volume">
        
        <i className="ion-volume-high"></i>
      
        <div id="song-volume"></div>
        
      </a>
      
    </span>
    
  </div>
  
</section>
</React.Fragment>)
}
}

export default App;
