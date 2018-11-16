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
import moment from 'moment';


class Home extends Component {
    constructor() {
        super();
        // Intialized State Variables.
        this.state = {
            accessToken: {},
            username:"",
            profile_pic:"",
            uploaded_pics:[],
            hashtags:[],
            comments: [{ 
                content: "" ,
                user : "" ,
                id : ""
            }
           ],
            likes:"",
            date:"",
            caption:"",
            url:"",
            active: false,
            dispColor: "transparent",
            likesCount: "",
            index:"" ,
            comment: "" ,
            id: ""
        }
    }

/**
 * Handler when favorite icon is clicked
 */
    iconClickHandler = (count, id) => {
        const currentState = this.state.active;
        this.setState({ 
            active: !currentState
        });

        // increase count when like is clicked
        var update_pics = this.state.uploaded_pics;
        if (this.state.active === false) {
            update_pics[id].likes.count += 1;
            count = count + 1;
            this.setState({ 
                uploaded_pics: update_pics,
                index: id
            })
        } 
        // decrease count if icon is clicked again for the same index
        else if (this.state.active === true && this.state.index === id){
            update_pics[id].likes.count -= 1;
            this.setState({ 
                uploaded_pics: update_pics
            })
        }
}

    // Calling in on clicking comment
    commentClickHandler = (id) =>{

        console.log(id) ;

        let commentsList = this.state.comments.slice() ;  
            
        let starNode = [];
           
            starNode.user = this.state.username ;
            starNode.content = this.state.comment ;
            starNode.id = id ;
            commentsList.push(starNode);

        console.log ( commentsList ) ;
        this.setState({ comments: commentsList });

    }

    // handler when comment input is provided
    inputCommentChangeHandler = (e) => {
       this.setState({comment : e.target.value});
    }

    componentWillMount() {

        // get user data
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        // store profile pic and username
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

        // get pictures data
        let xhrPic = new XMLHttpRequest();
        xhrPic.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var dateReceived = JSON.parse(this.responseText).data[0].created_time;
                that.setState({
                    date: moment(Number(dateReceived)).format("DD/MM/YYYY hh:mm:ss"),
                    uploaded_pics: JSON.parse(this.responseText).data,
                    hashtags: JSON.parse(this.responseText).data.tags,
                    likes: JSON.parse(this.responseText).data.likes,
                    id: JSON.parse(this.responseText).data.id,
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
                {/**Post Grids */}
                <GridList cellHeight="100%" cols={2}>
                  {this.state.uploaded_pics.map((pic, index) => (
                      <GridListTile>
                        <Card className= "gridList">
                            <CardHeader
                            avatar={
                                <Avatar src={this.state.profile_pic} alt="profile"/>
                            }
                            title={this.state.username}
                            subheader = {moment(Number(pic.created_time)).format("DD/MM/YYYY hh:mm:ss")}
                            />
                            {/**Card Content to display images */}
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
                                {/* Code to display likes */}
                                <div className="likes">
                                <Icon style={{fontSize:"35px"}} onClick={() => this.iconClickHandler(pic.likes.count,index)}>
                                {(this.state.active && this.state.index === index) ?<Favorite className="red" fontSize="large"/>:<FavoriteIcon fontSize="large"/>}
                                </Icon>
                                <Typography className="right">{pic.likes.count} likes</Typography>
                                </div>
                                <div>
                                <Typography>
                                 {/* Code to display comments */}
                            <span>

                                {/* Add condition to.id  display it i.e.  pic.id == comment.id  and comments should not be blank    */}
                                 {this.state.comments.map(comment => (
                                     <span> {comment.user} - {comment.content} - {comment.id}
                                    </span>
                             ))}
                            {/*     {
                                this.state.comments.length ? this.state.comments.map((itemTestArray) =>
                                (<span> {itemTestArray} </span>)) : "-"
                            }   */}
                            </span>
                                    
                                </Typography>                          
                                </div>
                                {/** Code for adding comment */}
                                <FormControl className="comments">                                 
                                    <InputLabel htmlFor="comment">Add a comment</InputLabel>                              
                                    <Input id="comment" type="text"
                                        comment={this.state.comment}
                                        onBlur={this.inputCommentChangeHandler} />
                                </FormControl> 
                                <Button className="button"variant="contained" color="primary" onClick={() => this.commentClickHandler(pic.id)}>Add</Button> 
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