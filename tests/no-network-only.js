const rules = require('../index.js');
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-network-only', rules.rules['no-network-only'], {
  valid: [
    "reexecute({ requestPolicy: 'blah' });",
    "something({ requestPolicy: 'cache-first' });",
  ],

  invalid: [
    {
      code: `reexecute({ requestPolicy: 'network-only' });`,
      errors: [
        {
          message:
            'Setting the request policy to "network-only" can have damaging effects on pending mutations that depend on the cache.',
          type: 'ObjectExpression',
        },
      ],
    },
  ],
});
