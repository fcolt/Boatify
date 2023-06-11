export interface Review {
  attributes: Attributes
  Id: string
  Name: string
  Comment__c: string
  Rating__c: number
  LastModifiedDate: string
  CreatedDate: string
  CreatedById: string
  CreatedBy: CreatedBy
}
export interface CreatedBy {
  attributes: Attributes
  Id: string
  Name: string
  SmallPhotoUrl: string
  CompanyName: string
}

export interface Attributes {
  type: string
  url: string
}

