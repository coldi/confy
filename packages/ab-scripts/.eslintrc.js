module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "indent": ["warn", 4, {"SwitchCase": 1}],
    "arrow-parens": "off",
    "function-paren-newline": "off",
    "quotes": ["error", "single"],
    "space-before-function-paren": "off",
    "function-paren-newline": "off",
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore"
    }],
    "global-require": "off",
    "no-console": "off",
    "no-unused-expressions": "off",
    "import/no-dynamic-require": "off"
  }
};
