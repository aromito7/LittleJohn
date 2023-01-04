import { useDispatch } from "react-redux";
import { logout } from "../store/session";
import { useHistory, Link } from "react-router-dom"
import { useState } from "react";
//const fs = require('fs')

const Menu = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [search, setSearch] = useState("")
    //console.log(fs)
    // fs.readFile('stock_info.csv', (err, data) => {
    //     if(err) throw err;
    //     console.log(data.toString())
    // })

    const onLogout = async (e) => {
        await dispatch(logout());
        history.push("/login")
    };

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            //console.log(search)
            history.push('/')
            history.push(`/stocks/${search.toUpperCase()}`)
            setSearch("")
        }
      };

    return(
        <div id="menu-container">
            <div id="icon-container">
                <i className="fa-solid fa-feather"/>
            </div>
            <div id="search-bar-container">
                <div id="search-bar">
                    <i className="fa-solid fa-magnifying-glass"/>
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={onEnter}/>
                </div>
            </div>
            <div id="menu-items-container">
                <div className="menu-item-container">
                    <div className="menu-item cursor-pointer green">
                        <Link to="/">Investing</Link>
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
