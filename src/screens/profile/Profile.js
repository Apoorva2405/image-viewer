import React, { Component } from 'react';
import Header from '../../common/header/Header';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Modal from 'react-modal';

const styles = theme => ({
    card: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  });

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            username:"",
            profile_pic:"",
            media:"",
            follows:"",
            followed_by:"",
            full_name:"",
            modalIsOpen : false
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

     /*
        Function to open modal.
    */
   openModalHandler = () => {
    this.setState({ modalIsOpen : true } ) 
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen : false }) 
    }

    render() {
        const { classes } = this.props;
        const { theme } = this.props;
        return (
           
       
       <div>

        <Header showSearchLogo="true" />
         
         
        <Card className={classes.card} >
        <CardHeader  avatar={
                                <Avatar src={this.state.profile_pic} alt="profile"/>
                            }>           
        </CardHeader>
         
        <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="title" variant="title">
                 {this.state.username}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
                <span>Posts: </span> <span> {this.state.media} &nbsp; &nbsp; &nbsp; &nbsp;</span> 
                <span>Follows: </span> <span> {this.state.follows} &nbsp; &nbsp; &nbsp; &nbsp;</span> 
                <span>Followed By: </span> <span> {this.state.followed_by} </span> 
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
                {this.state.full_name}
          </Typography>
          
          <Button variant="fab" mini color="secondary" aria-label="Edit" className={classes.button} onClick={this.openModalHandler} >
          <EditIcon />
          </Button>
        </CardContent>
    
        </div>
      
        </Card>

        <Modal isOpen={this.state.modalIsOpen} contentLabel="Edit" ariaHideApp={false} onRequestClose={this.closeModalHandler}>
        </Modal>

        </div>
        )
    }
}


export default withStyles(styles, { withTheme: true }) (Profile);