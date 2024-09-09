import React from 'react';
import appwriteService from '../../appwrite/config.js'
// import './Button.css'; // Assuming you have a CSS file for styling

function Test() {

  const [url, setUrl] = React.useState(null);
  appwriteService.getPosts([]).then((response)=> {
    if(response){
        setUrl(response.documents[0].featuredImage)
    }
                }
                )
    const uri = appwriteService.getFilePreview(url)


  return (
    <div>
      <img src={uri} alt=""/>

    </div>
  );
}

export default Test;
