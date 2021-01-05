import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody} from 'mdbreact';

class NoticeRead extends Component { //게시판을 클릭시 상세보기 화면으로 넘어가고 댓글을 추가,삭제가 가능합니다.
    constructor(props){
        super(props);
        this.state = {
            customersread:'',
            customer:props.location.pathname.split('/')[2], //넘겨주는 id값을 받아서 변수에 저장합니다.
            comment:'',
            commentes:''
        }
    }

    componentDidMount() { //페이지가 구성되기전에 작동해서 게시판 내용 및 댓글을 불러온다.
        this.NoticeReadcallApi() //라우팅을 통해서 넘겨 받은 id값을 통해서 id값에 해당하는 열의 정보를 받아 옵니다.
          .then(res => {
            this.setState({
            customersread:res[0]  //customers 변수에 받아온 데이터중에 첫번째 값만을 저장합니다.
          })
        })
          .catch(err => console.log(err));
        this.CommentcallApie() //라우팅을 통해서 넘겨 받은 id값을 통해서 id값에 해당하는 댓글 데이터를 받아 옵니다.
        .then(res => {
          this.setState({
            commentes:res  //customers 변수에 받아온 데이터를 저장해서 화면에 출력 시킵니다.
          })
        })
        .catch(err => console.log(err));
      }
    
      NoticeReadcallApi = async () => { //라우팅을 통해서 넘겨 받은 id값을 통해서 id값에 해당하는 열의 정보를 받아 옵니다.
        console.log(this.state.customer);
        const response = await fetch('/api/customers/read/'+this.state.customer);  //해당 url을 통해서 데이터를 받아와서 response 변수에 저장합니다.
        const body = await response.json(); //받아온 데이터를 json 형태로 저장합니다.
        return body;
      }

      CommentcallApie = async () => { //라우팅을 통해서 넘겨 받은 id값을 통해서 id값에 해당하는 댓글 데이터를 받아 옵니다.
        console.log(this.state.customer);
        const response = await fetch('/api/customers/commentread/'+this.state.customer);  //해당 url을 통해서 데이터를 받아와서 response 변수에 저장합니다.
        const body = await response.json(); //받아온 데이터를 json 형태로 저장합니다.
        return body;
      }

      CommentCreate = (e) => { //comment를 생성하는 함수.
        e.preventDefault()
        axios.post('/api/customers/comment/'+this.state.customer,{ //해당 url로 입력된 댓글의 데이터를 보냅니다.
            commentes: this.state.comment //commentes라는 변수에 담아서 보냅니다.
        })
        .then((response) => {
          console.log(response.data);
      })
      window.location.reload();
    }

    deleteComment(id){
      const url = '/api/customers/commentdelete/'+id; //해당 url을 통해서 접속하는데 삭제할 댓글의 "id"값도 같이 보낸다.
      fetch(url, { 
          method: 'DELETE'  //mothod가 delete 형태인 것을 찾는다.
      });
      window.location.reload();
    }

    hadleValueChange = (e) => { //데이터 값들이 변경될때 마다 변경 된 데이터로 변수에 저장한다.
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
    }

    render()
    {
      return( 
      <div className="container">
        <Box width={1} bgcolor="grey.300" p={1} my={0.5} textAlign='center' marginTop='2.5%'>
          {this.state.customersread.id}PROFILE
        </Box>
        <Box width={1} bgcolor="grey.300" p={1} my={0.5} marginTop='2.5%'>
          NAME:{this.state.customersread.name}<br/>
          <br/>
          BIRTHDAY:{this.state.customersread.birthday}<br/>
          <br/>
          GENDER:{this.state.customersread.gender}<br/>
          <br/>
          JOB:{this.state.customersread.job}
        </Box>
        <MDBContainer style={{marginLeft:'0',marginTop:'1%'}}>
          <MDBRow>
              <MDBCol md="12" mh="">
              <MDBCard>
                  <MDBCardBody>
                  <form>
                      <p className="h3">Comment</p>
                      <input
                      type="text"
                      id="defaultemail"
                      className="form-control"
                      value={this.state.comment}
                      onChange={this.hadleValueChange}
                      name="comment"
                      />
                      <div className="text-right">
                      <MDBBtn className="btn btn-outline-purple" type="submit" onClick={this.CommentCreate}>
                          CREATE COMMENT
                      </MDBBtn>
                      </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
              </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div>
        {this.state.commentes ? this.state.commentes.map(c => { //customers에 데이터가 있으면 동작해서 map을 사용해서 데이터를 불러온다.
                    return (
                        <div>
                          <div style={{width:'100%'}}>
                            COMMENT&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{c.comment}
                            <button variant="contained" color="primary" onClick={(e) => {this.deleteComment(c.id)}}>DELETE</button>
                          </div>
                        </div>
                    )
                }):""}
        </div>
      </div>
      
      )
    }
}
export default NoticeRead;