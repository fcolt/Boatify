import { oauth } from "react-native-force";

export const getAccessToken = () => {
  return new Promise<string>((resolve, reject) => {
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