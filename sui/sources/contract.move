module 0x0::mmaa {
    use sui::coin;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::event; // Import the event module

    // One-time witness type for the MMAA token
    public struct MMAA has drop {}

    // Event emitted when tokens are locked
    public struct LockEvent has copy, drop {
        sender: address,
        amount: u64,
        recipient: vector<u8>, // Ethereum address as a byte array
    }

    // Initialize the MMAA token
    fun init(witness: MMAA, ctx: &mut TxContext) {
        let (treasury, metadata) = coin::create_currency<MMAA>(
            witness, // One-time witness
            18, // Decimals
            b"MMAA", // Symbol
            b"Mihyar SUI Token", // Name
            b"", // Description
            option::none(), // Icon URL (optional)
            ctx // Transaction context
        );
        transfer::public_transfer(treasury, tx_context::sender(ctx));
        transfer::public_transfer(metadata, tx_context::sender(ctx)); // Transfer metadata to the deployer
    }

    // Mint new MMAA tokens
    public entry fun mint(
        treasury_cap: &mut coin::TreasuryCap<MMAA>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        let coins = coin::mint(treasury_cap, amount, ctx);
        transfer::public_transfer(coins, recipient);
    }

    // Burn a specific amount of MMAA tokens
    public entry fun burn(
        treasury_cap: &mut coin::TreasuryCap<MMAA>,
        coins: &mut coin::Coin<MMAA>,
        amount: u64,
        _ctx: &mut TxContext // Prefix with underscore to suppress unused variable warning
    ) {
        // Split the coins to get the amount to burn
        let coins_to_burn = coin::split(coins, amount, _ctx);
        // Burn the specified amount
        coin::burn(treasury_cap, coins_to_burn);
    }

    // Lock MMAA tokens for bridging
    public entry fun lock(
        treasury_cap: &mut coin::TreasuryCap<MMAA>,
        coins: &mut coin::Coin<MMAA>,
        amount: u64,
        recipient: vector<u8>, // Ethereum address as a byte array
        ctx: &mut TxContext
    ) {
        // Split the coins to lock
        let coins_to_lock = coin::split(coins, amount, ctx);
        // Emit a LockEvent
        event::emit(LockEvent {
            sender: tx_context::sender(ctx),
            amount: amount,
            recipient: recipient,
        });
        // Burn the locked coins
        coin::burn(treasury_cap, coins_to_lock);
    }
}
