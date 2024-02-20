export interface TransactionsHistory {
  success: boolean,
  message: string,
  result: {
    timestamp: Date,
    fee: number,
    fee_payer: string,
    signers: string[],
    signatures: string[],
    protocol: {
      address: string,
      name: string
    },
    type: string,
    actions: {
      info: {
        sender: string,
        receiver: string,
        amount: number
      },
      source_protocol: number,
      type: string
    }[],
    raw: {
      blockTime: number,
      meta: {
        computeUnitsConsumed: number,
        err: any | null,
        fee: number,
        innerInstructions: any[],
        logMessages: string[],
        postBalances: number[],
        postTokenBalances: any[],
        preBalances: number[],
        preTokenBalances: any[],
        rewards: any[],
        status: {
          Ok: any | null
        }
      },
      slot: number,
      transaction: {
        message: {
          accountKeys: {
            pubkey: string,
            signer: boolean,
            source: string,
            writable: boolean
          }[],
          addressTableLookups: null,
          instructions: {
            parsed: {
              info: {
                destination: string,
                lamports: number,
                source: string
              },
              type: string
            },
            program: string,
            programId: number
          }[],
          recentBlockhash: string
        },
        signatures: string[]
      },
      version: string | "legacy"
    }
  }[]
}
