import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculator } from "../target/types/calculator";
import { expect } from "chai";

describe("calculator", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Calculator as Program<Calculator>;
  const programProvider = program.provider as anchor.AnchorProvider;

  const calculatorPair = anchor.web3.Keypair.generate();
  const text = "Summer Solana To Ze Moon";

  it("Creating Calculator Instance", async () => {
    await program.methods.create(text).accounts({
      calculator: calculatorPair.publicKey,
      user: programProvider.wallet.publicKey,
    }).signers([calculatorPair]).rpc();

    const account = await program.account.calculator.fetch(calculatorPair.publicKey);
    expect(account.greeting).to.eql(text);
  });

  it("Addition", async () => {
    await program.methods.add(new anchor.BN(2), new anchor.BN(3))
      .accounts({
        calculator: calculatorPair.publicKey,
      })
      .rpc();
    
    const account = await program.account.calculator.fetch(calculatorPair.publicKey);
    expect(account.result.toString()).to.eql(new anchor.BN(5).toString());
  });

  it("Subtraction",async()=>{
    await program.methods.subtract(new anchor.BN(5),new anchor.BN(2))
      .accounts({
        calculator: calculatorPair.publicKey,
      })
      .rpc();
    const account = await program.account.calculator.fetch(calculatorPair.publicKey);
    expect(account.result.toString()).to.eql(new anchor.BN(3).toString());
  });
  it("Multiplication",async()=>{
    await program.methods.multiply(new anchor.BN(8),new anchor.BN(7))
      .accounts({
        calculator: calculatorPair.publicKey,
      })
      .rpc();
    const account = await program.account.calculator.fetch(calculatorPair.publicKey);
    expect(account.result.toString()).to.eql(new anchor.BN(56).toString());
  });
  it("Division",async()=>{
    await program.methods.divide(new anchor.BN(14),new anchor.BN(2))
      .accounts({
        calculator: calculatorPair.publicKey,
      })
      .rpc();
    const account = await program.account.calculator.fetch(calculatorPair.publicKey);
    expect(account.result.toString()).to.eql(new anchor.BN(7).toString());
  });
});
