let createUser = {
  user: {
    id: "12345678-abcd-1234-efgh-1234567890ab",
    name: "Jane Doe",
    email: "janedoe@example.com",
    emailVerified: null,
    image: "https://example.com/avatar/janedoe.jpg",
    password: null,
    role: "user",
  },
};

let linkAccount = {
  user: {
    id: "12345678-abcd-1234-efgh-1234567890ab",
    name: "Jane Doe",
    email: "janedoe@example.com",
    emailVerified: null,
    image: "https://example.com/avatar/janedoe.jpg",
    password: null,
    role: "user",
  },
  account: {
    access_token: "abc123xyz456def789",
    id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YmJlMDgxNWIwNjRlNmQ0NDljYWM5...",
    expires_at: 1720568337,
    scope:
      "https://example.com/auth/userinfo.email https://example.com/auth/userinfo.profile openid",
    token_type: "bearer",
    providerAccountId: "12345678901234567890",
    provider: "google",
    type: "oidc",
    userId: undefined,
  },
  profile: {
    id: "87654321-dcba-4321-hgfe-0987654321ba",
    name: "Jane Doe",
    email: "janedoe@example.com",
    image: "https://example.com/avatar/janedoe.jpg",
  },
};

let signIn = {
  user: {
    id: "12345678-abcd-1234-efgh-1234567890ab",
    name: "Jane Doe",
    email: "janedoe@example.com",
    emailVerified: null,
    image: "https://example.com/avatar/janedoe.jpg",
    password: null,
    role: "user",
  },
  account: {
    access_token: "abc123xyz456def789",
    expires_in: 3599,
    scope:
      "https://example.com/auth/userinfo.email https://example.com/auth/userinfo.profile openid",
    token_type: "bearer",
    id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YmJlMDgxNWIwNjRlNmQ0NDljYWM5...",
    expires_at: 1720568337,
    provider: "google",
    type: "oidc",
    providerAccountId: "12345678901234567890",
  },
  profile: {
    iss: "https://accounts.example.com",
    azp: "0987654321fedcba1234567890abcdef.apps.exampleusercontent.com",
    aud: "0987654321fedcba1234567890abcdef.apps.exampleusercontent.com",
    sub: "12345678901234567890",
    email: "janedoe@example.com",
    email_verified: true,
    at_hash: "abcdef1234567890",
    name: "Jane Doe",
    picture: "https://example.com/avatar/janedoe.jpg",
    given_name: "Jane",
    family_name: "Doe",
    iat: 1720564738,
    exp: 1720568338,
  },
  isNewUser: true,
};

let session = {
  session: {
    user: {
      name: "Jane Doe",
      email: "janedoe@example.com",
      image: "https://example.com/avatar/janedoe.jpg",
      id: "12345678-abcd-1234-efgh-1234567890ab",
      role: "user",
    },
    expires: "2024-08-08T22:38:59.236Z",
  },
  token: {
    name: "Jane Doe",
    email: "janedoe@example.com",
    picture: "https://example.com/avatar/janedoe.jpg",
    sub: "12345678-abcd-1234-efgh-1234567890ab",
    id: "12345678-abcd-1234-efgh-1234567890ab",
    role: "user",
    iat: 1720564739,
    exp: 1723156739,
    jti: "abcd1234-efgh-5678-ijkl-1234567890mn",
  },
};

let signOut = {
  token: {
    name: "Jane Doe",
    email: "janedoe@example.com",
    picture: "https://example.com/avatar/janedoe.jpg",
    sub: "12345678-abcd-1234-efgh-1234567890ab",
    id: "12345678-abcd-1234-efgh-1234567890ab",
    role: "user",
    iat: 1720564854,
    exp: 1723156854,
    jti: "ijkl1234-mnop-5678-qrst-0987654321uv",
  },
};
