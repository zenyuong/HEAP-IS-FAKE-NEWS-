import React, {useRef, useState} from "react";
import { Toaster, toast } from 'react-hot-toast';
import "./Body.css";
import axios from "axios";

export default function BodyURL() {
  const URL = useRef();
  const [result, setResult] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Link = URL.current?.value;
    axios
      .post("http://localhost:1010/article/action", {
        method: "POST",
        body: JSON.stringify({ URL: Link })
      })
      .then(res => {
          toast.success("Success!", {duration: 1500});
          res.json()
        }
      )
      .then(output => {
        console.log(output)
        setResult(output.data)
        }
      )
      .catch(err => {
          toast.error("Oops, something went wrong!", {duration: 1500});
          console.log(err)
        }
      )
  };

  return (
    <>
      <div className={"body-container"}>
        <Toaster/>
        <div className={"body-icons globe"}>
          <img src="globe.png" alt="globe" width="130" height="130"/>
        </div>
        <div className={"input-box"}>
          <form onSubmit={handleSubmit}>
            <input
              className="input-box-url"
              type="text"
              size={80}
              placeholder="Enter URL"
              ref={URL}
            />
            <i className="fa-solid fa-link fa-lg"></i>
            <br />
            <button type="submit">Check Validity</button>
          </form>
        </div>
        <div className={'body-content'}>
            <h1 className={'label'}>
              Hello
              {result.label}
            </h1>
            <h3 className={'count'}>
              Search Count: {result.searchCount}
            </h3>
            <h3 className={'news-title'}>
              Title: {result.title}
            </h3>
        </div>
      </div>
    </>
  );
}
