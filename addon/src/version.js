// import { getOwnConfig } from '@embroider/macros';
import Ember from 'ember';

// TODO Fix this
// export const VERSION = getOwnConfig().version;
export const VERSION = 'v2-addon-test';

export function registerLibrary() {
  Ember.libraries.register('Ember Bootstrap', VERSION);
}
