import React from 'react';

/**** Components Imports ****/

import Promotion from './Promotion'
import ContentSlider from './ContentSlider';
import SquareTwoLiines from './SquareTwoLines';
import CategoryPromotion from './CategoryPromotion';


/******************************
****** Helpers Functions ******
******************************/


const getDataForProjectCategory = (data) => {

    let arr = []
    try { //extract content from data array in case of project_categories
        data.map((item) => {
            let temp = item.thumbnails[0]
            let obj = item.content[0]
            obj['thumbnails'] = temp

            arr.push(obj)
        })
    } catch (e) {
        console.log("Error in home->getDataForProjectCategory", e.message)
    }
    return arr;
}

/***************************
***** Helpers Exports ******
***************************/

// export const getComponentType = (data, pageType) => {

//     const viewType = data.view_type;
//     let content = (data.list_view_items === "project_categories" ?
//         getDataForProjectCategory(data.data) : data.data)

//     switch (viewType) {
//         case 'promotion':
//         case 'full_cell':
//             return (
//                 (pageType === "home" || pageType === "dramas" || pageType==="movies") ?
//                     <Promotion key={"home" + data.id} type="promotion" data={content} />
//                     :
//                     <CategoryPromotion key={"home" + data.id} type="category-promotion" data={content} />
//             );
//         case 'landscape_detail':
//             return <ContentSlider key={"home" + data.id} type="drama-detail" data={content} />
//         case 'landscape':
//             return <ContentSlider key={"home" + data.id} type="drama" data={content} />
//         case 'portrait_detail':
//             return <ContentSlider key={"home" + data.id} type="movie-detail" data={content} />
//         case 'portrait':
//             return <ContentSlider key={"home" + data.id} type="movie" data={content} />
//         case 'square_two_lines':
//             return <SquareTwoLiines key={"home" + data.id} type="videos" data={content} />;

//         default:
//             return ""
//     }
// }


export const getLiveStreams = (links) => {
    return (
        <Promotion links={links}></Promotion>
    )
}

export const getComponentType = (data, pageType) => {

    const viewType = data.view_type;
    let content = (data.list_view_items === "project_categories" ?
        getDataForProjectCategory(data.data) : data.data)

    switch (viewType) {
        case 'promotion':
        case 'full_cell':
            return (
                (pageType === "home" || pageType === "dramas" || pageType === "movies") ?
                    ""
                    :
                    <CategoryPromotion key={"home" + data.id} type="category-promotion" data={content} />
            );
            case 'landscape_detail':
                return <ContentSlider key={"home" + data.id} type="drama-detail" data={content} />
            case 'landscape':
                return <ContentSlider key={"home" + data.id} type="drama" data={content} />
            case 'portrait_detail':
                return <ContentSlider key={"home" + data.id} type="movie-detail" data={content} />
            case 'portrait':
                return <ContentSlider key={"home" + data.id} type="movie" data={content} />
            case 'square_two_lines':
                return <SquareTwoLiines key={"home" + data.id} type="videos" data={content} />;
            
            default:
                return ""

    }
}

export const timeConvert = (n) => {

    let totalSeconds = n
    let hour = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minute = Math.floor(totalSeconds / 60);
    let second = Math.floor(totalSeconds % 60);

        //   console.log("new date ",hour," : ",minute,' : ',second);

        
    let str = '';
    if (hour > 0) str += hour + "h:"
    if (minute > 0) str += minute + "m:"

    str+=second+"s"
    return str;
}