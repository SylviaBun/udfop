---
title: Installation Guide
category: Technical Support
summary: An install reference for all supported methods of play.
---

Daggerfall Online includes support for Windows, 64-bit Linux and Mac as well as any device capable of running a web browser! The following sections will guide you through installation through all supported methods. The largest advantage to installing locally to a device is performance, but you also gain the additional existence of real offline saves on your device that are not wiped if your browser cache disappears. These save files are stored separately from the main game files, and are able to be backed up easily. The browser version of the game **does** allow you to back up your offline saves in a zip export, however if you are one to reset your cache/cookies often you may still prefer to use the desktop client for assurance that your offline saves will remain.

All iterations of Daggerfall Online require legally acquired files from the main game itself. You are able to download them entirely free, legally, through [GOG](https://www.gog.com/en/game/the_elder_scrolls_chapter_ii_daggerfall), [Steam](https://store.steampowered.com/app/1812390/The_Elder_Scrolls_II_Daggerfall/), and [Bethesda's Website](https://cdnstatic.bethsoft.com/elderscrolls.com/assets/files/tes/extras/DFInstall.zip). Once you have installed the files, continue on with setup instructions for your Operating System or Browser. All of the following guides assume that you have installed the files from one of the above methods, and know where you extracted them.

## Windows

**Step 1** 

Download the official [Windows release](https://github.com/Lattymoy/daggerfall-js-source/releases/latest/download/DaggerfallOnline-win-x64-setup.exe) of Daggerfall Online, and run the executable setup file. Alternatively, download the [Portable release](https://github.com/Lattymoy/daggerfall-js-source/releases/latest/download/DaggerfallOnline-win-x64-portable.exe). Note: The portable release is not currently code-signed on Windows and will give you a Defender pop-up when attempting to run it. Rest assured it is official and safe, you can click "Run Anyway" to dismiss Defender's warning. The difference between the main Windows release and the portable version is that the Windows release acts as an installer, while the portable release runs from wherever it is located. The portable version is useful in situations where administrator access is restricted.

**Step 2**

Run the setup file or place the portable version in whatever directory you want Daggerfall Online's client files to be stored. The setup file allows you to customize install directory, so you can leave it default or place it somewhere specific for easier access.

**Step 3**

Once the client is installed, click play. The game will ask you for your ARENA2 folder. Point to where you installed the game files, it will be contained within. If through Steam, the common location will be ``C:\Program Files(x86)\Steam\steamapps\common\The Elder Scrolls Daggerfall``. If installed through GOG, the common location will be ``C:\GOG Games\The Elder Scrolls Daggerfall``. If installed manually from the ZIP file, point to the directory you installed from. 


## Linux

Linux support includes an officially released [AppImage](https://github.com/Lattymoy/daggerfall-js-source/releases/latest/download/DaggerfallOnline-linux-x86_64.AppImage) and the ability to [compile it yourself from source](https://github.com/Lattymoy/daggerfall-js-source/blob/main/bible/01-Overview/Desktop-App.md). Running the AppImage is as simple as marking your file as executable and then double clicking the icon. [Gear Lever](https://github.com/mijorus/gearlever) is an alternative for managing AppImages more automatically, and because Daggerfall Online's launcher can self-update it becomes a valuable way to quickly add it to your Applications Menu regardless of Desktop Environment. The following steps will assume that you wish to download and maintain your AppImage manually, and will require use of terminal to remain distro and Desktop Environment agnostic.

**Step 1**

Acquire the official [AppImage](https://github.com/Lattymoy/daggerfall-js-source/releases/latest/download/DaggerfallOnline-linux-x86_64.AppImage)

**Step 2**

Move the AppImage into an easy to remember directory, such as a folder in your Home directory named "AppImages"

```
mkdir ~/AppImages

mv ~/Downloads/DaggerfallOnline-linux-x86_64.AppImage ~/AppImages
```

**Step 3**

Mark the file as executable
```
chmod +x ~/AppImages/DaggerfallOnline-linux-x86_64.AppImage
```

**Step 4**

Run the launcher from the terminal

```
~/AppImages/DaggerfallOnline-linux-x86_64.AppImage
```

**Step 5**
Once launched, press play. When you begin playing, the game will ask you to provide the ARENA2 folder. The common installation method of Steam will place this in ``~/.steam/steam/steamapps/common/The Elder Scrolls Daggerfall`` If you installed from an extracted GOG setup file or ZIP file, you will need to point to where you extracted the ARENA2 folder.

## Mac

The [official Mac release](https://github.com/Lattymoy/daggerfall-js-source/releases/latest/download/DaggerfallOnline-mac-arm64.dmg) is not code-signed and so requires some intervention.

Download the prior linked dmg file, run it as any other Mac application, and when it notifies you of potential security issues go to System Settings -> Privacy & Security, find the application and click "Open Anyway"

The Mac release is currently only built for Apple Silicon, for other Mac devices consider using the browser release.

Once launched, the game will ask you to provide the ARENA2 files. Point to wherever you extracted or installed them to through your chosen method.

## Browser

The browser is the simplest, though least performant, way to play the game. All you need to do is open the [main page](https://daggerfalljs.dev/) and click "Play"

When asked for your ARENA2 files, point them to where you extracted them from one of the official downloads. Alternatively, on mobile devices, you have the option of providing the ARENA2 folder as a ZIP file, which will then be cached and loaded from automatically.