import React, { Component } from 'react';
import { Button, CircularProgress, Box } from '@material-ui/core';
import axios from 'axios';
import config from '../config.json';


class SearchURLs extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    state = { loading: false }

    async handleSubmit() {
        this.setState({ loading: true })
        const body = { inputText: this.props.inputText }
        console.log(body);
        try {
          // Make request to backend API passing keywords as input data
          const response = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/search',
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "useQueryString": true
            },
            data: body
        })
    
          // Pass search results to parent component's callback function
          console.log(response.data) ;
          this.setState({ loading: false })
          this.props.responseText(response.data)

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
                        <CircularProgress color="inherit" />
                        : <Button onClick={this.handleSubmit} disabled={loading} variant="contained" color="inherit" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>Search</Button>
                }
            </Box>
        );
    }
}

export default SearchURLs;