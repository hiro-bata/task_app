import React, { Component } from "react";
import axios from "axios"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import firebase from "firebase";



class Auth extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            isSignIn: false,
            token: null,
            error: "",
            open: false,
        }
        this.openLoginForm = this.openLoginForm.bind(this)
        this.doClose = this.doClose.bind(this)
        this.doSignIn = this.doSignIn.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        this.auth();
        event.preventDefault();
    }

    switchAuthModeHandler = () => {
        this.setState({
            isLoginView: !this.state.isLoginView
        })
    }

    auth = () => {
        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDflCXtUnLygWJjBxh74aKG6nASdQL5_8I"
        
        if(this.state.isSignUp){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDflCXtUnLygWJjBxh74aKG6nASdQL5_8I"
        }
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem("token", response.data.idToken)
            })
            .catch(error => {
                this.setState({error: error.response.data.error.message})
            })
        
    }
    
    logout = (e) => {
        localStorage.removeItem("token")
        this.setState({
            token: null,
            isSignIn: false
        });
    }

    openLoginForm(){
        this.setState({
            open: true
        })
    }

    doClose(){
        this.setState({
          open: false,
        })
      };    

    doCheckClose(){
        this.setState({
          checkOpen: false,
        })
      };  

    doSignIn(event){
        
        this.auth();
        event.preventDefault();
        this.setState({
            isSignIn: true, 
        });
        this.doClose();
    }

    render(){

        return(
            <div>
                <button onClick={this.openLoginForm}>管理人ログイン</button>
                <Dialog
                    open={this.state.open? true : false}
                    onClose={this.doClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">管理人ログイン</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {localStorage.getItem("token")? 
                            <button onClick={this.logout}>LOGOUT</button>
                        :
                            <div>
                                <form method="post" onSubmit={this.doSignIn}>
                                <div>
                                    <label>メールアドレス</label><br/>
                                    <input type="text" name="email" onChange={this.handleChange} /><br/><br/>
                                    <label>パスワード</label><br/>
                                    <input type="password" name="password" onChange={this.handleChange} />
                                </div>
                                <div>{this.state.error}</div><br/>
                                    <button>ログイン</button>
                                </form><br/>
                            </div>
                        }
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.doClose} color="primary">閉じる</Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    };

}

export default Auth


