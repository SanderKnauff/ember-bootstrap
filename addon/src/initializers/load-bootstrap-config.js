//import ENV from '../config/environment';
import Config from '../config';
import { registerLibrary } from '../version';

export function initialize(/* container, application */) {
  // Config.load(ENV['ember-bootstrap'] || {});
  Config.load({});
  registerLibrary();
}

export default {
  name: 'load-bootstrap-config',
  initialize,
};
