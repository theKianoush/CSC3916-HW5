import React, { Component } from 'react';
import { fetchMovies } from "../actions/movieActions";
import { setMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Image, Nav} from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { BsStarFill} from 'react-icons/bs'
import {LinkContainer} from 'react-router-bootstrap';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchMovies());
    }

    handleSelect(selectedIndex, e) {
        const {dispatch} = this.props;
        dispatch(setMovie(this.props.movies[selectedIndex]));
    }

    handleClick = (movie) => {
        const {dispatch} = this.props;
        dispatch(setMovie(movie));
    }

    render() {
        const MovieListCarousel = ({movieList}) => {
            if (!movieList) {
                return <div>Loading....</div>
            }

            return (

                <Carousel onSelect={this.handleSelect}>
                    {movieList.slice(0, 5).map((movie) =>
                        <Carousel.Item key={movie._id}>
                            <div>
                                <LinkContainer to={'/movie/'+movie._id} onClick={()=>this.handleClick(movie)}>
                                    <Nav.Link><Image className="image" src={movie.imageUrl} width={"400"} height={"150"} thumbnail /></Nav.Link>
                                </LinkContainer>
                            </div>

                            <Carousel.Caption>

                                <BsStarFill glyph={'star'} /> {movie.avgRating} &nbsp;&nbsp; {movie.year}
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}



                </Carousel>


            )
        }

        return (
            <MovieListCarousel movieList={this.props.movies} />
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movie.movies
    }
}

export default connect(mapStateToProps)(MovieList);

