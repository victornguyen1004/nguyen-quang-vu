# Problem 3: Messy React

## Task description

List out the computational inefficiencies and anti-patterns found in the code block below.

## Problems that was found in the original code

- Missing imports for `BoxProps`, `useWalletBalances`, `usePrices`, `WalletRow`, `classes`. The refactored version assumes that all the import paths are correct.
- `WalletBalance` interface did not include a `blockchain`, `children` field, which is later used in the code. `childen` can be used with optional chaining, because not all WalletPage has a `chidren` prop.
- `prices` is in the dependencies array or `useMemo()` despite not being used.
- `lhsPriority` is not defined. Should be replaced with `balancePriority`.
- `toFixed()` should have a parameter, or else it will returns the rounded result without the fraction part, which can be a catastrophic problem. Because 0.001 Bitcoin is not small amount of money. The `digits` parameter in this app could be around the value of `5`, which is precise enough without breaking the looks of the app.
- Incorrect filter logic. To filter out balances that are negative, `balance.amount <= 0` is not correct. We should replace it with `balance.amount > 0`.
- The sort logic did not handle the case when two balances have the same priority.
- `FormattedWalletBalance` should extends from `WalletBalance`, since it has all WalletBalance's fields except the newly added `formatted` field.
- We should not use `index` as the `key` when mapping. This can cause issues when the list items can be added, removed, or reordered. In the refactored code, `index` is replaced with `balance.blockchain`. Assuming each blockchain has a unique name.

## Refactored Code

```typescript
// Adding necessary import statements
import React, { useMemo, ReactNode } from "react";
import { useWalletBalances, usePrices } from "./hooks";
import { BoxProps } from "./BoxProps";
import WalletRow from "./WalletRow";
import classes from "./styles.css";

// Adding the `blockchain` and `children` fields to the interface
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
  children?: ReactNode;
}

// Extends from `WalletBalance` and add a new `formatted` field
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // Remove `prices` from the dependencies array of `useMemo()`.
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Replaced `lhsPriority` with `balancePriority`.
        if (balancePriority > -99) {
          // Updated the filter logic to filter out negative or     empty balance.
          return balance.amount > 0;
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        // Added the logic to handle equal priorities case.
        return 0;
      });
  }, [balances]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      // Added the `digits` parameter with the value of `5` to `toFixed()` to display the fraction part of the amount.
      formatted: balance.amount.toFixed(5),
    };
  });

  const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        // Replace `index` with `balance.blockchain`. Assuming each blockchain has a unique name.
        key={balance.blockchain}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
```
