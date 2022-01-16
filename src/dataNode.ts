import { ReactNode } from 'react';

export type DataNode = {
  key: string;
  title: string | ReactNode;
  children: DataNode[];
};
