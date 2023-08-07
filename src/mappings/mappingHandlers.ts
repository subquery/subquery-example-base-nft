import { Claim, DailyAggregation } from "../types";
import {TokensClaimedLog} from "../types/abi-interfaces/Erc721baseAbi";
import assert from "assert";

export async function handleNftClaim(log: TokensClaimedLog): Promise<void> {
  logger.info(`New claim log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  const claim = Claim.create({
    id: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    timestamp: log.block.timestamp,
    claimer: log.args.claimer,
    receiver: log.args.receiver,
    tokenId: log.args.startTokenId.toBigInt(),
    quantity: log.args.quantityClaimed.toBigInt(),
  });

  await claim.save();
}

/*export async function handleTransaction(tx: ApproveTransaction): Promise<void> {
  logger.info(`New Approval transaction at block ${tx.blockNumber}`);
  assert(tx.args, "No tx.args");

  const approval = Approval.create({
    id: tx.hash,
    owner: tx.from,
    spender: await tx.args[0],
    value: BigInt(await tx.args[1].toString()),
    contractAddress: tx.to,
  });

  await approval.save();
}*/
