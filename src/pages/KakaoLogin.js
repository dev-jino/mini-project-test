// 페이지를 이동할 때 사용
//(특정 이벤트가 실행됐을 때 동작하도록 하거나 추가적인 로직이 필요한 경우 사용)
import { useNavigate, redirect } from 'react-router-dom';
import './KakaoLogin.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function KakaoLogin() {
    const [loginUserInfo, setLoginUserInfo] = useState({
        id:"",
        email:""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const PARAMS = new URL(document.location).searchParams;
        const AUTHORIZE_CODE = PARAMS.get("code");
        const grant_type = "authorization_code";
        const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
        const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URI}`;
    
        // axios
        axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
            {},
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
                },
            }
        )
        .then((res) => {
            const { data } = res;
            const { access_token } = data;

            if (access_token) {
                console.log(`Bearer ${access_token}`);
                axios.post(
                    "https://kapi.kakao.com/v2/user/me",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
                        },
                    }
                )
                .then((res) => {
                    setLoginUserInfo({id:res.data.id, email:res.data.kakao_account.email});
                });
            }
        });
    }, []);
    
    useEffect(() => {
        console.log('test');
        console.log("UserDB : ", loginUserInfo);
        if (loginUserInfo.id != '' && loginUserInfo.kakao_account != '') {
            findUserData(loginUserInfo);
        }
    }, [loginUserInfo]);

    function findUserData(tokenData) {
        const tokenId = tokenData.id;
        const tokenEmail = tokenData.email;
        const xhr = new XMLHttpRequest();
    
        // xhr.open("GET", "http://localhost:3001/user");
        xhr.open("GET", `http://localhost:3001/user?id=${tokenId}`);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(null);
    
        xhr.onload = () => {
            if (xhr.status === 200) {
                // const users = JSON.parse(xhr.response);
                // console.log("users : ", users);
                
                // for (let i = 0 ; i < users.length ; i++) {
                //     if (users[i].id == tokenId) {
                //         console.log("같음");
                //         navigate('/');
                //         // return true;
                //     }
                // }
                // console.log("다름");
                // navigate('/join');

                console.log(xhr.response);
                console.log(xhr.response.length);
                const users = JSON.parse(xhr.response);
                console.log("users : ", users);
                if (users.length === 0) {
                    console.log('로그인 실패');
                    navigate('/join', {state: tokenData});
                } else {
                    console.log('로그인 완료');
                    navigate('/');
                }
            } else {
                console.log(xhr.status, xhr.statusText);
            }
        }
    }

    return (
        <div>
            Loading...
        </div>
    );
}

export default KakaoLogin;