import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'dev';

export const envFiles = (...filenames: string[]): string[] =>
  filenames.map((filename) => `${process.cwd()}/config/${env}/${filename}`);

export const configFiles = [
  'apps.env',
  'database.env',
];

export const loadEnv = () => {
  envFiles(...configFiles).forEach((filename) => {
    dotenv.config({path: filename});
  });
};
