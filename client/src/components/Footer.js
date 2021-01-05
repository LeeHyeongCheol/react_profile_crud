import React from 'react';

const Footer = () => { //Footer 페이집 입니다.
    return (
        <div>
            <div className="main-footer" style={{ backgroundColor: '677AD3', borderTop: '1px solid #e7e7e7', marginTop: '5%'}}>
            <div className="container">
                <div className="container" style={{ marginLeft: '8.5%'}}>     
                    <h2 className="navbar-brand">Dokonimo</h2>
                </div>             
                <div className="row text-center">
                    <div className="col-md-4 col-sm">                       
                        <ul className="list-unstyled">
                            <li>자주 있는 질문</li>
                            <li>문의</li>
                            <li>소재집</li>
                        </ul>
                    </div>
                    <div className="col-md-4 col-sm">                        
                        <ul className="list-unstyled">
                            <li>이용 규약</li>
                            <li>프라이버시 규약</li>
                            <li>특정 상품 거래법</li>
                        </ul>
                    </div>
                    <div className="col-md-4 col-sm">
                        <ul className="list-unstyled">
                            <li>회사 홈페이지</li>
                            <li>회사 개요</li>
                            <li>채용 정보</li>
                        </ul>
                    </div>
                    </div>
                    <div className="footer-bottom">
                        <p className="text-right">
                            &copy;{new Date().getFullYear()} travel Guide App - All Rights Reserved                                   
                        </p>
                    </div>
                </div>    
            </div>
        </div>
    );
};

export default Footer;