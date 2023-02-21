import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import i18n from '../Locales';

class TopNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addClass: false,
      addProfile: false,
      showClass: false,
      view: [],
      listView: null,
      newCatList: [],
      query: '',
      prevScrollpos: window.pageYOffset,
      visible: true
    }
    this.searchInput = this.searchInput.bind(this);
    this.enableRedirect = this.enableRedirect.bind(this)
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillMount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  enableRedirect = (e) => {
    if (e.key === 'Enter' && this.state.query.trim() !== '') {
      this.props.history.push('/search', this.state.query)
    }
  }

  searchInput = (e) => {
    this.setState({ query: e.target.value })
    if (e.key === 'Enter') {
      console.log('do validate');
    }

  }

  toggle() {
    this.setState({ addClass: !this.state.addClass });
  }

  toggleLink(e) {
    this.setState({ showClass: !this.state.showClass });
    e.preventDefault()
  }

  brandHide() {
    this.setState({ disPlay: !this.state.disPlay });
  }

  toggleUser() {
    this.setState({ addProfile: !this.state.addProfile });
  }

  render() {
    let changeClass = [" "];

    if (this.state.addClass) {
      changeClass.push('open d-block');
    }

    let changeLogin = [" "];

    if (this.state.addProfile) {
      changeLogin.push('open d-block');
    }

    let changeLink = [" "];

    if (this.state.showClass) {
      changeLink.push('collapsed');
    }

    let changeShow = [" "];

    if (this.state.showClass) {
      changeShow.push('show');
    }

    let changeHide = [" "];

    if (this.state.disPlay) {
      changeHide.push('brand-hide');
    }

    return (
      <div>
        {/* the side menu bar for mobile browser view */}

        <div className={'navbar-collapse offcanvas-collapse navbar-adj' + changeClass.join(' ')}>
          <div className="sidebar-hide">
            <div className="blank-area" onClick={this.toggle.bind(this)}></div>
            <nav id="sidebar" className="sidebar">
            <div className="top-sidbar-blue">
                <button className="clickBack" onClick={this.toggle.bind(this)}></button>
                <div className="profil-image"></div>
              </div>
              <div className="sidebar-content">
                {
                  this.props.isUser ?
                  <div className="sidebar-user">
                    <Link to="/profile" onClick={this.toggle.bind(this)}>
                      <img src={this.props.userData.profileImage || "avatar.jpg"} className="img-fluid rounded-circle mb-2" alt="" />
                      <div className="font-weight-bold"></div>
                      <div className="ellipsis"><small className="user-name ellipsis" style={{color: 'white'}}>{this.props.userData.name}</small></div>
                    </Link>
                  </div>
                  :
                  ''
                }
                <ul className="sidebar-nav">
                  <li className={"sidebar-item new-items"}>
                    <Link to={'/'} className="sidebar-link" onClick={this.toggle.bind(this)}>
                      <i className="dt-icon-home" style={{color: 'white'}}></i> <span className="align-middle" style={{color: 'white'}}>Home</span>
                    </Link>
                  </li>
                  <li className={"sidebar-item new-items"}>
                    <Link to={'/schedule'} className="sidebar-link" onClick={this.toggle.bind(this)}>
                      <i className="fa fa-calender-alt" style={{color: 'white'}}></i> <span className="align-middle" style={{color: 'white'}}>Schedule</span>
                    </Link>
                  </li>
                  {
                    this.props.isUser && <li className="sidebar-item new-items ">
                      <Link to="" className="sidebar-link" onClick={() => { this.props.setUser({}, false); this.toggle.bind(this); localStorage.removeItem('user') }}>
                        <i className="dt-icon-logout" style={{color: 'white'}}></i> <span className="align-middle" style={{color: 'white'}}>{i18n.logout}</span>
                      </Link>
                    </li>
                  }
                </ul>
              </div>
            </nav>
          </div>
        </div>

        {/* end of the side menu bar */}

        <nav className="navbar fixed-top navbar-light bg-light vbx-blue cellphone-nav">
          <button className="navbar-toggler" type="button" onClick={this.toggle.bind(this)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-brand">
            <Link to="/">
              <img src="/logo.png" alt="" className="logo" width="100%" />
            </Link>
          </div>
        </nav>
        <nav className="navbar fixed-top navbar-light bg-light vbx-blue desktop-nav">

          <div className="container pl-0 pr-0">
            <div className="row w-100 m-0">
              <div className="col col-md-3 col-lg-1 pl-0 pr-0">
                <button className="navbar-toggler" type="button" onClick={this.toggle.bind(this)}>
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-brand">
                  <Link to="/">
                    <img src="/logo.png" alt="" className="logo" width="100%" />
                  </Link>
                </div>
              </div>
              <div className="col col-md-auto menu-nav">
                <div className="menu-container">
                  <nav className="menu w-100">
                    <ol className="">
                      {/* {
                        this.state.view && this.state.view.map(item=>{
                          return(
                            <li key={'nav'+item.id} className={"menu-item " + (window.location.pathname === `/category/${item.id}` ? 'active' : '')}  >
                              <Link to={`/category/${item.id}`}> {this.props.lang ==='' ? item.name:item['title'+this.props.lang]} </Link>
                            </li>
                          )
                        })
                      } */}
                      <li className={"menu-item"}>
                        <Link to={'/'}>Home</Link>
                      </li>
                      <li className={"menu-item"}>
                        <Link to={'/schedule'}>Schedule</Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              {
                this.props.isUser &&
                <div className="col col-md-auto pr-0 d-none d-md-block pl-0 ml-auto">
                  <nav className="menu user-profile ml-2">
                    <ol>
                      <li className={"menu-item  " + (window.location.pathname === "/profile" ? 'active' : '')}>
                        <Link to="#" onClick={(event) => event.preventDefault()} className="ml-0 pl-0 mb-0 pb-0 pt-0">
                          <div className="row ml-0">
                            <div className="col pl-2 pr-2">
                              {this.props.userData.firstName && this.props.userData.lastName
                                ?
                                <small className="user-name ellipsis mt-2" style={{fontSize: '14px'}}> {this.props.userData.firstName} {this.props.userData.lastName} </small>
                                :
                                <small className="user-name ellipsis mt-2 user-color"> User </small>
                              }
                            </div>
                            <div className="col-auto pl-0 pr-0  align-self-end">
                              <div className="sidebar-user user p-0">
                                <img
                                  src={this.props.userData.profileImage || "avatar.jpg"}
                                  className="img-fluid rounded-circle"
                                  alt=""
                                  style={{ width: '42px', height: '42px', border: 'none' }}

                                />
                              </div>
                            </div>
                          </div>
                        </Link>
                        <ol className="sub-menu">
                          <li className="menu-item">
                            <Link to="/profile" onClick={() => { this.toggle.bind(this) }}>
                              <i className="dt-icon-user style={{color: 'white'}}"></i> {i18n.profile}
                            </Link>
                          </li>
                          <li className="menu-item">
                            <Link to=""
                              onClick={() => { this.props.setUser({}, false); this.toggle.bind(this); localStorage.removeItem('user') }}>
                              <i className="dt-icon-logout mr-1" style={{color: 'white'}}></i>  {i18n.logout}
                            </Link>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </nav>
                </div>
              }
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(TopNavbar);