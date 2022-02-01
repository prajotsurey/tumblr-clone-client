# Tumbl clone Frontend built using Typescript, NextJs, TailwindCSS and Apollo-graphql. [Website](https://polar-falls-76219.herokuapp.com/)

This project is the frontend for a Tumblr clone.

## Overview
This is a replica of the tumblr user interface built using NextJS. It uses Grahql for commuinicating with the server and Tailwind for styling. It is deployed on vercel.

Building this project allowed me to learn TailwindCSS and it's theme provider along with apollo-client. 

Built using Typescript, Nextjs and apollo. 
* [Installation](#user-content-installation)
* [Usage](#user-content-usage)

## Installation

1. Clone project

```bash
git clone https://github.com/prajotsurey/tumblr-clone-client.git
```

2. Install dependencies for API server.

```bash
npm install
```

3. Create a .env file with the following data
```
NEXT_PUBLIC_API_URL=<backend url>/graphql
NEXT_PUBLIC_REFRESH_URL=<backend url>/refresh_token
```
## Usage

1. Run as dev

```bash
npm run dev
```
