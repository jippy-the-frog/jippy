import { Dispatch, SetStateAction } from "react";

import {
  AnalysisNoteDTO,
  ArticleConceptNoteDTO,
  ArticleNoteDTO,
  EventNoteDTO,
} from "@/client";
import Note from "@/components/notes/note";
import NotesCategories from "@/components/notes/notes-categories";
import { Filter } from "@/components/notes/notes-selector";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type Props = {
  notes: (
    | EventNoteDTO
    | AnalysisNoteDTO
    | ArticleNoteDTO
    | ArticleConceptNoteDTO
  )[];
  setNotes: Dispatch<
    SetStateAction<
      (
        | EventNoteDTO
        | AnalysisNoteDTO
        | ArticleNoteDTO
        | ArticleConceptNoteDTO
      )[]
    >
  >;
  isNotesLoaded: boolean;
  filter: string;
};

const Notes = ({ notes, setNotes, isNotesLoaded, filter }: Props) => {
  const handleDeleteNote = (
    note:
      | EventNoteDTO
      | AnalysisNoteDTO
      | ArticleNoteDTO
      | ArticleConceptNoteDTO,
  ) => {
    return () => {
      setNotes((prevNotes) => prevNotes.filter((mNote) => mNote !== note));
    };
  };

  if (filter == Filter.DATE && !isNotesLoaded) {
    return (
      <div className="flex justify-center items-center w-full">
        <LoadingSpinner className="w-24 h-24" />
      </div>
    );
  }

  if (filter == Filter.DATE && notes!.length == 0) {
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
      {filter == Filter.DATE &&
        notes.map((note) => (
          <Note
            data={note}
            handleDelete={handleDeleteNote(note)}
            key={note.id}
          />
        ))}
      {filter == Filter.CATEGORY && <NotesCategories />}
    </div>
  );
};

export default Notes;
