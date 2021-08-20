import { AxiosResponse } from "axios";
import { useJwtAuth } from "./../../src/hooks/useJwtAuth";
import * as axios from "../../src/utils/axios";
import { accessTokenDto } from "../../src/dto/response/access_token.dto";
export const test = "";

describe("useJwtAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("get updated token", async () => {
    const { getAccessTokenUpdated } = useJwtAuth();
    jest.spyOn(axios, "axiosQuery").mockImplementation(
      async (): Promise<AxiosResponse<accessTokenDto>> => {
        return {
          config: {},
          data: {
            accessToken: "updated",
          },
          status: 200,
          headers: {},
          statusText: "ok",
        };
      }
    );
    const res = await getAccessTokenUpdated();
    expect(axios.axiosQuery).toBeCalled();
    expect(res).toEqual("updated");
  });
  it("get and set jwt token", () => {
    const token = "token";
    const { getAccessToken, setAccessToken } = useJwtAuth();
    expect(setAccessToken(token));
    expect(getAccessToken()).toEqual(token);
  });

  it("get refresh token", async () => {
    const { refreshAccessToken } = useJwtAuth();
    jest.spyOn(axios, "axiosQuery").mockImplementation(
      async (): Promise<AxiosResponse<accessTokenDto>> => {
        return {
          config: {},
          data: {
            accessToken: "new token",
          },
          status: 200,
          headers: {},
          statusText: "ok",
        };
      }
    );

    const res = await refreshAccessToken();
    expect(axios.axiosQuery).toBeCalled();
    expect(res).toEqual("new token");
  });
});
