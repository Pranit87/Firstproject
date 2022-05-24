import Note from './Note';
import AddNote from './AddNote';


const Noteslist = ({notes}) => {
    return ( 
        <div className = "Notes-list">
            {notes.map((note) => 
            <Note 
            id = {note.id} 
            text = {note.text} 
            date = {note.date} 
            />  
            )}


        </div>
    );
};
 
export default Noteslist;