import React, { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
const EditChude = () => {
  const colRef = collection(db, "Chude");
  // state
  const [machude, setMaChuDe] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [name, setName] = useState();
  const [overview, setOverview] = useState();
  const [idTopic, setIdTopic] = useState();
  // list topics
  const [topics, setTopics] = useState();
  // set hide
  const [hide, setHide] = useState(false);
  //

  const navigate = useNavigate();

  useEffect(() => {
    //get collection data
    // getDocs(colRef).then((snapshot) => {
    //   let users = [];
    //   snapshot.docs.forEach((doc) => {
    //     users.push({ id: doc.id, ...doc.data() });
    //   });
    //   setTopics(users);
    //   // console.log(users);
    // });

    // 2.
    onSnapshot(colRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setTopics(users);
    });
  }, []);
  const form = document.querySelector("form");
  const formRm = document.querySelector("#frmRm");
  // handle
  const handleAdd = (e) => {
    e.preventDefault();
    console.log("submit");
    addDoc(colRef, {
      MaChuDe: machude,
      Image_URL: imgUrl,
      Name: name,
      OV: overview,
    }).then(() => {
      console.log("success");
      form.reset();
    });
  };
  const handleRemove = async (e) => {
    e.preventDefault();
    const colRefTopic = doc(db, "Chude", idTopic);
    await deleteDoc(colRefTopic);
    console.log("success");
    formRm.reset();
  };
  return (
    <>
      <div className="p-10 ">
        {/* <button
          className="bg-black text-white p-5 rounded-lg h-full"
          onClick={() => navigate("/dashboard")}
        ></button> */}
        <div className="flex">
          <div className="max-w-[500px] mx-auto w-full bg-white shadow-lg p-5 mb-10 rounded-lg">
            <form onSubmit={handleAdd}>
              <input
                type="text"
                className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
                placeholder="Enter your Code Topic"
                name="MaChuDe"
                onChange={(e) => setMaChuDe(e.target.value)}
              />
              <input
                type="text"
                className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
                placeholder="Enter your Name Topic"
                name="NameChuDe"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="url"
                className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
                placeholder="Enter your Image Url"
                name="Url"
                onChange={(e) => setImgUrl(e.target.value)}
              />
              <input
                type="text"
                className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
                placeholder="Enter your Overview"
                name="Overview"
                onChange={(e) => setOverview(e.target.value)}
              />
              <button
                type="submit"
                className="p-3 bg-blue-500 text-white rounded-lg text-sm font-semibold"
              >
                Add Topic
              </button>
            </form>
          </div>
          {/* remove by id */}
          <div className="max-w-[500px] mx-auto w-full bg-white shadow-lg p-5 mb-10 rounded-lg">
            <form onSubmit={handleRemove} id="frmRm">
              <input
                type="text"
                className="p-3 rounded-lg border border-gray-200 w-full mb-5 outline-none focus:border-green-500 border-x-2"
                placeholder="Enter your Code Topic"
                name="idTopic"
                onChange={(e) => setIdTopic(e.target.value)}
              />

              <button
                type="submit"
                className="p-3 bg-red-500 text-white rounded-lg text-sm font-semibold"
              >
                Remove Topic
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-3 mb-5">
          <button
            className="bg-slate-500 p-4 text-white rounded-lg mb-5"
            onClick={(e) => navigate("/dashboard")}
          >
            Back
          </button>
          <button
            className="bg-slate-500 p-4 text-white rounded-lg mb-5"
            onClick={() => setHide(!hide)}
          >
            {hide ? "Hide" : "Show"}
          </button>
        </div>

        {/* table */}
        <div className="w-full mx-auto justify-between bg-white shadow-lg flex flex-wrap rounded-lg">
          <table cellspacing="0" className="w-full" id="tv">
            <tr className="">
              <th className="font-semibold py-4 bg-slate-300">ID</th>

              <th className="font-semibold py-4 bg-slate-300">Hình</th>
              <th className="font-semibold py-4 bg-slate-300">Mã chủ đề</th>
              <th className="font-semibold py-4 bg-slate-300">Tên chủ đề</th>
              <th className="font-semibold py-4 bg-slate-300">Overview</th>

              {/* <th width="230">Comments</th> */}
            </tr>
            {topics.length > 0 &&
              topics.map((topic) => (
                <tr key={topic.id} className="">
                  <td className="font-semibold">{topic.id}</td>
                  <td className="w-[100px] h-[100px]  overflow-hidden text-center p-3">
                    <img
                      src={topic.Image_URL}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </td>
                  <td>{topic.MaChuDe}</td>
                  <td>{topic.Name}</td>
                  <td width={"500px"}>{topic.OV}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default EditChude;
