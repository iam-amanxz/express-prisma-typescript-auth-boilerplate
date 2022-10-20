import "reflect-metadata";
import app from "../../../app";
import request from "supertest";
import { cleanDatabase } from "../../../db";
import {
  InvalidCredentialsException,
  ValidationException,
} from "../../../exceptions-and-responses";
import { UserApi } from "../../../api";
import { generateHash, generateSalt } from "../../../utils";

describe("POST /sign-up", () => {
  const url = "/api/v1/auth/sign-up";

  beforeAll(async () => {
    await cleanDatabase();
  });

  it("returns status code 400 if username or password is not provided", async () => {
    const res = await request(app).post(url).send();

    expect(res.statusCode).toEqual(400);
    expect(res.body.errorMessage).toEqual(ValidationException.message);
  });

  it("returns status code 409 if username already exists", async () => {
    await new UserApi().create({
      email: "user@mydomain.com",
      hash: "somehash",
      salt: "somesalt",
    });
    const res = await request(app).post(url).send({
      username: "user",
      password: "password",
    });

    expect(res.statusCode).toEqual(409);
    expect(res.body.errorMessage).toEqual(
      "Email user@mydomain.com already exists"
    );
  });

  it("returns status code 200 on successful signup", async () => {
    const res = await request(app).post(url).send({
      username: "newuser",
      password: "password",
    });

    expect(res.statusCode).toEqual(201);
  });
});

describe("POST /sign-in", () => {
  const url = "/api/v1/auth/sign-in";

  beforeAll(async () => {
    await cleanDatabase();
  });

  it("returns status code 400 if username or password is not provided", async () => {
    const res = await request(app).post(url).send();

    expect(res.statusCode).toEqual(400);
    expect(res.body.errorMessage).toEqual(ValidationException.message);
  });

  it("returns status code 400 if username doesn't exists", async () => {
    const password = "test123#";
    const salt = generateSalt();
    const hash = generateHash(password, salt);
    await new UserApi().create({ email: "user@mydomain.com", hash, salt });

    const res = await request(app).post(url).send({
      username: "nouser",
      password,
    });

    expect(res.statusCode).toEqual(InvalidCredentialsException.code);
    expect(res.body.errorMessage).toEqual(InvalidCredentialsException.message);
  });

  it("returns status code 400 if password doesn't match", async () => {
    const res = await request(app).post(url).send({
      username: "user",
      password: "test123",
    });

    expect(res.statusCode).toEqual(InvalidCredentialsException.code);
    expect(res.body.errorMessage).toEqual(InvalidCredentialsException.message);
  });

  it("returns status code 200 on successful signin", async () => {
    const res = await request(app).post(url).send({
      username: "user",
      password: "test123#",
    });

    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /sign-out", () => {
  const url = "/api/v1/auth/sign-out";
  const signInUrl = "/api/v1/auth/sign-in";

  beforeAll(async () => {
    await cleanDatabase();
  });

  it("returns status code 200 on successful sign out", async () => {
    const password = "test123#";
    const salt = generateSalt();
    const hash = generateHash(password, salt);
    await new UserApi().create({ email: "user@mydomain.com", hash, salt });

    await request(app).post(signInUrl).send({
      username: "user",
      password: password,
    });

    const res = await request(app).get(url);

    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /me", () => {
  const url = "/api/v1/auth/me";
  const signInUrl = "/api/v1/auth/sign-in";

  beforeAll(async () => {
    await cleanDatabase();
  });

  it("returns status code 401 when not signed in", async () => {
    const res = await request(app).get(url);

    expect(res.statusCode).toEqual(401);
  });

  it("returns status code 200 when success", async () => {
    let cookie;

    const password = "test123#";
    const salt = generateSalt();
    const hash = generateHash(password, salt);
    await new UserApi().create({ email: "user@mydomain.com", hash, salt });

    const signInRes = await request(app).post(signInUrl).send({
      username: "user",
      password: password,
    });

    const cookies = signInRes.headers["set-cookie"][0]
      .split(",")
      .map((item: any) => item.split(";")[0]);
    cookie = cookies.join(";");

    const res = await request(app).get(url).set("Cookie", cookie);

    expect(res.statusCode).toEqual(200);
  });
});
