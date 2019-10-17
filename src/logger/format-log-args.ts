/* eslint-disable @typescript-eslint/explicit-function-return-type */

import path from 'path';
import chalk from 'chalk';

const ERROR_STACK_LIMIT = 3;
const SRC_ROOT = path.join(__dirname, '../../src');

interface StackInfo {
  method: string;
  relativePath: string;
  line: string;
  pos: string;
  file: string;
  stack: string;
}

// Reference:
// https://v8.dev/docs/stack-trace-api
// https://gist.github.com/transitive-bullshit/39a7edc77c422cbf8a18
const getStackInfo = (stackIndex: number): StackInfo | null => {
  const error = new Error();
  const stacklist = error.stack && error.stack.split('\n').slice(3);

  if (!stacklist) return null;

  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
  const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

  const s = stacklist[stackIndex] || stacklist[0];
  const sp = stackReg.exec(s) || stackReg2.exec(s);

  if (!sp || sp.length < 5) return null;

  return {
    method: sp[1],
    relativePath: path.relative(SRC_ROOT, sp[2]),
    line: sp[3],
    pos: sp[4],
    file: path.basename(sp[2]),
    stack: stacklist.join('\n'),
  };
};

const getLines = (str: string, count: number): string =>
  str.split('\n', count).join('\n');

const prependSpace = (str: string, count: number): string =>
  str
    .split('\n')
    .map((line, index) => (index !== 0 ? `${' '.repeat(count)}${line}` : line))
    .join('\n');

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '...';
      }
      seen.add(value);
    }
    return value;
  };
};

const formatLogArgs = (message, levelLength: number): string => {
  let res = message;
  const stackInfo = getStackInfo(1);

  if (stackInfo != null && res != null) {
    let calleeStr = `${stackInfo.relativePath}:${stackInfo.line}`;
    const spaceCount = calleeStr.length + levelLength + 2;
    calleeStr = chalk.gray(calleeStr);

    if (res instanceof Error && res.stack) {
      res = `${calleeStr} ${chalk.red(
        prependSpace(
          getLines(res.stack, ERROR_STACK_LIMIT + 1),
          spaceCount - 2,
        ),
      )}`;
    } else if (typeof res === 'object') {
      res = `${calleeStr} ${prependSpace(
        JSON.stringify(res, getCircularReplacer(), 2),
        spaceCount,
      )}`;
    } else if (typeof res === 'string') {
      res = `${calleeStr} ${prependSpace(res, spaceCount)}`;
    } else {
      res = `${calleeStr} ${res}`;
    }
  }

  return res;
};

export default formatLogArgs;
