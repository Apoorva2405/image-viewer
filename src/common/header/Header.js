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
import './Header.css';
import ReactDOM from 'react-dom';
import Login from '../../screens/login/Login';
import { Link } from 'react-router-dom';

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
  iconbtn: {
    marginRight: 2,
    marginLeft: 10,
  },
  profileiconbtn: {
    marginLeft: '94%',
  },
  avatar: {
    width: 45,
    height: 45,
  },
  menuList: {
    backgroundColor: '#c0c0c0',
  },
  menuitem: {
    padding: '8px',
  },
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
    accessToken: {},
    open:false,
  }

/**
 * Handler for search input
 */
  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })
  };

/**
 * Toggle Handler
 */
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
    // Redirecting to profile page with accessToken Set
    //ReactDOM.render(<Profile />, document.getElementById('root'));
  };

/**
 * Handler for Closing Menu
 */
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });

  };


  logoutHandler = event => {
    // Removing accesstoken in session storage on clicking logout 
    sessionStorage.removeItem("access-token");

    this.setState({
      loggedIn: false
    });

    // Redirecting to Login page
   ReactDOM.render(<Login />, document.getElementById('root'));

  }

  componentWillMount() {
    // get user profile pic data
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.open("GET", "https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          profile_pic: JSON.parse(this.responseText).data.profile_picture
        });
      }
    });

  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <header >
          {this.props.showSearchLogo === "true" &&
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
                      {/**Search Code */}
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                      />
                    </div>
                    {/**Menu Button Code */}
                    <IconButton buttonRef={node => {
                      this.anchorEl = node;
                    }}
                      aria-owns={open ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleToggle} className={classes.iconbtn}>
                      {/**View profile */}
                      <Avatar src={this.state.profile_pic} className={classes.avatar} alt="profile" />
                    </IconButton>
                    <div className={classes.menuroot}>
                      <Popper open={open} anchorEl={this.anchorEl} transition>
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                          >
                            <ClickAwayListener onClickAway={this.handleClose}>
                              <MenuList className={classes.menuList}>

                                {/* On clicking login , calling my account handler */}
                                <MenuItem className={classes.menuitem}>
                                
                                <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">My Account</Link>
                                </MenuItem>
                                <hr marginleft='8px' marginright='8px' />

                                {/* On clicking logout, calling logout handler */}
                                <MenuItem className={classes.menuitem} onClick={this.logoutHandler} >Logout</MenuItem>

                              </MenuList>
                            </ClickAwayListener>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                  </Toolbar>
                </AppBar>
              </MuiThemeProvider>
            </div>}

          {this.props.showProfileLogo === "true" &&
            <div className={classes.root}>
              <MuiThemeProvider theme={theme}>
                {/**Header AppBar Code*/}
                <AppBar position="static" color='primary'>
                  <Toolbar>
                    <p className='app-logo-profile'>
                    <Link className='app-logo-profile' style={{ textDecoration: 'none'}} to="/home">Image Viewer</Link>
                    </p>
                    <div className={classes.grow}>
                      <IconButton buttonRef={node => {
                        this.anchorEl = node;
                      }}
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleToggle} className={classes.profileiconbtn}>
                        <Avatar src={this.state.profile_pic} className={classes.avatar} alt="profile" />
                      </IconButton>
                      <div className={classes.menuroot}>
                        <Popper open={open} anchorEl={this.anchorEl} transition>
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              id="menu-list-grow"
                              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                              <ClickAwayListener onClickAway={this.handleClose}>
                                <MenuList className={classes.menuList}>

                                  {/* On clicking logout, calling logout handler */}
                                  <MenuItem className={classes.menuitem} onClick={this.logoutHandler} >Logout</MenuItem>

                                </MenuList>
                              </ClickAwayListener>
                            </Grow>
                          )}
                        </Popper>
                      </div>

                    </div>
                  </Toolbar>
                </AppBar>
              </MuiThemeProvider>
            </div>}
          {this.props.showLoginHeader === "true" &&
            <div className={classes.root}>
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