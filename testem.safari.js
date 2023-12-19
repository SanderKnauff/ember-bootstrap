'use strict';

/* eslint-env node */
module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  parallel: 1,
  browser_start_timeout: 2000,
  browser_disconnect_timeout: 120,
  launch_in_ci: ['Safari'],
  launchers: {
    Safari: {},
  },
};
