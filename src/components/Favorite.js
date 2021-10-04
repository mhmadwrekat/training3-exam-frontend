import React, { Component } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import Axios from 'axios';
import Footer from './Footer';
export class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDB: [], showUpdate: false, title: '', api_model: '', artist_display: '', ids: ''
        }
    }
    componentDidMount = () => {
        Axios.get(`https://${process.env.REACT_APP_BACKEND_URL}/DBdata`).then(res => {
            this.setState({ dataDB: res.data })
        })
    }
    handleDelete = (id) => {
        let ID = id;
        let config = {
            method: "DELETE", baseURL: `https://${process.env.REACT_APP_BACKEND_URL}`, url: `/delete/${ID}`
        }
        Axios(config).then(res => {
            this.setState({
                dataDB: res.data
            })
        })
    }
    handleTitle = (event) => { this.setState({ title: event.target.value }) };
    handleApi_model = (event) => { this.setState({ api_model: event.target.value }) };
    handleArtist_display = (event) => { this.setState({ artist_display: event.target.value }) };
    hanldeUpdate = (id, title, api_model, artist_display) => {
        this.setState({
            ids: id,
            title: title,
            api_model: api_model,
            artist_display: artist_display,
            showUpdate: true
        })
    }
    handleUpdateForm = (id) => {
        let ID = id;
        let config = {
            method: "PUT", baseURL: `https://${process.env.REACT_APP_BACKEND_URL}`, url: `/update/${ID}`,
            data: {
                title: this.state.title,
                api_model: this.state.api_model,
                artist_display: this.state.artist_display
            }
        }
        Axios(config).then(res => {
            this.setState({
                dataDB: res.data
            })
        });
    }
    render() {
        return (
            <div class='row'>
                {this.state.showUpdate &&
                    <Form onSubmit={() => this.handleUpdateForm(this.state.ids)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>{this.state.title}</Form.Label>
                            <Form.Control type="text" placeholder={this.state.title} onChange={this.handleTitle} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>{this.state.api_model}</Form.Label>
                            <Form.Control type="text" placeholder={this.state.api_model} onChange={this.handleApi_model} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>artist_display</Form.Label>
                            <Form.Control type="text" placeholder={this.state.artist_display} onChange={this.handleArtist_display} />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            UPDATE
                        </Button>
                    </Form>
                }
                {
                    this.state.dataDB.map(item => {
                        return <>
                            <Card border="warning" style={{ width: '15rem' }}>
                                <Card.Header>{item.title}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{item.api_model}</Card.Title>
                                    <Card.Text>
                                        {item.artist_display}
                                    </Card.Text>
                                    <Button variant="danger" onClick={() => this.handleDelete(item._id)}>REMOVE</Button>{' '}
                                    <Button variant="warning" onClick={() => this.hanldeUpdate(item._id, item.title, item.api_model, item.artist_display)}>UPDATE</Button>
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
export default Favorite