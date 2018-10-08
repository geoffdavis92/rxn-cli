# rxn-cli Roadmap

`$ rxn new [[-c, --component], ...] <component-name> [...options]`

Creates `.rxn` directory with default config, templates dir:

```
.rxn/
  templates/
    component/
      name.js
      name.test.js
      name.css
      name.json
    migration/
      name.js
      name-migrated.js
  rxn.config.js
```

## CLI

### Default Commands

- `init`: initializes directory (few options: use .rxn dir/set new config dir, use .rxnrc/rxn.config.js/.rxn/config.js/etc)
- `add`: adds new template to rxn
- `new`: creates new component/file/etc from template ID
- `test`: tests config for errors?

### Options

- `--dry`: dry run of command
- `--config=<path-to-config>`: choose new config path 


## Standard functionality

- [ ] Pull options from config file
- [ ] Pull options from arguments
- [ ] Resolve to custom `src` directory locations/structures
- [ ] Use custom styling libraries and/or strategies (PostCSS, Sass, etc)
- [ ] Write standard "new" files
- [ ] Write custom files (w/banners, boilerplate, etc) copied from .rxn dir
- [ ] Detect testing suites
- [ ] Detect typings (Flow, TS)

## Configurable Features

- [ ] `source` directory
- [ ] Component directories
- [ ] Typings used
- [ ] Testing suites used

## Future Implementation

- Multiple types: create default-export component, create utlity file, create directories with no tests, etc

```
// .rxn.config.js

module.exports = {
    rxnTypes: [
        {
            keyword: ['c','component'], // [shortcut ID, fullname ID]
            options: {
                header: `/** [name] **/`, // header banner comment
                defaultImports: [
                    ['react',['Component']], // Import default and exports
                    ['styled-components'], // Import default only
                    ['react-router-dom', false, ['Router','Route','Link']] // Import non-default exports only
                ],
                isDefaultExport: true // should use `export default ...` syntax
            },
            // List of files to generate
            fileList: [
                '[name].js',
                '[name].test.js',
                '[name].css'
            ]
        }
    ]
}
```