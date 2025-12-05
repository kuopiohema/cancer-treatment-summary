export const followupDefaults = {
    growth: 'Kasvun seuranta kontrollikäyntien yhteydessä.',
    bloodPressure: 'Verenpaineen mittaus vuosittain ja kontrollikäyntien yhteydessä, tarvittaessa kotiseuranta.',
    heart: {
        boy: {
            lowRisk: 'Ei tarvetta sydämen rutiiniseurannalle.',
            mediumRisk: 'Sydämen ultraäänitutkimus 2 vuotta hoitojen loppumisesta ja sen jälkeen 5 vuoden välein.',
            highRisk: 'Sydämen ultraäänitutkimus 2 vuotta hoitojen loppumisesta ja sen jälkeen 2-3 vuoden välein.'
        },
        girl: {
            lowRisk: 'Ei tarvetta sydämen rutiiniseurannalle. Sydäntilanteen tarkistusta harkitaan ennen raskautta tai viimeistään 1. raskauskolmanneksen aikana.',
            mediumRisk: 'Sydämen ultraäänitutkimus 2 vuotta hoitojen loppumisesta ja sen jälkeen 5 vuoden välein, lisäksi ennen raskautta tai viimeistään 1. raskauskolmanneksen aikana.',
            highRisk: 'Sydämen ultraäänitutkimus 2 vuotta hoitojen loppumisesta ja sen jälkeen 2-3 vuoden välein, lisäksi ennen raskautta tai viimeistään 1. raskauskolmanneksen aikana.'
        }
    },
    lifestyle: 'Suositellaan välttämään tupakointia ja noudattamaan muutoinkin sydänterveellisiä elintapoja.',
    vaccination: {
        influenza: 'Influenssarokotus vuosittain, kunnes ei enää kuulu riskiryhmään.',
        unvaccinated: 'Annetaan kansallisen rokotusohjelman mukaiset rokotteet.',
        interrupted: 'Rokottamista jatketaan kansallisen rokotusohjelman mukaisesti siitä, mihin ennen hoitoja jäätiin. Lisäksi annetaan tarvittaessa tehosterokotteet erillisen ohjeen mukaan.',
        standardRisk: 'Rokotuksia voidaan antaa aikaisintaan 3 kk kuluttua hoitojen loppumisesta. Poikkeuksena eläviä, heikennettyjä taudinaiheuttajia sisältävät rokotteet (esim. MPR, vesirokko, influenssa-nenäsumute), joita voidaan antaa aikaisintaan 6 kk kuluttua hoitojen loppumisesta.',
        highRisk: 'Rokotuksia voidaan antaa aikaisintaan 6 kk kuluttua hoitojen loppumisesta.',
        autoSCT: 'Autologisen kantasolusiirron jälkeen rokotesuojan varmistamiseksi rokotusohjelma aloitetaan alusta, tästä annetaan erillinen ohje.',
        alloSCT: 'Siirtokeskus antaa ohjeet rokottamisesta allogeenisen kantasolusiirron jälkeen.'
    }
} as const