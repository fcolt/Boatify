import { net } from "react-native-force";
import { ExecSuccessCallback } from "react-native-force/dist/react.force.common";
import { GET_ALL_REVIEWS_ENDPOINT, GET_BOATS_ENDPOINT, GET_BOAT_TYPES_ENDPOINT } from "./constants";
import { QueryResult } from "../models/queryResult";
import { User } from "../models/user";
import { Boat } from "../models/boat";
import { Review } from "../models/review";
import Snackbar from "react-native-snackbar";
import { ROUTES as routes } from "./constants";
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate({ name, params } as never);
  }
}

export const handleError = (err: any) => {
  switch (err.response.statusCode) {
    case 400:
      Snackbar.show({
        text: 'Could not fetch some data...',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red'
      });
      break;
    case 401:
      Snackbar.show({
        text: 'You are unauthorized to access the requested resource',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red'
      });
      break;
    case 404:
      navigate(routes.notFoundScreen);
      break;
    case 500:
      navigate(routes.serverErrorScreen);
      break;
    default:
      Snackbar.show({
        text: 'Unknown error',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red'
      });
      break;
  }
}

const requests = {
  get: (endpoint: string, successCB: ExecSuccessCallback<string>) => {
    net.sendRequest(
      "/services/apexrest",
      endpoint,
      successCB,
      (err) => handleError(err),
      "GET"
    );
  },
  queryGet: <T>(query: string, successCB: ExecSuccessCallback<T>) => {
    net.query(
      query,
      successCB,
      (err) => handleError(err)
    );
  }
}

const UserAccount = {
  getProfilePic: (
    userId: string,
    successCB: ExecSuccessCallback<QueryResult<User>>
  ) => requests.queryGet(
    `SELECT SmallPhotoUrl FROM User WHERE Id = \'${userId}\'`,
    successCB
  )
}

const Boats = {
  getBoatTypes: (successCB: ExecSuccessCallback<string>) => requests.get(GET_BOAT_TYPES_ENDPOINT, successCB),
  getDemoBoatCardsInfo: (
    noOfBoats: number,
    offset: number,
    successCB: ExecSuccessCallback<QueryResult<Boat>>
  ) => requests.queryGet(
    `SELECT 
      Id, Name, Description__c, Picture__c, 
      BoatType__r.Name, Contact__r.Name,
      Contact__r.Email, Price__c, Length__c
    FROM Boat__c LIMIT ${noOfBoats} OFFSET ${offset}`,
    successCB
  ),
  getPaginatedBoats: (
    boatTypeIdParam: string,
    maxRecords: number,
    offset: number,
    successCB: ExecSuccessCallback<string>
  ) => requests.get(
    `${GET_BOATS_ENDPOINT}?${boatTypeIdParam}maxRecords=${maxRecords}&offset=${offset}`,
    successCB
  )
}

const Reviews = {
  postReview: (fields: Record<string, unknown>, successCB: ExecSuccessCallback<string>) => {
    net.create(
      "BoatReview__c",
      fields,
      successCB,
      (err) => handleError(err)
    )
  },
  getPaginatedReviews: (
    boatId: string,
    maxRecords: number,
    offset: number,
    successCB: ExecSuccessCallback<string>
  ) => requests.get(
    `${GET_ALL_REVIEWS_ENDPOINT}?boatId=${boatId}&maxRecords=${maxRecords}&offset=${offset}`,
    successCB
  )
}

const agent = {
  UserAccount,
  Boats,
  Reviews
}

export default agent;