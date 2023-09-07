import React, { Component } from 'react';
import { Button, CircularProgress, Box } from '@material-ui/core';
import axios from 'axios';

class OpenAI extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    state = { loading: false }

    async handleSubmit() {
        this.setState({ loading: true })
        const body = { InputrephraseText: this.props.InputrephraseText }
        console.log(body);
        try {
          // Make request to backend API passing keywords as input data
          const response = await axios({
            method: 'POST',
            url: 'https://paraphrasing-and-rewriter-api.p.rapidapi.com/rewrite-light',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '005cd380d2msh45efc3f147b8400p1229cdjsna747162bbd15',
              'X-RapidAPI-Host': 'paraphrasing-and-rewriter-api.p.rapidapi.com'
            },
            data: {
                "from": "en",
                "text": body.InputrephraseText
            }
        })
    
          // Pass search results to parent component's callback function
          console.log(response.data) ;
          this.setState({ loading: false })
          this.props.rephraseText(response.data)

        } catch (error) {
          console.error(error);
        }
    }

    render() {
        const { loading } = this.state;
        return (
            <Box flexWrap="wrap" alignItems="center">
                {
                    loading ?
                        <CircularProgress color="secondary" />
                        : <Button onClick={this.handleSubmit} disabled={loading} variant="contained" color="secondary" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>OpenAI</Button>
                }
            </Box>
        );
    }
}

export default OpenAI;