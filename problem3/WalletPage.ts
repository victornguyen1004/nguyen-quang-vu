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
