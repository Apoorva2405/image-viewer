import React, { Component } from 'react';
import Header from '../../common/header/Header';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            accessToken: {}
        }
    }
    componentDidMount() {
      //  let currentState = this.state;
        console.log(sessionStorage.getItem("access-token")) ;
      //  sessionStorage.setItem("access-token", this.props.accessToken);

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