import userApi from "apis/userApi";
import Loader from "components/Loader/Loader";
import { actupdatePass } from "containers/shared/Auth/module/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { GROUP_ID } from "settings/apiConfig";
import "../UserInfo/UserInfo.scss";
import LichSuDatVe from "./LichSuDatVe/LichSuDatVe";

import "./ModalUserInfo/userUpdateForm.scss";
import WOW from "wowjs";

class UserInfo extends Component {
  state = {
    userInfo: null,
    loadding: true,
    infoShow: false,
    noteHover: "",
    noteLeft: 0,
    error: "",
    userUpdate: {
      taiKhoan: this.props.currentUser.taiKhoan,
      matKhau: "",
      email: "",
      maLoaiNguoiDung: this.props.currentUser.maLoaiNguoiDung,
      maNhom: GROUP_ID,
      hoTen: "",
      soDt: "",
    },
    updateItem: "",
    isShowCollapse: false,
    isBookingHistory: false,
    isDisplayBookingHistory: false,
  };
  componentDidMount() {
    const data = { taiKhoan: this.props.currentUser.taiKhoan };
    userApi
      .fetchBookingHistory(data)
      .then((res) => {
        const { userUpdate } = this.state;
        userUpdate.matKhau = res.data.matKhau;
        userUpdate.email = res.data.email;
        userUpdate.hoTen = res.data.hoTen;
        userUpdate.soDt = res.data.soDT;
        this.setState({
          userInfo: res.data,
          loadding: false,
          userUpdate: userUpdate,
        });
      })
      .catch((error) => {
        window.location.replace('/');
      });
    new WOW.WOW({
      live: false,
    }).init();
  }
  displayInfo = (e) => {
    e.stopPropagation();
    const nameCard = e.target.closest(".fa-address-card");
    const email = e.target.closest(".fa-envelope");
    const phone = e.target.closest(".fa-phone");
    const setting = e.target.closest(".fa-cog");
    const inputForm = document.querySelector(".inputInfo");
    if (!!nameCard) {
      this.setState({ isShowCollapse: true });
      inputForm.value = this.state.userUpdate.hoTen;
      this.wait = setTimeout(() => {
        this.setState({
          updateItem: "H??? t??n",
        });
      }, 200);
    }
    if (!!email) {
      this.setState({ isShowCollapse: true });
      inputForm.value = this.state.userUpdate.email;
      this.wait = setTimeout(() => {
        this.setState({
          updateItem: "Email",
        });
      }, 200);
    }
    if (!!phone) {
      this.setState({ isShowCollapse: true });
      inputForm.value = this.state.userUpdate.soDt;
      this.wait = setTimeout(() => {
        this.setState({
          updateItem: "??i???n tho???i",
        });
      }, 200);
    }
    if (!!setting) {
      this.setState({ isShowCollapse: true });
      inputForm.value = this.state.userUpdate.matKhau;
      this.wait = setTimeout(() => {
        this.setState({
          updateItem: "M???t kh???u",
        });
      }, 200);
    }
    if (!nameCard && !email && !phone && !setting) {
      this.closeAllCollaps();
    }
  };
  closeAllCollaps = () => {
    this.setState({
      updateItem: "",
      error: "",
    });
    this.wait = setTimeout(() => {
      this.setState({ isShowCollapse: false });
    }, 500);
  };
  changeInfoUser = (e) => {
    const value = e.target.value;
    let name = "";
    switch (this.state.updateItem) {
      case "H??? t??n":
        name = "hoTen";
        break;
      case "Email":
        name = "email";
        break;
      case "??i???n tho???i":
        name = "soDt";
        break;
      case "M???t kh???u":
        name = "matKhau";
        break;
      default:
        break;
    }
    const { userUpdate } = this.state;
    for (let key in userUpdate) {
      if (key === name) {
        userUpdate[key] = value;
        break;
      }
    }
    this.setState({
      userUpdate: userUpdate,
      error: "",
    });
  };
  updateUserInfo = () => {
    if (this.state.updateItem === "M???t kh???u") {
      if (
        this.state.userUpdate.matKhau !== this.state.userInfo.matKhau &&
        this.state.userUpdate.matKhau !== ""
      ) {
        this.updateUser();
        return;
      } else if (this.state.userUpdate.matKhau === "") {
        this.setState({ error: "M???t kh???u ??ang b??? tr???ng" });
        return;
      } else {
        this.setState({ error: "M???t kh???u ch??a thay ?????i" });
        return;
      }
    }
    if (
      this.state.userUpdate.email === "" ||
      this.state.userUpdate.hoTen === "" ||
      this.state.userUpdate.email === "" ||
      this.state.userUpdate.soDt === "" ||
      this.state.userUpdate.matKhau === ""
    ) {
      this.setState({
        error: "Ph???n nh???p ??ang b??? tr???ng. Xin vui l??ng ??i???n th??ng tin thay ?????i",
      });
      return;
    } else {
      this.updateUser();
    }
  };
  updateUser = () => {
    userApi
      .postUpdateUser(this.state.userUpdate, this.props.currentUser.accessToken)
      .then((res) => {
        const { userUpdate } = this.state;
        switch (this.state.updateItem) {
          case "H??? t??n":
            userUpdate.hoTen = res.data.hoTen;
            break;
          case "Email":
            userUpdate.email = res.data.email;
            break;
          case "??i???n tho???i":
            userUpdate.soDt = res.data.soDT;
            break;
          case "M???t kh???u":
            userUpdate.matKhau = res.data.matKhau;
            const user = {
              taiKhoan: userUpdate.taiKhoan,
              matKhau: userUpdate.matKhau,
            };
            this.props.updatePassword(user);
            break;
          default:
            break;
        }
        this.setState({
          userUpdate: userUpdate,
          error: "C???p nh???t th??nh c??ng",
        });
        this.wait = setTimeout(() => {
          this.closeAllCollaps();
        }, 1000);
      })
      .catch((error) => {
        this.setState({
          error: "C???p nh???t th???t b???i",
        });
      });
  };
  showBookingHistory = () => {
    if (!this.state.isBookingHistory) {
      this.setState({
        isBookingHistory: true,
      });
      this.wait = setTimeout(() => {
        this.setState({
          isDisplayBookingHistory: true,
        });
      }, 200);
    } else {
      this.setState({
        isDisplayBookingHistory: false,
      });
      this.wait = setTimeout(() => {
        this.setState({
          isBookingHistory: false,
        });
      }, 200);
    }
  };
  changeUserInfo = (event) => {
    event.stopPropagation();
  };
  closeUserInfo = (event) => {
    this.closeAllCollaps();
  };
  render() {
    const {
      userInfo,
      loadding,
      updateItem,
      isShowCollapse,
    } = this.state;
    if (!!loadding) {
      return <Loader />;
    }
    return (
      <div className="userInfoContent" onClick={this.closeUserInfo}>
        <div
          className="user__banner"
          style={{ backgroundImage: "url(/images/user-bg.jpg)" }}
        ></div>
        <div className="container ">
          <div className="userInfo">
            <div
              className="userInfo-icon wow fadeScale"
              data-wow-scroll="true"
              data-wow-duration="1s"
            >
              <i class="fa fa-user"></i>
            </div>
            <div
              className="userAccount wow fadeScale"
              data-wow-scroll="true"
              data-wow-duration="2s"
            >
              <div className="item-account">
                Xin ch??o <p>{userInfo.taiKhoan}</p>
              </div>
            </div>
            <div
              className="userInfo-content wow fadeInRight"
              data-wow-scroll="true"
              data-wow-duration="2s"
              onClick={this.displayInfo}
            >
              <div className="userInfoIcon">
                <i class="fa fa-address-card"></i>
                <div className="noteHover">H??? t??n</div>
              </div>
              <div className="userInfoIcon">
                <i class="fa fa-envelope"></i>
                <div className="noteHover">Email</div>
              </div>

              <div className="userInfoIcon">
                <i class="fa fa-phone"></i>
                <div className="noteHover">??i???n tho???i</div>
              </div>
              <div className="userInfoIcon">
                <i class="fa fa-cog"></i>
                <div className="noteHover">M???t kh???u</div>
              </div>
            </div>
            <div
              className={
                "formInputContent " +
                (updateItem !== "" ? "show " : "") +
                (!!isShowCollapse ? "display" : "")
              }
            >
              <div className="formInput" onClick={this.changeUserInfo}>
                <div className="formInput-title">{updateItem}</div>
                <div className="formInput-form">
                  <input
                    className="inputInfo"
                    type="text"
                    onChange={this.changeInfoUser}
                  />
                  <button className="updateInfor" onClick={this.updateUserInfo}>
                    <i class="fa fa-chevron-circle-up"></i>
                  </button>
                  <div className="closeBtn" onClick={this.closeAllCollaps}>
                    <i class="fa fa-times"></i>
                  </div>
                </div>
              </div>

              <small className="noteDescript">
                Thay ?????i th??ng tin v?? b???m c???p nh???t ????? c???p nh???t l???i t??i kho???n
              </small>
              <br />
              <small className="noteError">{this.state.error}</small>
            </div>
            <button
              class="userInfo-btn wow fadeInUp"
              data-wow-scroll="true"
              data-wow-duration="1s"
              onClick={this.showBookingHistory}
            >
              {this.state.isBookingHistory
                ? "???n l???ch s??? ?????t v??"
                : "L???ch s??? ?????t v??"}
            </button>
          </div>
          <div
            className={
              "overPlay " + (this.state.isBookingHistory ? "show" : "")
            }
          ></div>
          <LichSuDatVe
            isDisplay={this.state.isDisplayBookingHistory}
            currentUser={this.state.userInfo}
            isBookingHistory={this.state.isBookingHistory}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loadding: state.authUserReducer.loadding,
  currentUser: state.authUserReducer.currentUser,
  thongTinDatVe: state.authUserReducer.thongTinDatVe,
});
const mapDispatchToProps = (dispatch) => ({
  updatePassword: (updatedUser) => {
    dispatch(actupdatePass(updatedUser));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
