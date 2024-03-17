// This route is used to fetch and save the images

import { data } from '../../data';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const writeFileAsync = promisify(fs.writeFile);

const downloadImage = async (url, filename) => {
  const response = await fetch(url);
  if (response.ok) {
    const buffer = await response.buffer();
    await writeFileAsync(filename, buffer);
  } else {
    console.error(`Failed to fetch ${url}. Status: ${response.status}`);
  }
};

const processUrls = async urls => {
  const DIR = 'files';
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR);
  }

  for (let i = 0; i < urls.length; i += 10) {
    const chunk = urls.slice(i, i + 10);
    const promises = chunk.map(url => {
      // Extract filename from URL or generate a unique filename
      const filename = path.join(DIR, url.filename);
      return downloadImage(url.url, filename);
    });
    await Promise.all(promises);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before next batch
  }
};

export default async function handler(req, res) {
  // const { source } = req.query;
  // const results = data
  //   .filter(i => source && (i.source === Number(source)))

  // Source 1
  // .map(i => ({ url: i.image, filename: `${i.source}__${i.seriesId}__${i.imageId}.jpg` }))

  // Source 2
  // .map(i => i.images)
  // .flat()
  // .map(i => ({ url: i.url, filename: `${i.source}__${i.seriesId}__${i.filename}` }))

  // Fetch All Images
  // try {
  //   await processUrls(results);
  //   console.log("All images have been downloaded.")
  // } catch (error) {
  //   console.error(error)
  // }

  res.status(200).json({ data: 'OK' })
}
