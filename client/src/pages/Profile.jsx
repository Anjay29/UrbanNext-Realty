import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import axios from "axios";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState("");
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await axios.post(
        `/api/v1/update/${currentUser._id}`,
        formData
      );
      // console.log(res.data);
      dispatch(updateUserSuccess(res.data));
      setUpdateSuccess("User updated successfully!")
    } catch (error) {
      if (error.response) {
        dispatch(
          updateUserFailure(error.response.data.message || "An error occurred")
        );
        console.log(error.response.data);
      } else {
        dispatch(updateUserFailure("Something went wrong, try later!"));
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-8 space-y-3">
      <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-2 w-[14rem] sm:w-[20rem]"
      >
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
            <span className="text-green-700">Image successfully uploaded! Click Update</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="name"
          defaultValue={currentUser.name}
          placeholder="Name"
          className="rounded-md px-2 py-1 border-0 text-[.8rem] focus:outline-none"
          onChange={handleChange}
        />

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          className="rounded-md px-2 py-1 border-0 text-[.8rem] focus:outline-none"
          onChange={handleChange}
        />

        <input
          type="text"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          className="rounded-md px-2 py-1 border-0 text-[.8rem] focus:outline-none"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="rounded-md px-2 py-1 border-0 text-[.8rem] focus:outline-none"
          onChange={handleChange}
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
          CREATE LISTING
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
      {error && <p className="text-red-500">{error}</p>}
      {updateSuccess && <p className="text-green-500">{updateSuccess}</p>}
    </div>
  );
};

export default Profile;
