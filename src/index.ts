import parser from "yargs-parser";

function isCommand(parts: parser.Arguments): boolean {
  return parts._[0] != null && parts._[0].startsWith("/");
}

function hasArgument(parts: parser.Arguments): boolean {
  return parts._.length > 1;
}

type Next = () => Promise<void>;

export type Command = {
  text: string;
  command: string;
  args: string;
  splitArgs: string[];
};

export type Context = {
  message?: { text?: string; edit_date?: never };
  state: { command?: Command };
};

export const parseArgs = async (ctx: Context, next: Next): Promise<void> => {
  const text = ctx.message?.text;
  if (text) {
    const parts = parser(text);

    if (isCommand(parts) == false || hasArgument(parts) === false) {
      return next();
    }

    const commandName = parts._[0];
    const splitArgs = parts._.slice(1);
    ctx.state.command = {
      text,
      command: commandName.substring(1),
      args: splitArgs.join(" "),
      splitArgs,
    };
  }

  return next();
};

export default parseArgs;
