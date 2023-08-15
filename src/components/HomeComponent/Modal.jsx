import React, { useState } from "react";
import image from "../../assets/react.svg";
import axios from "axios";
const Modal = ({ openModal, setOpenModal }) => {
  const [res, setRes] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [preview, setpreview] = useState("");
  // const handleFile = (e) => {
  //   e.preventDefault();
  //   setFile(e.target.files[0]);
  // };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jfif"];

    if (!allowedTypes.includes(file.type)) {
      console.log("Only JPEG, PNG, and GIF images are allowed.");
      return;
    }
    setpreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("my_file", file);
      const res = await axios.post("posts/upload", formData);
      console.log(res.data);
      setRes(res.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (content == "" && res.url == undefined) {
      alert("add some values pls");
      return;
    }
    try {
      const data = await axios.post("posts", {
        content,
        img: res.url || "",
      });
      setContent("");
      setRes({});
      setpreview("");
      setOpenModal(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center max-h-full overflow-scroll">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-20 bg-white rounded-lg p-8 w-3/4 relative">
        <div>
          <button
            className="absolute top-0 right-0"
            onClick={() => setOpenModal(false)}
          >
            close
          </button>

          <div>
            <input
              type="file"
              className="hidden"
              id="photo"
              onChange={handleFile}
              accept="image/*"
            />
            <label htmlFor="photo">
              <div className="  my-3 flex flex-col justify-center items-center cursor-pointer">
                <img src={image} alt="" className="w-15 h-16" />
                {file != null ? (
                  <span>{file.name}</span>
                ) : (
                  <span className="text-lg font-medium ">Upload Photo</span>
                )}
                {/* {file && (
                  <button
                    onClick={handleUpload}
                    className="bg-blue-600 px-3 py-2 rounded-lg mx-auto"
                  >
                    {loading ? "uploading..." : "upload "}
                  </button>
                )} */}

                {file && (
                  <button
                    className="bg-blue-600 py-2 px-3"
                    onClick={handleUpload}
                  >
                    {loading
                      ? "uploading..."
                      : // <img src={preview} className="w" />
                        "Upload Image"}
                  </button>
                )}
              </div>
            </label>
            <div className="flex justify-center">
              {preview && (
                <div className="relative">
                  <img
                    src={preview}
                    className="max-h-[200px] aspect-square overflow-hidden object-cover"
                  />
                  <button
                    className="absolute top-0 right-0 text-white font-semibold"
                    onClick={() => setpreview("")}
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <textarea
            name=""
            id=""
            rows="5"
            className="w-full p-3 outline-dotted rounded-lg"
            placeholder="write your thoughts here.."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Modal;
