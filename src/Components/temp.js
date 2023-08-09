import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';



export class News extends Component {
   static defaultProps={
        Country:'in',
        Category:'general'
   }

   static propTypes ={
    Country:PropTypes.string,
    Category:PropTypes.string
   }


    constructor(props){
        super(props);
        this.state={
            article : [],
            loading : false,
            page:1,
            totalResults:0
        }
        document.title= `${this.capitalizeText(this.props.Category)} - NewsMonkey`;
    }


    async updateNews(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.Category}&apiKey=0aa44ee5d9494a7c8bf830ad0b507298&page=${this.state.page}&pageSize=20`;
        this.setState({loading:true})
        let data= await fetch(url);
        let parsedData= await data.json();
        //console.log(parsedData);
        this.setState({article: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
        }); 
        console.log(this.state.article.length * this.state.page);
    }


    

    async componentDidMount(){
       /* let url=`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.Category}&apiKey=0aa44ee5d9494a7c8bf830ad0b507298&pageSize=20`;
        this.setState({loading:true})
        let data= await fetch(url);
        let parsedData= await data.json();
        //console.log(parsedData);
        this.setState({article: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false

        });*/
        this.updateNews();

    }

    capitalizeText = (str)=>{
            return str.charAt(0).toUpperCase() + str.slice(1);
    }

    handleNextClick= ()=>{
       /* if(this.state.page +1 > Math.ceil(this.state.totalResults/20))
        {

        }
        else{
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.Category}&apiKey=0aa44ee5d9494a7c8bf830ad0b507298&page=${this.state.page + 1}&pageSize=20`;
            this.setState({loading:true});
            let data= await fetch(url);
            let parsedData= await data.json();
            this.setState({
               page: this.state.page +1,
               article: parsedData.articles,
               loading: false 
            }) 
        }*/
        this.setState({
            page: this.state.page + 1
        });
        this.updateNews();

    }

    handlePrevClick= ()=>{
       /* let url=`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.Category}&apiKey=0aa44ee5d9494a7c8bf830ad0b507298&page=${this.state.page - 1}&pageSize=20`;
        this.setState({loading: true});
        let data= await fetch(url);
        let parsedData= await data.json();
        this.setState({
           page: this.state.page - 1,
           article: parsedData.articles,
           loading: false 
        })*/
        this.setState({
            page: this.state.page - 1
        });
        this.updateNews();
    }

    render() {
        return (
            <div className='container my-4'>
                <h2 className='text-center'>NewsMonkey - Top {this.capitalizeText(this.props.Category)} Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className='row my-4' >
                {!this.state.loading && this.state.article.map((element)=>
                {
                    return <div className='col-md-4' >
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,75):""} imageurl={element.urlToImage?element.urlToImage:"https://spacenews.com/wp-content/uploads/2023/01/lmap-1.jpg"} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div>
                    
                   
                
                }
                )}
                
                   
                </div>
                <div className='container d-flex justify-content-between'>
                <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
                <button disabled={this.state.page === Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button> 
            </div>
            </div>
        );
    }
}

export default News;



new one

import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




const News=()=>{
   


    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeText(this.props.Category)} - NewsMonkey`;
    }


    /*async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.Category}&apiKey=0aa44ee5d9494a7c8bf830ad0b507298&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        
    }*/




    async componentDidMount() {
        this.props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&page=1&category=${this.props.Category}&apiKey=6bad05df20c24469b6183c572fb130e8&pageSize=20`;
         
         let data= await fetch(url);
         this.props.setProgress(30)
         let parsedData= await data.json();
         this.props.setProgress(70);
         this.setState({article: parsedData.articles,
         totalResults: parsedData.totalResults,
         loading: false
 
         })
        this.props.setProgress(100);

    }

    capitalizeText = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

  

    fetchMoreData = async()=>{
        let nextpage=this.state.page +1;
     //   this.setState({page: (this.state.page) +1} );
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.Category}&page=${nextpage}&apiKey=6bad05df20c24469b6183c572fb130e8&pageSize=20`;
        
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            article: this.state.article.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
            page: nextpage
        });
        console.log(this.state.article.length);
        console.log(this.state.totalResults);
    };
   

    render() {
        return (
            <>
                <h2 className='text-center'>NewsMonkey - Top {this.capitalizeText(this.props.Category)} Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    //hasMore={this.state.hasMore}
                    hasMore={(this.state.article.length)!== this.state.totalResults }
                    loader={(this.state.article.length) !== this.state.totalResults?<Spinner />:""}
                >
                    <div className='container'>
                    <div className='row my-4' >
                        {this.state.article.map((element) => {
                            return <div className='col-md-4' >
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 75) : ""} imageurl={element.urlToImage ? element.urlToImage : "https://spacenews.com/wp-content/uploads/2023/01/lmap-1.jpg"} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>


                        
                        }
                        )}

                    </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }
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

