# VueComposables

## UseCsv

### Depends on:
- Typescript
- papaparse
- @vueuse/shared


### interface

- useCsv<T>(options?: MaybeRef<UnparseConfig>)
  it expects the papaparse Unparse options.
  it returns a function `exportToFile` and a function `importFromFile`

- exportToFile
  It expects a filename and an array of genercis `T`, then it parses the array end prompt a download for the filename provided

- importFromFile
  It expects a file and the ParseConfig from papaparse.
  It returns a Promise with an Array of generic `T`, or throw
