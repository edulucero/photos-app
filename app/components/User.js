import React from 'react'
import PropTypes from 'prop-types'

export default function User({user}) {
  const { username, bio, profile_image, location, links} = user

  return(
    <div className="user-container">
      <div className="row">
        <a href={links.html}>
          <img src={profile_image.large} alt="profile picture" className="usr-img"/>       
        </a>
        <div className="user-meta-container">
        <a href={links.html}>
          <h2 className="user-title">{username}</h2>
        </a>
        <h2 className="user-location">{location}</h2>
        </div>
      </div>
      <p className="user-bio">{bio}</p>
    </div>
  )
}

User.propTypes = {
  username: PropTypes.string,
  bio: PropTypes.string,
  profile_img: PropTypes.string,
  location: PropTypes.string,
  links: PropTypes.string
}