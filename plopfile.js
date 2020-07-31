module.exports = function (plop) {
  // controller generator
  plop.setGenerator('component', {
    description:
      'Create a React function component in the the components directory',
    prompts: [
      {
        name: 'name',
        message: 'Component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'web/src/components/{{pascalCase name}}/{{pascalCase name}}.js',
        templateFile: 'templates/web/src/components/component.txt',
      },
      {
        skipIfExists: true,
        type: 'add',
        path: 'web/src/components/index.js',
        templateFile: 'templates/web/src/components/index.txt',
      },
      {
        type: 'modify',
        path: 'web/src/components/index.js',
        pattern: /(\/\/ PLOP - APPEND IMPORTS HERE)/gi,
        template:
          "import { {{pascalCase name}} } from './{{pascalCase name}}/{{pascalCase name}}/'\n// PLOP - APPEND IMPORTS HERE",
      },
      {
        type: 'modify',
        path: 'web/src/components/index.js',
        pattern: /(\/\/ PLOP - APPEND EXPORTS HERE)/gi,
        template: '{{pascalCase name}},\n  // PLOP - APPEND EXPORTS HERE',
      },
    ],
  })
}
