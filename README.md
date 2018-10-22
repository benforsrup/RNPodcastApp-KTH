# A social podcast experience - KTH

React Native Project for the KTH course DM2601 Media Technology and Interaction Design.
Theme for the course was podcasts, audio books and video services.

(New version with updated React Native (0.57) and integrated navigations)

.readme Podcast app

Navigate to the **development** branch for the latest stable version!

### Installation
#### You need to have Xcode installed
Currently there is a bug where some have problems running
react native applications with v.057. See (the lengthy and troublesome) instructions below to fix this 
if you have issues runnit it.

```
	~ $ git clone
	~ $ cd RNPodcastApp-KTH
	~ $ npm install

	Open project in Xcode (ios/RNPodcast-KTH.xcodeproj
	After Xcode has indexed the project, go to Product - Scheme - Manage Schemes
	and add React (if you can’t already find React there). Make sure Shared box is ticked.
	Set build system to legacy in File Project Settings
	Run project once from Xcode, it will probably fail.
	Run the following command in the terminal: 
	~ $ cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
	Run from Xcode now, it will probably work.
    If you want to run from react-native run-ios and you get a CFBundleIdentifier error, do
    ~ $ react-native upgrade, 
        y to all options.
    ~ $ react-native link
    ~ $ npm i

	Open Xcode and replace everything in Appdelegate.m to 	
#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h> #import <React/RCTRootView.h> #import <ReactNativeNavigation/ReactNativeNavigation.h> @implementation AppDelegate - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions { NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil]; [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions]; return YES; } @end

If you have issues with Pod (which is unlikely but still), you need to download CocoaPod. See here: https://guides.cocoapods.org/using/getting-started.html#getting-started
Then navigate to ios and run pod install.
react-native run-ios


