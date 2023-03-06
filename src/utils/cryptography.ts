import crypto from 'crypto';
import logger from './logger';

const aesAlgo = 'aes-256-cbc'; //Using AES encryption
const key = process.env.CRYPTO_KEY as string;
const iv = crypto.randomBytes(16);

//Encrypting data
export const encrypt = (data: string | object): string => {
  logger.info('[Cryptography:encrypt] - Encryption call started.');

  if (typeof data === 'object') {
    logger.info('[Cryptography:encrypt] - data has object type.');
    data = JSON.stringify(data);
  }
  let cipher = crypto.createCipheriv(aesAlgo, Buffer.from(key), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  logger.info('[Cryptography:encrypt] - Encryption call completed.');
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

// Decrypting data
export const decrypt = (encryptedData: string): string | object => {
  logger.info('[Cryptography:decrypt] - Decryption call started.');

  const encryptedPayload = encryptedData.split(':');
  let iv = Buffer.from(encryptedPayload[0], 'hex');
  let encryptedText = Buffer.from(encryptedPayload[1], 'hex');
  let decipher = crypto.createDecipheriv(aesAlgo, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  logger.info('[Cryptography:decrypt] - Decryption call completed.');
  return JSON.parse(decrypted.toString()) as string | object;
};
