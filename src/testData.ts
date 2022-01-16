import { DataNode } from './dataNode';

const levelMaxNodesNumbers = [5, 20, 10, 5, 15, 5, 10, 20, /*10*/];
const levelsNames = [
  'root',
  'test',
  'result',
  'response',
  'details',
  'properties',
  'keys',
  'values',
  'leaf',
];
const defaultName = 'dummy';

export const generateNodes = (
  level: number = 0,
  parentKey: string = ''
): DataNode[] => {
  const name = levelsNames[level] ?? defaultName;
  const nodes: DataNode[] = [];

  const levelMaxNum = levelMaxNodesNumbers[level];
  if (!levelMaxNum) return nodes;

  let num = Math.floor(Math.random() * levelMaxNum);
  if (!level && !num) num = 1; // at least one root on the first level

  for (let i = 0; i < num; i++) {
    const title = `${name}-${i}`;
    const key = `${parentKey}/${title}`;

    const children = generateNodes(level + 1, key);

    nodes.push({
      key,
      title,
      children,
    });
  }

  return nodes;
};
