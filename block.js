const SHA256 = require('crypto-js/sha256');

/**
 * Classe Block pour représenter un bloc dans la blockchain
 */
class Block {
    /**
     * Constructeur du bloc
     * @param {number} timestamp - Horodatage de la création du bloc
     * @param {string} lastHash - Hash du bloc précédent
     * @param {string} hash - Hash du bloc courant
     * @param {any} data - Données contenues dans le bloc
     */
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    /**
     * Affiche les informations du bloc
     * @returns {string} - Représentation textuelle du bloc
     */
    toString() {
        return `Block -
    Timestamp : ${this.timestamp}
    Last Hash : ${this.lastHash.substring(0, 10)}...
    Hash      : ${this.hash.substring(0, 10)}...
    Data      : ${JSON.stringify(this.data)}
    `;
    }

    /**
     * Crée le premier bloc de la chaîne (bloc de genèse)
     * @returns {Block} - Bloc de genèse
     */
    static genesis() {
        return new this(
            'Genesis time', // Timestamp de genèse
            '-----', // Pas de hash précédent pour le bloc de genèse
            'f1r57-h45h', // Hash de genèse
            [] // Données initiales vides
        );
    }

    /**
     * Crée un hash SHA-256 à partir des données fournies
     * @param {number} timestamp - Horodatage 
     * @param {string} lastHash - Hash du bloc précédent
     * @param {any} data - Données du bloc
     * @returns {string} - Le hash généré
     */
    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${JSON.stringify(data)}`).toString();
    }

    /**
     * Mine un nouveau bloc basé sur le dernier bloc et des données
     * @param {Block} lastBlock - Le dernier bloc de la chaîne
     * @param {any} data - Les données à inclure dans le nouveau bloc
     * @returns {Block} - Un nouveau bloc miné
     */
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
    }
}

module.exports = Block;