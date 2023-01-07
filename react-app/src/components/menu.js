import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/session";
import { useHistory, Link } from "react-router-dom"
import { useState } from "react";

//const fs = require('fs')

const Menu = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [search, setSearch] = useState("")
    const searchOptions = useSelector(state => state.stocks.searchOptions)
    const [options, setOptions] = useState([])
    const [focusSearch, setFocusSearch] = useState(false)
    //console.log(fs)
    // fs.readFile('stock_info.csv', (err, data) => {
    //     if(err) throw err;
    //     console.log(data.toString())
    // })

    const changeSearch = e =>{
        const search = e.target.value
        setSearch(search)
        if(!search){
            setOptions([])
            return
        }
        const length =  search.length
        const tickerOptions = []
        const nameOptions = []

        let i = 0
        while((tickerOptions.length < 3 || nameOptions.length < 3 )&& i < searchOptions.length){
            const [ticker, name] = searchOptions[i]
            if(tickerOptions.length < 3 && ticker.toUpperCase().slice(0, length) == search.toUpperCase()){
                tickerOptions.push(searchOptions[i])
            }else if(nameOptions.length < 3 && name.toUpperCase().slice(0, length) == search.toUpperCase()){
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

    return(
        <div id="menu-container">
            <div id="icon-container">
                <i className="fa-solid fa-feather"/>
            </div>
            <div id="search-bar-container" onBlur={e => setFocusSearch(false)} onFocus={e => setFocusSearch(true)}>
                <div id="search-bar" className="input-icons">
                    <i className="fa-solid fa-magnifying-glass icon"/>
                    <input className="input-field" type="text" value={search} onChange={changeSearch} onKeyDown={onEnter}/>
                    {focusSearch && search.length > 0 &&
                        <div id="search-results" className="dark-background">
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
