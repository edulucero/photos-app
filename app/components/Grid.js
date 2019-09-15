import React from 'react';

function Grid({imgs}) {
    return (
      <ul className="grid">
        {imgs.map((img) => {
          const { id, urls, description, alt_description } = img
          const  url  = urls.regular
          return(
            <li key={id}>
              <a href={img.links.html}>
                <img className="grid-img" src={url} alt={description ? description : alt_description}/>
              </a>
            </li>
          )
        })}
      </ul>
    )
}

export default Grid
