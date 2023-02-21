import React, { useState, useEffect } from 'react';
import { getLiveStreams, getComponentType } from './Helpers';

import { Globals } from '../Constants';

import Login from './Login';
import Loader from './Loader';

const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
const user = JSON.parse(localStorage.getItem('user'));

const apiURL = Globals.baseAPIURL + 'api/';

function Home(props) {

  const [links, setLinks] = useState([]);
  const [home, setHome] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  useEffect(() => {
    const setHomeState = async () => {
      try {
        setLoading(true);
        const url = `${Globals.contentURL}/api/project/${Globals.contentSecretKey}/${Globals.contentProjectId}/show_list_view/30`
        let resp = await fetch(url);
        let respObj = await resp.json();
        setHome(respObj.data.view_list_project_categories.reverse())
        setLoading(false);

      } catch (e) {
        console.log("Error in App->Home", e.message)
      }
    }


    setHomeState();
  }, [])

  useEffect(() => {
    const setLinksState = async () => {
      try {
        setLoading(true);

        let token = user ? 'Bearer '+ user.token : '';
        let linkURL = apiURL + 'getAllLinks';

        const requestOptions = {
          method: 'GET',
          headers: { "Authorization" : token }
        };

        let response = await fetch(linkURL, requestOptions);
        response = await response.json();

        if (response.response_code === 0) {
          setLinks(response.links.reverse());
          setLoading(false);
        } else if (response.response_code === 109) {
          setIsUserLoggedIn(false);
        }
      } catch (e) {
        console.log('error while fetching links')
      }
    }
    setLinksState();
  }, []);

  return (
    loading 
      ?
        <Loader />
      :
    isUserLoggedIn
      ?
      <>
        {links && links.length > 0 && getLiveStreams(links)}

        {
          home && home.map((item, index) => {
            return (
              <div key={item.id}>
                {item.label.toLowerCase() !== "promotion" && <h1 className="section-title"> {item.label}</h1>}
                <div> {getComponentType(item, "home")} </div>
              </div>
            )
          })
        }
      </>
      :
      <Login setUser={props.setUser} />
      
  );
}

export default Home;