"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/queries/category";
import { Textarea } from "@/components/ui/textarea";
import { NoteDTO } from "@/client";

const noteFormSchema = z.object({
  content: z.string(),
  category_id: z.string().optional(),
});

export type NoteFormType = z.infer<typeof noteFormSchema>;

type Props = {
  onSubmit: SubmitHandler<NoteFormType>;
  hideCategory?: boolean;
  onCancel?: () => void;
  isHighlight?: boolean;
  highlightSelection?: string;
  defaultValue?: NoteDTO;
};

const NoteForm = ({
  onSubmit,
  hideCategory,
  onCancel,
  isHighlight = false,
  highlightSelection,
  defaultValue,
}: Props) => {
  const noteFormDefault = {
    content: defaultValue?.content || "",
    category_id: defaultValue?.category?.id.toString() || undefined,
  };

  const form = useForm<NoteFormType>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: noteFormDefault,
  });

  const { data: categories } = useQuery(getCategories());

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {isHighlight && (
            <span className="border-l-primary-500/50 border-l-4 pl-4 text-primary-700">
              {highlightSelection}
            </span>
          )}
          <Box className="flex flex-col space-y-2.5">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-current text-base">
                    Annotation
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-white text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Box>
          {!hideCategory && categories && (
            <Box className="flex flex-col gap-y-2.5">
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-current text-base">
                      Category
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue
                            placeholder="Select a category"
                            className="text-base"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                            className="text-base"
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>
          )}
          <div className="flex gap-x-6 w-full">
            <Button type="submit" className="w-full text-base">
              Submit
            </Button>
            {onCancel && (
              <Button
                onClick={onCancel}
                variant="outline"
                className="bg-transparent w-full"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NoteForm;
