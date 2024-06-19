
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./style.css";


const News = () => {
    const [mynews,setMynews]=useState([]);
    const fetchData = async () => {
      try {
        let res = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=336689a5c6a4449cad7c760022c13325"
        );

        setMynews(res.data.articles);
      } catch (e) {
        console.log("error-", e);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  return (
    <>
     <div className="newsdiv">
    {
        mynews.map((el)=>{
            return (
              <>
                <div
                  className="card"
                  style={{ width:"18rem", margin: "1rem" }}
                >
                  <img
                    src={
                      el.urlToImage == null
                        ? "https://i.ytimg.com/vi/ODn3AM9V8Q4/maxresdefault.jpg"
                        : el.urlToImage
                    }
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{el.author=="" ? "William Morris":el.author}</h5>
                    <p className="card-text">{el.title}</p>
                    <a href={el.url} className="btn btn-primary">
                      Read More
                    </a>
                  </div>
                </div>
              </>
            );
        })
    }
    </div>
    </>
  );
}

export default News
