import { ReactNode } from 'react';

export type TreeNode = {
  key: string;
  title: string | ReactNode;
  level: number;
  expanded: boolean;
  expandable: boolean;
};
