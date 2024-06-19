import React from 'react'
import "./style.css";
import Nav from '../components/NewsComponents/Nav';
import News from '../components/NewsComponents/News';

const NewsSection = () => {
  return (
    <div className='newsPage'>
     <Nav/>
     <News/>
    </div>
  )
}

export default NewsSection
