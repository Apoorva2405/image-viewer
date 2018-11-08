import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import './Header.css';

/*Header component for all screens */
class Header extends Component {

    state = {
        query: '',
      }
     
      handleInputChange = () => {
        this.setState({
          query: this.search.value
        })
      }


    render() {
        return (
            <div>
                <header >
                    <div className="app-header">
                    <p className="app-logo">Image Viewer</p>
                   

                    
                    {this.props.showSearchLogo === "true" ?          
                       <div>
                       <input className="search-box"
                         placeholder="Search"
                         ref={input => this.search = input}
                         onChange={this.handleInputChange}
                       />
                       </div>
                    : ""}

                    
                   </div>

                </header>
            </div>
        )
    }
}

export default Header;