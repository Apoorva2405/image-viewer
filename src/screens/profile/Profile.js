import React, { Component } from 'react';
import Header from '../../common/header/Header';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            accessToken: "",
            username:"",
            profile_pic:"",
            media:"",
            follows:"",
            followed_by:"",
            full_name:""
        }
    }

    componentDidMount() {
        console.log(sessionStorage.getItem("access-token")) ;   
    /*  this.setState( { accessToken : sessionStorage.getItem("access-token") } ) ;
          
       console.log(this.state.profile_pic);
       console.log(this.state.accessToken) ; */

       this.state.accessToken = sessionStorage.getItem("access-token") ;
       console.log(this.state.accessToken) ;
       console.log("here");
    }

    componentWillMount() {
        // get user data
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log("response "+xhr.responseText);
                that.setState({
                    profile_pic: JSON.parse(this.responseText).data.profile_picture,
                    username: JSON.parse(this.responseText).data.username
                });
             }
        });
        let bearerToken = this.state.accessToken ;
        console.log(bearerToken);
        let url = "https://api.instagram.com/v1/users/self/?access_token="+bearerToken  ;
        console.log("new url")
        console.log(url);
      
        xhr.open("GET", url);
        xhr.send(data);



        // get pictures
       /* let xhrPic = new XMLHttpRequest();
        xhrPic.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var dateReceived = JSON.parse(this.responseText).data[0].created_time;
                that.setState({
                    date: new Date(Number(dateReceived)).toISOString(),
                    uploaded_pics: JSON.parse(this.responseText).data,
                    hashtags: JSON.parse(this.responseText).data.tags,
                    likes: JSON.parse(this.responseText).data.likes,
                    url: JSON.parse(this.responseText).data[0].images.standard_resolution.url
                });
            }
        });

        xhrPic.open("GET", "https://api.instagram.com/v1/users/self/media/recent/?access_token=8800839957.a7c5df0.f9d82aafa9b14b79995ee88edf671444");
        xhrPic.send(data); */
    }





    render() {
        return (
            <div className="profile">
                <Header  showProfileLogo="true" />
                <div> PROFILE PAGE </div>


    
               
            </div>
        )
    }
}
export default Profile;