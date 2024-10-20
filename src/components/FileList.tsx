import React, { useState } from 'react';
import { FileStructure } from '../types';
import { FileIcon, FolderIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

interface FileListProps {
  data: FileStructure;
}

const FileListItem: React.FC<{ node: FileStructure; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div 
        className="flex items-center py-2 cursor-pointer hover:bg-gray-100"
        style={{ paddingLeft: `${depth * 20}px` }}
        onClick={toggleOpen}
      >
        {node.type === 'folder' && (
          isOpen ? <ChevronDownIcon className="h-4 w-4 mr-1" /> : <ChevronRightIcon className="h-4 w-4 mr-1" />
        )}
        {node.type === 'folder' ? (
          <FolderIcon className="h-5 w-5 text-yellow-500 mr-2" />
        ) : (
          <FileIcon className="h-5 w-5 text-blue-500 mr-2" />
        )}
        <span>{node.name}</span>
        {node.size && <span className="ml-2 text-sm text-gray-500">({formatFileSize(node.size)})</span>}
      </div>
      {isOpen && node.children && (
        <div>
          {node.children.map(child => (
            <FileListItem key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileList: React.FC<FileListProps> = ({ data }) => {
  return (
    <div className="mt-4 border rounded-lg overflow-hidden">
      <FileListItem node={data} depth={0} />
    </div>
  );
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default FileList;