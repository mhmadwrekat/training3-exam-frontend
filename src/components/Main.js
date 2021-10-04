import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap';
import Axios from 'axios';
import Footer from './Footer';
export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataApi: []
        }
    }
    componentDidMount = () => {
        Axios.get(`https://${process.env.REACT_APP_BACKEND_URL}/data`).then(res => {
            this.setState({ dataApi: res.data })
        })
    }
    handleSubmit = (title, api_model, artist_display) => {
        let config = {
            method: "POST", baseURL:`https://${process.env.REACT_APP_BACKEND_URL}`, url:'/create',
            data: {
                title: title,
                api_model: api_model,
                artist_display: artist_display
            }
        }
        Axios(config);
    }
    render() {
        return (
            <div class='row'>
                {
                    this.state.dataApi.map(item => {
                        return <>
                            <Card border="warning" style={{ width: '15rem' }}>
                                <Card.Header>{item.title}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{item.api_model}</Card.Title>
                                    <Card.Text>
                                        {item.artist_display}
                                    </Card.Text>
                                    <Button variant="warning" onClick={() => this.handleSubmit(item.title, item.api_model, item.artist_display)}>add to favorite</Button>
                                </Card.Body>
                            </Card>
                        </>
                    })
                }
                <Footer />
            </div>
        )
    }
}
export default Main