import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import NavBar from "./NavBar";
import { LoadingContext } from "./LoadingContext";
const Upload = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [file, setFile] = useState();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { email } = useParams();
  const inputRef = useRef();
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      startLoading();
      const response = await fetch(
        `https://data-orchard-server.onrender.com/upload/profileImage/${email}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.email) {
        navigate(`/upload/frontVoterId/${data.email}`);
      } else {
        window.alert("something went wrong");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      stopLoading();
    }
  };

  const getData = async () => {
    startLoading();
    try {
      const response = await fetch(
        `https://data-orchard-server.onrender.com/upload/${email}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserName(data.userName);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handelClick = () => {
    inputRef.current.click();
  };
  return (
    <div className="imageContainer">
      <NavBar userName={userName} />
      <form onSubmit={handleUpload}>
        <h2>Choose a profile image</h2>
        <div className="image-div" onClick={handelClick}>
          {file instanceof File ? (
            <img src={URL.createObjectURL(file)} alt="Profile image" />
          ) : (
            <img src="/placeholderImage.jpg" alt="Profile image" />
          )}
          <input
            style={{ width: "100%", display: "none" }}
            type="file"
            name="profileImage"
            // defaultValue={usersRegistrationDetails.profileImage}
            onChange={(e) => setFile(e.target.files[0])}
            required={true}
            ref={inputRef}
          />
        </div>
        <button type="submit" className="btn">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
