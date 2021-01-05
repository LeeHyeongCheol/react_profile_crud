import React from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
 MDBContainer } from "mdbreact";

class Home extends React.Component { //Header 페이지 입니다. 각 페이지로 이동할수 있게 설정해 놨습니다.
state = {
  collapseID: "",
  isOpen: false
};

toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
  collapseID: prevState.collapseID !== collapseID ? collapseID : ""
}));

render() {
  const overlay = (
    <div id="sidenav-overlay" style={{ backgroundColor: "transparent" }} onClick={this.toggleCollapse("navbarCollapse")} />
  );
  return (
      <div>
        <MDBNavbar dark expand="md" fixed="top">
          <MDBContainer>
            <MDBNavbarBrand>
              <h1 className="white-text">HyeongCheol Page</h1>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse")} />
            <MDBCollapse id="navbarCollapse" isOpen={this.state.collapseID} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="/Notice">Notice</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem active>
                  <MDBNavLink to="/Login">Login</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        {this.state.collapseID && overlay}
      </div>
    );
  }
}

export default Home;
