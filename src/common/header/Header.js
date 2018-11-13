import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import './Header.css';
import ReactDOM from 'react-dom'; 
import Login from '../../screens/login/Login';
import Profile from '../../screens/profile/Profile';

const styles = theme => ({
  root: {
    width: '100%',
  },
  menuroot: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '4px',
    backgroundColor: '#c0c0c0',
    marginRight: 10,
    width: '300px',
  },
  searchIcon: {
    width: theme.spacing.unit * 6,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  inputRoot: {
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
    marginRight:10,
  },
  menuList:{
  backgroundColor: '#c0c0c0',
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: '#263238' }, // For header background.
    secondary: { main: '#fff' }, // For text on header. 
  },
});



/*Header component for all screens */
class Header extends Component {

  state = {
    query: '',
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })
  };
  
  handleToggle = () => {
   // this.setState(state => ({ open: !state.open }));
    // Redirecting to profile page with accessToken Set
    ReactDOM.render(<Profile />, document.getElementById('root'));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });

  };


  logoutHandler = event  => {
    console.log("inside logout");
    // Removing accesstoken in session storage on clicking logout 
    sessionStorage.removeItem("access-token");

    this.setState({
        loggedIn: false
    });
    console.log("cleared session storage");
    
    // Redirecting to Login page
     ReactDOM.render(<Login />, document.getElementById('root'));

  }

  myAccountHandler = event => {
     // Redirecting to profile page with accessToken Set
     ReactDOM.render(<Profile />, document.getElementById('root'));
  }
 
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <header >
          {this.props.showSearchLogo === "true" ?
            <div className={classes.root}>
              <MuiThemeProvider theme={theme}>
                <AppBar position="static" color='primary'>
                  <Toolbar>
                    <p className="app-logo">Image Viewer</p>
                    <div className={classes.grow} />
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                      />
                    </div>
                    <IconButton buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}>
                      <Avatar className={classes.orangeAvatar} >S</Avatar>
                    </IconButton>
                    <div className={classes.menuroot}>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList className={classes.menuList}>

                      {/* On clicking login , calling my account handler */}
                      <MenuItem onClick={this.myAccountHandler} >My Account</MenuItem>
                      <hr/>

                      {/* On clicking logout, calling logout handler */}                 
                      <MenuItem onClick={this.logoutHandler} >Logout</MenuItem>

                    </MenuList>
                  </ClickAwayListener>
           
              </Grow>
            )}
          </Popper>
          </div>
                  </Toolbar>
                </AppBar>
              </MuiThemeProvider>
            </div>
            : <div className={classes.root}>
              <MuiThemeProvider theme={theme}>
                <AppBar position="static" color='primary'>
                  <Toolbar>
                    <p className="app-logo">Image Viewer</p>
                  </Toolbar>
                </AppBar>
              </MuiThemeProvider>
            </div>}

        </header>
      </div>
    )
  }
}

export default withStyles(styles)(Header);