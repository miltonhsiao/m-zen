import type { PostFilter } from "./utils/posts";

export interface SiteConfig {
  title: string;
  slogan: string;
  description?: string;
  site: string,
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
    rss?: boolean;
  };
  homepage: PostFilter;
  googleAnalysis?: string;
  search?: boolean;
}

export const siteConfig: SiteConfig = {
  site: "https://m-zen.pages.dev/", // your site url
  title: "M-Zen | 米大叔的日常",
  slogan: "Learing, Creating, Be Awared.",
  description: "一個中年大叔轉身後與AI一同挖掘自我，學習重新設計生活。",
  social: {
    github: "https://github.com/miltonhsiao/m-zen", // leave empty if you don't want to show the github
    linkedin: "", // leave empty if you don't want to show the linkedin
    email: "MZen1779@gmail.com", // leave empty if you don't want to show the email
    rss: false, // set this to false if you don't want to provide an rss feed
  },
  homepage: {
    maxPosts: 5,
    tags: [],
    excludeTags: [],
  },
  googleAnalysis: "", // your google analysis id
  search: true, // set this to false if you don't want to provide a search feature
};
