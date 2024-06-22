# Problem 2: Fancy Form

## Task description

Create a currency swap form based on the template provided in the folder. A user would use this form to swap assets from one currency to another.

## This app is hosted on Vercel
[Fancy Form App](https://fancy-form-five.vercel.app/)

## How to run this App

In the project directory, open the terminal and run these commands:

```bash
npm install
npm start
```

These commands install required dependencies then run the app.  
Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

In this project, components, functions, methods and other files are separated into different folders to be more manageable and easier to maintain.

### `/assets` folder

Contains svg files for icons in this app.

### `/components` folder

Contains all components in this app.
In this app, there are 5 main components that are:

- `ConfirmationModal`: The modal when the user click on the "Swap" button.
- `CurrencyItem`: Display image and name of a currency.
- `CurrencyList`: Display a drop-down list of currencies.
- `CurrencySwapForm`: The Form component. Where the user interacts with the app.
- `LoadingSpinner`: The loading spinner to indicate when the data is being fetched or when a function is executing.

### `/config`

Contains constants, settings, API URL. When developers need to edit certain parts of the app, they can just simply go here and change the config without having to find anything in the components.

### `/hooks`

Contains custom hooks, the reason why I use custom hooks is to make some repeated functions in the app more reusable and modular. For example:

- `useClickOutside()`: Receives a `ref` and a `callbackFunction`. When the user clicked outside of the tag with that `ref`, execute the `callbackFunction`.
- `useCurrencyConversion()`: Contains the logic for calculations related to currency swapping in the app.
- `useFetchCurrencies()`: Manages the state and a useEffect() to handle `currencies` data that will be display in the app.

### `/locales`

Contains translations for all texts that are visible to the user in the interface of the app. The reason I separated those texts into a `.json` file, not writing them straight into the project is for future scalability. For example, at this moment, the app only supports `English`, but in the future we might support other languages. By managing all the texts inside a `.json` file, we can simply send the original translations file to the translator to get the translations for other languages.

### `/redux`

I use redux in this project to display the `ConfirmationModal` mentioned in the previous part.

### `/services`

Contains the logic for API fetching to get the `currencies` data. File in this `/services` folder is later used in a custom hook named `useFetchCurrencies()`.

### `/utils`

Contains helper & ultility functions. For example: To have a function that returns a locale string of a value, we write a `getLocaleString()` to use rather than using the `toLocaleString()` directly in the component. Using this method, we can add configs, parameters and make sure they work the same all over the app. If we directly use the `toLocaleString()` in the component, we have to write the parameters for each line of `toLocaleString()` which is adundant and hard to maintain.
