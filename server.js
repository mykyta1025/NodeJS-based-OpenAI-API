const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(express.json());

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Route for handling keyword search request
const API_KEY = "AIzaSyCw6UAysm7c9mDxsXCzbhujeS3l0tWTZgM"
const CX = "61d314c57b87a4e06"

// Route for handling keyword search request
app.post('/api/search', async (req, res) => {
    const keywords = req.body.inputText;
    console.log(req.body.inputText+"       server");
  try {
    // Make request to Google Search API using Axios or any HTTP library of your choice
    console.log(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${keywords}`);
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${keywords}`
    );

    // Extract top three URLs from search results
    const topThreeUrls = response.data.items.slice(0, 3).map((item) => item.link);

    // Array to hold search results data
    const resultsData = [];

    
  
        for (let url of topThreeUrls){
            try{
                let resultResponse=await axios.get(url);
                let $=cheerio.load(resultResponse.data);
                
                let title=$("title").text();

                /* 
                  Use Cheerio selectors or other methods to scrape and extract content from each URL.
                  Modify this section based on HTML structure and content you want to retrieve.
                 */
             
               $("body").each(function(){
                    var content=$(this).text().trim();
                    resultsData.push({title,content});
                });
            }catch(error){
                console.error(error);
            }
        }

    res.json(resultsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error searching keywords' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));