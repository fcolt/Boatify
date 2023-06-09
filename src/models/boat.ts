export interface Boat {
	attributes: Attributes;
	Name: string;
	Description__c: string;
	Geolocation__Latitude__s: number;
	Geolocation__Longitude__s: number;
	Picture__c: string;
	Contact__r: Contact__r;
	BoatType__c: string;
	BoatType__r: BoatType__r;
	Length__c: number;
	Price__c: number;
}

export interface Attributes {
  type: string;
  url: string;
}

export interface Contact__r {
  attributes: Attributes;
  Name: string;
	Email: string;
}

export interface BoatType__r {
  attributes: Attributes;
  Name: string;
}