const fs = require('fs/promises');
const { existsSync } = require('fs');
const path = require('path');
const mkdir = require('make-dir');

const splitStyles = async (filepath) => {
  const file = await fs.readFile(filepath, 'utf8');
  const styledDirectory = path.join(path.dirname(filepath), 'styled');

  if (existsSync(styledDirectory)) {
    console.log(
      `This component already has a styled directory. Aborting to prevent overwriting components and barrel files`,
    );

    process.exit(1);
  }

  await mkdir(styledDirectory);
  const lineWithFirstStyledComponent = file

    .split('\n')

    .findIndex((line) => line.includes('= styled'));

  const lines = file.split('\n').slice(lineWithFirstStyledComponent);

  const lastLineWithStyledComponent =
    lines.length - 1 - [...lines].reverse().findIndex((line) => line.includes('styled'));

  const nextBackTick =
    lines.slice(lastLineWithStyledComponent + 1).findIndex((line) => line.includes('`')) + 1;

  const components = [];

  const componentLines = lines.slice(0, lastLineWithStyledComponent + nextBackTick + 1);

  let component = '';
  let inComponent = false;

  for (let i = 0; i < componentLines.length; i++) {
    const line = componentLines[i];

    if (line.startsWith('const')) {
      inComponent = true;
    }

    if (line.startsWith('`')) {
      inComponent = false;
      component += '`\n';
      components.push(component);
      component = '';
    }

    if (inComponent) {
      component += line + '\n';
    }
  }

  const titleRegexpr = /^const (.*?) =/;

  const componentData = components.map((component) => {
    const name = new RegExp(titleRegexpr).exec(component)[1];

    return {
      name,
      fileName: `${name}.js`,
      component: `import styled from 'styled-components'\n\n${component}\nexport default ${name}\n`,
    };
  });

  const barrel = `${componentData
    .map((c) => `import ${c.name} from './${c.fileName}'`)
    .sort((a, b) => a.localeCompare(b))
    .join('\n')}\n\nexport {\n${componentData
    .map((c) => `\t\t${c.name}`)
    .sort((a, b) => a.localeCompare(b))
    .join(',\n')}\n}\n`;

  console.log(`Writing components to "${styledDirectory}"`);

  await Promise.all(
    componentData.map((c) => fs.writeFile(path.join(styledDirectory, c.fileName), c.component)),
  );

  await fs.writeFile(path.join(styledDirectory, 'index.js'), barrel);

  console.log(
    `Styled components have been removed from "${filepath}" and written to "${styledDirectory}"`,
  );
};

(async () => {
  const [filepath] = process.argv.slice(2);

  await splitStyles(path.join(process.cwd(), filepath));
})();
