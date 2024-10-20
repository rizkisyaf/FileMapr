import { FileStructure } from '../types';

interface AnalysisResult {
  issues: string[];
  suggestions: string[];
}

export const analyzeFileStructure = (fileStructure: FileStructure): AnalysisResult => {
  const issues: string[] = [];
  const suggestions: string[] = [];

  const traverse = (node: FileStructure, path: string) => {
    const currentPath = `${path}/${node.name}`;

    // Check for naming conventions
    if (!/^[a-zA-Z0-9_-]+$/.test(node.name)) {
      issues.push(`Invalid file name: ${currentPath}`);
      suggestions.push(`Rename ${currentPath} to a valid format.`);
    }

    // Check for file size (example: suggest compressing files larger than 100MB)
    if (node.size && node.size > 100 * 1024 * 1024) {
      suggestions.push(`Consider compressing large file: ${currentPath}`);
    }

    // Recursively analyze children
    if (node.children) {
      node.children.forEach(child => traverse(child, currentPath));
    }
  };

  traverse(fileStructure, '');
  return { issues, suggestions };
};
