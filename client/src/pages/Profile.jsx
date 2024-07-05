import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // console.log(formData);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center pt-8 space-y-3">
      <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>

      <form className="flex flex-col space-y-2 w-[14rem] sm:w-[20rem]">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="Profile pic"
          onClick={() => fileRef.current.click()}
          className="h-[7rem] w-[7rem] rounded-full cursor-pointer self-center object-cover"
        />

        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="name"
          placeholder="Name"
          className="rounded-md px-2 py-1 border-0 text-[.8rem] focus:outline-none"
        />

        <input
          type="text"
          id="username"
          placeholder="Username"
          className="rounded-md px-2 py-1 border-0 text-[.8rem] focus:outline-none"
        />

        <input
          type="text"
          id="email"
          placeholder="Email"
          className="rounded-md px-2 py-1 border-0 text-[.8rem] focus:outline-none"
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="rounded-md px-2 py-1 border-0 text-[.8rem] focus:outline-none"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-md px-3 py-1 border-0 text-[.8rem] hover:bg-slate-500 active:translate-y-px"
        >
          {loading ? "Loading..." : "UPDATE"}
        </button>

        <button
          disabled={loading}
          className="bg-red-600 text-white rounded-md px-3 py-1 border-0 text-[.8rem] hover:bg-red-500 active:translate-y-px"
          // onClick={handleSubmit}
        >
          {loading ? "Loading..." : "CREATE LISTING"}
        </button>
      </form>

      <div className="flex justify-between w-[14rem] sm:w-[20rem] px-2">
        <span className="text-red-600 cursor-pointer text-[0.9rem]">
          Delete account
        </span>
        <span className="text-red-600 cursor-pointer text-[0.9rem]">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
