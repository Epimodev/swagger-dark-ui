# Swagger Dark UI

### Presentation
This application is a side a project which generates documentation UI from Swagger file.
You can import directly a JSON file or load a file from a server by writing its url.
For the moment it's a first version which doesn't handle all possible cases and may bug with some files.
There are some improvements planned in the future :
- [x] improve compatibility with different files
- [x] adapt UI for mobile devices
- store documentation in localstorage to keep it after refresh
- display all fields in schema with the possibility to expand/collapse objects
- add the possibility to try directly endpoints in the app
- improve error messages

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
