const _ = require('lodash');

const tpl = 'Hello ${name}';
const compiled = _.template(tpl);
console.log(compiled({ name: 'World' }));

const tpl2 = 'Hello <%= name %>';
const compiled2 = _.template(tpl2);
console.log(compiled2({ name: 'World' }));
