import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import NoticeCreate from './NoticeCreate';
import NoticeDelete from './NoticeDelete';
import NoticeUpdate from './NoticeUpdate';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({ //css 코드 입니다.
  root: {
    width: '100%',
    overflowX: "auto"
  },
  grow: {
    flexGrow:1,
  },
  menu: {
    paddingTop:20,
    paddingBottom:20,
    display:'flex',
    justifyContent:'center'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]:{
      display:'block',
    },
  },
  search:{
    position:'relative',
    borderRadius:theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover' : {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft:0,
    width:'100%',
    [theme.breakpoints.up('sm')]:{
      marginLeft: theme.spacing.unit,
      width:'auto',
    },
  },
  searchIcon:{
    width: theme.spacing.unit * 9,
    height: '100%',
    paddingLeft: theme.spacing.unit*6,
  },
  inputRoot: {
    color:'inherit',
    width:'100%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 7,
    borderRadius: theme.shape.borderRadius * 0.5,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    transition: theme.transitions.create("width"),
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      width: "20%" 
    },
    "&$inputFocused": {
      [theme.breakpoints.up("sm")]: {
        width: "100%" 
      }
    }
  },
  table:{
    minWidth : 1080
  },
  progress: {
    margin: theme.spacing(2),
  }
})

class Notice extends Component {  //게시판 메인화면

  constructor(props){
    super(props);
    this.state={
      customers:'', //게시판 데이터를 저장하는 변수
      completed:0
    }
  }

  stateRefresh = () => { 
    this.setState({
      customers:'',
      completed:0
    });
    this.callApi() //create/update/delete등의 이벤트가 발생하면 바뀐 게시판 내용만 불러와서 게시판 페이지에 추가하거나 삭제합니다.
      .then(res => this.setState({
        customers:res //customers 변수에 받아온 저장합니다.
      }))
      .catch(err => console.log(err));
  }

  componentDidMount() { //페이지가 구성되기전에 작동해서 게시판 내용을 불러온다.
    this.timer = setInterval(this.progress, 20); 
    this.callApi()
      .then(res => this.setState({
        customers:res  //customers 변수에 받아온 저장합니다.
      }))
      .catch(err => console.log(err));
  }

  callApi = async () => { 
    const response = await fetch('/api/customers');  //해당 url을 통해서 데이터를 받아와서 response 변수에 저장합니다.
    const body = await response.json(); //받아온 데이터를 json 형태로 저장합니다.
    return body;
  }

  progress = () => { //progress bar를 동작시키는 함수 입니다.
    const { completed } = this.state;
    this.setState({
      completed : completed >= 100 ? 0 : completed + 1
    });
  }

  NoticeRead(id,name,birthday,gender,job){ 
    this.props.history.push({ //NoticeRead로 라우팅을 통해서 페이지를 전환하면서 함께 데이터를 넘겨줍니다.
      pathname: `/NoticeRead/${id}`, 
      customersid: id,
      customersname: name,
      customersbirthday: birthday,
      customersgender: gender,
      customersjob: job
    });
  }

      render() {
        const { classes } = this.props;
        return(
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                  <MenuIcon/>
                </IconButton>
                <Typography className={classes.title} style={{width:100}} variant="h5" color="inherit" noWrap>
                  PROFILE
                </Typography>
                <div className={classes.grow}/>
                <div className={classes.search}/>
                  <div className={classes.searchIcon}>
                      <SearchIcon/>
                  </div>
                  <InputBase
                    placeholder="SEARCH"
                    classes={{
                      root:classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
              </Toolbar>
            </AppBar>
            <div className={classes.menu}>
              <NoticeCreate stateRefresh={this.stateRefresh} ></NoticeCreate> 
            </div>
          <Paper>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>IMAGE</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>BIRTHDAY</TableCell>
                  <TableCell>GENDER</TableCell>
                  <TableCell>JOB</TableCell>
                  <TableCell>OPTION</TableCell>
                </TableRow>
              </TableHead>
                  {this.state.customers ? this.state.customers.map(c => { //customers에 데이터가 있으면 동작해서 map을 사용해서 반복적인 데이터를 불러온다.
                    return (
                      <TableBody> 
                        <TableCell onClick={(e) => {this.NoticeRead(c.id,c.name,c.birthday,c.gender,c.job)}}>{c.id}</TableCell>
                        <TableCell><img src={c.image} alt="profie" style={{width:64 ,height: 64}}/></TableCell>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.birthday}</TableCell>
                        <TableCell>{c.gender}</TableCell>
                        <TableCell>{c.job}</TableCell>
                        <TableCell>
                          <NoticeDelete stateRefresh={this.stateRefresh} id={c.id}/>
                          <NoticeUpdate stateRefresh={this.stateRefresh} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}></NoticeUpdate> 
                        </TableCell>
                      </TableBody>   
                    )
                  }):  
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                    </TableCell>
                  </TableRow>
                  }
            </Table>
          </Paper>
          </div>
        )      
      }
};

export default withStyles(styles)(Notice);