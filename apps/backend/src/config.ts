const env = process.env.NODE_ENV || 'dev';

export const envFiles = (...filenames: string[]): string[] => filenames.map(filename => `${process.cwd()}/config/${env}/${filename}`);
