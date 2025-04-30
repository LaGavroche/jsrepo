const Block = require('./block');

/**
 * Classe Blockchain pour gérer une chaîne de blocs
 */
class Blockchain {
    /**
     * Constructeur de la blockchain
     * Initialise la chaîne avec le bloc genesis
     */
    constructor() {
        this.chain = [Block.genesis()];
    }

    /**
     * Ajoute un nouveau bloc à la blockchain
     * @param {any} data - Les données à stocker dans le bloc
     * @returns {Block} - Le bloc nouvellement créé et ajouté
     */
    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
    }
}

module.exports = Blockchain;