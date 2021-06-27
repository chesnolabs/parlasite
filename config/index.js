const env = process.env.NODE_ENV;

const config = {
  port: 3066,
  serverTimeout: 120000,
  mainOrgId: process.env.MAIN_ORG_ID,
  mandateId: process.env.MANDATE_ID,
  urls: {
    cdn: 'https://parlassets-ljubljana.lb.djnd.si', // TODO
    analize: 'https://parladata.lb.djnd.si/v3/cards', // TODO
    data: 'https://parladata.lb.djnd.si/v3', // TODO
    isci: 'https://isci.parlameter.si', // TODO
    glej: 'https://parlacards.lb.djnd.si', // TODO
    // base: 'https://parlasite.lb.djnd.si', // TODO
    base: 'http://localhost:3066',
    parladata: 'http://parladata:8000'
  },
  siteLang: 'en',
  siteMap: {
    landing: {
      legislation: 'zakonodaja',
      sessions: 'seje',
      members: 'poslanci',
      parties: 'poslanske-skupine',
      tools: 'orodja',
      about: 'https://parlameter.org/sl/',
      media: 'za-medije',
      legal: 'pravno-obvestilo',
      thankYou: 'hvala',
      error: 'ups',
    },
    sessions: {
      search: {
        base: 'isci',
        filter: 'filter',
      },
    },
    tools: {
      notifications: 'obvestila',
      voteComparator: 'primerjalnik-glasovanj',
      discord: 'raziskovalec-neenotnosti',
      compass: 'parlamentarni-kompas',
      wordGroups: 'skupine-besed',
    },
    member: {
      base: 'p',
      overview: 'pregled',
      votings: 'glasovanja',
      speeches: 'govori',
    },
    party: {
      base: 'ps',
      overview: 'pregled',
      votings: 'glasovanja',
      speeches: 'govori',
    },
    session: {
      base: 'seja',
      legislation: 'zakonodaja',
      otherVotings: 'druga-glasovanja',
      transcript: 'transkript',
      agenda: 'dnevni-red',
      vote: 'glasovanje',
    },
  },
};

module.exports = config;
