import React , {useContext , useState } from 'react';
import noteContext from "../context/notes/noteContext";

export default function AddNote(props) {
    const context = useContext(noteContext);
  // eslint-disable-next-line
  const { addNote } = context;

  const [note , setNote] = useState({title:"", description : "", tag:""})
  const handleOnClick = (e)=>{
    e.preventDefault();
    addNote(note.title , note.description , note.tag);
    setNote({title:"", description : "", tag:""});
    props.showAlert("Note Added Successfully" , "success");
  };
  const onchange = (e)=>{
    setNote({...note,[e.target.name]: e.target.value})
  };
  return (
    <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={note.title}
              name='title'
              aria-describedby="emailHelp"
              onChange={onchange}
            />
            {/* <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name='description'
              value={note.description}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name='tag'
              value={note.tag}
              onChange={onchange}
            />
          </div>
          
          <button disabled={note.title.length < 5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleOnClick}>
            Add Note
          </button>
        </form>
      </div>
  )
}
