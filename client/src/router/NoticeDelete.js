import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class NoticeDelete extends React.Component{ //게시판을 삭제하는 곳 입니다.

    constructor(props){
        super(props);
        this.state={
            open:false
        }
    }

    handleClickOpen = () => { //modal을 open 시킵니다.
        this.setState({
            open:true
        });
    }

    handleClose = () => { //modal을 close 시킵니다.
        this.setState({
            open:false
        })
    }

    deleteNotice(id){
        const url = '/api/customers/'+id; //해당 url을 통해서 접속하는데 삭제할 게시판의 "id"값도 같이 보낸다.
        fetch(url, { 
            method: 'DELETE'  //mothod가 delete 형태인 것을 찾는다.
        });
        this.props.stateRefresh(); //해당 작업을 한후 다시한번 게시판을 불러오는 함수 입니다.
    }
    render(){
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>DELETE</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        WARMING DELETE
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterButtom>
                            PROFILE DELETE
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteNotice(this.props.id)}}>DELETE</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>CLOSE</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default NoticeDelete;