// import React, { useContext, useEffect, useRef , useState} from "react";
// import noteContext from "../context/notes/noteContext";
// import Noteitem from "./Noteitem";
// import AddNote from "./AddNote";
// import { useHistory } from 'react-router';

// export default function Notes(props) {
//     let history = useHistory();
//   const context = useContext(noteContext);
//   // eslint-disable-next-line
//   const { notes, getNote  , editNote} = context;
//   const [note, setNote] = useState({
//     id : "",
//     etitle: "",
//     edescription: "",
//     etag: "",
//   });

//   useEffect(() => {
//     if(localStorage.getItem('token')){
//       getNote();
//     }
//     else{
//       history.push('/Login');
//     }
//     // eslint-disable-next-line
//   }, []);

//   const ref = useRef(null);
//   const refclose = useRef(null);


//   const updateNote = (currentNote) => {
//     ref.current.click();
//     setNote({id : currentNote._id , etitle  : currentNote.title , edescription: currentNote.description , etag : currentNote.tag});
//   };


//   const handleOnClick = (e) => {
//     console.log("updating the note " + note);
//     editNote(note.id , note.etitle , note.edescription , note.etag);
//     refclose.current.click();
//     props.showAlert("Note Updated Successfully" , "success");
//   };
//   const onchange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value });
//   };

//   return (
//     <>
//       <AddNote  showAlert={props.showAlert}/>
//       <button
//         ref={ref}
//         type="button"
//         className="d-none btn btn-primary"
//         data-bs-toggle="modal"
//         data-bs-target="#exampleModal"
//       >
//         Launch demo modal
//       </button>

//       <div
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalLabel">
//                 Edit Note
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form className="my-3">
//                 <div className="mb-3">
//                   <label htmlFor="etitle" className="form-label">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="etitle"
//                     name="etitle"
//                     aria-describedby="emailHelp"
//                     value={note.etitle}
//                     onChange={onchange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="edescription" className="form-label">
//                     Description
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="edescription"
//                     name="edescription"
//                     value={note.edescription}
//                     onChange={onchange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="etag" className="form-label">
//                     Tag
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="etag"
//                     name="etag"
//                     value={note.etag}
//                     onChange={onchange}
//                   />
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button
//                 ref={refclose}
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleOnClick}>
//                 Update Note
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row my-3">
//         <h2>Your Notes</h2>
//         <div className="container">
//             {notes.length===0 && 'NO NOTES ADDED YET'}
//         </div>
//         {notes.map((note) => {
//           return (
//             <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
//           );
//         })}
//       </div>
//     </>
//   );
// }
import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom'; 

export default function Notes(props) {
  let navigate = useNavigate(); 
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();
    } 
    else {
      navigate('/Login'); 
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleOnClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
    props.showAlert("Note Updated Successfully", "success");
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="d-none btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                type="button"
                className="btn btn-primary"
                onClick={handleOnClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && 'NO NOTES ADDED YET'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}
