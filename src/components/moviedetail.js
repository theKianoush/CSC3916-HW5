import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {setReview} from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { reviewText: '' };
        this.state = { reviewRating: '0'};



    }


    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }



    handleReviewChange = (event) => {
        this.setState({reviewText: event.target.value});
    }

    handleRatingChange = (event) => {
        this.setState({reviewRating: event.target.value});
    }







    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} width={"400"} height={"150"} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.actorName}</b> {actor.characterName}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.avgRating}</h4></ListGroupItem>
                    </ListGroup>

                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.reviewersname}</b>&nbsp; {review.comment}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )}
                    </Card.Body>

                    <Form
                        onSubmit={setReview(this.props.selectedMovie.title, this.state.reviewText, this.state.reviewRating)}>
                        <b>Submit Review</b>
                        <Form.Control as="textarea" rows={3} placeholder="What was your favorite part of the movie?"
                                      value={this.state.reviewText} onChange={this.handleReviewChange}/>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select rating <BsStarFill/></Form.Label>
                            <Form.Control as="select" value={this.state.reviewRating}
                                          onChange={this.handleRatingChange}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit review</Button>
                    </Form>


                </Card>
            )
        }

        return (
            <DetailInfo />
        )
    }






}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

