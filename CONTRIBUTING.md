# Contributing to Nemo

Loving Nemo and want to get involved? Thanks! There are plenty of ways you can help.

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue or assessing patches and features.

## Filing an Issue

Thinking Nemo would be better with a new feature? Found a bug with Nemo? Needed some documentation? Please file a github issue following this [guide](https://guides.github.com/features/issues/).

## Core Ideas

The purpose of nemo is to provide the best experience for fishermen and producers to communicate via EPCIS. This means that sometimes we [sacrifice additional functionality](https://gettingreal.37signals.com/ch05_Half_Not_Half_Assed.php) because it is too hard to solve it in a way that wouldn’t hinder ease of use.

We prefer **automation, interactivity, or accesibility** over configuration.
Here are a few examples of them in action.

### Automation

Instead of letting the user manually specify the geolocation, nemo would try to acquire the data from the browser's GPS API.

### Interactivity

Instead of letting user manually input the code for fishing gear, it let user pick from a set of human-readable gear name, and map it to the code internally.

### Accessibility

Nemo is built with i18n built-in, with every string translatable which fallback to English.

### Breaking the Rules

No rules are perfect. Sometimes we may introduce static configuration if we believe the value is high enough to justify the mental cost.

## Submitting a Pull Request

Good pull requests, such as patches, improvements, and new features, are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

Please **ask first** if somebody else is already working on this or the core developers think your feature is in-scope for Nemo. Generally always have a related issue with discussions for whatever you are including.

Please also provide a **test plan**, i.e. specify how you verified that your addition works.

### Overview of directory structure

```
  src/
    api/
    data/
    i18n/
    components/
    typings/
```

### Directory descriptions

#### [api](https://github.com/louisgv/nemo/tree/master/src/api)

At the time of writing, it contains helper modules to interact with FreEPCIS, EOS, and CSV converter. This directory holds any external integration code.

#### [data](https://github.com/louisgv/nemo/tree/master/src/data)

The chat interface steps and prompts can be found in this directory.

#### [i18n](https://github.com/louisgv/nemo/tree/master/src/i18n)

This directory contains translation for nemo. Any string that is rendered in nemo are default to use `en.ts`. 

#### [components](https://github.com/louisgv/nemo/tree/master/src/components)

Composable react component resides here. You will find a lot of Input components for different purposes.

#### [typings](https://github.com/louisgv/nemo/tree/master/src/typings)

Typings for custom data, such as CSV header.

## Setting Up a Local Copy

1. Clone the repo with `git clone https://github.com/louisgv/nemo`

2. Run `yarn` in the root `nemo` folder.

Once it is done, you can modify any file locally and run `yarn start`, `yarn test` or `yarn build` just like in a generated project.

## Contributing to E2E (end to end) tests

**TL;DR** WE NEED E2E TEST SETUP!

## Tips for contributors using Windows

The scripts in tasks folder and other scripts in `package.json` will not work in Windows out of the box. However, using [Bash on windows](https://msdn.microsoft.com/en-us/commandline/wsl/about) makes it easier to use those scripts without any workarounds. The steps to do so are detailed below:

### Install Bash on Ubuntu on Windows

A good step by step guide can be found [here](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/)

### Install Node.js and yarn

Even if you have node and yarn installed on your windows, it would not be accessible from the bash shell. You would have to install it again. Installing via [`nvm`](https://github.com/creationix/nvm#install-script) is recommended.

### Line endings

By default git would use `CRLF` line endings which would cause the scripts to fail. You can change it for this repo only by setting `autocrlf` to false by running `git config core.autocrlf false`. You can also enable it for all your repos by using the `--global` flag if you wish to do so.

## Cutting a Release

1. Tag all merged pull requests that go into the release with the relevant milestone. Each merged PR should also be labeled with one of the [labels](https://github.com/louisgv/nemo/labels) named `tag: ...` to indicate what kind of change it is. **Make sure all breaking changes are correctly labelled with `tag: breaking change`.**
2. Run `yarn deploy`
3. Close the milestone and create a new one for the next release.

Make sure to test the released version!

---

_Many thanks to [h5bp](https://github.com/h5bp/html5-boilerplate/blob/master/.github/CONTRIBUTING.md) for the inspiration with this contributing guide_