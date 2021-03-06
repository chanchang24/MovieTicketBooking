import withMovieLayout from "hocs/withMovieLayout";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./MovieItem.scss";
import 'Base/customize.scss';
import WOW from "wowjs";
class MovieItem extends Component {
  state = {
    src: "./images/assets/images/cinemaDefault.jpg",
    errored: false,
  };
  errorImgFlag = true;
  componentDidMount() {
    new WOW.WOW({
      live: false
  }).init();
  }
  render() {
    const { tenPhim, hinhAnh, maPhim, biDanh, danhGia} =
      this.props.data;

    return (
      <div className="movieItem col-6 col-sm-4 col-md-3 col-lg-3 wow fadeScale" data-wow-sroll="true">
        <div className="movieItem-content">
          <div className="movie-poster">
            <Link to={`/movie-detail/${maPhim}`}>
              <div className="poster-img">
              <img
                className="card-img-top"
                src={hinhAnh}
                alt={biDanh}
                onError={(e) => {
                  if (this.errorImgFlag) {
                    this.errorImgFlag = false;
                    e.target.src = "./images/assets/images/cinemaDefault.jpg";
                  }
                }}
              />
              <div className="rate">
              <i class="fa fa-star"></i>
              {danhGia}
            </div>
              </div>
              <div className="movieItem-title">
                <h5 className="movieItem-title">{tenPhim}</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default withMovieLayout(MovieItem);
