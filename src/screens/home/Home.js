import React, { Component } from 'react';
import Header from '../../common/header/Header';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";
import './Home.css';


class Home extends Component {
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
            index:"" ,
            comment: "" ,
        }
    }

    handleChange = () => {
        const currentState = this.state.active;
        this.setState({ active: !currentState });   
    }

    iconClickHandler = (count, id) => {
        const currentState = this.state.active;
        this.setState({ 
            active: !currentState
        });

        var update_pics = this.state.uploaded_pics;
        if (this.state.active === false) {
            update_pics[id].likes.count += 1;
            count = count + 1;
            this.setState({ 
                uploaded_pics: update_pics,
                index: id
            })
        } 
        else if (this.state.active === true && this.state.index === id){
            update_pics[id].likes.count -= 1;
            this.setState({ 
                uploaded_pics: update_pics
            })
        }
}

    // Calling in on clicking comment
    commentClickHandler = () =>{ 
        var newStateArray = this.state.comments.slice();
        newStateArray.push(this.state.comment);
        this.setState({comments : newStateArray});

        console.log(this.state.comments) ;

        // Clear comment inputbox

    }

    inputCommentChangeHandler = (e) => {
       this.setState({comment : e.target.value});
    }

    componentWillMount() {
        console.log(this.props.accessToken) ;
        sessionStorage.setItem("access-token", this.props.accessToken);

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

        xhr.open("GET", "https://api.instagram.com/v1/users/self/?access_token=" + sessionStorage.getItem("access-token"));
        xhr.send(data);

        // get pictures
        let xhrPic = new XMLHttpRequest();
        xhrPic.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var dateReceived = JSON.parse(this.responseText).data[0].created_time;
                that.setState({
                    date: new Date(Number(dateReceived)).toISOString(),
                    uploaded_pics: JSON.parse(this.responseText).data,
                    hashtags: JSON.parse(this.responseText).data.tags,
                    likes: JSON.parse(this.responseText).data.likes,
                    url: JSON.parse(this.responseText).data[0].images.standard_resolution.url
                });
            }
        });

        xhrPic.open("GET", "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + sessionStorage.getItem("access-token"));
        xhrPic.send(data);
    }



    render() {
        return (
            <div className="home">
                <Header showSearchLogo="true" />
                <div  className="flex-container">
                <GridList cellHeight="100%" cols={2}>
                  {this.state.uploaded_pics.map((pic, index) => (
                      <GridListTile>
                        <Card className= "gridList">
                            <CardHeader
                            avatar={
                                <Avatar src={this.state.profile_pic} alt="profile"/>
                            }
                            title={this.state.username}
                            subheader = {this.state.date}
                            />
                            <CardContent>
                                <img src={pic.images.standard_resolution.url} alt="pic"/>
                                <Divider/>
                                <Typography variant="subtitle1">
                                    {pic.caption.text}
                                </Typography>
                                <div className="tags">
                                {pic.tags.map(tag => (
                                    <Typography style={{color: '#29B6F6'}}>
                                        #{tag} &nbsp;
                                    </Typography>
                                ))}
                                </div>
                                <div className="likes">
                                <Icon style={{fontSize:"35px"}} onClick={() => this.iconClickHandler(pic.likes.count,index)}>
                                {(this.state.active && this.state.index===index) ?<Favorite className="red" fontSize="large"/>:<FavoriteIcon fontSize="large"/>}
                                </Icon>
                                {/*<FavoriteIcon fontSize="large"
                                className={this.state.dispColor}
                                 onClick={() => this.iconClickHandler(pic.likes.count,index)}>
                                </FavoriteIcon>*/}
                                <Typography className="right">{pic.likes.count} likes</Typography>
                                </div>
                                <div>
                                <Typography>
                                 {/* Code to display comments */}

                            <span>
                            {
                                this.state.comments.length ? this.state.comments.map((itemTestArray) =>
                                (<span> {itemTestArray} </span>)) : "-"
                            }
                            </span>
                                    
                                </Typography>                          
                                </div>
                                
                                <FormControl className="comments">                                 
                                    <InputLabel htmlFor="comment">Add a comment</InputLabel>                              
                                    <Input id="comment" type="text"
                                        comment={this.state.comment}
                                        onBlur={this.inputCommentChangeHandler} />
                                </FormControl> 
                                <Button className="button"variant="contained" color="primary" onClick={this.commentClickHandler}>Add</Button> 
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