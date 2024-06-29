# QuizzAR

QuizzAR: A Kahoot-like Quiz App Built on Arweave

## Arweave Deployment

[QuizzAR v2 x Cron outside process](https://arweave.net/NANp_kcNwP0rvegbhBLRQQUqaVFA1qQ4AaWTDn1Kjqo)

[QuizzAR v1 x Cron inside process](https://arweave.net/RbmI3YGuctLCIKnhto-jchvM5c2F5eOblMGsIiUfSbE)

## How to Play

1. Connect your wallet
2. Create or Join Room
3. Invite friend/player using Code
4. The game will start after getting certain count of player base on create room configuration
5. You have 20 seconds to answer every round
6. Rankings will be shown at the end of the game
7. Enjoy :)

## Limitations

QuizzAR's current setup may not provide a seamless real-time communication experience. This is due to limitations in the underlying protocols and technologies, which might not be optimized for instant state delivery. Users might experience delays or latency in message delivery, which could affect the overall user experience, especially in fast-paced conversations or during collaborative activities.

## Libraries

- [@permaweb/aoconnect](https://github.com/permaweb/ao)
- [@ardrive/turbo-sdk](https://github.com/ardriveapp/turbo-sdk)
- [arweave-wallet-kit](https://github.com/labscommunity/arweave-wallet-kit)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
