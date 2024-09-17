export interface Balance {
  address: string;
  balance: number;
  associated_account: string;
  info: {
    name: string;
    symbol: string;
    image: string;
    decimals: number
  }
};


export interface Portfolio {
  success: boolean;
  message: string;
  result: {
    sol_balance: number;
    num_tokens: number;
    tokens: any //Balance[];
    num_nfts: number;
    nfts: {
      key: number;
      updateAuthority: string;
      mint: string;
      data: {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        creators: {
          address: string;
          verified: number;
          share: number
        }[]
      };
      primarySaleHappened: number;
      isMutable: number
    }[]
  }
};

export interface TokensBalance {
  success: boolean;
  message: string;
  result: Balance[]
};

export interface TokenBalance {
  success: boolean;
  message: string;
  result: Balance & { isFrozen: boolean }
};

export interface TransactionsHistory {
  success: boolean;
  message: string;
  result: {
    timestamp: Date;
    fee: number;
    fee_payer: string;
    signers: string[];
    signatures: string[];
    protocol: {
      address: string;
      name: string
    };
    type: string;
    actions: {
      info: {
        sender: string;
        receiver: string;
        amount: number
      };
      source_protocol: number;
      type: string
    }[];
    raw: {
      blockTime: number;
      meta: {
        computeUnitsConsumed: number;
        err: any | null;
        fee: number;
        innerInstructions: any[];
        logMessages: string[];
        postBalances: number[];
        postTokenBalances: any[];
        preBalances: number[];
        preTokenBalances: any[];
        rewards: any[];
        status: {
          Ok: any | null
        }
      };
      slot: number;
      transaction: {
        message: {
          accountKeys: {
            pubkey: string;
            signer: boolean;
            source: string;
            writable: boolean
          }[];
          addressTableLookups: null;
          instructions: {
            parsed: {
              info: {
                destination: string;
                lamports: number;
                source: string
              };
              type: string
            };
            program: string;
            programId: number
          }[];
          recentBlockhash: string
        };
        signatures: string[]
      };
      version: string | "legacy"
    }
  }[]
};
