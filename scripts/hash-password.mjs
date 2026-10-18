// Genera el valor de VITE_ADMIN_PASSWORD_HASH para el archivo .env
// Uso: npm run hash-password -- "mi-contraseña-segura"
import { pbkdf2Sync, randomBytes } from 'node:crypto';

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Uso: npm run hash-password -- "contraseña de al menos 10 caracteres"');
  process.exit(1);
}

const iterations = 210000;
const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, iterations, 32, 'sha256');
console.log(`VITE_ADMIN_PASSWORD_HASH=pbkdf2:${iterations}:${salt.toString("hex")}:${hash.toString("hex")}`);
