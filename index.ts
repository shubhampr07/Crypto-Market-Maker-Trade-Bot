import axios from "axios"
import { DepthManager } from "./DepthManager"


const solInrMarket = new DepthManager("B-SOL_INR");

const usdtInrMarket = new DepthManager("B-USDT_INR");

const solUsdtMarket = new DepthManager("B-SOL_USDT");

setInterval(() => {
    console.log(solInrMarket.getRelevantDepth());
    console.log(usdtInrMarket.getRelevantDepth());
    console.log(solUsdtMarket.getRelevantDepth());


    // sell SOL for INR buy USDT from INR , sell USDT from INR.

    const canGetInr = solInrMarket.getRelevantDepth().highestBid - 0.001;
    const canGetUsdt = canGetInr / usdtInrMarket.getRelevantDepth().lowestAsk;
    const canGetSol = canGetUsdt / solUsdtMarket.getRelevantDepth().lowestAsk;

    console.log(`You can convert ${1} SOL into ${canGetSol} SOL.`)

    // Buy SOL from INR, sell SOL for USDT, sell USDT for INR.

    const initialInr = solInrMarket.getRelevantDepth().lowestAsk + 0.001;
    const canGetUsdt2 = 1 * usdtInrMarket.getRelevantDepth().highestBid;
    const canGetInr2 = usdtInrMarket.getRelevantDepth().highestBid * canGetUsdt2;

    console.log(`You can convert ${initialInr} SOL into ${canGetInr2} INR`)
}, 2000)