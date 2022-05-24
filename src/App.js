import { useState } from "react";
import {nanoid} from 'nanoid';
import Noteslist from "./Components/NotesList";

const App = () => {
    const [notes,setnotes] = useState([
      {
      id : nanoid(),
      text: "This is my first note",
      date: "13/08/2020",

    },
    {
      id : nanoid(),
      text: "This is my second note",
      date: "14/08/2020",

    },
    {
      id : nanoid(),
      text: "This is my third note",
      date: "15/08/2020",

    },
    {
      id : nanoid(),
      text: "This is my fourth note",
      date: "16/08/2020",

    },
  ]);

  return(
    <div className = 'container'>
      <Noteslist notes = {notes} />
    </div>
  );
}

export default App;
