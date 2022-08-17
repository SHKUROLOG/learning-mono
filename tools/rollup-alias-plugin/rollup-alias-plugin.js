const { promises: fs } = require('fs')
const path = require('path')
const {
  findConfigFile,
  parseJsonSourceFileConfigFileContent,
  readJsonConfigFile,
  sys,
} = require('typescript')

const extensions = ['.ts', '.vue']

function getMonorepoLibsFromTsConfig() {
  const tsConfigPath = findConfigFile('.', sys.fileExists, 'tsconfig.json')
    ?? findConfigFile('.', sys.fileExists, 'tsconfig.base.json')

  if (!tsConfigPath)
    throw new Error('Cannot find tsconfig.json or tsconfig.base.json')

  const configFile = readJsonConfigFile(tsConfigPath, sys.readFile)
  const { options } = parseJsonSourceFileConfigFileContent(
    configFile,
    sys,
    './',
  )
  const { pathsBasePath, paths } = options

  return Object.fromEntries(
    Object.entries(paths)
      .map(([importName, [importPath]]) => [
        importName.replace(/\*$/, ''),
        `${pathsBasePath}/${importPath.replace(/\*$/, '')}`,
      ])
      .sort(
        /**
         * Сортируем по убыванию имени импорта, чтобы более длинные имена импортов
         * получили больший приоритет при поиске
         * Например, @greeno/i18n/locales и @greeno/i18n
         */
        ([importNameA], [importNameB]) => importNameB.localeCompare(importNameA),
      ),
  )
}

module.exports = function aliasPlugin(options = {}) {
  const monorepoLibs = getMonorepoLibsFromTsConfig(options)
  const entries = Object.entries(options)
  const monorepoKeys = Object.keys(monorepoLibs)
  const npmLibEntries = entries.filter(([, replacement]) => !path.isAbsolute(replacement))

  function getMonorepoRootRelativePath(source) {
    const directReplacement = monorepoLibs[source]

    if (directReplacement) return directReplacement

    const key = monorepoKeys.find(key => source.startsWith(key))
    const partialReplacement = monorepoLibs[key]

    if (partialReplacement) {
      const rest = source.replace(key, '')

      return `${partialReplacement}${rest}`
    }
  }

  return {
    name: 'alias',
    resolveId: !monorepoKeys.length
      ? undefined
      : function(source, importer) {
        if (!importer || !source.startsWith('@learning-mono')) return
        const replacement = getMonorepoRootRelativePath(source)
        if (!replacement) return
        const relative = path.relative(path.dirname(importer), replacement)

        return this.resolve(relative, importer)
      },
    load: !npmLibEntries.length
      ? undefined
      : async function(id) {
        if (
          id.includes('?')
          || !extensions.some(extension => id.endsWith(extension))
        ) {
          return
        }

        let fileContent = await fs.readFile(id, { encoding: 'utf8' })
        if (!fileContent.includes('import')) return

        npmLibEntries.forEach(([find, replacement]) => {
          fileContent = fileContent.replace(
            `from '${find}'`,
            `from '${replacement}'`,
          )
        })

        return fileContent
      },
  }
}
