import React, { Component } from 'react';
import Header from '../../common/header/Header';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            accessToken: {}
        }
    }
    componentDidMount() {
        let currentState = this.state;
        console.log(this.props.accessToken) ;
        sessionStorage.setItem("access-token", this.props.accessToken);

    }
    render() {
        return (
            <div className="home">
                <Header  showSearchLogo="true" />
                <div> HOME PAGE </div>
               
            </div>
        )
    }
}
export default Home;