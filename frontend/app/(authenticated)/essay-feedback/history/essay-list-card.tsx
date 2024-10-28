"use client";

import { useRouter } from "next/navigation";
import {
  Calendar,
  Download,
  Ellipsis,
  Link2,
  MessageSquare,
  Trash,
} from "lucide-react";

import { EssayMiniDTO } from "@/client/types.gen";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { parseDate } from "@/utils/date";

interface EssayListCardProps {
  essay: EssayMiniDTO;
}

const EssayListCard = ({ essay }: EssayListCardProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full bg-card border px-4 py-4 rounded-sm text-pretty break-words">
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/essay-feedback/${essay.id}`)}
      >
        <h1 className="text-text font-medium text-lg">{essay.question}</h1>
        <p className="text-text-muted line-clamp-4 text-pretty break-words mt-2">
          {essay.paragraphs[0].content}
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center w-full justify-between text-gray-400">
        <div className="flex items-center gap-x-4">
          <span className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-1.5" />
            <span>{parseDate(essay.created_at)}</span>
          </span>
          <span className="flex items-center text-sm">
            <MessageSquare className="w-4 h-4 mr-1.5" />
            <span>{essay.comments.length} comments</span>
          </span>
        </div>
        <span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="w-4 h-4 mr-1.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-1.5" /> Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link2 className="w-4 h-4 mr-1.5" /> Copy link
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/5">
                  <Trash className="w-4 h-4 mr-1.5" /> Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
    </div>
  );
};

export default EssayListCard;