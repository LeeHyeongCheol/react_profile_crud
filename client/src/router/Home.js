import React from "react";
import { MDBNavLink, MDBMask, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBView, MDBContainer } from "mdbreact";
import Header from '../components/Header'
import "../style/index.css";

class Home extends React.Component {  //Home 화면 입니다.
state = { //css 파일입니다.
collapseID: ""
};

toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  })
);

render() {

return (
      <div id="videobackground">
        <Header/>
        <MDBView>
          <video className="video-intro" poster="https://mdbootstrap.com/img/Photos/Others/background.jpg" playsInline
            autoPlay muted="" loop>
            <source src="https://mdbootstrap.com/img/video/animation.mp4" type="video/mp4" />
          </video>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer className="px-md-3 px-sm-0">
              <MDBRow>
                <MDBCol md="12" className="mb-4 white-text text-center">
                  <h3 className="display-3 font-weight-bold mb-0 pt-md-5">
                    {"Notice"}
                  </h3>
                  <hr className="hr-light my-4 w-75" />
                  <h4 className="subtext-header mt-2 mb-4">
                    "Whatever you do, make it pay"
                  </h4>
                  <MDBBtn outline rounded color="white">
                      <MDBIcon icon="home" /><MDBNavLink to="/Notice">notice_create</MDBNavLink>
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

export default Home;