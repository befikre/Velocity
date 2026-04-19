"use client";

import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

interface Props {
    children: ReactNode;
}

export const AppWalletProvider: FC<Props> = ({ children }) => {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';

    // Current network url
    const endpoint = useMemo(() => {
        if (network === 'devnet') {
            return clusterApiUrl('devnet');
        } else if (network === 'mainnet-beta') {
            return clusterApiUrl('mainnet-beta');
        }
        return clusterApiUrl('devnet');
    }, [network]);

    // Phantom is automatically detected by standard. We do not need to pass adapter explicitly anymore.
    const wallets = useMemo(
        () => [],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
