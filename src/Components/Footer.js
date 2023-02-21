import React from 'react';
import { Link } from 'react-router-dom';

import i18n from '../Locales';

const Footer = () => {

    return (
        <div>
            <div className='spacer'></div>
            <div id="footer-bottom" className="footer">
                <div className="d-none d-sm-block">
                <div className="row justify-content-md-center">
                    
                    {/* <div className="col  col-lg-2">
                        <div className="widgetBox text-center">
                            <div className="widgetTitle">
                                <h5> {i18n.helpandsupport} </h5>
                            </div>
                            <div className="widgetContent">
                                <ul>
                                    <li><a href="http://www.khaleef.com/#contact" target="blank"> {i18n.contactus} </a></li>
                                    <li><Link to="/privacy"> {i18n.privacypolicy} </Link></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                    <div className="col col-lg-2 col-xs-12">
                        
                        <div className="large-12 columns">
                            <div className="logo text-center">
                                <img src="/logo.png" alt="" style={{ msFilter:'grayscale(100%)',width:'76px', mixBlendMode:'luminosity', opacity:'1'}} />
                            </div>
                            <div className="btm-footer-text text-center">
                                <p>2020 © <span className="translation_missing" title="translation missing: en.dramatime">PTV Sports</span>.</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="row justify-content-md-center d-block d-sm-none">
                    <div className="col">
                        
                        <div className="col">
                            <div className="logo text-center">
                                <img src="/logo.png" alt=""  style={{ msFilter:'grayscale(100%)',width:'76px', mixBlendMode:'luminosity', opacity:'1'}}  />
                            </div>
                            <div className="btm-footer-text text-center">
                                <p>2020 © <span className="translation_missing" title="translation missing: en.dramatime">PTV Sports</span>.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="js-off-canvas-exit"></div>
            </div>
        </div>
    );
}
export default Footer;