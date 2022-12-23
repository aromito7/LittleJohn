import { useDispatch } from "react-redux";
import { logout } from "../store/session";
import { useHistory } from "react-router-dom"

const Menu = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const onLogout = async (e) => {
        await dispatch(logout());
        history.push("/login")
    };

    return(
        <div id="menu-container">
            <div id="icon-container">
                <i className="fa-solid fa-feather"/>
            </div>
            <div id="search-bar-container">
                <div id="search-bar">
                    <i className="fa-solid fa-magnifying-glass"/>
                    <input type="text"/>
                </div>
            </div>
            <div id="menu-items-container">
                <div className="menu-item-container">
                    <div className="menu-item cursor-pointer green">
                        Investing
                    </div>
                </div>
                <div className="menu-item-container">
                    <div className="menu-item cursor-pointer green">
                        Notifications
                    </div>
                </div>
                <div className="menu-item-container">
                    <div className="menu-item cursor-pointer green" onClick={onLogout}>
                        Log out
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
