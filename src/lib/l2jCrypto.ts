import crypto from 'crypto';

/**
 * Utility class for L2J Mobius Cryptography.
 * Legacy Lineage 2 Java servers store passwords as Base64 encoded SHA-1 digests.
 * This ensures 100% compatibility with the game server's database mechanism.
 */
export class L2jCrypto {
  /**
   * Hashes a plain text password to match the L2J Mobius DB format.
   * 
   * @param password - The raw password provided by the user.
   * @returns The Base64(SHA1) encoded hash.
   */
  public static hashPassword(password: string): string {
    return crypto
      .createHash('sha1')
      .update(password, 'utf8')
      .digest('base64');
  }

  /**
   * Validates if the provided plain text password matches the stored hash.
   * 
   * @param plainText - The raw password.
   * @param storedHash - The hash from the 'accounts' table.
   * @returns True if they match, false otherwise.
   */
  public static verifyPassword(plainText: string, storedHash: string): boolean {
    const hashedAttempt = this.hashPassword(plainText);
    return hashedAttempt === storedHash;
  }
}
