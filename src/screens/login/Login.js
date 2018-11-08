import React, { Component } from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
    card: {
        margin: 'auto',
        width: '33.33%'
    },
    content: {
        paddingTop: '10%',
        textAlign: 'left',
    },
    input: {
        margin: '10%',
    },
});


class Login extends Component {

    constructor() {
        super();
        this.state = {
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            incorrectLoginDetails: "dispNone",
        };
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
   
        // Variables declared for login
        var username = "UpgradUser" ;
        var password = "upgrad@123" ;
        var accessToken = "8800839957.a7c5df0.f9d82aafa9b14b79995ee88edf671444" ;

        // If Username & Password are same then redirect it to Home Page
        if( (username === this.state.username) && (password === this.state.loginPassword)  ){
            console.log( "redirect to home page");       
        } else {
            // If Username & Password null then display required error message
            if( this.state.username === ""  ||  this.state.loginPassword === ""){
                  this.setState({ incorrectLoginDetails: "dispNone" })
            } else {
                // Otherwise display incorrect details error message
                this.setState({ incorrectLoginDetails: "dispBlock" })
            }
        }
    }
    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }
    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography variant='h4' align='left' gutterBottom>
                            LOGIN
                        </Typography>
                        <FormControl required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={this.state.username}
                                onChange={this.inputUsernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword}
                                onChange={this.inputLoginPasswordChangeHandler} />
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.incorrectLoginDetails}>
                                <span className="red">Incorrect username and/or password</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Login);