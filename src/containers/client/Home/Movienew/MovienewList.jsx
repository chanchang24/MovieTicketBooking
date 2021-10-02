import React, { Component } from "react";
import Slider from "react-slick";
import MovieTimePlan from "containers/shared/TimePlan/MovieTimePlan";
import { connect } from "react-redux";
import { actChangeCurrentMovieNew } from "../module/actions";

class MovienewList extends Component {
  state = {
    slideItem: 4,
  }
  changeSlide = (event) => {
    const nextBtn = event.target.closest('.movieNewList-next');
    const prevBtn = event.target.closest('.movieNewList-prev');
    const slickNextBtn = document.querySelector('.slick-next');
    const slickPrevBtn = document.querySelector('.slick-prev');
    if(!!nextBtn){
      slickNextBtn.click();
    }
    else if(!!prevBtn){
      slickPrevBtn.click();
    }
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: this.state.slideItem,
      slidesToScroll: 2,
    };
    const { newMovie, currentMovieIdx } = this.props;
    return (
      <>
        <div className="container movieNewList">
          <div className="movieNewList-prev btn-changeSlide" onClick={this.changeSlide}>
          <i class="fa fa-angle-left"></i>
          </div>
          <Slider {...settings}>
            {newMovie.map((item, idx) => {
              return (
                <div className="movieList-Item" key={idx}>
                  <div className="movieList-content">
                    <div
                      className={
                        "movieList-container " +
                        (idx == currentMovieIdx ? "active" : "")
                      }
                      data-index={idx}
                    >
                      <div className="movieList-img">
                        <img
                          src={item.hinhAnh}
                          alt={item.biDanh}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "./images/assets/images/cinemaDefault.jpg";
                          }}
                        />
                      </div>
                      <div className="movieList-text">
                        <h6>{item.tenPhim}</h6>
                        <p>{new Date(item.ngayKhoiChieu).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
          <div className="movieNewList-next btn-changeSlide" onClick={this.changeSlide}>
          <i class="fa fa-angle-right"></i>
          </div>
        </div>
      </>
    );
  }
  componentDidMount() {
    const movieNewList = document.querySelector(".movieNewList");
    movieNewList.addEventListener("click", this.handleEvent);
  }
  handleEvent = (event) => {
    const movieItem = event.target.closest(".movieList-container");
    const movieItemActive = event.target.closest(".movieList-container.active");
    if (!!movieItem && !movieItemActive) {
      const idx = movieItem.dataset.index;
      console.log(idx);
      this.props.CurrentMovieChange(idx);
    }
  };
}
const mapStateToProps = (state) => ({
  newMovie: state.movieReducer.newMovie,
  currentMovieIdx: state.movieReducer.currentMovieIdx,
});
const mapDispatchToProps = (dispatch) => ({
  CurrentMovieChange: (idx) => {
    dispatch(actChangeCurrentMovieNew(idx));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MovienewList);
