export interface FileStructure {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  children?: FileStructure[];
}

export interface CloudStorageConfig {
  clientId: string;
  redirectUri: string;
}

export interface CloudStorageProviders {
  [key: string]: CloudStorageConfig;
}