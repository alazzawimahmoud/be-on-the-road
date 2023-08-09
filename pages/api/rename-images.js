// src/renameFiles.js

import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';

const renameFilesInFolder = async (folderPath) => {
  // Map to hold the old file name to new UUID mapping
  const nameMapping = new Map();

  try {
    // Read the files in the directory
    const fileNames = await fs.readdir(folderPath);

    // Iterate through each file and rename it
    for (const oldName of fileNames) {
      // Get file extension
      const ext = path.extname(oldName);

      // Generate new UUID name with the same file extension
      const newName = `${uuidv4()}${ext}`;

      // Add the mapping to the Map
      nameMapping.set(oldName, newName);

      // Rename the file
      const oldPath = path.join(folderPath, oldName);
      const newPath = path.join(folderPath, newName);
      await fs.rename(oldPath, newPath);
    }

    // Save the map in a results.json file
    const resultsPath = path.join(folderPath, 'results.json');
    await fs.writeFile(resultsPath, JSON.stringify(Object.fromEntries(nameMapping), null, 2));

    console.log('Files renamed and results saved successfully.');

  } catch (error) {
    console.error('Error renaming files:', error);
  }
};

export default async function handler(req, res) {

  // await renameFilesInFolder('./files');

  res.status(200).json({ data: 'OK!' })
}
