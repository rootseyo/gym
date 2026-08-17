fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android build

```sh
[bundle exec] fastlane android build
```

Build signed release AAB (Android App Bundle)

### android internal

```sh
[bundle exec] fastlane android internal
```

Build and deploy to Google Play Internal Test Track

### android alpha

```sh
[bundle exec] fastlane android alpha
```

Build and deploy to Google Play Closed/Open Alpha Track

### android beta

```sh
[bundle exec] fastlane android beta
```

Build and deploy to Google Play Closed/Open Beta Track

### android production

```sh
[bundle exec] fastlane android production
```

Build and deploy to Google Play Production Track

### android deploy

```sh
[bundle exec] fastlane android deploy
```

Alias for production deploy

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
