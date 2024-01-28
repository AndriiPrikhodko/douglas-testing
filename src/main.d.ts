interface IPage {
  url: string
  selectors: {
    [key: string]: string
  }
}

interface IData {
  'name': string
  'filter': {
      'Produktart': string,
      'Marke': string,
      'Geschenk für': string,
      'Highlights': {
          'Sale': boolean,
          'NEU': boolean,
          'Limitiert': boolean
      }
  }
}