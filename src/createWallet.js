// importando dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// definir a rede -> testenet, rede de test
const network = bitcoin.networks.testnet

// caminho de derivação p/ criação carteiras HD (hierarchical deterministic wallets)
const path = `m/49'/1'/0'/0`

// gerar mnemonico, conjunto de palavras aleatórias (palavras de senha) que geram a seed
let mnemonic = bip39.generateMnemonic()
// criar seed
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criar a raiz da carteira determinística
let root = bip32.fromSeed(seed, network)

// criando uma conta, par chaves privadas e públicas
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

// gerar um endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada:  ", node.toWIF());
console.log("Seed: ", mnemonic)


