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
    colorList: [{
        backgroundColor: [
            '#EF5350',
            '#EC407A',
            '#AB47BC',
            '#7E57C2',
            '#5C6BC0',
            '#42A5F5',
            '#29B6F6',
            '#26C6DA',
            '#26A69A',
            '#66BB6A',
            '#9CCC65',
            '#D4E157',
            '#FFEE58',
            '#FFCA28',
            '#FFA726',
            '#FF7043',
            '#8D6E63',
            '#BDBDBD',
            '#90A4AE',
            '#607D8B'
        ]
    }],
    cpColorList: {
        '75001': '#EF5350',
        '75002': '#EC407A',
        '75003': '#AB47BC',
        '75004': '#7E57C2',
        '75005': '#5C6BC0',
        '75006': '#42A5F5',
        '75007': '#29B6F6',
        '75008': '#26C6DA',
        '75009': '#26A69A',
        '75010': '#66BB6A',
        '75011': '#9CCC65',
        '75012': '#D4E157',
        '75013': '#FFEE58',
        '75014': '#FFCA28',
        '75015': '#FFA726',
        '75016': '#FF7043',
        '75017': '#8D6E63',
        '75018': '#BDBDBD',
        '75019': '#90A4AE',
        '75020': '#607D8B'
    }
};
