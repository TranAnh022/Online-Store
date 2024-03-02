import { HttpResponse, http } from "msw";
import { setupServer } from "msw/lib/node";

export const handler = [
  http.post("https://api.escuelajs.co/api/v1/auth/login", async () => {
    return HttpResponse.json(
      { access_token: "12345", refresh_token: "12346" },
      { status: 200 }
    );
  }),

  http.get("https://api.escuelajs.co/api/v1/auth/profile", async () => {
    return HttpResponse.json(
      {
        id: 1,
        email: "john@mail.com",
        password: "changeme",
        name: "Jhon",
        role: "customer",
        avatar: "https://i.imgur.com/LDOO4Qs.jpg",
      },
      { status: 200 }
    );
  }),

  http.post("https://api.escuelajs.co/api/v1/users", async () => {
    return HttpResponse.json(
      {
        email: "nico@gmail.com",
        password: "1234",
        name: "Nicolas",
        avatar: "https://i.imgur.com/yhW6Yw1.jpg",
        role: "customer",
        id: 24,
      },
      { status: 200 }
    );
  }),
];

export const userServer = setupServer(...handler);
