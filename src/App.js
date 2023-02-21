import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

//********** Components  **********//

import TopNavbar from './Components/TopNavbar'
import Home from './Components/Home';
import Play from './Components/Play';
import Profile from './Components/Profile';
import Footer from './Components/Footer';
import Privacy from './Components/Privacy';
import ScrollToTop from './Components/ScrollToTop'
import Headers from './Components/Headers';
import Livestream from './Components/Livestream';
import UserVerification from './Components/UserVerification';
import Schedule from './Components/Schedule';

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
      loggedIn: localStorage.getItem('user') ? true : false,
      lang: localStorage.getItem('lang') || '' // for en we dont need any type
    }
    this.setUser = this.setUser.bind(this);
    this.setLang = this.setLang.bind(this);
  }



  componentWillMount() {

    let url = new URL(window.location.href)
    let msisdn = url.searchParams.get('msisdn')
    if (msisdn) this.getUserDetails(msisdn);
  }


  componentDidMount() {

    if (this.state.lang === '_ur') {
      import('./App-rtl.css')
    }

  }

  setUser(loggedInUser, loggedInStatus) {

    this.setState({ user: loggedInUser })
    this.setState({ loggedIn: loggedInStatus });
    console.log('User login', this.state.user)
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(loggedInUser))

  }

  setLang(newLang) {

    localStorage.setItem('lang', newLang)
    //this.setState({ lang: newLang });
    window.location.reload()

  }


  render() {
    
    if (window.location.pathname.includes('user-verification')) {
      let paramArray = window.location.pathname.split('/');
      let id = paramArray[2];
      let emailVerificationToken = paramArray[3];
  
      return (
        <UserVerification id={id} emailVerificationToken={emailVerificationToken} setUser={this.setUser}></UserVerification>
      )
    }

    return (
      <div>
        {
          <Router>
            <div className="container-fluid">
              <div className="row">
                <div className="col pl-0 pr-0 wrapper">

                  <TopNavbar props={this.props} isUser={this.state.loggedIn} setUser={this.setUser} userData={this.state.user} setLang={this.setLang} lang={this.state.lang}/>

                  <Route exact path="/" render={(props) => <Home {...props} lang={this.state.lang}></Home>} />
                  <Route exact path="/play" render={(props) => <Play {...props} isUser={this.state.loggedIn} userData={this.state.user} setUser={this.setUser} lang={this.state.lang}></Play>} />
                  <Route exact path="/profile" render={(props) => <Profile {...props} isUser={this.state.loggedIn} userData={this.state.user} setUser={this.setUser} lang={this.state.lang}></Profile>} />
                  <Route exact path="/privacy" render={(props) => <Privacy {...props} ></Privacy>} />
                  <Route exact path="/headers" render={(props) => <Headers {...props} ></Headers>} />
                  <Route exact path="/livestream" render={(props) => <Livestream {...props} isUser={this.state.loggedIn} userData={this.state.user} setUser={this.setUser}></Livestream>} />
                  <Route exact path="/schedule" render={(props) => <Schedule {...props} ></Schedule>} />

                </div>
              </div>
              <div className="row align-items-end">
                <div className="col p-0">
                  <Footer />
                </div>
              </div>
            </div>
            <ScrollToTop />
          </Router>
        }

      </div>
    );
  }
}

export default App;