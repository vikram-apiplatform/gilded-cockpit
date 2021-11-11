// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    productName: 'Gilded Cockpit',
    productVersion: '0.0.1',
    menu: {
        documentation: true,
        aiSearch: true,
        notification: true
    },
    boardConfiguration: {
        board: true,
        ai: true,
        endpoint: true
    },
    apiHost: 'https://dev-gilded.gateway.apiplatform.io',
    apiHostName: 'dev-gilded',
};
