// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    api: '/api/records/1.0/search/',
    dataProvider: 'https://opendata.paris.fr',
    dataSets: {
        events: 'evenements-a-paris',
        musea: 'liste-musees-de-france-a-paris',
        cinemas: 'cinemas-a-paris'
    },
    maxRows: 10000,
    maxMockRows: 100,
    mocks: {
        events: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=evenements-a-paris&rows=100&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&refine.department=Paris&refine.date_start=2018',
        musea: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=liste-musees-de-france-a-paris&q=cp%3E%3D75001+AND+cp%3C%3D75020&rows=100&facet=cp',
        cinemas: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=cinemas-a-paris&rows=100&facet=arrondissement'
    },
    cpList: ['75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008', '75009', '75010', '75011', '75012', '75013', '75014', '75015', '75016', '75017', '75018', '75019', '75020'],
};
