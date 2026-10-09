---
title: Technical Issues and Solutions
category: Technical Support
summary: Player discovered issues and ways you may be able to fix them
---

## Font issues on immutable distributions

Immutable distrobutions are Linux distrobutions which cannot have their core filesystem files changed by usual user intervention. As such, issues may arrise from time to time with running certain applications on them. In regards to Daggerfall Online, it has issues reading the fonts it needs when run from an AppImage. The following solution may fix placeholder text on the main menu and quick menu display.

**Step 1**

Open your terminal and run the following commands:

```bash
mkdir -p ~/.local/share/fonts
cp /usr/share/fonts/*/*.ttf ~/.local/share/fonts/ 2>/dev/null || true
cp /usr/share/fonts/*/*.otf ~/.local/share/fonts/ 2>/dev/null || true
```
*Step 2**

Then, modify your launch script for the AppImage to read `export XDG_DATA_DIRS="$HOME/.local/share:/usr/local/share:/usr/share"`

**Launch Script**

An example launch script for the Steam Deck is provided:

```bash
#!/bin/bash

# Point this to the folder where you keep the Daggerfall Enhanced AppImages
APPIMAGE_DIR="$HOME/Games/Daggerfall"

# Make sure fonts are accessible
mkdir -p ~/.local/share/fonts

# Tell the AppImage where to find fonts
export XDG_DATA_DIRS="$HOME/.local/share:/usr/local/share:/usr/share"

# Find the newest AppImage file and run it
LATEST_APPIMAGE=$(ls -t "$APPIMAGE_DIR"/DaggerfallOnline-*.AppImage | head -1)

if [ -n "$LATEST_APPIMAGE" ]; then
    "$LATEST_APPIMAGE" "$@"
else
    echo "Error: No Daggerfall Enhanced AppImage found in $APPIMAGE_DIR"
    exit 1
fi
```
