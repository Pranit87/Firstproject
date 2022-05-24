import {MdAutoDelete} from 'react-icons/md'



const Note = ({id,text,date}) => {
    return (
        <div className = 'note'>
        <span>{text}</span>
        <div className = "note-footer">
            <small>{date}</small>
            <MdAutoDelete />
        </div>


        </div>
    );
}
 
export default Note;