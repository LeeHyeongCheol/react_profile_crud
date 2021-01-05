import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody} from 'mdbreact';
import axios,{ post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class Login extends Component { // 로그인 및 회원가입을 같이 구현했습니다.
 
    constructor(props){
        super(props);
        this.state = { // 회원가입과 로그인시 사용하는 변수 입니다. 
            file:null, //file~open까지의 변수는 회원가입할때 사용하는 변수 입니다.
            name:'',
            emails:'',
            number:'',
            password:'',
            fileName:'',
            open:false,
            email:'', //로그인시 사용하는 변수
            passwords:'' //로그인시 사용하는 변수
        };
    }
    handleFormSubmit = (e) => { //회원가입 정보를 입력하고 "추가" 버튼을 누르면 이 함수를 호출 합니다.
        e.preventDefault()
        this.Userregister() //이 함수가 호출 되어서 url,config,url를 받고 해당하는 데이터를 데이터베이스에 업로드 합니다.
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
        this.setState({ //회원가입 입력폼에 있는 정보를 초기화시켜서 새롭게 회원가입할때 비어있는 입력폼이 나오게 합니다.
            file:null,
            name:'',
            emails:'',
            number:'',
            password:'',
            fileName:'',
            open: false
        })
    }

    Userregister = () => { //입력된 데이터를 form형식으로 모으고 url,config,url를 handleFormSubmit함수에 return 합니다.
        const url = '/api/customers/user';
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.name);
        formData.append('emails',this.state.emails);
        formData.append('number',this.state.number);
        formData.append('password',this.state.password);
        const config = {
            header: {
                'content-type' : 'multipart/form-data' //file등을 보낼려면 config 설정이 필수입니다.
            }
        }
        return post(url,formData,config);
    }

    UserLogin = (e) => { //Login하는 함수입니다.
        e.preventDefault()
        axios.post('/api/customers/login',{ //해당 url을 통해서 입력된 Email과Password를 보내서 멤버 테이블에 있는 데이터인지 확인 합니다.
            userEmail: this.state.email,
            userPassword: this.state.passwords
        })
        .then((response) => {
            if(response.data >= 1){ //정상적으로 작동하면 데이터를 리턴받고 데이터 있으면 "Home" 넘어갑니다.
                this.props.history.push('/');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    hadleFileChange = (e) => { //파일이 새롭게 업데이트 될때마다 새롭게 업데이트 해줍니다.
        this.setState({
            file:e.target.files[0],
            fileName:e.target.value
        })
    }

    hadleValueChange = (e) => { //입력폼에 데이터가 변경될때마다 새롭게 변수에 업데이트 해줍니다.
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClickOpen = () => { //modal를 켜주는 함수 입니다.
        this.setState({
            open:true
        });
    }

    handleClose = () => { //modal를 꺼주는 함수 입니다. modal를 끌때마다 항상 변수를 초기화 시켜 줍니다.
        this.setState({
            file:null,
            name:'',
            emails:'',
            number:'',
            password:'',
            fileName:'',
            open:false
        })
    }

    render(){
        const { classes } = this.props;
        return (
            <MDBContainer style={{marginLeft:'35%',marginTop:'10%'}}>
                <MDBRow>
                    <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                        <form>
                            <p className="h4 text-center py-4">LOGIN</p>
                            <label
                            htmlFor="defaultFormCardNameEx"
                            className="grey-text font-weight-light"
                            >
                            Your Email
                            </label>
                            <input
                            type="text"
                            id="defaultemail"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.hadleValueChange}
                            name="email"
                            />
                            <br />
                            <label
                            htmlFor="defaultFormCardEmailEx"
                            className="grey-text font-weight-light"
                            >
                            Password
                            </label>
                            <input
                            type="text"
                            id="defaultpassword"
                            className="form-control"
                            value={this.state.passwords}
                            onChange={this.hadleValueChange}
                            name="passwords"
                            />
                            <div className="text-center py-4 mt-3">
                            <MDBBtn className="btn btn-outline-purple" type="submit" onClick={this.UserLogin}>
                                LOGIN
                            </MDBBtn>
                            <MDBBtn className="btn btn-outline-blue" onClick={this.handleClickOpen}>
                                REGISTER
                            </MDBBtn>
                            <Dialog open={this.state.open} onClose={this.handleClose}>
                                <DialogTitle>유저 추가</DialogTitle>
                                <DialogContent>
                                    <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.filename} onChange={this.hadleFileChange}/>
                                    <label htmlFor="raised-button-file">
                                        <Button variant="contained" color="primary" component="span" name="file">
                                            {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                                        </Button>
                                    </label>
                                    <br/>
                                    <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.hadleValueChange}/><br/>
                                    <TextField label="이메일" type="text" name="emails" value={this.state.emails} onChange={this.hadleValueChange}/><br/>
                                    <TextField label="전화번호" type="text" name="number" value={this.state.number} onChange={this.hadleValueChange}/><br/>
                                    <TextField label="비번" type="text" name="password" value={this.state.password} onChange={this.hadleValueChange}/><br/>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                                </DialogActions>
                            </Dialog>
                            </div>
                        </form>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
};

export default withStyles(styles)(Login);