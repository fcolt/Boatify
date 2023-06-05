import { oauth } from "react-native-force";
import { ORGANIZATION_URL } from "../api/constants";

export const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    oauth.getAuthCredentials(
      ({ accessToken }) => {
        resolve(accessToken);
      },
      (error) => {
        reject(null);
        throw error;
      }
    );
  });
}

export const getOAuthURL = (uri: String, accessToken: String) => {
  return `${ORGANIZATION_URL}/secur/frontdoor.jsp?sid=${accessToken}&retURL=${uri}`;
}