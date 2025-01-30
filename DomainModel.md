# Domain Model for CryptoVault (Portfolio Tracker)

```mermaid
---
title: CryptoValut
---

classDiagram

    class User {
        +String firstName
        +String lastName
        +String userID
        +String email
        +String password
        +String phoneNumber
        +String SSN
    }

    class Asset {
        +String assetID
        +String assetName
        +String assetSymbol
        +double price
    }

    class Price {
        +Asset asset
    }
    
    class Currency {
        <<Enumeration>>
        USD
        EUR
        GBP
        BTC
        ETH
    }

    class Portfolio {
        +String portfolioID
        +User user
        +List~Asset~ Assets
        +double assetValue
    }

    class Wallet {
        +User user
        +double balance
        +Transaction transaction
        +String currency
    }

    class Transaction {
        +String transactionID
        +Portfolio portfolio
        +String type
        +double amount
        +Asset asset
        +Date date
    }

    class PriceAlert {
        +Asset asset
        +User user
        +String alertType
        +double targetPrice
    }

    User *-- Portfolio
    User *-- Wallet
    Portfolio *-- Asset
    Wallet *-- Transaction
    Asset *-- Price
    Asset *-- PriceAlert
    Price *-- Currency