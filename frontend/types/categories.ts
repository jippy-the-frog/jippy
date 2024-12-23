import {
  Building2,
  CircleHelp,
  DollarSign,
  Film,
  HeartHandshake,
  Leaf,
  LucideIcon,
  Medal,
  Microscope,
  Palette,
  Scale,
  School,
  UsersRound,
} from "lucide-react";

export enum Category {
  SciTech = "Science & Tech",
  ArtsHumanities = "Arts & Humanities",
  Politics = "Politics",
  Media = "Media",
  Environment = "Environment",
  Education = "Education",
  Economics = "Economics",
  Sports = "Sports",
  GenderEquality = "Gender & Equality",
  Religion = "Religion",
  SocietyCulture = "Society & Culture",
  Others = "Others",
}

export const getCategoryFor = (categoryName: string) => {
  const mappings: Record<string, Category> = {
    "science & tech": Category.SciTech,
    "arts & humanities": Category.ArtsHumanities,
    politics: Category.Politics,
    media: Category.Media,
    environment: Category.Environment,
    economics: Category.Economics,
    sports: Category.Sports,
    "gender & equality": Category.GenderEquality,
    religion: Category.Religion,
    "society & culture": Category.SocietyCulture,
    education: Category.Education,
  };
  const formattedName = categoryName.toLowerCase();
  if (formattedName in mappings) {
    return mappings[formattedName];
  }
  return Category.Others;
};

export const categoriesToDisplayName: Record<Category, string> = {
  [Category.SciTech]: "Science & tech",
  [Category.ArtsHumanities]: "Arts & humanities",
  [Category.Politics]: "Politics",
  [Category.Media]: "Media",
  [Category.Environment]: "Environment",
  [Category.Economics]: "Economics",
  [Category.Sports]: "Sports",
  [Category.GenderEquality]: "Gender & equality",
  [Category.Religion]: "Religion",
  [Category.SocietyCulture]: "Society & culture",
  [Category.Education]: "Education",
  [Category.Others]: "Others",
};

export const categoriesToIconsMap: Record<Category, LucideIcon> = {
  [Category.SciTech]: Microscope,
  [Category.ArtsHumanities]: Palette,
  [Category.Politics]: Building2,
  [Category.Media]: Film,
  [Category.Environment]: Leaf,
  [Category.Economics]: DollarSign,
  [Category.Sports]: Medal,
  [Category.GenderEquality]: Scale,
  [Category.Religion]: HeartHandshake,
  [Category.SocietyCulture]: UsersRound,
  [Category.Education]: School,
  [Category.Others]: CircleHelp,
};

export const getIconFor = (categoryName: string) => {
  const category = getCategoryFor(categoryName);
  return categoriesToIconsMap[category];
};
