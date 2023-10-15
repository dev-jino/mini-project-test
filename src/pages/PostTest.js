import { useState } from "react";
import Post from "../components/Post";

function PostTest() {
    const [addressObj, setAddressObj] = useState('');

    return (
        <>
            <Post setAddressObj={setAddressObj}/>
            <br/>
            <input value={addressObj.zonecode}></input>
            <input value={addressObj.fullAddress}></input>
            <input value={addressObj.extraAddress}></input>
            <input></input>
        </>
    );
}

export default PostTest;