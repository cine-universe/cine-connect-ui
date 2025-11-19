export enum ProductionType {
  FeatureFilm = 'Feature Film',
  ShortFilm = 'Short Film',
  Documentary = 'Documentary',
  TVSeries = 'TV Series',
  Commercial = 'Commercial',
  MusicVideo = 'Music Video',
  WebSeries = 'Web Series',
  Corporate = 'Corporate Video',
  Animation = 'Animation',
  Experimental = 'Experimental',
  Educational = 'Educational',
  PSA = 'Public Service Announcement',
  LiveEvent = 'Live Event',
  VirtualProduction = 'Virtual Production'
}

export interface Experience {
    id: number,
    userId: number,
    projectTitle: string,
    role: string,
    productionType: ProductionType,
    productionCompany: string,
    location: string,
    startDate: Date,
    endDate: Date,
    description: string
}