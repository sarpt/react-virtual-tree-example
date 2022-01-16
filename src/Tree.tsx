import React, { FC, Fragment, useEffect, useState } from 'react';
import { useVirtual } from 'react-virtual';
import { DataNode } from './dataNode';
import { unflatten } from './unflatten';
import { TreeNode } from './treeNode';

import './Tree.css';

const ExpandArrow = ({
  expanded,
  onExpand,
}: {
  expanded: boolean;
  onExpand: (expanded: boolean) => void;
}) => {
  return (
    <Fragment>
      {expanded ? (
        <span
          onClick={() => onExpand(!expanded)}
          className="material-icons nodePaddingChunk"
        >
          arrow_drop_down
        </span>
      ) : (
        <span
          onClick={() => onExpand(!expanded)}
          className="material-icons nodePaddingChunk"
        >
          arrow_right
        </span>
      )}
    </Fragment>
  );
};

const RowPadding = ({ row }: { row: TreeNode }) => {
  const paddings = [];
  for (let i = 0; i < row.level; i++) {
    paddings.push(<span key={i} className="nodePaddingChunk" />);
  }

  return <Fragment>{paddings}</Fragment>;
};

type props = {
  data: DataNode[];
  expanded: Set<string>;
  height: number;
  selected: string;
  onExpand: (key: string, expanded: boolean) => void;
  onSelect: (key: string) => void;
  width: number;
};

export const Tree: FC<props> = ({
  data,
  expanded,
  height,
  onExpand,
  onSelect,
  selected,
  width,
}) => {
  const parentRef = React.useRef(null);
  const [rows, setRows] = useState([] as TreeNode[]);

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
    estimateSize: React.useCallback(() => 35, []),
  });

  useEffect(() => {
    const selectedVisible = rowVirtualizer.virtualItems.some(
      (row) => row.key === selected
    );
    if (selectedVisible) return;

    const idx = rows.findIndex((row) => row.key === selected);
    if (idx < 0) return;

    rowVirtualizer.scrollToIndex(idx);
  }, [selected]);

  useEffect(() => {
    setRows(unflatten(data, expanded));
  }, [data, expanded]);

  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        height: `${height}px`,
        width: `${width}px`,
        overflow: 'auto',
      }}
    >
      <div
        className="ListInner"
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => {
          const row = rows[virtualRow.index];

          return (
            <div
              key={virtualRow.index}
              className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <RowPadding row={row} />
              <span
                className={`nodeContent ${
                  selected === row.key ? 'selected' : ''
                }`}
                onClick={() => onSelect(row.key)}
              >
                {row.expandable ? (
                  <ExpandArrow
                    expanded={row.expanded}
                    onExpand={(expanded) => onExpand(row.key, expanded)}
                  />
                ) : (
                  <span className="nodePaddingChunk" />
                )}
                <span>{row.title}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
