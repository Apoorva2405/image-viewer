import React, { Component } from 'react';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from 'react-modal';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Card from '@material-ui/core/Card';
import './Profile.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
    userDiv: {
        display: 'flex',
        alignItems: 'center', 
        margin: '10px'
    },
    likeDiv: {
        paddingTop: '20px',
        width: '100%',
        paddingBottom: '20px',
        display: 'flex',
        alignItems: 'center'
    },
    rightDiv: {
        paddingLeft: '10px'
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
});

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            accessToken: {},
            username:"",
            profile_pic:"",
            uploaded_pics:[],
            hashtags:[],
            comments: [],
            likes:"",
            date:"",
            caption:"",
            url:"",
            active: false,
            dispColor: "transparent",
            likesCount: "",
            clicked: false,
            pic:""
        }
    }

    iconClickHandler = (count) => {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
        var update_pics = this.state.uploaded_pics;
        if (this.state.active === false) {
           // update_pics[id].likes.count += 1;
            count = count + 1;
            this.setState({ 
                dispColor: "red",
                likes: count
            })
        } 
        else {
            count = count -1;
            this.setState({ 
                dispColor: "transparent",
                likes: count
            })
        }
}

    closeModalHandler = () => {
        this.setState({ clicked: false });
    }

    imageClickHandler = (pic, index) => {
        var pics = this.state.uploaded_pics[index];
        this.setState({ 
            clickedPic: pics,
            clicked: true,
            url: pics.images.standard_resolution.url,
            hashtags: pics.tags,
            caption: pics.caption.text,
            likes: pics.likes.count
        });
    }

    componentDidMount() {
      //  let currentState = this.state;
        console.log(sessionStorage.getItem("access-token")) ;
      //  sessionStorage.setItem("access-token", this.props.accessToken);
    }

    componentWillMount() {
        // get user data
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    profile_pic: JSON.parse(this.responseText).data.profile_picture,
                    username: JSON.parse(this.responseText).data.username
                });
             }
        });

        xhr.open("GET", "https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65");
        xhr.send(data);

        // get pictures
        let xhrPic = new XMLHttpRequest();
        xhrPic.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var dateReceived = JSON.parse(this.responseText).data[0].created_time;
                that.setState({
                    date: new Date(Number(dateReceived)).toISOString(),
                    uploaded_pics: JSON.parse(this.responseText).data,
                    likes: JSON.parse(this.responseText).data.likes,
                    url: JSON.parse(this.responseText).data[0].images.standard_resolution.url
                });
            }
        });

        xhrPic.open("GET", "https://api.instagram.com/v1/users/self/media/recent/?access_token=8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65");
        xhrPic.send(data);
    }

    render() {
    const { classes } = this.props;
        return (
            <div className="profile">
                <Header showProfileLogo="true" />
                <div> 
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
              <Modal isOpen={this.state.clicked} ariaHideApp={false}>
                  <div className="flex-containerDiv">
                      <div>
                      <img src={this.state.url} alt="pic"/>
                      </div>

                      <div>
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
                            style={{ color: 'red' }} 
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
export default withStyles(styles)(Profile);