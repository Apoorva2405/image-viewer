import React, { Component } from 'react';
import Header from '../../common/header/Header';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';


class Profile extends Component {
    constructor() {
        super();
        this.state = {
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
                    username: JSON.parse(this.responseText).data.username,
                    full_name: JSON.parse(this.responseText).data.full_name,
                    media:  JSON.parse(this.responseText).data.counts.media,
                    follows : JSON.parse(this.responseText).data.counts.follows,
                    followed_by : JSON.parse(this.responseText).data.counts.followed_by
                });
             }
        });
        
        xhr.open("GET",  "https://api.instagram.com/v1/users/self/?access_token=" + sessionStorage.getItem("access-token"));
        xhr.send(data);       
    }

    render() {
        return (
            <div className="profile">
                <Header  showProfileLogo="true" />
                <div> PROFILE PAGE </div>
                <Card>
                            <CardHeader
                            avatar={
                                <Avatar src={this.state.profile_pic} alt="profile"/>
                            }
                            title={this.state.username}
                            subheader={this.state.media}
                            />
                </Card>

    
               
            </div>
        )
    }
}
export default Profile;