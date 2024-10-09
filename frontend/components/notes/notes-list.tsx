import { NoteDTO } from "@/client";
import Note from "@/components/notes/note";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Filter } from "@/components/notes/notes-selector";
import NotesCategories from "@/components/notes/notes-categories";
import { Dispatch, SetStateAction } from "react";

type Props = {
  notes: NoteDTO[];
  setNotes: Dispatch<SetStateAction<NoteDTO[]>>;
  isNotesLoaded: boolean;
  filter: string;
};

const Notes = ({ notes, setNotes, isNotesLoaded, filter }: Props) => {
  
  const handleDeleteNote = (note: NoteDTO) => {
    return () => {
      setNotes((prevNotes) => prevNotes.filter((mNote) => mNote !== note));
    };
  };

    if (!isNotesLoaded) {
      return (
        <div className="flex justify-center items-center w-full">
            <LoadingSpinner className="w-24 h-24" />
        </div>
      );
    }
  
    if (notes!.length == 0) {
      return (
        <div className="flex w-full justify-center items-center py-5">
          <p className="text-l text-offblack">
            No notes yet. Add one to see it here!
          </p>
        </div>
      );
    }
  
    return (
        <div className="flex flex-col">
            {
            filter == Filter.DATE && notes.map((note) => (
                <Note key={note.id} data={note} handleDelete={handleDeleteNote(note)} />
            ))
            }
            {
              filter == Filter.CATEGORY && <NotesCategories />
            }
        </div>
    );
};
  
export default Notes;
  