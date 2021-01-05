import React, { Component } from 'react';
import {post} from 'axios';
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

class NoticeCreate extends Component { //게시판을 추가 하는 곳 입니다.
    constructor(props){
        super(props);
        this.state = {
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open:false
        }
    }

    handleFormSubmit = (e) => { //"추가"버튼을 누르면 이 함수를 호출 합니다.
        e.preventDefault()
        this.addNoticeCreate() //addNoticeCreate를 호출해서 url,config,data를 통해서 추가된 데이터를 보냅니다.
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh(); //게시판을 추가할때마다 게시판을 다시한번 불러와서 추가된 데이터를 보여줍ㄴ디ㅏ.
            })
        this.setState({ //게시판 생성이 완료된후 변수를 다시 초기화시켜서 새롭게 생성할때마다 비어있는 변수를 보여준다.
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false
        })
    }

    hadleFileChange = (e) => { //이미지 파일이 변경될때 마다 변경 된 것으로 저장한다.
        this.setState({
            file:e.target.files[0],
            fileName:e.target.value
        })
    }

    hadleValueChange = (e) => { //데이터 값들이 변경될때 마다 변경 된 데이터로 변수에 저장합니다.
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addNoticeCreate = () => { //해당 url에 form데이터 형식으로 이미지,이름,생일등의 데이터를 보냅니다..
        const url = '/api/customers'; 
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        const config = { //file 형식이 있으면 꼭 지정해주어야 합니다.
            header: {
                'content-type' : 'multipart/form-data'
            }
        }
        return post(url,formData,config);
    }

    handleClickOpen = () => { //modal을 open 시켜줍니다.
        this.setState({
            open:true
        });
    }

    handleClose = () => { //modal을 닫을때마다 변수를 초기화 및 modal을 close 시킵니다.
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open:false
        })
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    CREATE
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>PROFILE CREATE</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.filename} onChange={this.hadleFileChange}/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "PROFILE IMAGE CHOICE" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="NAME" type="text" name="userName" value={this.state.userName} onChange={this.hadleValueChange}/><br/>
                        <TextField label="BIRTHDAY" type="text" name="birthday" value={this.state.birthday} onChange={this.hadleValueChange}/><br/>
                        <TextField label="GENDER" type="text" name="gender" value={this.state.gender} onChange={this.hadleValueChange}/><br/>
                        <TextField label="JOB" type="text" name="job" value={this.state.job} onChange={this.hadleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>CREATE</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>CLOSE</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

export default withStyles(styles)(NoticeCreate);