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
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Divider from '@material-ui/core/Divider';

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
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    mainDiv: {
        marginLeft: '25px',
        marginRight: '25px'
    },
    flexcontainerDiv: {
        display: 'flex',
        justifyContent: 'center',
        borderWidth: '20px',
        borderColor: 'black'
    },
        userDiv: {
            display: 'flex',
            alignItems: 'center', 
            margin: '10px'
        },
        rightDiv: {
            marginLeft: '12px'
        },
        comments: {
        width: '80%'
        },
    button: {
        float: 'right',
        width: '10%'
    },
    bottom: {
        marginTop:'270px'
    },
    subheader: {
        width: '100%',
    },
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
            modalIsOpen : false,
            uploaded_pics:[],
            hashtags:[],
            comments: [],
            likes:"",
            caption:"",
            url:"",
            active: false,
            dispColor: "transparent",
            clicked: false,
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
                // set state variables
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

        // get pictures
        let xhrPic = new XMLHttpRequest();
        xhrPic.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    uploaded_pics: JSON.parse(this.responseText).data,
                    likes: JSON.parse(this.responseText).data.likes,
                    url: JSON.parse(this.responseText).data[0].images.standard_resolution.url
                });
            }
        });

        xhrPic.open("GET", "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + sessionStorage.getItem("access-token"));
        xhrPic.send(data);   
    }

    
    // Function to open modal.
    openModalHandler = () => {
        this.setState({ modalIsOpen : true } ) 
    }

    // Function to close Modal
    closeModalHandler = () => {
        this.setState({ 
            modalIsOpen : false,
            clicked: false
         }) 
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

    // Function for like handler
    iconClickHandler = (count) => {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
        if (this.state.active === false) {
            // increment count
            count = count + 1;
            this.setState({ 
                dispColor: "red",
                likes: count
            })
        } 
        else {
            // decrement count
            count = count -1;
            this.setState({ 
                dispColor: "transparent",
                likes: count
            })
        }
}

/**
 * Function for handling image list click
 */
    imageClickHandler = (pic, index) => {
        var pics = this.state.uploaded_pics[index];
        var captionReceived = pics.caption.text;
        var captionText = captionReceived.substring(0, captionReceived.indexOf("#"));
        this.setState({ 
            clickedPic: pics,
            clicked: true,
            url: pics.images.standard_resolution.url,
            hashtags: pics.tags,
            caption: captionText,
            likes: pics.likes.count
        });
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
         
                    {/* Displaying User data from state variables */}
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
          
                        {/* Edit Button */}
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

        {/**Main Profile Page */}
                <div className={classes.mainDiv}> 
                <GridList cellHeight="100%" className={classes.gridList} cols={3}>
                    {this.state.uploaded_pics.map((pic,index) => (
                    <GridListTile key={pic.id}>
                        <img src={pic.images.standard_resolution.url} alt="pic" 
                        onClick={() => this.imageClickHandler(pic,index)}/>
                    </GridListTile>
                    ))}
                </GridList>
                 </div>
                 <div>
              <Modal isOpen={this.state.clicked} ariaHideApp={false} onRequestClose={this.closeModalHandler}>
                  <div className={classes.flexcontainerDiv}>
                      <div>
                      <img src={this.state.url} alt="pic"/>
                      </div>

                      <div className={classes.rightDiv}>
                      <div className={classes.userDiv}>
                      <Avatar src={this.state.profile_pic}/>
                      <Typography style={{marginLeft: '10px'}}>{this.state.username}</Typography>
                      </div>

                      <Divider />
                      <Typography variant="subtitle1">
                            {this.state.caption}
                      </Typography>
                        <div className="tags">
                        {this.state.hashtags.map(tag => (
                            <Typography style={{color: '#29B6F6'}}>
                                #{tag}
                            </Typography>
                        ))}
                        </div>
                      <div className={classes.bottom}>
                            <div className={classes.userDiv}>
                            <FavoriteIcon fontSize="large"
                            className={this.state.dispColor}
                                onClick={() => this.iconClickHandler(this.state.likes)}>
                            </FavoriteIcon>
                            <Typography className="rightDiv">{this.state.likes} likes</Typography>
                            </div>
                            <div className={classes.userDiv}>
                                <FormControl className={classes.comments}>
                                        <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                        <Input id="comment" type="text"
                                            comment={this.state.comment}
                                            onChange={this.inputCommentChangeHandler} />
                                    </FormControl> 
                                    <Button className={classes.button} variant="contained" color="primary" onClick={this.commentClickHandler}>Add</Button> 
                            </div>
                      </div>
                      </div>
                    </div>
            </Modal>
                </div>
        </div>
        )
    }
}

export default withStyles(styles) (Profile);