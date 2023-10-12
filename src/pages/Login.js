import "./Login.css";
import logo from "../assets/images/logo-img.png";
import github_logo from "../assets/images/github-icon.png";
import search_logo from "../assets/images/search-icon.png";
import kakao_login_img from "../assets/images/kakao_login_img.png";
import kakao_join_img from "../assets/images/kakao_join_img.png";

function Login() {
  const Rest_api_key = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const redirect_uri = `${process.env.REACT_APP_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

  const MoveKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    // window.open(KAKAO_AUTH_URL, "KakaoLogin", "width=400, height=300");
  }

  {/* ************************************ */}
  const MoveKakaoLogout = () => {

  }
  {/* ************************************ */}

  return (
    <div className="login">
      <div className="wrapper">
        <div className="header">
          <div className="container">
            <div className="div">
              <div className="logo-icon">
                <div className="logo-text">HowMuch</div>
                <img className="logo-img" src={logo} />
              </div>
              <div className="header-input"><img className="search-icon" src={search_logo} /></div>
              <div className="main-menu">
                <div className="menu-item"><div className="menu-item-txt">장바구니</div></div>
                <div className="menu-item"><div className="menu-item-txt">주문조회</div></div>
                <div className="menu-item"><div className="text-wrapper">마이페이지</div></div>
                <div className="menu-item"><div className="menu-item-txt">로그아웃</div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="container-2">
            <div className="title"><div className="title-msg">로그인</div></div>
            <div className="order-check-pre">
              {/* <div className="button-confirm">
                <div className="button-confirm-text">카카오 로그인</div>
              </div> */}
              <button className="button-confirm" onClick={MoveKakaoLogin}>
                <img className="" src={kakao_login_img}></img>
              </button>
            </div>
            {/* ************************************ */}
            <div className="title"><div className="title-msg">로그아웃</div></div>
            <div className="order-check-pre">
              <button className="button-confirm" onClick={MoveKakaoLogout}>
                <img className="" src={kakao_login_img}></img>
              </button>
            </div>
            {/* ************************************ */}
            <div className="title"><div className="title-msg">회원이 아니시라면...?</div></div>
            {/* <div className="button-confirm">
              <div className="button-confirm-text">카카오로 시작하기</div>
            </div> */}
            <button className="button-confirm">
              <img className="" src={kakao_join_img}></img>
            </button>
          </div>
        </div>
        <footer className="footer">
          <div className="row-wrapper">
            <div className="row">
              <div className="col">
                <div className="row-2">
                  <div className="logo-icon-2">
                    <div className="logo-text">HowMuch</div>
                    <img className="logo-img" src={logo} />
                  </div>
                  <p className="footer-text">현재 웹 사이트는 Mini-Project의 일환으로 실제로 물건을 판매하지 않습니다.</p>
                </div>
              </div>
              <div className="col">
                <div className="row-2">
                  <img className="git-hub" src={github_logo} />
                  <p className="p">현재 웹사이트의 소스 코드는 하단의 Git Hub에서 확인하실 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Login;