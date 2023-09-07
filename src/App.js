import React, { useState } from 'react';
import SearchURLs from './Submit/SearchURLs';
import Submitbuttons from './Submit/SubmitButton';
import OpenAIbutton from './Submit/OpenAIButton';
import Typography from '@material-ui/core/Typography';
import Card, { CardHeader } from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function ParaphrasingTool() {

  const [expandedTitles, setExpandedTitles] = useState([]);
  const [apiRephraseText, setApiRephraseText] = useState('Not yet');
  const [InputrephraseText, setInputrephraseText] = useState('');
  const [apiResponseText, setApiResponseText] = useState(
    [
      { 
        title: 'Title 1',
        content: 'New York, often called New York City or NYC, is the most populous city in the United States. With a 2020 population of 8,804,190 distributed over 300.46 square miles (778.2 km2), New York City is the most densely populated major city in the United States and more than twice as populous as Los Angeles, the nation\'s second-largest city.'
      },
      {
        title: 'Title 2',
        content: 'This is the tool which can rephrase top 3 articles by using some keywords.This is the tool which can rephrase top 3 articles by using some keywords.'
      }
     ]
  );


  // console.log(apiResponseText.type);
  
  // console.log(apiResponseText);
  function setResponseText(apiResponse) {
    setApiResponseText(apiResponse)
  }

  function setRephraseText(apiRephrase) {
    setApiRephraseText(apiRephrase)
  }

  const handleTitleClick = (title) => {
    if (expandedTitles.includes(title)) {
      setExpandedTitles(expandedTitles.filter((t) => t !== title));
    } else {
      setExpandedTitles([...expandedTitles, title]);
    }
  };

  
  function Header() {
    const [inputText, setInputText] = useState('');
    return (
        <div className="w3-white w3-card-4" style={{height: 'fit-content', padding: '10px 10px 0 10px', display: 'flex'}}>
        <button className="w3-button w3-white w3-xlarge w3-hide-large" >☰</button>
        <div className="w3-container" style={{width: '30%', display : 'flex', justifyContent : 'center'}}>
          <div>
          <h1 style={{fontFamily: '"Caprasimo", cursive'}}>Welcome back,</h1>
          <p className="w3-text-grey" style={{fontFamily: 'playfair display'}}>This is the tool which can rephrase top 3 articles by using some keywords.</p>
          </div>
        </div>
        <div style={{width: '40%', alignItems : 'center', display :'flex' }}>
          <input type="text" onChange={(e) => setInputText(e.target.value)} placeholder="Please input the keywords" className="w3-bar-item search-input" />
          <SearchURLs inputText={inputText} responseText={setResponseText}/>
        </div>
        <div style={{ width: '30%', alignItems : 'center', display :'flex', justifyContent : 'center'}}>
          <div className="w3-center" style={{width: '10vw'}}>
            <i className="fa-regular fa-bell w3-bar-item w3-xlarge"><sup className="w3-black w3-xlarge" style={{ display:'inline-block', padding: '6px 4px', borderRadius: 100}}><a className='notification'>4</a></sup></i>
          </div>
          <div className="w3-center" style={{width: '20vw'}}>
            <img src="./john-doe.jpeg" style={{maxWidth: '20%'}} className="w3-bar-item w3-round-xxlarge w3-left" />
            <h6>Mykyta Upwork <i className="fa-solid fa-chevron-down" /></h6>
          </div>
        </div>
      </div>
    )
  }
  function SideBar() {
    return (
      <div className="w3-sidebar w3-padding w3-bar-block w3-collapse w3-card" style={{width: '17%'}} id="sideBar">
      <div style={{marginTop: '10%'}}>
        <h5 className="w3-center"><span className="fa fa-at" /> <b>Your Company</b></h5>
      </div>
      <div style={{marginTop: '15%', height: '60vh'}}>
        <a href="#" className="w3-bar-item w3-button w3-hover-none w3-hover-text-white" style={{wordSpacing: 10}}><span className="fa-solid fa-box w3-large" /> Overview <i className="fa-solid fa-chevron-down w3-tiny" /></a>
        <div style={{paddingLeft: 10}}>
          <a href="#" className="w3-bar-item w3-button w3-hover-none w3-hover-text-white w3-text-white w3-dark-grey w3-round-xlarge"><span className="fa-solid fa-house-chimney" /> Home</a>
          <a href="#" className="w3-bar-item w3-button w3-hover-none w3-hover-text-white"><span className="fa-solid fa-filter" /> Custom view</a>
        </div>
        <a href="#" className="w3-bar-item w3-button w3-text-gray w3-hover-none w3-hover-text-grey"><span className="fa-solid fa-clipboard w3-large" /> Orders</a>
        <a href="#" className="w3-bar-item w3-button w3-text-gray w3-hover-none w3-hover-text-grey"><span className="fa-solid fa-gear w3-large" /> Settings</a>
      </div>
      <div className="w3-text-gray" style={{marginTop: '10%'}}>
        <a href="#" className="w3-bar-item w3-button w3-hover-none w3-hover-text-grey">Help</a>
        <a href="#" className="w3-bar-item w3-button w3-hover-none w3-hover-text-grey">Contact Us</a>
        <a href="#" className="w3-bar-item w3-button w3-hover-none w3-hover-text-grey"><span className="fa-solid fa-right-to-bracket w3-large" /> Log out</a>
      </div>
      <button className="w3-bar-item w3-button w3-large w3-round-xlarge" style={{width: 'fit-content', position: 'fixed', left: '16%'}}> 
        <span className="fa-solid fa-chevron-left w3-tiny" /></button>
    </div>
    );
  }
  
  return (
    <div>
    <SideBar/>
      <div className="w3-main" style={{marginLeft: '17%'}}>
        <Header/>
        <div id="mySection" style={{margin : '0 30px 0 30px'}} className="w3-container">
          <section className="w3-section w3-card-2 w3-padding" style={{fontFamily: 'playfair display'}}>
          <div>
          {apiResponseText.map((item) => (
            <Card key={item.title} onClick={() => handleTitleClick(item.title)}>
              <CardContent style={{ backgroundColor: "rgb(26, 24, 24)", borderBottom: '1px solid #ccc'}}>
                <Typography style={{color : 'white'}}  variant="h5" component="h2">
                  {item.title}
                </Typography>
                {(expandedTitles.includes(item.title)) && [item.content].map((paragraph,index) => (
                  <Typography style={{color : 'white'}} variant="body2" color="textPrimary" key={index}>
                   {paragraph}
                   <div>
                   <div className='button-container'>
                      <Submitbuttons InputrephraseText={item.content} rephraseText={setRephraseText}/> 
                   </div>
                   <div className='button-container'>
                      <OpenAIbutton InputrephraseText={item.content} rephraseText={setRephraseText}/>
                   </div>
                   </div>
                  </Typography>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
          </section>
        </div>
    
        <div id="mySection" className="w3-container">
        <div>
            {apiRephraseText}
        </div>
        </div>
      </div>
    </div>
  );
}