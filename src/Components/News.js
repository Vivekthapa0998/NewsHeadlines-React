import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




const News=(props)=>{
   
    const [article,setArticle]=useState([]);
    const [loading,setLoading]=useState(true);
    const [page,setPage]=useState(1);
    const [totalResults,setTotalResults]=useState(0);
    
    //document.title = `${capitalizeText(props.Category)} - NewsMonkey`;
    


    /*async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.Country}&category=${props.Category}&apiKey=0aa44ee5d9494a7c8bf830ad0b507298&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        
    }*/
    const updateNews =async ()=>{
        props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.Country}&page=1&category=${props.Category}&apiKey=6bad05df20c24469b6183c572fb130e8&pageSize=20`;
         
         let data= await fetch(url);
         props.setProgress(30)
         let parsedData= await data.json();
         props.setProgress(70);
         setArticle(parsedData.articles);
         setTotalResults(parsedData.totalResults);
         setLoading(false);
         props.setProgress(100);
         document.title = `${capitalizeText(props.Category)} - NewsMonkey`;

    }

    useEffect(()=>{
        updateNews();
    },[])


    /*async componentDidMount() {
        props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.Country}&page=1&category=${props.Category}&apiKey=6bad05df20c24469b6183c572fb130e8&pageSize=20`;
         
         let data= await fetch(url);
         props.setProgress(30)
         let parsedData= await data.json();
         props.setProgress(70);
         setArticle(parsedData.articles);
         setTotalResults(parsedData.totalResults);
         setLoading(false);
         props.setProgress(100);

    }*/

    const capitalizeText = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

  

    const fetchMoreData = async()=>{
        let nextpage=page +1;
     //   this.setState({page: (this.state.page) +1} );
        let url = `https://newsapi.org/v2/top-headlines?country=${props.Country}&category=${props.Category}&page=${nextpage}&apiKey=6bad05df20c24469b6183c572fb130e8&pageSize=20`;
        
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticle(article.concat(parsedData.articles));
         setTotalResults(parsedData.totalResults);
         setLoading(false);
         setPage(nextpage);
        
        //console.log(article.length);
        //console.log(totalResults);
    };
   

    
        return (
            <>
                <h2 className='text-center' style={{marginTop:"90px"}}>NewsMonkey - Top {capitalizeText(props.Category)} Headlines</h2>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={article.length}
                    next={fetchMoreData}
                    //hasMore={hasMore}
                    hasMore={(article.length)!== totalResults }
                    loader={(article.length) !== totalResults?<Spinner />:""}
                >
                    <div className='container'>
                    <div className='row my-4' >
                        {article.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem  title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 75) : ""} imageurl={element.urlToImage ? element.urlToImage : "https://spacenews.com/wp-content/uploads/2023/01/lmap-1.jpg"} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>


                        
                        }
                        )}

                    </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    
}

News.defaultProps = {
    Country: 'in',
    Category: 'general'
}

News.propTypes = {
    Country: PropTypes.string,
    Category: PropTypes.string
}

export default News;
