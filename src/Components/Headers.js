import React, {useEffect, useState} from 'react';
const Headers = () => {


    const [detail, setDetail] = useState([]) 


    useEffect(()=>{
        var req = new XMLHttpRequest();
        req.open('GET', document.location, false);
        req.send(null);

        var data = new Object();

        // get all headers in one call and parse each item
        var headers = req.getAllResponseHeaders().toLowerCase();
        var aHeaders = headers.split('\n');

        setDetail(aHeaders)


    }, [])

    return(
        detail && <div>
            {detail.map((item)=>{
            return <p>{item}</p>
            })}
        </div>
    );

}

export default Headers;