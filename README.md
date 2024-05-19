# Provider/Client Scheduling App
A simple little app to allow providers to set their availability and clients to choose a 15 minute spot from providers selected availability

# Tech Stack

- React 18
- TypeScript
- Vite (so much easier than Webpack to use and integrate with, also *much* faster since it uses `esbuild` internally which is based in Go)
- ESLint
- Redux (for data sharing in the application, especially with the provider and client forms)
  - One might argue for a simple app like this why not just use the React Context API
  - To that I'd say, that *would* make the initial setup easier and perhaps the types even easier to interact with than those of Redux (whose hsitorically be a little tricky especially when it comes to Thunks)
  - The major factor for me is the Redux Dev Tools Chrome Extension:
    - It shows you *every action* committed, how it modified the state and even allows you to *go back in time* which has helped me debug quite a few production bugs
    - You can even see a graph how everything in your Redux state is connected
  - Another major factor is that the React Context API is really only good if you have a small amount of information you want to store before it gets out-of-hand. Using Redux allows for future-proofing and a more manageable code-base with actions and state data in the same place
- Luxon (for the date math)
  - I've used this library for quite a few projects before and it's made what can be complex date math a little easier
  - Problems like:
    - Generating a list of all 15 minute intervals between a start and an end time or
    - Generating an array of strings representing the next 10 days formatted like "Fri, May 19th" are super easy with luxon
    - You could even use it in combination with Material UI's `useMediaQuery` hook and format dates like "Friday, May 19th" for desktop and that wouldn't be a problem either
    - It also makes formatting dates from UIs to ISO format for SQL queries a lot easier too

# Installation and Local Dev Setup

- `git clone git@github.com:ekdevdes/provider-client-scheduling-app.git`
- `cd provider-client-scheduling-app`
- `npm i`
  - ℹ️ **Note:** This project uses Node `v20.13.1` and npm `v10.5.2`. You'll find an `.nvmrc` in the root of this repo to ensure these versions are respected
  - If your terminal is not setup to auto-load node and npm versions from `.nvmrc` files, copy the below code and add it to your `.zshrc`. Once done, reload your terminal and it should automagically ✨ load in the right version:
    ```bash
      autoload -U add-zsh-hook
      load-nvmrc() {
        [[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh # load nvm

        local node_version="$(nvm version)"
        local nvmrc_path="$(nvm_find_nvmrc)"

        if [ -n "$nvmrc_path" ]; then
          local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

          if [ "$nvmrc_node_version" = "N/A" ]; then
            nvm install
          elif [ "$nvmrc_node_version" != "$node_version" ]; then
            nvm use
          fi
        elif [ "$node_version" != "$(nvm version default)" ]; then
          nvm use default
        fi
      }
      add-zsh-hook chpwd load-nvmrc
      load-nvmrc
    ``` 
  - `npm run dev`
    - ℹ️ **Note:**  The development server should start at `http://localhost:5173/` (or http://localhost:5174 if you already have a vite app running)

# Inspiration
- The provider availability selection screen was inspired by the Greenhouse interview availabiliy screen
- The app theme (the red and white) was inspired by CVS's design scheme
- The client screens were inspired by some shots on Dribbble I found for similar client/provider apps

# Improvements
## For an MVP (Minimum Viable Product)
- I've sprinkled comments throughout the app providing suggestions on what I'd do if this were a production app but I'll summarize my top ones below 
- This list would specifically be, what I think would be necessary to launch a 1st version of this app:
  - When a provider adds more then 5 availability days the `z-index` and scrolling on the form screen get a little wonky
  - I'd use a JWT or a `useAuth` hook to get the id of the logged in user instead of hardcoding them
  - I'd add React Router for public facing URLs and add a way to go back after finishing the flow for both the providers and clients
  - For this one I'd have to talk with the designers to see what their intentions for this app are. If they want it to solely be a mobile app then we'd just have the things above to address, if they wanted it to be more desktop and tablet responsive before launch then we'd have to add a few styles (I'm thinking `useMediaQuery` in Material UI or the different breakpoints in the `sx` prop on various components)
  - I'd also want to add some unit and functional tests with Jest and even work with the business team to determine what are crucial portions of functionality in the app that we should create end-to-end tests for with Cypress

 ## Fast Follow (version 2) improvements
 If this were an actual production application, these are the things I'd fix after the initial launch:
  - For the client booking screen I'd want to make the URLs for the various provider availability screens shareable with those not logged in for easy texting and emailing
  - I'd ensure the color contrast and aria roles are used properly for better accessibility
  - Add a few additional config files to enable prettier formatting on save to make it easier for the team to work on together and not have to worry about fixing pesky ESLint issues that could be auto-fixed