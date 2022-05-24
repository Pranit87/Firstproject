const AddNote = () => {
    return (
        <div className = "notenew">
            <textarea row = '8'
             cols = '10' 
             placeholder = 'Add something to add new note......'>

             </textarea>
             <div className = "note-footer">
                 <small>50 remaining </small>
                 <button className = "save">SAVE</button>
             </div>
        </div>
    );
}
 
export default AddNote;