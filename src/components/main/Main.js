import {Route, Routes} from "react-router-dom";
import LoginPage from "../login/LoginPage";
import Registration from "../registration/Registration";
import ProfilePage from "../profile/ProfilePage";
import FullPost from "../fullpost/FullPost";
import CreatePost from "../createpost/CreatePost";
import Feed from "../feed/Feed";
import Dialog from "../dialog/Dialog";
import UserList from "../userlist/UserList";

function Main() {
    return (
        <main>
            <Routes>
                <Route exact path={"/"} element={<LoginPage/>}></Route>
                <Route exact path={"/register"} element={<Registration/>}></Route>
                <Route exact path={"/user/:externalId"} element={<ProfilePage/>}></Route>
                <Route exact path={"/post/:externalId"} element={<FullPost/>}></Route>
                <Route exact path={"/post/create"} element={<CreatePost/>}></Route>
                <Route exact path={"/feed"} element={<Feed/>}></Route>
                <Route exact path={"/message/:externalId"} element={<Dialog/>}></Route>
                <Route exact path={"/user/all"} element={<UserList/>}></Route>
            </Routes>
        </main>
    )
}

export default Main