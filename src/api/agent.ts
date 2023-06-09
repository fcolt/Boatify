import { net } from "react-native-force";
import { ExecSuccessCallback } from "react-native-force/dist/react.force.common";
import { GET_BOATS_ENDPOINT, GET_BOAT_TYPES_ENDPOINT } from "./constants";
import { QueryResult } from "../models/queryResult";
import { User } from "../models/user";
import { Boat } from "../models/boat";

const handleError = (err: Error) => {
  console.log(err);
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
    `SELECT Name, Description__c, Picture__c FROM Boat__c LIMIT ${noOfBoats} OFFSET ${offset}`,
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

const agent = {
  UserAccount,
  Boats
}

export default agent;