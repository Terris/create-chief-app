module.exports = function (plop) {
  // PAGE
  plop.setGenerator('page', {
    description: 'Create a page component in the the pages directory',
    prompts: [
      {
        name: 'name',
        message: 'Page name?',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true
          }
          return 'name is required'
        },
      },
      {
        name: 'path',
        message: 'Path?',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true
          }
          return 'path is required'
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path:
          'web/src/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.js',
        templateFile: 'templates/web/src/pages/page.txt',
      },
      {
        type: 'add',
        path:
          'web/src/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.test.js',
        templateFile: 'templates/web/src/pages/page.test.txt',
      },
      {
        type: 'modify',
        path: 'web/src/config/routes.js',
        pattern: /(\/\/ PLOP - APPEND ROUTE HERE)/gi,
        template:
          "{{constantCase name}}: { PATH: (params) => generatePath('{{lowerCase path}}', params), COMPONENT: PAGES.{{pascalCase name}}Page },\n  // PLOP - APPEND ROUTE HERE",
      },
      {
        type: 'modify',
        path: 'web/src/Router.js',
        pattern: /({\/\* PLOP - APPEND ROUTE HERE \*\/})/gi,
        template:
          '<Route exact path={ROUTES.{{constantCase name}}.PATH()} component={ROUTES.{{constantCase name}}.COMPONENT}/>\n  {/* PLOP - APPEND ROUTE HERE */}',
      },
      {
        type: 'modify',
        path: 'web/src/pages/index.js',
        pattern: /(\/\/ PLOP - APPEND IMPORT HERE)/gi,
        template:
          "import { {{pascalCase name}}Page } from './{{pascalCase name}}Page/{{pascalCase name}}Page'\n  // PLOP - APPEND IMPORT HERE",
      },
      {
        type: 'modify',
        path: 'web/src/pages/index.js',
        pattern: /(\/\/ PLOP - APPEND EXPORT HERE)/gi,
        template: '{{pascalCase name}}Page,\n  // PLOP - APPEND EXPORT HERE',
      },
    ],
  })

  // COMPONENT
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
        type: 'add',
        path:
          'web/src/components/{{pascalCase name}}/{{pascalCase name}}.test.js',
        templateFile: 'templates/web/src/components/component.test.txt',
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
        pattern: /(\/\/ PLOP - APPEND IMPORT HERE)/gi,
        template:
          "import { {{pascalCase name}} } from './{{pascalCase name}}/{{pascalCase name}}/'\n// PLOP - APPEND IMPORT HERE",
      },
      {
        type: 'modify',
        path: 'web/src/components/index.js',
        pattern: /(\/\/ PLOP - APPEND EXPORT HERE)/gi,
        template: '{{pascalCase name}},\n  // PLOP - APPEND EXPORT HERE',
      },
    ],
  })
}
