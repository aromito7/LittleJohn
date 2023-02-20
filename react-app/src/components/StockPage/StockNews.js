

const StockNews = ({stock}) => {
    const news = stock.news
    return(
        <div id="stock-news-container">
            <div id="stock-news-header" className="font28">News</div>
            <div id="stock-news-body">
                {
                    news.map((article, i) => {

                        if(article.thumbnail){
                            const thumbnail = article.thumbnail.resolutions[0]

                            const height = thumbnail.height
                            const width = thumbnail.width
                            console.log(height, width)
                        }
                        return(
                            <div className="news-article light-background-hover cursor-pointer" key={i} onClick={e => window.open(article.link, '_blank')}>
                                <div>
                                    <div className="flex">
                                        <div>{article.publisher}</div>
                                        <div className="grey-font left-margin10">{new Date(article.providerPublishTime).toString().split(' ').slice(1,3)}</div>
                                    </div>
                                    <div className="bold">{article.title}</div>
                                </div>
                                {article.thumbnail &&

                                    <div className="flex thumbnail-image-container">
                                        <img className="thumbnail-image" src={article.thumbnail.resolutions[0].url}/>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default StockNews
