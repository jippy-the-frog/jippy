"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Notebook } from "lucide-react";

import {
  AnalysisNoteDTO,
  ArticleConceptNoteDTO,
  ArticleNoteDTO,
  EventNoteDTO,
} from "@/client";
import Notes from "@/components/notes/notes-list";
import NotesSelector, { Filter } from "@/components/notes/notes-selector";
import { getAllNotes } from "@/queries/note";

const Page = () => {
  const { data: fetchedNotes, isSuccess: isNotesLoaded } =
    useQuery(getAllNotes());
  const [notes, setNotes] = useState<
    (EventNoteDTO | AnalysisNoteDTO | ArticleNoteDTO | ArticleConceptNoteDTO)[]
  >([]);
  const [filter, setFilter] = useState<string>(Filter.DATE);

  useEffect(() => {
    if (isNotesLoaded && fetchedNotes) {
      setNotes(fetchedNotes);
    }
  }, [isNotesLoaded, fetchedNotes]);

  return (
    <div className="relative w-full h-full">
      <div
        className="flex bg-muted w-full h-full max-h-full py-8 overflow-y-auto"
        id="notes-page"
      >
        <div className="flex flex-col py-6 lg:py-12 w-full h-fit mx-4 md:mx-8 xl:mx-24 bg-background rounded-lg border border-border px-8">
          {/* TODO: x-padding here is tied to the news article */}
          <div
            className="flex flex-col mb-4 gap-y-2 px-4 md:px-8 xl:px-12"
            id="notes-page-content"
          >
            <div
              className="flex flex-wrap justify-between mb-4 gap-y-2"
              id="note-page-title"
            >
              <span className="flex items-center">
                <Notebook className="w-5 h-5 md:w-7 md:h-7 grow-0 self-center mr-4" />
                <span className="text-2xl md:text-4xl font-bold text-primary-800 grow">
                  My Notes
                </span>
              </span>
              <NotesSelector filter={filter} setFilter={setFilter} />
            </div>
            <Notes
              filter={filter}
              isNotesLoaded={isNotesLoaded}
              notes={notes || []}
              setNotes={setNotes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
