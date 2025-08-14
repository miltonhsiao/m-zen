import fs from 'fs';
import path from 'path';

const filename = process.argv[2];

if (!filename) {
    console.log("\x1b[38;2;255;100;0mUsage: node scripts/add-post.js <filename>\x1b[0m");
    console.log("\x1b[38;2;255;150;0mFile will be created in src/content/blog/ directory\x1b[0m");
    process.exit(1);
}

const date = new Date().toISOString().split('T')[0];
const postPath = path.join('src', 'content', 'blog', `${date}-${filename}.md`);

const content = `---
title: "${filename}"
description: ""
date: ${date}
tags: []
unsplashId: ""
image: ""
photographerName: ""
photographerLink: ""
draft: false
---

Write your content here...
`; // 若 draft 為 true 不會被發佈

fs.mkdirSync(path.dirname(postPath), { recursive: true });
fs.writeFileSync(postPath, content);
console.log(`Created new post at: ${postPath}`);
console.log("\x1b[38;2;100;255;100m✓ Post created successfully!\x1b[0m");
