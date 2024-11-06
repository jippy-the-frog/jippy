import { BookOpenTextIcon } from "lucide-react";

import { CPointDTO, PointDTO } from "@/client";
import Chip from "@/components/display/chip";
import LikeButtons from "@/components/likes/like-buttons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLikePoint } from "@/queries/like";
import { useUserStore } from "@/store/user/user-store-provider";

import ExampleAccordion from "./example-accordion";

type OwnProps = {
  answer_id: number;
  point: PointDTO | CPointDTO;
};

const PointAccordion: React.FC<OwnProps> = ({ answer_id, point }) => {
  const user = useUserStore((state) => state.user);
  const likes = point.likes;
  const userLike = likes.filter((like) => like.user_id === user?.id)[0];
  const userLikeValue = userLike ? userLike.type : 0;
  const likeMutation = useLikePoint(answer_id);

  const pointHasExamples =
    (point.type === "ANALYSIS" &&
      (point as PointDTO).point_analysises.length > 0) ||
    (point.type === "CONCEPT" &&
      (point as CPointDTO).point_article_concepts.length > 0);
  return (
    <AccordionItem
      className="border border-primary/15 rounded-lg px-8 py-2 2xl:px-12 2xl:py-6 bg-background"
      key={point.id}
      value={point.id.toString()}
    >
      <AccordionTrigger
        chevronClassName="h-6 w-6 stroke-[2.5] ml-4"
        className="text-lg lg:text-xl 2xl:text-2xl text-primary font-medium text-start hover:no-underline pt-4 pb-6"
      >
        <div className="flex flex-col">
          <div className="flex">
            <Chip
              // TODO @seeleng: my tag not centered pls fix thanku :clown:
              className="flex mb-4 w-fit max-w-full 2xl:text-xl"
              label={point.positive ? "For" : "Against"}
              size="lg"
              variant={point.positive ? "secondary" : "accent"}
            />
          </div>
          <span className="inline-block text-primary-900 hover:text-primary-900/80">
            {point.title}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="border-t-[0.5px] border-primary-600 mt-2 pt-4 2xl:pt-8">
          <div className="flex items-center text-lg 2xl:text-2xl px-6 2xl:px-10 pb-2 2xl:pb-0 pt-2 justify-between">
            <span className="flex items-center">
              <BookOpenTextIcon
                className="inline-flex mr-3"
                size={20}
                strokeWidth={1.6}
              />
              <h2>Jippy Examples</h2>
            </span>
            <LikeButtons
              className="mt-0"
              onDislike={() =>
                likeMutation.mutate({
                  point_id: point.id,
                  type: -1,
                })
              }
              onLike={() =>
                likeMutation.mutate({
                  point_id: point.id,
                  type: 1,
                })
              }
              userLikeValue={userLikeValue}
            />
          </div>

          {pointHasExamples ? (
            <Accordion className="" type="multiple">
              {/* TODO: get confidence score, sort and bucket */}
              {point.type === "ANALYSIS" &&
                (point as PointDTO).point_analysises.map(
                  (point_analysis, index) => {
                    const { analysis, elaboration } = point_analysis;
                    const { id: analysisId, event } = analysis;
                    return (
                      <ExampleAccordion
                        article_id={
                          point_analysis.analysis.event.original_article.id
                        }
                        description={event.original_article.summary}
                        elaboration={elaboration}
                        id={`analysis-${analysisId}`}
                        index={index}
                        key={`analysis-${analysisId}`}
                        title={event.original_article.title}
                      />
                    );
                  },
                )}
              {point.type === "CONCEPT" &&
                (point as CPointDTO).point_article_concepts.map(
                  (point_article_concept, index) => {
                    return (
                      <ExampleAccordion
                        article_id={
                          point_article_concept.article_concept.article.id
                        }
                        description={
                          point_article_concept.article_concept.article.summary
                        }
                        elaboration={point_article_concept.elaboration}
                        id={`article_concept-${point_article_concept.article_concept.article.id}-${point_article_concept.article_concept.concept.id}`}
                        index={index}
                        key={`article_concept-${point_article_concept.article_concept.article.id}-${point_article_concept.article_concept.concept.id}`}
                        title={
                          point_article_concept.article_concept.article.title
                        }
                      />
                    );
                  },
                )}
            </Accordion>
          ) : (
            <Alert className="p-8 bg-accent-100/20 mt-2">
              <AlertTitle className="font-medium text-lg">
                Jippy couldn&apos;t find relevant examples but has some
                pointers!
              </AlertTitle>
              <AlertDescription className="flex flex-col gap-4 text-lg mt-6">
                <h1 className="">
                  {point.fallback?.general_argument ??
                    "No relevant analysis found"}
                </h1>
                <h1>
                  {point.fallback?.alt_approach ?? "No relevant analysis found"}
                </h1>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PointAccordion;
