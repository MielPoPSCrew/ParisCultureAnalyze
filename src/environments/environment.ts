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
        museums: 'liste-musees-de-france-a-paris',
        cinemas: 'cinemas-a-paris'
    },
    maxRows: 10000,
    maxMockRows: 100,
    mocks: {
        events: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=evenements-a-paris&rows=100&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&refine.department=Paris&refine.date_start=2018',
        museums: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=liste-musees-de-france-a-paris&q=cp%3E%3D75001+AND+cp%3C%3D75020&rows=100&facet=cp',
        cinemas: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=cinemas-a-paris&rows=100&facet=arrondissement'
    },
    cpList: ['75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008', '75009', '75010', '75011', '75012', '75013', '75014', '75015', '75016', '75017', '75018', '75019', '75020'],
    colorList: [{ backgroundColor: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#000000'] }],
    cpColorList: {
        '75001': '#F44336',
        '75002': '#E91E63',
        '75003': '#9C27B0',
        '75004': '#673AB7',
        '75005': '#3F51B5',
        '75006': '#2196F3',
        '75007': '#03A9F4',
        '75008': '#00BCD4',
        '75009': '#009688',
        '75010': '#4CAF50',
        '75011': '#8BC34A',
        '75012': '#CDDC39',
        '75013': '#FFEB3B',
        '75014': '#FFC107',
        '75015': '#FF9800',
        '75016': '#FF5722',
        '75017': '#795548',
        '75018': '#9E9E9E',
        '75019': '#607D8B',
        '75020': '#000000'
    }
};
