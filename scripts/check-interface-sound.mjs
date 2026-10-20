import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = await readFile('src/components/InterfaceSound.tsx', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function mount(preference, blockedStorage = false) {
  let enabled = true, time = 100, listener, cleanup;
  let plays = 0, pauses = 0, ref = 0;
  const memory = new Map([['blackout-interface-sound', preference]]);
  const audio = { volume: 1, currentTime: 9, play: () => { plays++; return Promise.reject(new Error('Autoplay blocked')); }, pause: () => { pauses++; } };
  class Element {
    constructor(interactive = true, disabled = false) { this.interactive = interactive; this.disabled = disabled; }
    closest(selector) { return selector.startsWith('a[') ? (this.interactive ? this : null) : (this.disabled ? this : null); }
  }
  const context = {
    exports: {}, Element, performance: { now: () => time },
    localStorage: {
      getItem: key => { if (blockedStorage) throw new Error('Storage blocked'); return memory.get(key); },
      setItem: (key, value) => { if (blockedStorage) throw new Error('Storage blocked'); memory.set(key, value); },
    },
    document: {
      addEventListener: (type, fn, capture) => { assert.equal(type, 'click'); assert.equal(capture, true); listener = fn; },
      removeEventListener: (type, fn, capture) => { assert.equal(type, 'click'); assert.equal(fn, listener); assert.equal(capture, true); listener = undefined; },
    },
    require: name => name === 'react' ? {
      createContext: () => ({ Provider: 'provider' }),
      useState: () => [enabled, value => { enabled = value; }],
      useRef: () => ({ current: ref++ === 0 ? true : audio }),
      useEffect: effect => { cleanup = effect(); },
    } : name === '@/lib/use-interface-copy' ? {} : require(name),
  };
  vm.runInNewContext(compiled, context);
  const tree = context.exports.InterfaceSoundProvider({ children: null });
  const media = tree.props.children[1];
  assert.equal(media.type, 'audio');
  assert.equal(media.props.autoPlay, undefined, 'No audio before user interaction');
  assert.equal(media.props.loop, undefined, 'Click must not loop');
  assert.equal(plays, 0);
  return {
    click: ({ interactive = true, disabled = false, trusted = true } = {}) => listener({ isTrusted: trusted, target: new Element(interactive, disabled) }),
    advance: () => { time += 100; }, toggle: tree.props.value.toggle,
    state: () => ({ plays, pauses, enabled, stored: memory.get('blackout-interface-sound'), volume: audio.volume, position: audio.currentTime }),
    cleanup: () => { cleanup(); assert.equal(listener, undefined); },
  };
}

const sound = mount(null);
for (const options of [{ interactive: false }, { disabled: true }, { trusted: false }]) sound.click(options);
assert.equal(sound.state().plays, 0, 'Ignore background, disabled and programmatic clicks');
sound.click();
assert.equal(sound.state().plays, 1);
assert.equal(sound.state().volume, 0.2);
assert.equal(sound.state().position, 0);
sound.click();
assert.equal(sound.state().plays, 1, 'Avoid overlapping rapid clicks');
sound.advance(); sound.click();
assert.equal(sound.state().plays, 2);
sound.toggle(); sound.advance(); sound.click();
assert.equal(sound.state().plays, 2);
assert.equal(sound.state().pauses, 1);
assert.equal(sound.state().stored, 'off');
const restored = mount(sound.state().stored);
restored.click();
assert.equal(restored.state().plays, 0, 'Remember mute across reloads');
restored.toggle(); restored.click();
assert.equal(restored.state().plays, 1);
assert.equal(restored.state().stored, 'on');
const storageBlocked = mount(null, true);
storageBlocked.click(); storageBlocked.toggle(); storageBlocked.advance(); storageBlocked.click();
assert.equal(storageBlocked.state().plays, 1, 'Unavailable storage must not break playback or mute');
for (const fixture of [sound, restored, storageBlocked]) fixture.cleanup();
await new Promise(resolve => setImmediate(resolve));
console.log('PASS: click sound is interaction-only, quiet, throttled, muteable and persistent; playback/storage failures do not break navigation.');
