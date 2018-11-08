import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import './Header.css';


const styles = theme => ({
    palette: {
        primary: '#f44336',
        secondary: {
          main: '#f44336',
        },
    },
    root: {
      width: '100%',
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
      marginLeft: 0,
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
      color:'black',
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
    avatar: {
        margin: 10,
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
    }


    render() {
        const { anchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
        return (
            <div>
                <header >
                     {this.props.showSearchLogo === "true" ?  
                        <div className={classes.root}>
                        <AppBar position="static" color='primary'>
                          <Toolbar>
                            <Typography className={classes.title} variant="h6" noWrap>
                            Image Viewer
                            </Typography>
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
                            <IconButton>
                            <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" className={classes.avatar} />
                            </IconButton>
                            </Toolbar>
                        </AppBar>
                      </div>
                    : <div className="app-header">
                    <p className="app-logo">Image Viewer</p>
                </div>}
     
                </header>
            </div>
        )
    }
}
  
  export default withStyles(styles)(Header);