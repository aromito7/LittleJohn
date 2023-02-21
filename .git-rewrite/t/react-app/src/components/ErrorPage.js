import errorImage from '../images/errorPageImage.png'
import { Link } from 'react-router-dom'
const ErrorPage = () =>{
    return(
        <div id="error-page-container">
            <div id='error-page-message'>
                <h2>404</h2>
                <h2>Page not found</h2>
                <p>Not all those who wander are lost, but it seems you may have taken a wrong turn.</p>
                <Link to="/">
                    <button className='wide-button green-background font-black'>Go Home</button>
                </Link>
            </div>
            <div id='error-page-image'>
                <img src={errorImage}/>
            </div>
        </div>
    )
}

export default ErrorPage
