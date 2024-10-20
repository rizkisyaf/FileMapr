import axios from 'axios';
import { FileStructure, CloudStorageProviders } from '../types';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_REDIRECT_URI = `${window.location.origin}/auth/google/callback`;
const DROPBOX_CLIENT_ID = import.meta.env.VITE_DROPBOX_CLIENT_ID || 'YOUR_DROPBOX_CLIENT_ID';
const DROPBOX_REDIRECT_URI = `${window.location.origin}/auth/dropbox/callback`;

const cloudStorageProviders: CloudStorageProviders = {
  'google-drive': {
    clientId: GOOGLE_CLIENT_ID,
    redirectUri: GOOGLE_REDIRECT_URI,
  },
  'dropbox': {
    clientId: DROPBOX_CLIENT_ID,
    redirectUri: DROPBOX_REDIRECT_URI,
  },
};

export const initiateGoogleDriveAuth = () => {
  const { clientId, redirectUri } = cloudStorageProviders['google-drive'];
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/drive.readonly`;
  window.location.href = authUrl;
};

export const initiateDropboxAuth = () => {
  const { clientId, redirectUri } = cloudStorageProviders['dropbox'];
  const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
  window.location.href = authUrl;
};

export const fetchFileStructure = async (provider: string, accessToken: string): Promise<FileStructure> => {
  switch (provider) {
    case 'google-drive':
      return fetchGoogleDriveStructure(accessToken);
    case 'dropbox':
      return fetchDropboxStructure(accessToken);
    default:
      throw new Error('Unsupported provider');
  }
};

const fetchGoogleDriveStructure = async (accessToken: string): Promise<FileStructure> => {
  const response = await axios.get('https://www.googleapis.com/drive/v3/files', {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { fields: 'files(id, name, mimeType, size, parents)' },
  });

  const files = response.data.files;
  return buildFileStructure(files);
};

const fetchDropboxStructure = async (accessToken: string): Promise<FileStructure> => {
  const response = await axios.post('https://api.dropboxapi.com/2/files/list_folder', 
    { path: '' },
    { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } }
  );

  const entries = response.data.entries;
  return buildDropboxFileStructure(entries);
};

const buildFileStructure = (files: any[]): FileStructure => {
  const root: FileStructure = { id: 'root', name: 'Root', type: 'folder', children: [] };
  const fileMap: { [key: string]: FileStructure } = { root };

  files.forEach(file => {
    const node: FileStructure = {
      id: file.id,
      name: file.name,
      type: file.mimeType === 'application/vnd.google-apps.folder' ? 'folder' : 'file',
      size: parseInt(file.size) || 0,
    };

    if (node.type === 'folder') {
      node.children = [];
    }

    fileMap[node.id] = node;

    const parent = file.parents ? fileMap[file.parents[0]] || root : root;
    if (parent.children) {
      parent.children.push(node);
    }
  });

  return root;
};

const buildDropboxFileStructure = (entries: any[]): FileStructure => {
  const root: FileStructure = { id: 'root', name: 'Root', type: 'folder', children: [] };

  entries.forEach(entry => {
    const node: FileStructure = {
      id: entry.id,
      name: entry.name,
      type: entry['.tag'] === 'folder' ? 'folder' : 'file',
      size: entry.size || 0,
    };

    if (node.type === 'folder') {
      node.children = [];
    }

    root.children?.push(node);
  });

  return root;
};

export const copyFilePath = (file: FileStructure) => {
  const path = getFilePath(file);
  navigator.clipboard.writeText(path).then(() => {
    console.log('File path copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy file path: ', err);
  });
};

const getFilePath = (file: FileStructure): string => {
  // This is a simplified version. In a real-world scenario, you'd need to traverse
  // the file structure to get the full path.
  return `/${file.name}`;
};