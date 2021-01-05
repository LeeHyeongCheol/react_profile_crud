import React, { Component } from 'react';
import { post } from 'axios';
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

class NoticeUpdate extends Component { //게시판의 데이터를 업데이트 하는 곳 입니다.
    constructor(props){
        super(props);
        this.state = {
            file:null, 
            id:this.props.id, //기존에 있는 정보를 가져와서 입력폼에 보여줍니다.
            userName:this.props.name, //기존에 있는 정보를 가져와서 입력폼에 보여줍니다.
            birthday:this.props.birthday, //기존에 있는 정보를 가져와서 입력폼에 보여줍니다.
            gender:this.props.gender, //기존에 있는 정보를 가져와서 입력폼에 보여줍니다.
            job:this.props.job, //기존에 있는 정보를 가져와서 입력폼에 보여줍니다.
            fileName:this.props.image, //기존에 있는 정보를 가져와서 입력폼에 보여줍니다.
            open:false
        }
    }

    handleFormSubmit = (e) => { //"수정" 버튼을 누르면 이 함수를 호출 합니다.
        e.preventDefault()
        this.UpdateNotice() //이 함수를 호출해서 url,config,form을 통해서 update된 데이터를 보냅니다.
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh(); //update 이벤트가 발생하면 바뀐 데이터만 업데이트 해서 게시판을 다시 구성하는 함수입니다.
            })
        this.setState({ // 업데이트 작업을 하면 modal을 닫고 업데이트한 변수를 다시 초기화 시켜 줍니다.
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false
        })
    }

    
    hadleFileChange = (e) => { //file을 새롭게 업데이트 할때마다 업데이트한 파일을 변수에 저장합니다.
        this.setState({
            file:e.target.files[0],
            fileName:e.target.value
        })
    }

    hadleValueChange = (e) => { //데이터을 새롭게 업데이트 할때마다 업데이트한 데이터를 변수에 저장합니다.
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    UpdateNotice = () => {
        const url = '/api/customers/update/'+ this.state.id; //해당 url로 접속하는데 업데이트할 데이터를 form형식으로 보내고 업데이트할 게시판의 id도 함께 보냅니다.
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        console.log(this.state.fileName)
        const config = {
            header: {
                'content-type' : 'multipart/form-data' //file이 있으면 config 설정 해줘야 합니다.
            }
        }
        return post(url,formData,config); 
    }

    handleClickOpen = () => { //modal open 함수 입니다.
        this.setState({
            open:true
        });
    }

    handleClose = () => { //modal close 함수 입니다.
        this.setState({
            open:false
        })
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    UPDATE
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>PROFILE UPDATE</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.filename} onChange={this.hadleFileChange}/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "PROFILE IMAGE SELECT" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="NAME" type="text" name="userName" value={this.state.userName} onChange={this.hadleValueChange}/><br/>
                        <TextField label="BIRTHDAY" type="text" name="birthday" value={this.state.birthday} onChange={this.hadleValueChange}/><br/>
                        <TextField label="GENDER" type="text" name="gender" value={this.state.gender} onChange={this.hadleValueChange}/><br/>
                        <TextField label="JOB" type="text" name="job" value={this.state.job} onChange={this.hadleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>UPDATE</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>CLOSE</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

export default withStyles(styles)(NoticeUpdate);