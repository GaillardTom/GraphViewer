
import React from 'react'



export default function Graph(props){ 

    return( 
        <div class="Card">
            
                <li>
                    <p className='GraphTitleList'>{props.title}</p>
                    <p className='GraphTypeList'> {props.type}</p>
                    <p className='GraphDateList'> {props.date}</p>
                    <img src={props.graphLocation} className="GraphImageList" />

                </li>
            

        </div>
    )

}