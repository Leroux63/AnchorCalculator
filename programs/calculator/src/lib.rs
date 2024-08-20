use anchor_lang::prelude::*;

declare_id!("HBnA5aPRfHCBTDsvcfi929PzCAVHPeqSzj8vdDP2VvSs");

#[program]
pub mod calculator {
    use super::*;

    pub fn create(ctx: Context<Create>, init_message: String) -> Result<()> {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }

    pub fn add(ctx: Context<Addition>, num1: i64, num2: i64) -> Result<()> {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 + num2;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 8 + 64 + 8)] // `space` ajusté pour la taille du compte
    pub calculator: Account<'info, Calculator>,
    
    #[account(mut)] // Le compte payeur doit être mutable
    pub user: Signer<'info>, // Il s'agit du compte payeur
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
}
