'use strict';

const bs4Regex = '\\^4\\.\\d+\\.\\d+';
const bs5Regex = '\\^5\\.\\d+\\.\\d+';

const scenarios = [
  // `ember g ember-bootstrap` in a clean app
  {
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap` with existing config importBootstrapCSS=false
  {
    // Existing settings are preserved if they don't need to be overridden
    installed: {
      config: {
        importBootstrapCSS: false,
      },
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap` with existing ember-cli-sass
  {
    installed: {
      npm: ['ember-cli-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap --preprocessor=none` in a clean app
  {
    options: {
      preprocessor: 'none',
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap --preprocessor=none` with bootstrap-sass preinstalled
  {
    options: {
      preprocessor: 'none',
    },
    installed: {
      npm: ['bootstrap-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
        'bootstrap-sass': null,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap --preprocessor=none` with bootstrap-sass and ember-cli-sass preinstalled
  {
    options: {
      preprocessor: 'none',
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
        'bootstrap-sass': null,
      },
      addon: {
        'ember-cli-sass': null,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap --preprocessor=sass` in a clean app
  {
    options: {
      preprocessor: 'sass',
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
      addon: {
        'ember-cli-sass': true,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap --preprocessor=sass` with ember-cli-sass preinstalled
  {
    options: {
      preprocessor: 'sass',
    },
    installed: {
      npm: ['ember-cli-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
  },

  // BS4

  // `ember g ember-bootstrap ---bootstrap-version=4` in a clean app
  {
    options: {
      bootstrapVersion: 4,
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
      },
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=4` with ember-cli-sass preinstalled
  {
    options: {
      bootstrapVersion: 4,
    },
    installed: {
      npm: ['ember-cli-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
      },
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=4` with ember-cli-sass and bootstrap-sass preinstalled
  {
    options: {
      bootstrapVersion: 4,
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
        'bootstrap-sass': null,
      },
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=4 --preprocessor=none` in a clean app
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 4,
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
      },
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=4 --preprocessor=none` with ember-cli-sass preinstalled
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 4,
    },
    installed: {
      npm: ['ember-cli-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
      },
      addon: {
        'ember-cli-sass': null,
      },
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=4 --preprocessor=none` with ember-cli-sass and bootstrap-sass preinstalled
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 4,
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
        'bootstrap-sass': null,
      },
      addon: {
        'ember-cli-sass': null,
      },
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=4 --preprocessor=sass` in a clean app
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 4,
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
      },
      addon: {
        'ember-cli-sass': true,
      },
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=4 --preprocessor=sass` with bootstrap-sass preinstalled
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 4,
    },
    installed: {
      npm: ['bootstrap-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
        'bootstrap-sass': null,
      },
      addon: {
        'ember-cli-sass': true,
      },
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=4 --preprocessor=sass` with ember-cli-sass preinstalled
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 4,
    },
    installed: {
      npm: ['ember-cli-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
      },
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=4 --preprocessor=sass` with ember-cli-sass and bootstrap-sass preinstalled
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 4,
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs4Regex,
        'bootstrap-sass': null,
      },
    },
    config: {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
    },
  },

  // BS5

  // `ember g ember-bootstrap ---bootstrap-version=5` in a clean app
  {
    options: {
      bootstrapVersion: 5,
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=5` with ember-cli-sass preinstalled
  {
    options: {
      bootstrapVersion: 5,
    },
    installed: {
      npm: ['ember-cli-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=5` with ember-cli-sass and bootstrap-sass preinstalled
  {
    options: {
      bootstrapVersion: 5,
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
        'bootstrap-sass': null,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=5 --preprocessor=none` in a clean app
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 5,
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=5 --preprocessor=none` with ember-cli-sass preinstalled
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 5,
    },
    installed: {
      npm: ['ember-cli-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
      addon: {
        'ember-cli-sass': null,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=5 --preprocessor=none` with ember-cli-sass and bootstrap-sass preinstalled
  {
    options: {
      preprocessor: 'none',
      bootstrapVersion: 5,
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
        'bootstrap-sass': null,
      },
      addon: {
        'ember-cli-sass': null,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: true,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=5 --preprocessor=sass` in a clean app
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 5,
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
      addon: {
        'ember-cli-sass': true,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=5 --preprocessor=sass` with bootstrap-sass preinstalled
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 5,
    },
    installed: {
      npm: ['bootstrap-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
        'bootstrap-sass': null,
      },
      addon: {
        'ember-cli-sass': true,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=5 --preprocessor=sass` with ember-cli-sass preinstalled
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 5,
    },
    installed: {
      npm: ['ember-cli-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
  },
  // `ember g ember-bootstrap ---bootstrap-version=5 --preprocessor=sass` with ember-cli-sass and bootstrap-sass preinstalled
  {
    options: {
      preprocessor: 'sass',
      bootstrapVersion: 5,
    },
    installed: {
      npm: ['ember-cli-sass', 'bootstrap-sass'],
    },
    dependencies: {
      npm: {
        bootstrap: bs5Regex,
        'bootstrap-sass': null,
      },
    },
    config: {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
  },
];

module.exports = scenarios;
