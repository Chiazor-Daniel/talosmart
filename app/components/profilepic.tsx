import React from 'react'
import woman from "../../public/wmn2.jpeg";

const ProfilePic = () => {
    const divStyle = {
        backgroundImage: `url(${woman.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '50%',
        width: '35px',
        height: '35px',
      };
  return (
    <div style={divStyle}></div>

  )
}

export default ProfilePic