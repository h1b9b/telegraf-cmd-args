import middleware, { Context } from "..";

describe("Telegraf command parser middleware", () => {
  const buildContext = (text: string): Context => ({
    message: { text },
    state: {},
  });

  describe("when no command", () => {
    it("should not set command in state", async () => {
      const ctx = buildContext("say");
      await middleware(ctx, jest.fn());
      expect(ctx.state.command).toBeUndefined();
    });
  });

  describe("when command with no arguments", () => {
    it("should not set command in state", async () => {
      const ctx = buildContext("/say");
      await middleware(ctx, jest.fn());
      expect(ctx.state.command).toBeUndefined();
    });
  });

  describe("when command with arguments", () => {
    it("should set command in state", async () => {
      const ctx = buildContext("/say hello world");
      const expectedCommand = {
        text: "/say hello world",
        command: "say",
        args: "hello world",
        splitArgs: ["hello", "world"],
      };
      await middleware(ctx, jest.fn());
      expect(ctx.state.command).toEqual(expectedCommand);
    });
  });
});
