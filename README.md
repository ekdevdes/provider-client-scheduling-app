# Provider/Client Scheduling App
A simple little app to allow providers to set their availability and clients to choose a 15 minute spot from providers selected availability

# Installation and Local Dev Setup

- `git clone git@github.com:ekdevdes/provider-client-scheduling-app.git`
- `cd provider-client-scheduling-app`
- `npm i`
  - ℹ️ **Note:** This project uses Node `v20.13.1` and npm `v10.5.2`. You'll find an `.nvmrc` in the root of this repo to ensure these versions are respected
  - If your terminal is not setup to auto-load node and npm versions from `.nvmrc` files, copy the below code and add it to your `.zshrc` or `.bashrc`. Once done, reload your terminal and it should automagically ✨ load in the right version:
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
- The app theme (the red) was inspired by CVS's design scheme
- The client screens were inspired by some shots on Dribbble I found for similar client/provider apps

# Improvements
## For an MVP (Minimum Viable Product)
- I've sprinkled comments throughout the app providing suggestions on what I'd do if this were a production app but I'll summarize my top ones here. 
- This list would specifically be, what I think would be necessary to launch a 1st version of this app:
  - When a provider adds more then 5 availability days the z-index and scrolling on the form screen get messed up
  - I'd use a JWT or a `useAuth` hook to get the id of the logged in user instead of hardcoding them
  - I'd add React Router for public facing URLs and add a way to go back after finishing the flow for providers and clients
  - I'd have to talk with the designers of this app if they wanted it to be more resposive on Desktop and Tablet before launch and if so work that into the roadmap

 ## Fast Follow improvements
 If this were an actual production application, these are the things I'd fix after the initial launch:
  - For the client booking screen I'd want to make the URLs were shareable with those not logged in for easy texting and emailing
  - Add a few additional config files to enable prettier formatting on save to make it easier for the team to work on together and not have to worry about fixing pesky ESLint issues that could be auto-fixed
  - I'd ensure the color contrast and aria roles are used properly for better accessibility