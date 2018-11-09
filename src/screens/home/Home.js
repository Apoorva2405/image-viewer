import React, { Component } from 'react';
import Header from '../../common/header/Header';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import './Home.css';

const styles = theme => ({
    card: {
        margin: 'auto',
        width: '33.33%'
    },
    content: {
        paddingTop: '10%',
        textAlign: 'left',
    },
    buttonClass: {
        paddingTop: '10%'
    },
    input: {
        margin: '10%',
    },
});

class Home extends Component {
    constructor() {
        super();
        this.state = {
            accessToken: {},
            username:"",
            profile_pic:"",
            uploaded_pics:[],
            dispLiked: "red",
            hashtags:[],
            likes:"",
            date:"",
            caption:"",
            url:""
        }
    }

    iconClickHandler = () => {
 
    }

    commentClickHandler = () => {

    }

    componentDidMount() {
        let currentState = this.state;
        console.log(this.props.accessToken) ;
        sessionStorage.setItem("access-token", this.props.accessToken);
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

        xhr.open("GET", "https://api.instagram.com/v1/users/self/?access_token=8800839957.a7c5df0.f9d82aafa9b14b79995ee88edf671444");
        xhr.send(data);

        // get pictures
        let xhrPic = new XMLHttpRequest();
        xhrPic.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var dateReceived = JSON.parse(this.responseText).data[0].created_time;
                var pics = JSON.parse(this.responseText).data[0];
                that.setState({
                    date: new Date(Number(dateReceived)).toISOString(),
                    uploaded_pics: JSON.parse(this.responseText).data,
                    url: JSON.parse(this.responseText).data[0].images.standard_resolution.url
                });
             }
        });

        xhrPic.open("GET", "https://api.instagram.com/v1/users/self/media/recent/?access_token=8800839957.a7c5df0.f9d82aafa9b14b79995ee88edf671444");
        xhrPic.send(data);
    }



    render() {
        const { classes } = this.props;
        return (
            <div className="home">
                <Header showSearchLogo="true" />
                <div  className="flex-container">
                <GridList cellHeight="100%" cols={2}>
                  {this.state.uploaded_pics.map(pic => (
                      <GridListTile>
                        <Card>
                            <CardHeader
                            avatar={
                                <Avatar src={this.state.profile_pic} alt="profile"/>
                            }
                            title={this.state.username}
                            subheader = {this.state.date}
                            />
                            <CardContent>
                                <img src={pic.images.standard_resolution.url} alt="image"/>
                                <Divider inset component="li" />
                                <Typography variant="subtitle1">
                                    {pic.caption.text}
                                </Typography>
                                <Typography>
                                    {pic.tags}
                                </Typography>
                                <div>
                                <FavoriteIcon
                                 onClick={() => this.iconClickHandler()}>
                                </FavoriteIcon>
                                <Typography>{pic.likes.count} likes</Typography>
                                </div>
                                <FormControl>
                                    <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                    <Input id="comment" type="text"
                                        onChange={this.inputCommentChangeHandler} />
                                    <Button variant="contained" color="primary" onClick={this.commentClickHandler}>Add</Button>
                                </FormControl>  
                            </CardContent>
                        </Card>
                        </GridListTile>
                    ))}
                </GridList>
                </div>
            </div>
        )
    }
}
export default Home;