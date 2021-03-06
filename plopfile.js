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
      // add NamePage.js
      {
        type: 'add',
        path:
          'web/src/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.js',
        templateFile: 'templates/web/src/pages/page.txt',
      },
      // add NamePage.test.js
      {
        type: 'add',
        path:
          'web/src/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.test.js',
        templateFile: 'templates/web/src/pages/page.test.txt',
      },
      // add route to src/routes
      {
        type: 'modify',
        path: 'web/src/routes/index.js',
        pattern: /(\/\/ PLOP - APPEND ROUTE HERE)/gi,
        template:
          "{{constantCase name}}: { PATH: (params) => generatePath('{{lowerCase path}}', params), COMPONENT: PAGES.{{pascalCase name}}Page },\n  // PLOP - APPEND ROUTE HERE",
      },
      // Add Route to router component
      {
        type: 'modify',
        path: 'web/src/components/Router/Router.js',
        pattern: /({\/\* PLOP - APPEND ROUTE HERE \*\/})/gi,
        template:
          '<Route exact path={ROUTES.{{constantCase name}}.PATH()} component={ROUTES.{{constantCase name}}.COMPONENT}/>\n  {/* PLOP - APPEND ROUTE HERE */}',
      },
      // append import
      {
        type: 'modify',
        path: 'web/src/pages/index.js',
        pattern: /(\/\/ PLOP - APPEND IMPORT HERE)/gi,
        template:
          "import { {{pascalCase name}}Page } from './{{pascalCase name}}Page/{{pascalCase name}}Page'\n  // PLOP - APPEND IMPORT HERE",
      },
      // append export
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
        message: 'Layout name?',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true
          }
          return 'name is required'
        },
      },
    ],
    actions: [
      // add Name.js
      {
        type: 'add',
        path: 'web/src/components/{{pascalCase name}}/{{pascalCase name}}.js',
        templateFile: 'templates/web/src/components/component.txt',
      },
      // add Name.test.js
      {
        type: 'add',
        path:
          'web/src/components/{{pascalCase name}}/{{pascalCase name}}.test.js',
        templateFile: 'templates/web/src/components/component.test.txt',
      },
      // add index.js for import/exports
      {
        skipIfExists: true,
        type: 'add',
        path: 'web/src/components/index.js',
        templateFile: 'templates/web/src/components/index.txt',
      },
      // append import
      {
        type: 'modify',
        path: 'web/src/components/index.js',
        pattern: /(\/\/ PLOP - APPEND IMPORT HERE)/gi,
        template:
          "import { {{pascalCase name}} } from './{{pascalCase name}}/{{pascalCase name}}'\n// PLOP - APPEND IMPORT HERE",
      },
      // append export
      {
        type: 'modify',
        path: 'web/src/components/index.js',
        pattern: /(\/\/ PLOP - APPEND EXPORT HERE)/gi,
        template: '{{pascalCase name}},\n  // PLOP - APPEND EXPORT HERE',
      },
    ],
  })

  // LAYOUT
  plop.setGenerator('layout', {
    description: 'Create a layout component in the the layouts directory',
    prompts: [
      {
        name: 'name',
        message: 'Layout name?',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true
          }
          return 'name is required'
        },
      },
    ],
    actions: [
      // add NameLayout.js
      {
        type: 'add',
        path:
          'web/src/layouts/{{pascalCase name}}Layout/{{pascalCase name}}Layout.js',
        templateFile: 'templates/web/src/layouts/layout.txt',
      },
      // add NameLayout.test.js
      {
        type: 'add',
        path:
          'web/src/layouts/{{pascalCase name}}Layout/{{pascalCase name}}Layout.test.js',
        templateFile: 'templates/web/src/layouts/layout.test.txt',
      },
      // append import
      {
        type: 'modify',
        path: 'web/src/layouts/index.js',
        pattern: /(\/\/ PLOP - APPEND IMPORT HERE)/gi,
        template:
          "import { {{pascalCase name}} } from './{{pascalCase name}}Layout/{{pascalCase name}}Layout'\n  // PLOP - APPEND IMPORT HERE",
      },
      // append export
      {
        type: 'modify',
        path: 'web/src/layouts/index.js',
        pattern: /(\/\/ PLOP - APPEND EXPORT HERE)/gi,
        template: '{{pascalCase name}}Layout,\n  // PLOP - APPEND EXPORT HERE',
      },
    ],
  })

  // CONTEXT
  plop.setGenerator('context', {
    description:
      'Create React context, provider and reducer component in the the context directory',
    prompts: [
      {
        name: 'name',
        message: 'Context name?',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true
          }
          return 'name is required'
        },
      },
    ],
    actions: [
      // add NameContext.js
      {
        type: 'add',
        path:
          'web/src/context/{{pascalCase name}}Context/{{pascalCase name}}Context.js',
        templateFile: 'templates/web/src/context/context.txt',
      },
      // add NameContext.test.js
      {
        type: 'add',
        path:
          'web/src/context/{{pascalCase name}}Context/{{pascalCase name}}Context.test.js',
        templateFile: 'templates/web/src/context/context.test.txt',
      },
      // add NameReducer.js
      {
        type: 'add',
        path:
          'web/src/context/{{pascalCase name}}Context/{{pascalCase name}}Reducer.js',
        templateFile: 'templates/web/src/context/reducer.txt',
      },
      // append import
      {
        type: 'modify',
        path: 'web/src/context/index.js',
        pattern: /(\/\/ PLOP - APPEND IMPORT HERE)/gi,
        template:
          "import { {{pascalCase name}}Provider, use{{pascalCase name}} } from './{{pascalCase name}}Context/{{pascalCase name}}Context'\n// PLOP - APPEND IMPORT HERE",
      },
      // append export
      {
        type: 'modify',
        path: 'web/src/context/index.js',
        pattern: /(\/\/ PLOP - APPEND EXPORT HERE)/gi,
        template:
          '{{pascalCase name}}Provider,\n use{{pascalCase name}}\n  // PLOP - APPEND EXPORT HERE',
      },
    ],
  })
}
