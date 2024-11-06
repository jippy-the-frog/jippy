import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { z } from "zod";

import { CPointDTO } from "@/client";
import CheckboxField from "@/components/form/fields/checkbox-field";
import TextField from "@/components/form/fields/text-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import JippyIcon from "@/public/jippy-icon/jippy-icon-sm";
import { getAnswer, useCreatePoint } from "@/queries/user-question";

import PointAccordion from "./point-accordion";

type OwnProps = {
  answer_id: number;
};

const pointFormSchema = z.object({
  title: z.string().min(1, "Required"),
  positive: z.boolean(),
});

const pointFormDefault = {
  title: "",
  positive: true,
};

type PointForm = z.infer<typeof pointFormSchema>;

const UserPoints: React.FC<OwnProps> = ({ answer_id }) => {
  const { data, isPending } = useQuery(getAnswer(answer_id));

  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PointForm>({
    resolver: zodResolver(pointFormSchema),
    defaultValues: pointFormDefault,
  });
  const createPointMutation = useCreatePoint(answer_id);

  if (!data || isPending) {
    return;
  }

  // must be concept points because we implemented this after implementing the shift to concepts
  const userPoints = data.answer.points.filter(
    (point) => !point.generated,
  ) as unknown as CPointDTO[];
  const hasUserPoints = userPoints.length > 0;

  const onSubmit: SubmitHandler<PointForm> = async (data) => {
    setIsLoading(true);
    createPointMutation.mutate(data, {
      onSuccess: () => {
        setShowForm(false);
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="flex flex-col gap-y-4 mt-8">
      {isLoading && (
        <div className="absolute w-full h-full bg-slate-600/80 z-50 bottom-0 right-0 flex justify-center items-center">
          <Card className="p-8 flex flex-col justify-center items-center gap-8">
            <h1 className="text-lg">
              Jippy is finding examples for your point! Please wait...
            </h1>
            <JippyIcon classname="animate-bounce w-24 h-24 pt-4" />
          </Card>
        </div>
      )}
      {!hasUserPoints && (
        <div className="flex justify-between items-center bg-violet-100 shadow-inner py-2 px-8">
          <p className="font-medium">Not satisfied with these points?</p>
          <Button onClick={() => setShowForm(true)}>Write your own</Button>
        </div>
      )}
      {hasUserPoints && (
        <div className="flex justify-between items-center">
          <h4 className="text-2xl font-semibold">Your custom points</h4>

          <Button onClick={() => setShowForm(true)} size="sm" variant="ghost">
            New Point <Plus className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
      {userPoints.map((point) => (
        <PointAccordion answer_id={answer_id} key={point.id} point={point} />
      ))}
      {showForm && (
        <Form {...form}>
          <form className="p-6 border" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <TextField label="Topic sentence" name="title" />
              <CheckboxField
                label="Is this a supporting point?"
                name="positive"
              />
              <div className="flex justify-between">
                <Button
                  onClick={() => setShowForm(false)}
                  type="button"
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button type="submit">Add point</Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default UserPoints;