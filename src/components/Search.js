import React, { useState } from "react";
import { Button, TextField, LinearProgress } from "@material-ui/core";
import Shortcode from "../api/Shortcode";



// url validator
const HTTP_URL_VALIDATOR_REGEX= /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;


export default function Search() {
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const validateURL=(string)=>{
      return string.match(HTTP_URL_VALIDATOR_REGEX);
  }
  // console.log(link);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateURL(link))
    {
        getLink();
        setLink('');
        setIsLoading(!isLoading);
    }
   else
   {
       setShort('Please enter a valid url');
   }
  };
  const getLink = async () => {
    await Shortcode.get(`shorten?url=${link}`)
      .then((response) => {
        setShort(response.data.result.short_link);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          style={{ marginBottom: "20px" }}
          label="Input your link"
          variant="outlined"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {!isLoading && (
          <Button
            style={{ marginBottom: "20px" }}
            onClick={(e) => handleSubmit(e)}
            variant="contained"
            color="primary"
          >
            Generate
          </Button>
        )}
        {isLoading && <LinearProgress/>}
      </form>
      {short && <div>Short Link : {short}</div>}
    </>
  );
}
