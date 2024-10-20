import { Button, Modal, Table } from 'ant-design-vue';

import keyboardMappings from '../keyboard-mappings';
// import track from './KeyboardShortcutsHelp.track';

import './KeyboardShortcutsHelp.css';
import { defineComponent } from 'vue';

type Props = {
  className: string;
};

type State = {
  visible: boolean;
};

type DataRecord = {
  key: string;
  kbds: any;
  description: string;
};

const { Column } = Table;

const SYMBOL_CONV: Record<string, string> = {
  up: '↑',
  right: '→',
  down: '↓',
  left: '←',
  shift: '⇧',
};

const ODD_ROW_CLASS = 'KeyboardShortcutsHelp--oddRow';

function convertKeys(keyConfig: string | string[]): string[][] {
  const config = Array.isArray(keyConfig) ? keyConfig : [keyConfig];
  return config.map(str => str.split('+').map(part => SYMBOL_CONV[part] || part.toUpperCase()));
}

const padLeft = (text: string) => <span className="ub-pl4">{text}</span>;
const padRight = (text: string) => <span className="ub-pr4">{text}</span>;
const getRowClass = (_: DataRecord, index: number) => (index % 2 > 0 ? ODD_ROW_CLASS : '');

let kbdTable: any

function getHelpModal() {
  if (kbdTable) {
    return kbdTable;
  }
  const data: DataRecord[] = [];
  Object.keys(keyboardMappings).forEach(handle => {
    const { binding, label } = keyboardMappings[handle];
    const keyConfigs = convertKeys(binding);
    data.push(
      ...keyConfigs.map(config => ({
        key: String(config),
        kbds: <kbd>{config.join(' ')}</kbd>,
        description: label,
      }))
    );
  });

  kbdTable = (
    <Table
      className="KeyboardShortcutsHelp--table u-simple-scrollbars"
      dataSource={data}
      size="middle"
      pagination={false}
      showHeader={false}
      rowClassName={getRowClass}
    >
      <Column title="Description" dataIndex="description" key="description" render={padLeft} />
      <Column title="Key(s)" dataIndex="kbds" key="kbds" align="right" render={padRight} />
    </Table>
  );
  return kbdTable;
}


export default defineComponent({
  name: 'KeyboardShortcutsHelp',

  setup(props: any) {
    let state = {
      visible: false,
    };

    const onCtaClicked = () => {
      // track();
      // setState({ visible: true });
    };

    const onCloserClicked = () => state.visible = false
    const { className } = props;

    return () => (
      <>
        <Button className={className} htmlType="button" onClick={onCtaClicked}>
          <span className="KeyboardShortcutsHelp--cta">⌘</span>
        </Button>
        <Modal
          title="Keyboard Shortcuts"
          open={state.visible}
          onOk={onCloserClicked}
          onCancel={onCloserClicked}
          cancelButtonProps={{ style: { display: 'none' } }}
          bodyStyle={{ padding: 0 }}
        >
          {getHelpModal()}
        </Modal>
      </>
    )
  }

})
