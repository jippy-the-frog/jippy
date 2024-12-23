"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";

import { MiniArticleDTO } from "@/client";
import Pagination from "@/components/navigation/pagination";
import ScrollToTopButton from "@/components/navigation/scroll-to-top-button";
import ArticleLoading from "@/components/news/article-loading";
import NewsArticle from "@/components/news/news-article";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBookmarkedArticles } from "@/queries/article";

function isNumeric(value: string | null) {
  return value !== null && /^-?\d+$/.test(value);
}

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageStr = searchParams.get("page");

  const page = isNumeric(pageStr) && pageStr !== "0" ? parseInt(pageStr!) : 1;
  const [pageCount, setPageCount] = useState<number>(0);

  const { data: articles, isSuccess: isArticlesLoaded } = useQuery(
    getBookmarkedArticles(page),
  );

  const changePage = (page: number) => {
    router.push(getPageUrl(page));
  };

  useEffect(() => {
    if (page < 0) {
      changePage(1);
    } else {
      const items = articles?.total_count;
      const mPageCount = items !== undefined ? Math.ceil(items / 10) : -1;
      if (mPageCount !== -1) {
        setPageCount(mPageCount);
        if (page > mPageCount) {
          changePage(mPageCount);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isArticlesLoaded, articles?.total_count, router, searchParams]);

  const getPageUrl = (page: number) => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    // update as necessary
    current.set("page", page.toString());

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    return `${pathname}${query}`;
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="flex bg-muted w-full h-full max-h-full py-8 overflow-y-auto"
        id="home-page"
      >
        <div className="flex flex-col py-6 lg:py-12 w-full h-fit mx-4 md:mx-8 xl:mx-24 bg-background rounded-lg border border-border px-8">
          {/* TODO: x-padding here is tied to the news article */}
          <div
            className="flex flex-col mb-4 gap-y-2 md:px-8 xl:px-12"
            id="homePage"
          >
            <div className="flex items-baseline gap-4">
              <Bookmark className="w-5 h-5 md:w-7 md:h-7" />
              <span className="text-2xl md:text-4xl font-bold text-primary-800">
                Bookmarked articles
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full">
            {!isArticlesLoaded && (
              <div className="flex flex-col w-full">
                <ArticleLoading />
                <ArticleLoading />
                <ArticleLoading />
              </div>
            )}
            {isArticlesLoaded &&
              articles!.data &&
              articles!.data.map(
                (newsArticle: MiniArticleDTO, index: number) => (
                  <NewsArticle key={index} newsArticle={newsArticle} />
                ),
              )}
          </div>
          {isArticlesLoaded && pageCount > 0 && (
            <Pagination
              getPageUrl={getPageUrl}
              page={page}
              pageCount={pageCount}
            />
          )}
          {isArticlesLoaded && articles!.data.length === 0 && (
            <Card className="mx-auto my-8 p-8 flex flex-col gap-8 max-w-lg">
              <h2 className="text-xl">
                You do not have any bookmarks. Return after you bookmark some
                articles!
              </h2>
              <Link href="/">
                <Button>Go to home</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>

      <ScrollToTopButton
        className="absolute right-4 bottom-4"
        minHeight={200}
        scrollElementId="home-page"
      />
    </div>
  );
};

export default Page;
