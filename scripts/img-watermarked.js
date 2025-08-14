// scripts/img-watermarked.js
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = path.join(process.cwd(), 'src/originImg');
const outDir = path.join(process.cwd(), 'src/assets');
const watermarkPath = path.join(process.cwd(), 'public/watermark.png');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const processImage = async (file) => {
  const inputPath = path.join(srcDir, file);
  const outputPath = path.join(outDir, file);

  if (fs.existsSync(outputPath)) {
    console.log(`跳過已存在：${file}`);
    return;
  }

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Step 1: 縮放到寬1080px（保持比例）
    const resized = image.resize({ width: 1080 });

    // Step 2: 取得縮放後的 buffer 和尺寸
    const resizedBuffer = await resized.toBuffer();
    const resizedMeta = await sharp(resizedBuffer).metadata();

    // Step 3: 計算 21:9 的高度並裁切（中央對齊）
    const targetWidth = 1080;
    const targetHeight = Math.round((targetWidth * 9) / 21);

    const cropped = sharp(resizedBuffer)
      .resize({
        width: targetWidth,
        height: targetHeight,
        fit: 'cover',
        position: 'centre',
      });

    // Step 4: 取得浮水印尺寸
    const wmMeta = await sharp(watermarkPath).metadata();

    // Step 5: 計算浮水印位置（右上方往左偏移40px）
    const wmLeft = targetWidth - wmMeta.width - 40;
    const wmTop = 0; // 貼齊上方

    // Step 6: 合成浮水印
    await cropped
      .composite([
        {
          input: watermarkPath,
          top: wmTop,
          left: wmLeft,
        },
      ])
      .toFile(outputPath);

    console.log(`已處理：${file}`);
  } catch (err) {
    console.error(`處理 ${file} 失敗：`, err);
  }
};

// 主流程
(async () => {
  const files = fs.readdirSync(srcDir).filter((f) =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  for (const file of files) {
    await processImage(file);
  }
})();
