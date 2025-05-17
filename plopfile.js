export default function (plop) {
  plop.setGenerator('tool', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Tool name',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Tool description',
      },
    ],
    actions: [
      {
        type: 'add',
        templateFile: 'templates/tool/index.hbs',
        path: 'src/tools/{{kebabCase name}}/index.ts',
      },
    ],
  });

  plop.setGenerator('resource', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Resource name',
      },
      {
        type: 'confirm',
        name: 'isUriTemplate',
        message: 'Is URI template?',
      },
      {
        type: 'input',
        name: 'uri',
        message: 'Resource URI',
      },
    ],
    actions: [
      {
        type: 'add',
        templateFile: 'templates/resource/index.hbs',
        path: 'src/resources/{{kebabCase name}}/index.ts',
      },
    ],
  });
}
