import {
  fetchCurrentUser,
  userLoginAsync,
  userRegisterAsync,
} from "../redux/actions/userActions";
import { createNewStore } from "../redux/configureStore";
import { UserLogin } from "../types/type";
import { userServer } from "./shared/userServer";

let store = createNewStore();

beforeAll(() => {
  userServer.listen();
});

afterAll(() => {
  userServer.close();
});

beforeEach(() => {
  store = createNewStore();
});

describe("user reducer", () => {
  test("user login", async () => {
    const user: UserLogin = {
      email: "test@gmail.com",
      password: "test",
    };
    await store.dispatch(userLoginAsync(user));
    expect(store.getState().user.token).toEqual({
      access_token: "12345",
      refresh_token: "12346",
    });
  });

  test("get user by token", async () => {
    await store.dispatch(fetchCurrentUser());
    expect(store.getState().user.user).toEqual({
      id: 1,
      email: "john@mail.com",
      password: "changeme",
      name: "Jhon",
      role: "customer",
      avatar: "https://i.imgur.com/LDOO4Qs.jpg",
    });
  });

  test("regiseter a new user", async () => {
    await store.dispatch(
      userRegisterAsync({
        name: "Nicolas",
        email: "nico@gmail.com",
        password: "1234",
        avatar: "https://picsum.photos/800",
      })
    );
    expect(store.getState().user.user).toEqual({
      email: "nico@gmail.com",
      password: "1234",
      name: "Nicolas",
      avatar: "https://i.imgur.com/yhW6Yw1.jpg",
      role: "customer",
      id: 24,
    });
  });
});
