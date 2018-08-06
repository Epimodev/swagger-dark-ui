# Swagger Dark UI

### Presentation
This application is a side a project which generate documentation UI from Swagger file.
You can import directly a JSON file or load a file from a server by writing it's url.
For the moment it's a first version which doesn't handle all possible cases and may bug with some files.
There are some improvements plan in the future :
- adapt UI for mobile devices
- store documentation in localstorage to keep it after refresh
- display all fields in schema with the possibility to expand/collapse objects
- add the possibility to try directly endpoints in the app
- improve error messages
- improve compatibility with different files

You can test it directly with this URL : http://epimodev-swagger-dark-ui.surge.sh/

### Development

#### Start dev server
```sh
$ yarn dev example
```

#### Build app
```sh
$ yarn build example
```

#### Run test
```sh
$ yarn test
```
