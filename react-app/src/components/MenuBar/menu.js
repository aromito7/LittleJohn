import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom"
import { useState } from "react";
import Transaction from "../Transaction"
import LJIcon from '../../images/littlejohnicon.png'
import './menu.css'

//const fs = require('fs')

const Menu = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const searchOptions = useSelector(state => state.stocks.searchOptions)
    const user = useSelector(state => state.session.user)

    const [search, setSearch] = useState("")
    const [options, setOptions] = useState([])
    const [focusSearch, setFocusSearch] = useState(false)
    const [isOpenNotifications, setIsOpenNotifications] = useState(false);

    const notifications = []
    if(!user) return null
    if(user.portfolio.length > -1){
        notifications.push({
            message : "Use the search bar to find new stocks",
            icon : LJIcon,
            highlight: "search",
        })
    }
    //console.log(fs)
    // fs.readFile('stock_info.csv', (err, data) => {
    //     if(err) throw err;
    //     console.log(data.toString())
    // })

    const closeModal = e =>{
        setIsOpenNotifications(false)
        console.log("close sesame")
    }

    const openModal = e => {
        document.addEventListener("click", closeModal);
        console.log("open sesame")
        setIsOpenNotifications(true)
    }

    const changeSearch = e => {
        const search = e.target.value
        if(!search){
            setOptions([])
            setSearch('')
            return
        }
        setSearch(search)
        const length =  search.length
        const tickerOptions = []
        const nameOptions = []
        // console.log(search)
        let i = 0
        while((tickerOptions.length < 3 || nameOptions.length < 3 ) && i < searchOptions.length){
            const [ticker, name] = searchOptions[i]
            //console.log(ticker, name)
            if(tickerOptions.length < 3 && ticker.toUpperCase().slice(0, length) == search.toUpperCase()){
                tickerOptions.push(searchOptions[i])
            }else if(name && nameOptions.length < 3 && name.toUpperCase().slice(0, length) == search.toUpperCase()){
                nameOptions.push(searchOptions[i])
            }
            i++
        }
        setOptions([...tickerOptions, ...nameOptions])
    }

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


    const NotificationsModal = () => {

        return(
            <div id="notification-modal" className="grey-border" onClick={e => e.stopPropagation()}>
                <div className="flex">
                    <p className="font20 bold">Notifications</p>
                    <p className="flex-end cursor-pointer" onClick={e => setIsOpenNotifications(false)}>X</p>
                </div>

                <div id="notification-container">
                    {
                        notifications.map(notification => {
                            return(
                                <div className="notification flex">
                                    <img src={notification.icon}/>
                                    <div className="flex-vertical align-center notification-content">
                                        <div className="flex">
                                            <p>Robinhood</p>
                                            <p className="flex-right">{notification.time || new Date().toDateString().split(' ').slice(1,3).join(' ')}</p>
                                        </div>
                                        <p>{notification.message}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return(
        <div id="menu-container">
            <div id="icon-container">
                <i className="fa-solid fa-feather fa-lg"/>
            </div>
            <div id="search-bar-container" onBlur={e => setFocusSearch(false)} onFocus={e => setFocusSearch(true)}>
                <div id="search-bar" className="input-icons">
                    <i className="fa-solid fa-magnifying-glass icon"/>
                    <input className="input-field" type="text" value={search} onChange={changeSearch} onKeyDown={onEnter}/>
                    {focusSearch && search.length > 0 &&
                        <div id="search-results">
                            {options.map(option => {
                                return(
                                    <p key={option[0]} onMouseDown={e => history.push(`/stocks/${option[0]}`)} className="cursor-pointer">
                                        {`${option[0]} - ${option[1]}`}
                                    </p>
                                    )
                            })}
                            {options.length == 0 &&
                                <p>No Results</p>
                            }
                        </div>
                    }
                </div>
            </div>
            <div id="menu-items-container">
                <div className="menu-item-container">
                    <div className="menu-item cursor-pointer green-font-hover" onClick={e => history.push("/")}>
                        Investing
                    </div>
                </div>
                <div className="menu-item-container">
                    <div className={`menu-item cursor-pointer green-font-hover ${isOpenNotifications ? "green-font underline" : ""}`} onClick={e => setIsOpenNotifications(!isOpenNotifications)}>
                        Notifications
                    </div>
                    {isOpenNotifications &&
                        <NotificationsModal/>
                    }
                </div>
                <div className="menu-item-container">
                    <div className="menu-item cursor-pointer green-font-hover" onClick={e => history.push("/about")}>
                        About
                    </div>
                </div>
                <div className="menu-item-container">
                    <div className="menu-item cursor-pointer green-font-hover" onClick={onLogout}>
                        Log out
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
