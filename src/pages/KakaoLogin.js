// 페이지를 이동할 때 사용
//(특정 이벤트가 실행됐을 때 동작하도록 하거나 추가적인 로직이 필요한 경우 사용)
import { useNavigate } from 'react-router-dom';
import './KakaoLogin.css';
import axios from 'axios';
import { useEffect } from 'react';

function findUserData(tokenData) {
    const tokenId = tokenData.data.id;
    const tokenEmail = tokenData.data.kakao_account.email;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `http://localhost:3001/user?id=${tokenId}`);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(null);

    xhr.onload = () => {
        if (xhr.status === 200) {
            const users = JSON.parse(xhr.response);
            console.log(users);
            if (users.length != 0) {
                console.log("길이 0이아님");
                return true;
            }
            // users.map((user) => {
            //     if (tokenId == user.id || tokenEmail == user.email) {
            //         console.log("일치");
            //         return true;
            //     } else {
            //         console.log("불일치");
            //         return false;
            //     }
            // });
            
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    }
}

function KakaoLogin() {
    const [userDB, setUserDB] = useState([]);

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
            console.log("res1 :", res);
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
                    setUserDB([...]);
                    console.log("res2 :", res);
                    // const getUsers = findUserData(res);
                    // console.log(getUsers);
                    // console.log(findUserData(res));

                    if (findUserData(res)) {
                        // window.location.replace("/");
                        console.log("if문");
                    } else {
                        console.log("else문");
                    }
                });
            }
            
        });
    }, []);

    return (
        <div>
            Loading...
        </div>
    );
}

export default KakaoLogin;