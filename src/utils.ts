import { DataNode } from './dataNode';

export const getAllKeys = (nodes: DataNode[]): string[] => {
  let keys: string[] = [];

  for (const node of nodes) {
    const childrenKeys = getAllKeys(node.children);

    keys = [...keys, node.key, ...childrenKeys];
  }

  return keys;
};
