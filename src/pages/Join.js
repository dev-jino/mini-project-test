import "./Join.css";
import logo from "../assets/images/logo-img.png";
import github_logo from "../assets/images/github-icon.png";
import search_logo from "../assets/images/search-icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { IsLoginContext } from '../contexts/IsLoginContext';
import Post from "../components/Post";

function Join() {
  const { state } = useLocation();
  const { setIsLogin } = useContext(IsLoginContext);
  const navigate = useNavigate();
  const [addressObj, setAddressObj] = useState('');
  console.log("state : ", state);

  const [userInfo, setUserInfo] = useState({
    id: 0,
    userid: `${ state.id }`,
    nickname: `${ state.nickname }`,
    email: "",
    phone: "",
    address1: "",
    address2: "",
    address3: "",
    status: 1
  });

  console.log("userInfo : ", userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`submit! :`, userInfo);

    const xhr = new XMLHttpRequest();

    const data = JSON.stringify(userInfo);

    xhr.open("POST", "http://localhost:3001/user");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(data);

    xhr.onload = () => {
      if (xhr.status === 201) {
        const post = JSON.parse(xhr.responseText);
        console.log(post);

        sessionStorage.setItem("userData", JSON.stringify(post));
        setIsLogin(true);

        alert(`${post.nickname}님의 가입을 축하합니다.`);
        navigate('/');
      } else {
        console.log(xhr.status, xhr.statusText);
      }
    };
  };

  return (
    <div className="join">
      <div className="wrapper">
        <div className="header">
          <div className="container">
            <div className="div">
              <div className="logo-icon">
                <div className="logo-text">HowMuch</div>
                <img className="logo-img" src={logo} />
              </div>
              <div className="header-input">
                <img className="search-icon" src={search_logo} />
              </div>
              <div className="main-menu">
                <div className="menu-item">
                  <div className="menu-item-txt">장바구니</div>
                </div>
                <div className="menu-item">
                  <div className="menu-item-txt">주문조회</div>
                </div>
                <div className="menu-item">
                  <div className="text-wrapper">마이페이지</div>
                </div>
                <div className="menu-item">
                  <div className="menu-item-txt">로그아웃</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="container-2">
            <div className="title">
              <div className="title-msg">회원가입</div>
            </div>
            <div className="row">
              <div className="col">
                <form onSubmit={ handleSubmit }>
                  <input
                    className="join-input"
                    value={ state.id }
                    readOnly
                    style={{ display: "none" }}
                    required
                  ></input>
                  <div className="join-info">
                    <div className="join-text">이름 </div>
                    <div className="join-error-wrap">
                      <div
                        className="join-error-2"
                        style={{ visibility: "hidden" }}
                      >
                        필수 입력 항목입니다.
                      </div>
                    </div>
                    <input
                      className="join-input"
                      value={ state.nickname }
                      onChange={(e) =>
                        setUserInfo((prevState) => {
                          return { ...prevState, nickname: e.target.value };
                        })
                      }
                      required
                    ></input>
                  </div>
                  <div className="join-info">
                    <div className="join-text">이메일</div>
                    <div className="join-error-wrap">
                      <div
                        className="join-error"
                        style={{ visibility: "hidden" }}
                      >
                        이메일 형식이 아닙니다.
                      </div>
                      <div
                        className="join-error-2"
                        style={{ visibility: "hidden" }}
                      >
                        필수 입력 항목입니다.
                      </div>
                    </div>
                    <input
                      className="join-input"
                      value={ state.email }
                      onChange={(e) =>
                        setUserInfo((prevState) => {
                          return { ...prevState, email: e.target.value };
                        })
                      }
                      required
                    ></input>
                  </div>
                  <div className="join-info">
                    <div className="join-text">전화번호</div>
                    <div className="join-error-wrap">
                      <div
                        className="join-error-2"
                        style={{ visibility: "hidden" }}
                      >
                        필수 입력 항목입니다.
                      </div>
                    </div>
                    <input
                      className="join-input"
                      onChange={(e) =>
                        setUserInfo((prevState) => {
                          return { ...prevState, phone: e.target.value };
                        })
                      }
                      required
                    ></input>
                  </div>
                  <div className="join-info-2">
                    <div className="join-text">주소</div>
                    <div className="join-error-wrap">
                      <div
                        className="join-error-3"
                        style={{ visibility: "hidden" }}
                      >
                        필수 입력 항목입니다.
                      </div>
                    </div>
                    <input
                      className="join-input-2"
                      value={addressObj.zonecode}
                      // defaultValue={addressObj.zonecode}
                      onChange={(e) =>
                        setUserInfo((prevState) => {
                          return { ...prevState, address1: e.target.value };
                        })
                      }
                      // readOnly
                      required
                    ></input>
                    {/* <div className="button-find-zipcode"> */}
                      {/* <button className="button-find-zipcode-2">우편번호 찾기</button> */}
                      <Post setAddressObj={setAddressObj}/>
                    {/* </div> */}
                    <input
                      className="join-input"
                      value={addressObj.fullAddress}
                      onChange={(e) =>
                        setUserInfo((prevState) => {
                          return { ...prevState, address2: e.target.value };
                        })
                      }
                      // readOnly
                      required
                    ></input>
                    <input className="join-input" onChange={(e) =>
                        setUserInfo((prevState) => {
                          return { ...prevState, address3: e.target.value };
                        })
                      }></input>
                  </div>
                  <div className="join-button">
                    <button type="submit" className="button-confirm">
                      가입하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="row-wrapper">
            <div className="row-2">
              <div className="div-wrapper">
                <div className="row-3">
                  <div className="logo-icon-2">
                    <div className="logo-text">HowMuch</div>
                    <img className="logo-img" src={logo} />
                  </div>
                  <p className="footer-text">
                    현재 웹 사이트는 Mini-Project의 일환으로 실제로 물건을
                    판매하지 않습니다.
                  </p>
                </div>
              </div>
              <div className="div-wrapper">
                <div className="row-3">
                  <img className="git-hub" src={github_logo} />
                  <p className="p">
                    현재 웹사이트의 소스 코드는 하단의 Git Hub에서 확인하실 수
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Join;
