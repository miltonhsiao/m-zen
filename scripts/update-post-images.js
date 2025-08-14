// scripts/fetch-unsplash-image.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dotenv from "dotenv";

dotenv.config();

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!UNSPLASH_ACCESS_KEY) {
  console.error("❌ 請在 .env 中設定 UNSPLASH_ACCESS_KEY");
  process.exit(1);
}

async function getRandomImageByTag(tag) {
  const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    tag
  )}&orientation=landscape&per_page=30&client_id=${UNSPLASH_ACCESS_KEY}`;

  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();

  if (!searchData.results?.length) {
    console.warn(`⚠ 找不到與 "${tag}" 相關的圖片`);
    return null;
  }

  const randomImage =
    searchData.results[Math.floor(Math.random() * searchData.results.length)];

  const photoUrl = `https://api.unsplash.com/photos/${randomImage.id}?client_id=${UNSPLASH_ACCESS_KEY}`;
  const photoRes = await fetch(photoUrl);
  const photoData = await photoRes.json();

  return {
    unsplashId: photoData.id,
    url: photoData.urls.regular,
    photographerName: photoData.user.name,
    photographerLink: photoData.user.links.html,
  };
}

function isEmptyString(str) {
  return typeof str !== "string" || str.trim() === "";
}

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content: mdBody } = matter(fileContent);

    if (!Array.isArray(data.tags) || data.tags.length === 0) {
      console.log(`⏭ 略過 ${file}（無 tags）`);
      continue;
    }

    // 只有當這四欄位全部為空才覆寫
    if (
      !isEmptyString(data.unsplashId) ||
      !isEmptyString(data.image) ||
      !isEmptyString(data.photographerName) ||
      !isEmptyString(data.photographerLink)
    ) {
      console.log(`⏭ 略過 ${file}（已有 Unsplash 資訊）`);
      continue;
    }

    const tag = data.tags[0];
    const imageInfo = await getRandomImageByTag(tag);

    if (imageInfo) {
      data.unsplashId = imageInfo.unsplashId;
      data.image = imageInfo.url;
      data.photographerName = imageInfo.photographerName;
      data.photographerLink = imageInfo.photographerLink;
      if (typeof data.draft !== "boolean") {
        data.draft = false;
      }

      // 確保 date 是 Date 物件
      const orderedData = {
        title: data.title || "",
        description: data.description || "",
        date: data.date instanceof Date ? data.date : new Date(data.date),
        tags: data.tags || [],
        unsplashId: data.unsplashId,
        image: data.image,
        photographerName: data.photographerName,
        photographerLink: data.photographerLink,
        draft: data.draft,
      };

      const newContent =
        `---\n` +
        Object.entries(orderedData)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}: [${value.map((v) => `"${v}"`).join(", ")}]`;
            } else if (value instanceof Date) {
              return `${key}: ${value.toISOString()}`;
            } else if (typeof value === "string") {
              return `${key}: "${value}"`;
            } else {
              return `${key}: ${value}`;
            }
          })
          .join("\n") +
        `\n---\n${mdBody}`;

      fs.writeFileSync(filePath, newContent, "utf-8");

      console.log(`✅ ${file} 已更新 Unsplash 資訊 (${imageInfo.unsplashId})`);
    }
  }
}

main().catch(console.error);
