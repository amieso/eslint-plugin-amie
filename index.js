module.exports = {
  rules: {
    /**
     * Warn against using { requestPolicy: 'network-only' } in urql.
     */
    'no-network-only': {
      create(context) {
        return {
          ObjectExpression(node) {
            if (node.properties.length) {
              node.properties.forEach((property) => {
                if (
                  property.key &&
                  property.value &&
                  property.key.name === 'requestPolicy' &&
                  property.value.value === 'network-only'
                ) {
                  context.report({
                    node: node,
                    message:
                      'Setting the request policy to "network-only" can have damaging effects on pending mutations that depend on the cache.',
                  });
                }
              });
            }
          },
        };
      },
    },
  },
};
