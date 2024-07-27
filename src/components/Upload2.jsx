import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import NavBar from "./NavBar";
import { LoadingContext } from "./LoadingContext";
const Upload2 = () => {
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
        `https://data-orchard-server.onrender.com/upload/frontVoterId/${email}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.email) {
        navigate(`/upload/backVoterId/${data.email}`);
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
    try {
      startLoading();
      const response = await fetch(
        `https://data-orchard-server.onrender.com/upload/${email}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setUserName(data.userName);
    } catch (error) {
      console.log(error.message);
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
    <div className="pdf-container">
      <NavBar userName={userName} />
      <div
        className="imageContainer "
        style={{ display: "flex", flexDirection: "column" }}
      >
        <form onSubmit={handleUpload}>
          <h2>Upload your front side of NID</h2>
          <div className="image-div2" onClick={handelClick}>
            {file instanceof File ? (
              <img
                src={URL.createObjectURL(file)}
                alt="image"
                style={{
                  width: "100%",
                  height: "100%",
                  background: "white",
                  objectFit: "cover",
                }}
              />
            ) : (
              <img
                src="/public/nidplaceholder.avif"
                alt="frontNID"
                id="cvImage"
              />
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
    </div>
  );
};

export default Upload2;
