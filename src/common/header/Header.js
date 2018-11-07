import React, { Component } from 'react';
import './Header.css';

/*Header component for all screens */
class Header extends Component {
    render() {
        return (
            <div>
                <header className="app-header">
                    <p className="app-logo">Image Viewer</p>
                </header>
            </div>
        )
    }
}

export default Header;