import React from 'react';

const Albums = props => {

return (

              <div className="overview__albums">
              
              <div className="overview__albums__head">
              
<span className="section-title">{props.title}</span>
                
              
              </div>
              
              <div className="album">
              
                <div className="album__info">
                
                  <div className="album__info__art">
                  
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/whenDarkOut.jpg" alt="When It's Dark Out" />
                    
                  </div>
                  
                  <div className="album__info__meta">
                  
                   
                    <div className="album__name">{props.header}</div>
                    
                    <div className="album__actions">
                    
                      <button className="button-light save">Save</button>
                      
                      
                    </div>
                    
                  </div>
                  
                </div>
                
                <div className="album__tracks">
                
                  <div className="tracks">
                    
                    <div className="tracks__heading">
                    
                      <div className="tracks__heading__number">#</div>
                      
                      <div className="tracks__heading__title">Song</div>

                      <div className="tracks__heading">ARTIST</div>
                      
                      <div className="tracks__heading__length">
                      
                        <i className="ion-ios-stopwatch-outline"></i>
                        
                      </div>
                      
                      <div className="tracks__heading__popularity">
                      
                        <i className="ion-thumbsup"></i>
                        
                      </div>
                      
                    </div>

                    {props.details.map(({duration,title,artist,id},index) => (

                    <div className="track">

                      <div className="track__number">{index}</div>

                      <div className="track__added">

                        <i className="ion-checkmark-round added"></i>

                      </div>

                    <div className="track__title">{title}</div>



                      <div className="track__explicit">

                    <span className="label">{artist}</span>

                      </div>
                      
                    <div className="track__length">{duration}</div>
                      
                      <div className="track__popularity">
                      
                        <i className="ion-arrow-graph-up-right"></i>
                        
                      </div>

                    </div>
                    ))}


                  </div>
                  
                </div>
                
              </div>
              
            </div>
)
}
export default Albums;
