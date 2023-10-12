// 페이지를 이동할 때 사용
//(특정 이벤트가 실행됐을 때 동작하도록 하거나 추가적인 로직이 필요한 경우 사용)
import { useNavigate } from 'react-router-dom';
import './KakaoLogin.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function findUserData(tokenData) {
    const tokenId = tokenData.id;
    const tokenEmail = tokenData.kakao_account.email;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3001/user");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(null);

    xhr.onload = () => {
        if (xhr.status === 200) {
            const users = JSON.parse(xhr.response);
            users.map((user) => {
                if (tokenId == user.id || tokenEmail == user.email) {
                    console.log("일치", user);
                    return true;
                } else {
                    console.log("불일치", user);
                    return false;
                }
            });
            
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    }
}

function KakaoLogin() {
    const [userDB, setUserDB] = useState({
        id:"",
        kakao_account:""
    });

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
                    setUserDB(res.data);
                });
            }
            
        });
    }, []);
    
    useEffect(() => {
        console.log('test');
        console.log("UserDB : ", userDB);
        // if (userDB.id != '' & userDB.kakao_account != '') {
            findUserData(userDB);
        // }
    }, [userDB]);

    return (
        <div>
            Loading...
        </div>
    );
}

export default KakaoLogin;