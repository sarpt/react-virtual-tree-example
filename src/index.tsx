import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useSize from '@react-hook/size';
import { render } from 'react-dom';
import { generateNodes } from './testData';
import { Tree } from './Tree';

import './style.css';
import { getAllKeys } from './utils';

interface AppProps {}
interface AppState {
  name: string;
}

const App: FC<{}> = () => {
  const ref = useRef(null);
  const [expandedKeys, setExpandedKeys] = useState(new Set<string>());
  const [selected, setSelected] = useState('');
  const [data, setData] = useState(generateNodes());
  const [allKeys, setAllKeys] = useState([] as string[]);

  useEffect(() => {
    const allKeys = getAllKeys(data);
    console.log(`all nodes count: ${allKeys.length}`);
    setAllKeys(allKeys);
  }, [data]);

  const onExpand = useCallback(
    (key: string, expanded: boolean) => {
      if (expanded) {
        setExpandedKeys(new Set(expandedKeys).add(key));
        return;
      }
      const newExpandedKeys = new Set(expandedKeys);
      newExpandedKeys.delete(key);
      setExpandedKeys(newExpandedKeys);
    },
    [expandedKeys, setExpandedKeys]
  );

  const onSelect = useCallback(
    (key: string) => {
      setSelected(key);
    },
    [setSelected]
  );

  const [width, height] = useSize(ref);

  return (
    <Fragment>
      <div ref={ref} className="treeContainer">
        <Tree
          data={data}
          expanded={expandedKeys}
          onExpand={onExpand}
          selected={selected}
          onSelect={onSelect}
          height={height}
          width={width}
        />
      </div>
      <button onClick={() => setData(generateNodes())}>
        Generate new data
      </button>
      <button onClick={() => setSelected(data[0].key)}>
        Select first root
      </button>
      <button onClick={() => setSelected(data[data.length - 1].key)}>
        Select last root
      </button>
      <button onClick={() => setExpandedKeys(new Set())}>Collapse all</button>
      <button onClick={() => setExpandedKeys(new Set(allKeys))}>
        Expand all
      </button>
    </Fragment>
  );
};

render(<App />, document.getElementById('root'));
