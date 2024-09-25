import CnaLogo from "@/public/events/cna-logo";
import GuardianLogo from "@/public/events/guardian-logo";
import { ArticleSource } from "@/client";

export interface ArticleSourceLogoProps {
  height?: number;
  width?: number;
}

export const articleSourceToIconMap: Record<
  ArticleSource,
  (logoProps: ArticleSourceLogoProps) => JSX.Element
> = {
  CNA: CnaLogo,
  GUARDIAN: GuardianLogo,
};

export const articleSourceToDisplayNameMap: Record<ArticleSource, string> = {
  CNA: "CNA",
  GUARDIAN: "The Guardian",
};