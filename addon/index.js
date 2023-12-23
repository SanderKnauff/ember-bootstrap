'use strict';

const SilentError = require('silent-error'); // From ember-cli
const VersionChecker = require('ember-cli-version-checker');

const defaultOptions = {
  importBootstrapTheme: false,
  importBootstrapFont: false,
  insertEmberWormholeElementToDom: true,
  bootstrapVersion: 5,
};

const minimumBS4Version = '4.0.0-beta';
const minimumBS5Version = '5.0.0';

module.exports = {
  name: require('./package').name,

  includedCommands() {
    return {
      'bootstrap:info': require('./lib/commands/info'),
    };
  },

  included() {
    // TODO: Fix CSS/SCSS imports
    this._super.included.apply(this, arguments);

    let app = this._findHost(this);
    this.app = app;

    let options = Object.assign(
      {},
      defaultOptions,
      app.options['ember-bootstrap'],
    );

    if (options.bootstrapVersion === 3) {
      throw new SilentError(
        'Support for Bootstrap 3 has been removed as of ember-bootstrap v5! Consider migrating to Bootstrap v4 or v5, or downgrade ember-bootstrap to v4!',
      );
    }

    if (options.bootstrapVersion >= 4 && options.importBootstrapFont) {
      this.warn(
        'Inclusion of the Glyphicon font is only supported for Bootstrap 3. ' +
          "Set Ember Bootstrap's `importBootstrapFont` option to `false` to hide this warning.",
      );
    }
    if (process.env.BOOTSTRAPVERSION) {
      // override bootstrapVersion config when environment variable is set
      options.bootstrapVersion = parseInt(process.env.BOOTSTRAPVERSION);
    }
    this.bootstrapOptions = options;

    this.validateDependencies();

    // setup config for @embroider/macros
    this.options['@embroider/macros'].setOwnConfig.isBS4 =
      this.getBootstrapVersion() === 4;
    this.options['@embroider/macros'].setOwnConfig.isBS5 =
      this.getBootstrapVersion() === 5;
    this.options['@embroider/macros'].setOwnConfig.isNotBS5 =
      this.getBootstrapVersion() !== 5;
    this.options['@embroider/macros'].setOwnConfig.version =
      require('./package.json').version;
  },

  options: {
    '@embroider/macros': {
      setOwnConfig: {},
    },
  },

  validateDependencies() {
    let checker = new VersionChecker(this.project);
    let dep = checker.for('bootstrap');

    if (this.getBootstrapVersion() === 4 && !dep.gte(minimumBS4Version)) {
      this.warn(
        `For Bootstrap 4 support this version of ember-bootstrap requires at least Bootstrap ${minimumBS4Version}, but you have ${dep.version}. Please run \`ember generate ember-bootstrap\` to update your dependencies!`,
      );
    }

    if (this.getBootstrapVersion() === 5 && !dep.gte(minimumBS5Version)) {
      this.warn(
        `For Bootstrap 5 support this version of ember-bootstrap requires at least Bootstrap ${minimumBS5Version}, but you have ${dep.version}. Please run \`ember generate ember-bootstrap\` to update your dependencies!`,
      );
    }
  },

  getBootstrapVersion() {
    return parseInt(this.bootstrapOptions.bootstrapVersion);
  },

  contentFor(type, config) {
    if (
      type === 'body-footer' &&
      config.environment !== 'test' &&
      this.bootstrapOptions.insertEmberWormholeElementToDom !== false
    ) {
      return '<div id="ember-bootstrap-wormhole"></div>';
    }
  },

  warn(message) {
    this.ui.writeWarnLine(message);
  },
};
