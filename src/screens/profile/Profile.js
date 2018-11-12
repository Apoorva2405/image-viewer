import React, { Component } from 'react';
import Header from '../../common/header/Header';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';

// Added Styles for Edit Modal.
const customStyles = {
    content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)'
    }
};

// Added styles for userdata display.
const styles = () => ({
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
    
    playIcon: {
      height: 38,
      width: 38,
    },
  });

class Profile extends Component {
    constructor() {
        super();
        // Intialized State Variables.
        this.state = {
            username:"",
            profile_pic:"",
            media:"",
            follows:"",
            followed_by:"",
            full_name:"",
            full_name_t:"",
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

    
    // Function to open modal.
    openModalHandler = () => {
        this.setState({ modalIsOpen : true } ) 
    }

    // Function to close Modal
    closeModalHandler = () => {
        this.setState({ modalIsOpen : false }) 
    }

    // Updating Full Name
    editClickHandler = (e) =>  {
        // If temporary full name is not null.
        if(  this.state.full_name_t !== "")
        {
            this.setState({ full_name: this.state.full_name_t });
        }
        
        // Closing modal class
        this.setState({ modalIsOpen : false }) ;        
    }

    // Setting full name temporary value to what is typed in full name inputbox.
    inputFullNameChangeHandler = (e) => {
        this.setState({ full_name_t: e.target.value });
    } 
 
    render() {
        const { classes } = this.props;
        return (
            <div>
                 {/* Header for profile Page */}
                <Header showProfileLogo="true" />

                {/* Code to display userprofile details */}
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

         {/* Edit Modal Class */}
        <Modal style={customStyles} isOpen={this.state.modalIsOpen} contentLabel="Edit" ariaHideApp={false} onRequestClose={this.closeModalHandler}>
            <Typography variant='h4' align='left' gutterBottom>
                Edit
            </Typography>
            {/* Edit Form Control */}
            <FormControl required>
                <InputLabel htmlFor="fullname"> Full Name </InputLabel>
                <Input type="text" id="fullname"  full_name={this.state.full_name_t}
                                onChange={this.inputFullNameChangeHandler}></Input>        
            </FormControl>
            <br /><br />
            <Button variant="contained" color="primary" onClick={this.editClickHandler}>UPDATE</Button>                             
        </Modal>

        </div>
        )
    }
}

export default withStyles(styles) (Profile);