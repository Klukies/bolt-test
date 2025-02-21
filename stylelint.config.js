// stylelint-config-clean-order adds extra empty lines for formatting which we don't want
import stylelintConfigStandard from 'stylelint-config-standard';

/**
 * @see https://stylelint.io/user-guide/configure
 * @type {import('stylelint').Config}
 */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  ignoreFiles: ['./build/**'],
  rules: {
    'at-rule-empty-line-before': stylelintConfigStandard.rules['at-rule-empty-line-before'],
    'declaration-empty-line-before': stylelintConfigStandard.rules['declaration-empty-line-before'],
    'order/properties-order': stylelintConfigStandard.rules['order/properties-order'],
    'selector-class-pattern': null,
  },
};
