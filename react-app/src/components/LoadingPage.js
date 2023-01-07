import loadingGif from '../images/loading.gif'

const LoadingPage = () => {
    return(
        <div id="loading-page">
            <h1>Loading stock data...</h1>
            <img src={loadingGif}/>
        </div>
    )
}

export default LoadingPage
