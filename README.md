# A social podcast experience - KTH

React Native Project for the KTH course DM2601 Media Technology and Interaction Design.
Theme for the course was podcasts, audio books and video services.

(New version with updated React Native (0.57) and integrated navigations)

.readme Podcast app


### Installation
#### You need to have either Android Studio or Xcode installed
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
	~ $ cd ios
	 ~ $ pod install
    ~ $ npm i

	Open Xcode and replace everything in Appdelegate.m to 	
#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h> #import <React/RCTRootView.h> #import <ReactNativeNavigation/ReactNativeNavigation.h> @implementation AppDelegate - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions { NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil]; [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions]; return YES; } @end

Right click on RNPodcastApp (the blue one) and add the sound file you want to play (this is temporary)
react-native run-ios


