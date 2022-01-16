import { DataNode } from './dataNode';
import { TreeNode } from './treeNode';

export const unflatten = (
  nodes: DataNode[],
  expandedKeys: Set<string>,
  level: number = 0
): TreeNode[] => {
  let result: TreeNode[] = [];

  for (const node of nodes) {
    const expanded = expandedKeys.has(node.key);
    const expandable = node.children.length > 0;
    const children = expanded
      ? unflatten(node.children, expandedKeys, level + 1)
      : [];

    const parent = {
      key: node.key,
      title: node.title,
      level,
      expanded,
      expandable,
    };

    result = [...result, parent, ...children];
  }

  return result;
};
