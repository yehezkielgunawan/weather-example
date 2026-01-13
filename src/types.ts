// AccuWeather API Response Types

export interface LocationSearchResult {
  Key: string;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

export interface CurrentConditions {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
  RealFeelTemperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
  RelativeHumidity: number;
  Wind: {
    Direction: {
      Degrees: number;
      Localized: string;
      English: string;
    };
    Speed: {
      Metric: {
        Value: number;
        Unit: string;
      };
      Imperial: {
        Value: number;
        Unit: string;
      };
    };
  };
  UVIndex: number;
  UVIndexText: string;
  Visibility: {
    Metric: {
      Value: number;
      Unit: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
  Pressure: {
    Metric: {
      Value: number;
      Unit: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
}

export interface DailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: {
      Value: number;
      Unit: string;
    };
    Maximum: {
      Value: number;
      Unit: string;
    };
  };
  Day: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
  };
  Night: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
  };
}

export interface ForecastResponse {
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
  };
  DailyForecasts: DailyForecast[];
}

// App-specific types

export interface Location {
  key: string;
  name: string;
  country: string;
  administrativeArea?: string;
}

export interface WeatherData {
  location: Location;
  currentConditions: CurrentConditions | null;
  forecast: DailyForecast[];
  error?: string;
}
