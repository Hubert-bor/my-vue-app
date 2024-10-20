
export type CombokeysHandler =
  | (() => void)
  | ((event: any) => void)
  | ((event: any, s: string) => void);

export type ShortcutCallbacks = {
  [name: string]: CombokeysHandler;
};

let instance: undefined;

function getInstance() {
  if (instance) {
    return instance;
  }
}

export function merge(callbacks: ShortcutCallbacks) {
  const inst = getInstance();
  Object.keys(callbacks).forEach(name => {
    const keysHandler = callbacks[name];
  });
}

export function reset() {
  const combokeys = getInstance();
}
