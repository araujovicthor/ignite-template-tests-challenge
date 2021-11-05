import request from "supertest";

import { app } from "../../app";

describe("CreateStatement", async () => {
  it("should be able to create a deposit", async () => {
    const response = await request(app).post("/statements/deposit").send({
      amount: 100,
      description: "deposit",
    });

    expect(response.status).toBe(201);
  });
});
