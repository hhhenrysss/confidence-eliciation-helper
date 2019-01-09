### Confidence Elicitation Data Processing Helper

The website is at https://github.com/hhhenrysss/confidence-elicitation

Build with Electron; Intended for macOS only

#### For distribution:

* manually: need to download prebuild binaries first from https://github.com/electron/electron/releases/tag/v3.1.0 and then follow the steps in https://electronjs.org/docs/tutorial/application-distribution

* use electron-builder: note that the build options in package.json are only for macOS (without App Store)

* macOS may forbid the app from opening as it comes from untrusted developer. Need to go to System Settings and manually disable security check for this app (this option should still be available at least for macOS 10.13.6)